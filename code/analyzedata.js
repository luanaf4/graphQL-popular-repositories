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
// Função para analisar agrupando populares e não populares
function analyzeByPopularityGroup() {
  const popularLanguages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'C#', 'C++', 'PHP', 'C', 'Shell', 'Go', 'Hcl', 'Kotlin', 'Dart', 'SCSS', 'Ruby'];

  const popularPullRequests = [];
  const popularReleases = [];
  const popularTimesSinceLastCommit = [];

  const nonPopularPullRequests = [];
  const nonPopularReleases = [];
  const nonPopularTimesSinceLastCommit = [];
  let countPopular = 0;
  let countNonPopular = 0;

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];
    if (!language) continue;

    const isPopular = popularLanguages.includes(language);
    const pullRequestCount = pullRequests[i];
    const releaseCount = releases[i];
    const timeSinceLastCommit = timesSinceLastCommit[i];

    if (isPopular) {
      popularPullRequests.push(pullRequestCount);
      popularReleases.push(releaseCount);
      popularTimesSinceLastCommit.push(timeSinceLastCommit);
      countPopular++;
    } else {
      nonPopularPullRequests.push(pullRequestCount);
      nonPopularReleases.push(releaseCount);
      nonPopularTimesSinceLastCommit.push(timeSinceLastCommit);
      countNonPopular++;
    }
  }
  console.log('\n----------------------------------------------------');
  console.log('\nAnálise de Repositórios Populares vs Não Populares:');
  console.log(`\nRepositórios Populares:`);
  console.log(`  Mediana de Pull Requests Aceitas: ${calculateMedian(popularPullRequests.filter(n => !isNaN(n)))}`);
  console.log(`  Mediana de Releases: ${calculateMedian(popularReleases.filter(n => !isNaN(n)))}`);
  console.log(`  Mediana do Tempo Desde o Último Commit (dias): ${calculateMedian(popularTimesSinceLastCommit.filter(n => !isNaN(n)))}`);
  console.log(`  Total de Repositórios Populares: ${countPopular}`);

  console.log(`\nRepositórios Não Populares:`);
  console.log(`  Mediana de Pull Requests Aceitas: ${calculateMedian(nonPopularPullRequests.filter(n => !isNaN(n)))}`);
  console.log(`  Mediana de Releases: ${calculateMedian(nonPopularReleases.filter(n => !isNaN(n)))}`);
  console.log(`  Mediana do Tempo Desde o Último Commit (dias): ${calculateMedian(nonPopularTimesSinceLastCommit.filter(n => !isNaN(n)))}`);
  console.log(`  Total de Repositórios Não Populares: ${countNonPopular}`);
}

// Função para analisar por linguagem
function analyzeByLanguage() {
  // Linguagens consideradas populares com base na reportagem
  const popularLanguages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'C#', 'C++', 'PHP', 'C', 'Shell', 'Go', 'Hcl', 'Kotlin', 'Dart', 'SCSS', 'Ruby'];

  // Agrupamento por linguagem
  const dataByLanguage = {};

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];
    if (!language) continue;

    // Inicializa o agrupamento para a linguagem
    if (!dataByLanguage[language]) {
      dataByLanguage[language] = {
        pullRequests: [],
        releases: [],
        timeSinceLastCommit: []
      };
    }

    // Adiciona os dados correspondentes ao agrupamento da linguagem
    dataByLanguage[language].pullRequests.push(pullRequests[i]);
    dataByLanguage[language].releases.push(releases[i]);
    dataByLanguage[language].timeSinceLastCommit.push(timesSinceLastCommit[i]);
  }

  // Ordenação das linguagens: populares primeiro, depois as demais
  const orderedLanguages = Object.keys(dataByLanguage).sort((a, b) => {
    const isAPopular = popularLanguages.includes(a);
    const isBPopular = popularLanguages.includes(b);

    // Ordena primeiro por popularidade
    if (isAPopular && !isBPopular) return -1; // A é popular, B não é
    if (!isAPopular && isBPopular) return 1;  // B é popular, A não é

    // Se ambos são populares ou ambos não são, ordena alfabeticamente
    return a.localeCompare(b);
  });

  // Análise dos resultados ordenados
  console.log('\nAnálise de Sistemas por Linguagem (RQ 07):');
  for (const language of orderedLanguages) {
    const data = dataByLanguage[language];
    const isPopular = popularLanguages.includes(language);
    const medianPullRequests = calculateMedian(data.pullRequests.filter(n => !isNaN(n)));
    const medianReleases = calculateMedian(data.releases.filter(n => !isNaN(n)));
    const medianTimeSinceLastCommit = calculateMedian(data.timeSinceLastCommit.filter(n => !isNaN(n)));

    console.log(`\nLinguagem: ${language} (${isPopular ? 'Popular' : 'Menos Popular'})`);
    console.log(`  Mediana de Pull Requests Aceitas: ${medianPullRequests}`);
    console.log(`  Mediana de Releases: ${medianReleases}`);
    console.log(`  Mediana do Tempo Desde o Último Commit (dias): ${medianTimeSinceLastCommit}`);
  }
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
      currentRepo.language = value.trim().replace(/,+$/, '');
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

  analyzeByLanguage();
  analyzeByPopularityGroup();
});