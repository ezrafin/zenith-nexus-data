## Markets Section – Scenarios, Risks, and Recommendations

### 1. Architecture Overview

- **Entry points**
  - `MarketsPage` (`/markets/:type`) – main UI for all market types:
    - `type ∈ {indices, stocks, commodities, crypto, currencies}` from route params.
    - Uses `useMarketDataQuery({ type })` to fetch data.
    - Renders:
      - localized title/description (`marketsPage.*`),
      - market tabs (links between `/markets/*`),
      - search box,
      - `LastUpdated` + manual refresh,
      - `MarketTable` with optional volume column and charts.
  - `useAllMarkets` – convenience hook that calls `useMarketDataQuery` for all types (for home/recommendations).

- **Data layer**
  - `useMarketDataQuery`:
    - Local cache in `localStorage` per market type (5 minutes).
    - React Query with:
      - `queryKey: ['marketData', type]`,
      - background refetch with configurable `refreshInterval` / `staleTime`.
    - For `crypto`:
      - calls Supabase Edge Function `fetch-crypto`.
    - For `indices`, `stocks`, `commodities`, `currencies`:
      - calls Supabase Edge Function `fetch-stocks?type=${type}`.
    - Returns `{ data, isLoading, error, lastUpdated, isDemo, refetch }`.
  - `MarketTable`:
    - Client-side sort (symbol/name/price/%/volume),
    - price formatting,
    - optional 7‑day mini chart and volume,
    - `WatchlistButton` per row.
  - `WatchlistButton`:
    - Only for authenticated users (`useUser`).
    - Reads from/writes to Supabase tables `watchlists` and `watchlist_items`.

### 2. Key User Scenarios

1. **View a single market**
   - User opens `/markets/indices` (or any other type).
   - Expected:
     - Correct title/description for the selected market.
     - Top‑40 instruments by market cap (or equivalent metric) in the table.
     - Timestamp of last update; clear error state if data failed to load.

2. **Switch between markets**
   - User clicks on tabs (Indices / Stocks / Commodities / Crypto / Currencies).
   - Expected:
     - URL changes, data for the new market appears quickly (from cache or API).
     - No confusing flash of empty state if cached data exists.

3. **Search within a market**
   - User types ≥ 2 characters in the search box.
   - Expected:
     - Search is scoped to the current market.
     - Results (up to 100 rows) ordered and clearly indicated; meaningful \"no results\" message.
     - Clearing search resets view to top‑40 list.

4. **Refresh data**
   - User presses refresh control in `LastUpdated`.
   - Expected:
     - Data actually refetches from the Edge Function.
     - Local cache stays in sync; errors are surfaced but do not break the page.

5. **Manage watchlists (authenticated users)**
   - User toggles star icon on a row.
   - Expected:
     - Available watchlists are loaded once.
     - Instrument can be added to one or more watchlists.
     - Duplicates handled gracefully, with clear toasts.

### 3. Identified / Potential Issues

#### 3.1 Caching and Data Consistency

- `useMarketDataQuery` stores **full MarketData arrays** in `localStorage` without schema versioning.
  - If API responses change shape (e.g. different `volume` format), stale cached entries may no longer match the current UI assumptions.
  - Current logic returns cached data even when it is older than `CACHE_DURATION`, using it as placeholder.

**Suggested improvements**
- Include a `schemaVersion` in cache entries and invalidate cache when the version changes.
- Optionally show a subtle hint when data is coming from cache/demo rather than live API.

#### 3.2 Numeric Formatting and Locales

- `MarketTable`:
  - Parses `volume` using `parseFloat(a.volume?.replace(/[^0-9.]/g, '') || '0')`.
  - Prices are formatted with fixed rules and `toLocaleString('en-US', ...)`, ignoring current UI language.

**Risks**
- If API starts using commas or localized number formats, volume parsing may misinterpret values.
- For non‑English locales, number formatting will always look \"English\" (decimal point, thousands separator).

**Suggested improvements**
- Keep `volume` and `marketCap` as pure numbers in the API layer; move all display‑formatting to the UI, using the current locale from `useTranslation` / i18n.
- Introduce a shared numeric formatting helper analogous to `formatNewsDate`.

#### 3.3 Crypto Specifics (Wrapped Tokens and Top‑20 Logic)

- `fetch-crypto` uses a multi‑provider chain:
  - CoinGecko → CoinMarketCap → CryptoCompare → Binance → others → mock.
- Wrapped tokens are filtered by `filterWrappedTokens` (checks name includes `wrapped`, a small list of known symbols, etc.).
- Binance fallback uses a **hard‑coded list of 20 USDT pairs** as \"top 20\".

**Risks / inconsistencies**
- Effective rule for which coins are shown changes by provider:
  - with CoinGecko/CoinMarketCap: full market list minus wrapped tokens;
  - with Binance: fixed hand‑picked 20 pairs, regardless of broader market cap.
- New wrapped tokens outside the hardcoded list will still appear until `filterWrappedTokens` is updated.

**Suggested improvements**
- Move toward a single, consistent rule: e.g. always take the top‑N by market cap/volume from whichever provider is active, then apply a more robust wrapped‑token filter.
- Externalize the list of known wrapped tokens so it can be updated without redeploying the function.

#### 3.4 Search Behaviour

- Search currently:
  - Only uses data from the **current market** (no extra API calls).
  - Requires a minimum of 2 characters (`shouldLoadAll = searchQuery.trim().length >= 2`).

**Risks**
- Users might expect global cross‑market search when typing into one search box.
- With a 1‑character query nothing happens, which may feel broken if there is no hint.

**Suggested improvements**
- Add helper text like \"Type at least 2 characters to search\" below the input when query length is 1.
- Optionally support an advanced/global mode (using `useAllMarkets`) behind a toggle or on a dedicated page.

#### 3.5 Watchlist Performance and UX

- Each `WatchlistButton`:
  - Loads the list of watchlists for the user and checks membership for the given symbol+market type in its own `useEffect`.
  - This happens per row when the user is logged in.

**Risks**
- Many duplicate Supabase queries on pages with dozens of rows, impacting performance and rate limits.
- Any latency in these calls delays the availability of watchlist actions.

**Suggested improvements**
- Introduce a `useWatchlists` hook or context that:
  - fetches all watchlists once per page,
  - maintains a client‑side set of `symbol+marketType` entries currently in watchlists,
  - exposes helper methods for checking membership and mutating state after insert/delete.
- Update `WatchlistButton` to consume this shared state instead of querying Supabase on every mount.

#### 3.6 Demo Mode and Error Transparency

- `useMarketDataQuery` exposes `isDemo`, but `MarketsPage` currently only uses `lastUpdated` and `error`.
  - Users cannot tell whether they are seeing **live** vs **fallback/mock** data.

**Suggested improvements**
- Next to `LastUpdated`, render a badge such as:
  - `Live • CoinGecko` / `Live • Binance` (when real data),
  - `Demo data` when `isDemo === true`.
- In case of repeated provider failures, consider logging the source name and surfacing a subtle warning (without blocking the UI).

### 4. Summary

- The Markets section has a solid structure: clear separation of concerns between data fetching (`useMarketDataQuery` / Edge Functions) and presentation (`MarketsPage` / `MarketTable` / `WatchlistButton`).
- The main *engineering* risks are around caching consistency, numeric formatting, and provider‑specific behaviour for crypto.
- The main *UX* risks are around search expectations, silent demo/fallback states, and potential performance overhead from per‑row watchlist queries.

Addressing the items in sections 3.2–3.6 will make the Markets experience more predictable, transparent, and scalable as data volumes and user counts grow.


