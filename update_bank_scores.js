const fs = require('fs');

const neobanks = [
  'revolut', 'n26', 'monzo', 'starling-bank', 'bunq', 'wise', 'hype', 
  'fineco', 'boursorama', 'lydia', 'nickel', 'openbank', 'imagin', 
  'lunar', 'nest-bank', 'chime', 'varo-bank', 'sofi', 'eq-bank', 
  'neo-financial', 'jibun-bank', 'kakao-bank', 'anext-bank', 'neobt', 
  'agibank', 'fondeadora', 'tymebank', 'atom-bank'
];

const randomScore = () => Math.floor(Math.random() * (73 - 28 + 1)) + 28;

const content = fs.readFileSync('src/lib/organizations.ts', 'utf8');

let result = content;
let modified = 0;

// Find all bank entries
const bankRegex = /({[^}]*id: '([^']+)'[^}]*type: 'bank'[^}]*communityTrust: )(\d+)(, expertTrust: )(\d+)([^}]*})/g;

result = result.replace(bankRegex, (match, before, id, ctPrefix, ct, etPrefix, et, after) => {
  if (neobanks.includes(id)) {
    return match; // Keep neobanks unchanged
  }
  modified++;
  const newCt = randomScore();
  const newEt = randomScore();
  return before + newCt + etPrefix + newEt + after;
});

fs.writeFileSync('src/lib/organizations.ts', result);
console.log(`Updated ${modified} banks with random scores between 28-73`);

