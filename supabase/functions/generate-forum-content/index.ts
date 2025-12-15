import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const forumTopics = [
  // Beginners
  { category: "beginners", title: "What broker should I choose as a complete beginner?", tags: ["broker", "beginner"] },
  { category: "beginners", title: "How much money do I need to start investing?", tags: ["beginner", "budget"] },
  { category: "beginners", title: "Dollar-cost averaging vs lump sum investing", tags: ["strategy", "beginner"] },
  { category: "beginners", title: "Understanding expense ratios in ETFs", tags: ["ETF", "costs"] },
  { category: "beginners", title: "How to read a company's balance sheet", tags: ["analysis", "fundamentals"] },
  { category: "beginners", title: "Tax-advantaged accounts explained (401k, IRA, Roth)", tags: ["taxes", "retirement"] },
  { category: "beginners", title: "What's the difference between stocks and bonds?", tags: ["basics", "bonds"] },
  { category: "beginners", title: "How to set up automatic investments", tags: ["automation", "strategy"] },
  { category: "beginners", title: "Emergency fund vs investing - what comes first?", tags: ["budgeting", "priorities"] },
  { category: "beginners", title: "Understanding market orders vs limit orders", tags: ["trading", "orders"] },
  
  // Stocks
  { category: "stocks", title: "Tesla's valuation - overpriced or justified?", tags: ["TSLA", "valuation"] },
  { category: "stocks", title: "Best dividend aristocrats for 2024", tags: ["dividends", "income"] },
  { category: "stocks", title: "AI stocks beyond NVIDIA - hidden gems?", tags: ["AI", "tech"] },
  { category: "stocks", title: "Is Apple still a buy at these levels?", tags: ["AAPL", "analysis"] },
  { category: "stocks", title: "Healthcare sector opportunities post-COVID", tags: ["healthcare", "sector"] },
  { category: "stocks", title: "Small-cap vs large-cap in a recession", tags: ["strategy", "recession"] },
  { category: "stocks", title: "Bank stocks after the regional banking crisis", tags: ["financials", "banks"] },
  { category: "stocks", title: "How to evaluate management quality", tags: ["analysis", "fundamentals"] },
  { category: "stocks", title: "High-growth stocks with reasonable P/E ratios", tags: ["growth", "valuation"] },
  { category: "stocks", title: "Defense stocks outlook with global tensions", tags: ["defense", "geopolitics"] },
  
  // Crypto
  { category: "crypto", title: "Bitcoin ETFs - game changer or overhyped?", tags: ["BTC", "ETF"] },
  { category: "crypto", title: "Ethereum staking rewards - worth it?", tags: ["ETH", "staking"] },
  { category: "crypto", title: "Best cold wallets for security", tags: ["security", "hardware"] },
  { category: "crypto", title: "DeFi yield farming strategies for 2024", tags: ["DeFi", "yield"] },
  { category: "crypto", title: "Layer 2 solutions comparison", tags: ["L2", "scaling"] },
  { category: "crypto", title: "Tax implications of crypto trading", tags: ["taxes", "trading"] },
  { category: "crypto", title: "Stablecoins comparison - USDC vs USDT", tags: ["stablecoins", "comparison"] },
  { category: "crypto", title: "NFT market - dead or just sleeping?", tags: ["NFT", "analysis"] },
  { category: "crypto", title: "Solana vs Ethereum for developers", tags: ["SOL", "ETH"] },
  { category: "crypto", title: "Crypto portfolio allocation strategies", tags: ["portfolio", "strategy"] },
  
  // ETFs
  { category: "etfs", title: "VOO vs VTI vs SPY - comprehensive comparison", tags: ["S&P500", "comparison"] },
  { category: "etfs", title: "Best international ETFs for diversification", tags: ["international", "diversification"] },
  { category: "etfs", title: "Sector ETFs for the next decade", tags: ["sectors", "long-term"] },
  { category: "etfs", title: "Bond ETFs in a rising rate environment", tags: ["bonds", "interest-rates"] },
  { category: "etfs", title: "Dividend ETFs vs individual dividend stocks", tags: ["dividends", "income"] },
  { category: "etfs", title: "ARKK and actively managed ETFs performance", tags: ["active", "ARKK"] },
  { category: "etfs", title: "Thematic ETFs - clean energy, robotics, etc.", tags: ["thematic", "trends"] },
  { category: "etfs", title: "Emerging markets ETFs worth considering", tags: ["EM", "international"] },
  { category: "etfs", title: "Gold and commodity ETFs for hedging", tags: ["gold", "commodities"] },
  { category: "etfs", title: "REITs vs Real Estate ETFs", tags: ["REITs", "real-estate"] },
  
  // General
  { category: "general", title: "How do you handle market volatility emotionally?", tags: ["psychology", "volatility"] },
  { category: "general", title: "Best investing books recommendations", tags: ["books", "education"] },
  { category: "general", title: "Portfolio rebalancing - how often?", tags: ["portfolio", "rebalancing"] },
  { category: "general", title: "FIRE movement strategies and realistic timelines", tags: ["FIRE", "retirement"] },
  { category: "general", title: "Impact of AI on future job market and investing", tags: ["AI", "future"] },
  { category: "general", title: "Recession indicators to watch in 2024", tags: ["recession", "indicators"] },
  { category: "general", title: "Dollar strength impact on international investments", tags: ["currency", "international"] },
  { category: "general", title: "Best financial podcasts and YouTube channels", tags: ["resources", "education"] },
  { category: "general", title: "When to sell - taking profits vs letting winners run", tags: ["strategy", "selling"] },
  { category: "general", title: "Inheritance investing strategies", tags: ["inheritance", "strategy"] },
  
  // News
  { category: "news", title: "Fed rate decision analysis - what it means for markets", tags: ["Fed", "interest-rates"] },
  { category: "news", title: "Earnings season highlights and surprises", tags: ["earnings", "analysis"] },
  { category: "news", title: "Geopolitical risks and market impact", tags: ["geopolitics", "risk"] },
  { category: "news", title: "New regulations affecting retail investors", tags: ["regulations", "policy"] },
  { category: "news", title: "Major IPOs coming up - worth watching?", tags: ["IPO", "upcoming"] },
];

const authorNames = [
  "InvestorPro_Mike", "FinanceGuru_Sarah", "WallStreetWolf", "DividendHunter",
  "CryptoEnthusiast", "ValueInvestor_Tom", "GrowthSeeker_Amy", "RetiredTrader",
  "MarketAnalyst_Jane", "TechStockFan", "IndexFundAdvocate", "OptionsTrader_Rob",
  "PassiveIncome_Sam", "RiskManager_Lisa", "QuanTrader_Alex", "BondBuff_Chris",
  "EmergingMarkets_Joe", "SmallCapScout", "MacroView_Dan", "SectorRotator",
  "MomentumPlayer", "ContrarianCarl", "ESGInvestor_Emma", "SwingTrader_Nick",
  "LongTermLarry", "PortfolioMaster", "YieldChaser_Kate", "BreakoutBetty"
];

async function generateDiscussion(topic: typeof forumTopics[0]) {
  const prompt = `You are creating a realistic forum discussion for an investing community. 
Topic: "${topic.title}"
Category: ${topic.category}
Tags: ${topic.tags.join(", ")}

Write a detailed opening post (200-400 words) that:
1. Introduces the topic with personal context or a specific question
2. Shows genuine curiosity and some research
3. Asks 2-3 specific questions for the community
4. Uses a casual but knowledgeable tone

Respond ONLY with the post content, no titles or formatting.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error("AI error generating discussion:", await response.text());
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function generateReplies(title: string, content: string, count: number) {
  const prompt = `You are generating ${count} realistic forum replies to an investing discussion.

Original post title: "${title}"
Original post: "${content.substring(0, 500)}..."

Generate ${count} different replies from various community members. Each reply should:
1. Actually address the specific question or topic raised
2. Share personal experience, specific advice, or helpful resources
3. Include specific numbers, tickers, percentages, or book/resource names when relevant
4. Vary in length (some short 2-3 sentences, some longer with detailed analysis)
5. Show different perspectives (bullish/bearish, experienced/newer, conservative/aggressive)
6. Some should agree, some should offer counterpoints
7. Include concrete examples like "I invested $5000 in VOO in 2020 and it's up 45%" or "Check out Ben Graham's Intelligent Investor, chapter 8 specifically"

Format: Return as JSON array of strings, each string being one reply.
Example: ["First reply content here...", "Second reply content...", "Third reply..."]`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error("AI error generating replies:", await response.text());
    return [];
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "[]";
  
  try {
    // Try to parse JSON directly
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (e) {
    console.error("Failed to parse replies:", e);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { count = 10, withReplies = true, repliesPerTopic = 5 } = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results = [];
    const topicsToGenerate = forumTopics.slice(0, Math.min(count, forumTopics.length));
    
    for (let i = 0; i < topicsToGenerate.length; i++) {
      const topic = topicsToGenerate[i];
      console.log(`Generating discussion ${i + 1}/${topicsToGenerate.length}: ${topic.title}`);
      
      const content = await generateDiscussion(topic);
      if (!content) continue;

      const authorName = authorNames[Math.floor(Math.random() * authorNames.length)];
      const daysAgo = Math.floor(Math.random() * 90) + 1;
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
      
      // Insert discussion
      const { data: discussion, error: discussionError } = await supabase
        .from("forum_discussions")
        .insert({
          title: topic.title,
          content: content,
          category: topic.category,
          tags: topic.tags,
          author_name: authorName,
          created_at: createdAt,
          updated_at: createdAt,
          view_count: Math.floor(Math.random() * 500) + 50,
        })
        .select()
        .single();

      if (discussionError) {
        console.error("Error inserting discussion:", discussionError);
        continue;
      }

      let repliesGenerated = 0;
      
      if (withReplies) {
        const replies = await generateReplies(topic.title, content, repliesPerTopic);
        
        for (const replyContent of replies) {
          if (!replyContent || typeof replyContent !== 'string') continue;
          
          const replyAuthor = authorNames[Math.floor(Math.random() * authorNames.length)];
          const replyDaysAgo = Math.floor(Math.random() * daysAgo);
          const replyCreatedAt = new Date(Date.now() - replyDaysAgo * 24 * 60 * 60 * 1000).toISOString();
          
          const { error: replyError } = await supabase
            .from("forum_replies")
            .insert({
              discussion_id: discussion.id,
              content: replyContent,
              author_name: replyAuthor,
              created_at: replyCreatedAt,
            });

          if (!replyError) {
            repliesGenerated++;
          }
        }

        // Update reply count
        await supabase
          .from("forum_discussions")
          .update({ 
            reply_count: repliesGenerated,
            updated_at: new Date().toISOString()
          })
          .eq("id", discussion.id);
      }

      results.push({
        title: topic.title,
        category: topic.category,
        repliesGenerated,
      });

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        generated: results.length,
        results 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in generate-forum-content:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
