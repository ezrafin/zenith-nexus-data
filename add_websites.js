const fs = require('fs');

// Read the organizations file
const content = fs.readFileSync('src/lib/organizations.ts', 'utf8');

// Known website mappings for companies that need special URLs
const knownWebsites = {
  'interactive-brokers': 'https://www.interactivebrokers.com',
  'charles-schwab': 'https://www.schwab.com',
  'fidelity': 'https://www.fidelity.com',
  'robinhood': 'https://robinhood.com',
  'etrade': 'https://us.etrade.com',
  'webull': 'https://www.webull.com',
  'tastytrade': 'https://www.tastytrade.com',
  'ally-invest': 'https://www.ally.com/invest',
  'merrill-edge': 'https://www.merrilledge.com',
  'sofi-invest': 'https://www.sofi.com/invest',
  'public': 'https://public.com',
  'tradestation': 'https://www.tradestation.com',
  'firstrade': 'https://www.firstrade.com',
  'td-direct-investing': 'https://www.td.com/ca/en/investing/direct-investing',
  'questrade': 'https://www.questrade.com',
  'rbc': 'https://www.rbc.com',
  'td-bank': 'https://www.td.com',
  'bmo': 'https://www.bmo.com',
  'scotiabank': 'https://www.scotiabank.com',
  'cibc': 'https://www.cibc.com',
  'national-bank-canada': 'https://www.nbc.ca',
  'manulife': 'https://www.manulife.com',
  'brookfield': 'https://www.brookfield.com',
  'power-corporation': 'https://www.powercorporation.com',
  'bridgewater': 'https://www.bridgewater.com',
  'renaissance': 'https://www.rentec.com',
  'citadel': 'https://www.citadel.com',
  'blackstone': 'https://www.blackstone.com',
  'kkr': 'https://www.kkr.com',
  'apollo': 'https://www.apollo.com',
  'carlyle': 'https://www.carlyle.com',
  'tpg': 'https://www.tpg.com',
  'warburg-pincus': 'https://www.warburgpincus.com',
  'general-atlantic': 'https://www.generalatlantic.com',
  'sequoia-capital': 'https://www.sequoiacap.com',
  'andreessen-horowitz': 'https://a16z.com',
  'accel': 'https://www.accel.com',
  'insight-partners': 'https://www.insightpartners.com',
  'tiger-global': 'https://www.tigerglobal.com',
  'softbank': 'https://group.softbank',
  'goldman-sachs': 'https://www.goldmansachs.com',
  'morgan-stanley': 'https://www.morganstanley.com',
  'jpmorgan-chase': 'https://www.jpmorgan.com',
  'bank-of-america': 'https://www.bankofamerica.com',
  'wells-fargo': 'https://www.wellsfargo.com',
  'citi': 'https://www.citi.com',
  'us-bancorp': 'https://www.usbank.com',
  'pnc': 'https://www.pnc.com',
  'capital-one': 'https://www.capitalone.com',
  'truist': 'https://www.truist.com',
  'citizens': 'https://www.citizensbank.com',
  'fifth-third': 'https://www.53.com',
  'keybank': 'https://www.key.com',
  'huntington': 'https://www.huntington.com',
  'regions': 'https://www.regions.com',
  'm&t-bank': 'https://www.mtb.com',
  'first-citizens': 'https://www.firstcitizens.com',
  'comerica': 'https://www.comerica.com',
  'zions': 'https://www.zionsbancorporation.com',
  'east-west-bank': 'https://www.eastwestbank.com',
  'cathay-bank': 'https://www.cathaybank.com',
  'svb': 'https://www.svb.com',
  'first-republic': 'https://www.firstrepublic.com',
  'silicon-valley-bank': 'https://www.svb.com',
  'barclays': 'https://www.barclays.com',
  'hsbc': 'https://www.hsbc.com',
  'lloyds': 'https://www.lloydsbankinggroup.com',
  'natwest': 'https://www.natwestgroup.com',
  'standard-chartered': 'https://www.sc.com',
  'rbs': 'https://www.rbs.com',
  'santander': 'https://www.santander.com',
  'bbva': 'https://www.bbva.com',
  'caixa-bank': 'https://www.caixabank.com',
  'sabadell': 'https://www.bancsabadell.com',
  'unicredit': 'https://www.unicredit.eu',
  'intesa-sanpaolo': 'https://www.intesasanpaolo.com',
  'banca-monte-dei-paschi': 'https://www.mps.it',
  'mediolanum': 'https://www.mediolanum.com',
  'bper-banca': 'https://www.bper.it',
  'banco-bpm': 'https://www.bancobpm.it',
  'creval': 'https://www.creval.it',
  'banca-carige': 'https://www.carige.it',
  'banca-popolare-di-sondrio': 'https://www.popso.it',
  'banca-popolare-di-vicenza': 'https://www.bancapopvicenza.it',
  'banca-popolare-di-bergamo': 'https://www.bancapopbergamo.it',
  'banca-popolare-dell-emilia-romagna': 'https://www.bper.it',
  'banca-popolare-di-milano': 'https://www.bpm.it',
  'banca-popolare-di-verona': 'https://www.bancapopverona.it',
  'banca-popolare-di-novara': 'https://www.bancapopnovara.it',
  'banca-popolare-di-sondrio': 'https://www.popso.it',
  'banca-popolare-di-vicenza': 'https://www.bancapopvicenza.it',
  'banca-popolare-di-bergamo': 'https://www.bancapopbergamo.it',
  'banca-popolare-dell-emilia-romagna': 'https://www.bper.it',
  'banca-popolare-di-milano': 'https://www.bpm.it',
  'banca-popolare-di-verona': 'https://www.bancapopverona.it',
  'banca-popolare-di-novara': 'https://www.bancapopnovara.it',
  'deutsche-bank': 'https://www.db.com',
  'commerzbank': 'https://www.commerzbank.de',
  'danske-bank': 'https://www.danskebank.com',
  'nordea': 'https://www.nordea.com',
  'seb': 'https://www.seb.se',
  'swedbank': 'https://www.swedbank.com',
  'handelsbanken': 'https://www.handelsbanken.se',
  'danske-bank': 'https://www.danskebank.com',
  'nordea': 'https://www.nordea.com',
  'dnb': 'https://www.dnb.no',
  'sparebank-1': 'https://www.sparebank1.no',
  'sparebanken-vest': 'https://www.spv.no',
  'sparebanken-sor': 'https://www.sparebank1.no',
  'sparebanken-more': 'https://www.sparebank1.no',
  'sparebanken-ost': 'https://www.sparebank1.no',
  'sparebanken-nord': 'https://www.sparebank1.no',
  'sparebanken-sor': 'https://www.sparebank1.no',
  'sparebanken-more': 'https://www.sparebank1.no',
  'sparebanken-ost': 'https://www.sparebank1.no',
  'sparebanken-nord': 'https://www.sparebank1.no',
  'mizuho': 'https://www.mizuhogroup.com',
  'sumitomo-mitsui': 'https://www.smbc-group.com',
  'mufg': 'https://www.mufg.jp',
  'nomura': 'https://www.nomura.com',
  'daiwa-securities': 'https://www.daiwa.jp',
  'rakuten-securities': 'https://www.rakuten-sec.co.jp',
  'sbi-securities': 'https://www.sbisec.co.jp',
  'monex-group': 'https://www.monexgroup.com',
  'zerodha': 'https://zerodha.com',
  'kotak-securities': 'https://www.kotaksecurities.com',
  'phillip-capital': 'https://www.phillipcapital.com',
  'coinbase-exchange': 'https://www.coinbase.com',
  'bybit': 'https://www.bybit.com',
  'okx': 'https://www.okx.com',
};

// Function to generate website URL from company name
function generateWebsite(id, name) {
  // Check if we have a known website
  if (knownWebsites[id]) {
    return knownWebsites[id];
  }

  // Generate URL based on company name
  let domain = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '') // Remove spaces
    .replace(/&/g, 'and') // Replace & with and
    .replace(/\./g, '') // Remove dots
    .replace(/'/g, '') // Remove apostrophes
    .replace(/-/g, ''); // Remove hyphens

  // Special cases
  if (domain.includes('first') && domain.includes('republic')) {
    return 'https://www.firstrepublic.com';
  }
  if (domain.includes('silicon') && domain.includes('valley')) {
    return 'https://www.svb.com';
  }
  if (domain.includes('goldman') && domain.includes('sachs')) {
    return 'https://www.goldmansachs.com';
  }
  if (domain.includes('morgan') && domain.includes('stanley')) {
    return 'https://www.morganstanley.com';
  }
  if (domain.includes('jpmorgan') || domain.includes('jp') && domain.includes('morgan')) {
    return 'https://www.jpmorgan.com';
  }
  if (domain.includes('bank') && domain.includes('america')) {
    return 'https://www.bankofamerica.com';
  }
  if (domain.includes('wells') && domain.includes('fargo')) {
    return 'https://www.wellsfargo.com';
  }

  return `https://www.${domain}.com`;
}

// Parse organizations and add websites
const orgRegex = /\{ id: '([^']+)', name: '([^']+)'([^}]*)\}/g;
let match;
let updatedContent = content;
const replacements = [];

while ((match = orgRegex.exec(content)) !== null) {
  const fullMatch = match[0];
  const id = match[1];
  const name = match[2];
  const rest = match[3];

  // Skip if already has website
  if (fullMatch.includes('website:')) {
    continue;
  }

  // Generate website
  const website = generateWebsite(id, name);

  // Find the position to insert website
  // Insert before the closing brace, after the last field
  let insertPosition = fullMatch.lastIndexOf('}');
  if (insertPosition === -1) {
    insertPosition = fullMatch.length;
  }

  // Find the last comma before the closing brace
  const beforeBrace = fullMatch.substring(0, insertPosition);
  const lastCommaIndex = beforeBrace.lastIndexOf(',');

  // Insert website after the last comma
  const newOrg = beforeBrace.substring(0, lastCommaIndex + 1) + 
    ` website: '${website}'` + 
    beforeBrace.substring(lastCommaIndex + 1) + 
    fullMatch.substring(insertPosition);

  replacements.push({
    old: fullMatch,
    new: newOrg,
  });
}

// Apply replacements in reverse order to maintain positions
for (let i = replacements.length - 1; i >= 0; i--) {
  updatedContent = updatedContent.replace(replacements[i].old, replacements[i].new);
}

// Write updated content
fs.writeFileSync('src/lib/organizations.ts', updatedContent);
console.log(`Added websites for ${replacements.length} companies`);

