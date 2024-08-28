import fs from 'fs';
import readline from 'readline';

// Função para calcular a mediana
function calculateMedian(values) {
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);

  if (values.length % 2 === 0) {
    return (values[mid - 1] + values[mid]) / 2;
  } else {
    return values[mid];
  }
}

// Função para contar categorias
function countCategories(values) {
  const counts = {};
  values.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

// Leitura do arquivo CSV
const readStream = fs.createReadStream('data.csv');
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

const ages = [];
const pullRequests = [];
const releases = [];
const timesSinceLastUpdate = [];
const timesSinceLastCommit = [];
const issueRatios = [];
const languages = [];

let currentRepo = {};

rl.on('line', (line) => {
  // Ignorar linhas que não contêm dados relevantes
  if (line.startsWith('Repository') || line.startsWith('------------------------------------------')) {
    if (Object.keys(currentRepo).length > 0) {
      // Adicionar os dados do repositório atual aos arrays
      ages.push(currentRepo.age);
      pullRequests.push(currentRepo.pullRequests);
      releases.push(currentRepo.releases);
      timesSinceLastUpdate.push(currentRepo.timeSinceLastUpdate);
      timesSinceLastCommit.push(currentRepo.timeSinceLastCommit);
      issueRatios.push(currentRepo.issueRatio);
      languages.push(currentRepo.language);
      
      // Resetar o objeto currentRepo
      currentRepo = {};
    }
    return;
  }

  // Remover espaços em branco e dividir a linha nos campos
  const trimmedLine = line.trim();
  const [key, value] = trimmedLine.split(':').map(item => item.trim());

  switch (key) {
    case 'Name':
      // Nome do repositório, ignorar
      break;
    case 'Age':
      currentRepo.age = Number(value.replace(/[^\d]/g, ''));
      break;
    case 'Pull requests':
      currentRepo.pullRequests = Number(value.replace(/[^\d]/g, ''));
      break;
    case 'Releases':
      currentRepo.releases = Number(value.replace(/[^\d]/g, ''));
      break;
    case 'Time since last update':
      currentRepo.timeSinceLastUpdate = Number(value.replace(/[^\d]/g, ''));
      break;
    case 'Time since last commit':
      currentRepo.timeSinceLastCommit = Number(value.replace(/[^\d]/g, ''));
      break;
    case 'Primary language':
      currentRepo.language = value;
      break;
    case 'Issue ratio':
      currentRepo.issueRatio = parseFloat(value);
      break;
    default:
      // Outros campos, ignorar
      break;
  }
});

rl.on('close', () => {
  // Adicionar os dados do último repositório processado
  if (Object.keys(currentRepo).length > 0) {
    ages.push(currentRepo.age);
    pullRequests.push(currentRepo.pullRequests);
    releases.push(currentRepo.releases);
    timesSinceLastUpdate.push(currentRepo.timeSinceLastUpdate);
    timesSinceLastCommit.push(currentRepo.timeSinceLastCommit);
    issueRatios.push(currentRepo.issueRatio);
    languages.push(currentRepo.language);
  }

  console.log('Medianas:');
  console.log('Idade (em dias):', calculateMedian(ages), 'Idade (em anos):', calculateMedian(ages) / 365);
  console.log('Pull Requests:', calculateMedian(pullRequests.filter(n => !isNaN(n))));
  console.log('Releases:', calculateMedian(releases.filter(n => !isNaN(n))));
  console.log('Tempo desde a última atualização:', calculateMedian(timesSinceLastUpdate));
  console.log('Tempo desde o último commit (em dias):', calculateMedian(timesSinceLastCommit));
  console.log('Proporção de issues fechadas:', calculateMedian(issueRatios.filter(n => !isNaN(n))));

  console.log('\nContagem por Linguagem:');
  const languageCounts = countCategories(languages);
  for (const [language, count] of Object.entries(languageCounts)) {
    console.log(`${language}: ${count}`);
  }
});