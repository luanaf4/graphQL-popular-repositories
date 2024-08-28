import fetch from 'node-fetch';
import fs from 'fs';

const token = 'TOKEN'; // Insira seu proprio token
const MAX_REPOSITORIES = 1000; // Limite de repositórios a serem processados

// Crie um stream de gravação
const writeStream = fs.createWriteStream('data.csv');

let repoIndex = 1; // Iniciar a numeração dos repositórios

const fetchData = async (cursor = null, count = 0) => {
  if (count >= MAX_REPOSITORIES) {
    console.log('Limite de repositórios alcançado.');
    return;
  }

  const query = `
    query {
      search(query: "stars:>1", type: REPOSITORY, first: 2${cursor ? `, after: "${cursor}"` : ''}) {
        edges {
          node {
            ... on Repository {
              name
              createdAt
              url
              pullRequests(states: MERGED) {
                totalCount
              }
              releases {
                totalCount
              }
              updatedAt
              primaryLanguage {
                name
              }
              closedIssues: issues(states: CLOSED) {
                totalCount
              }
              totalIssues: issues {
                totalCount
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    committedDate
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Erros no GraphQL:', result.errors);
      return;
    }

    const repos = result.data.search.edges.map(edge => edge.node);
    const { hasNextPage, endCursor } = result.data.search.pageInfo;

    repos.forEach(repo => {
      const now = new Date();
      const createdAt = new Date(repo.createdAt);
      const updatedAt = new Date(repo.updatedAt);
      const lastCommitDate = new Date(repo.defaultBranchRef.target.committedDate);

      // Calcular a idade do repositório
      const age = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

      // Calcular o tempo desde a última atualização
      const timeSinceLastUpdate = Math.floor((now - updatedAt) / (1000 * 60 * 60 * 24));

      // Calcular o tempo desde o último commit
      const timeSinceLastCommit = Math.floor((now - lastCommitDate) / (1000 * 60 * 60 * 24));

      // Calcular a proporção de issues fechadas
      const issueRatio = repo.totalIssues.totalCount > 0 ?
        repo.closedIssues.totalCount / repo.totalIssues.totalCount :
        0;

      // Escreva os dados no arquivo .csv
      writeStream.write(`Repository ${repoIndex}:\n Name: ${repo.name},\n Age: ${age} days,\n Pull requests: ${repo.pullRequests.totalCount},\n Releases: ${repo.releases.totalCount},\n Time since last update: ${timeSinceLastUpdate} days,\n Time since last commit: ${timeSinceLastCommit} days,\n Primary language: ${repo.primaryLanguage ? repo.primaryLanguage.name : 'None'},\n Issue ratio: ${issueRatio},\n Updated At: ${updatedAt},\n Last Commit Date: ${lastCommitDate}\n ------------------------------------------\n`);

      // Incrementar o contador de repositórios processados
      count++;
      repoIndex++; // Incrementar a numeração dos repositórios
    });

    // Se houver mais páginas e ainda não atingiu o limite de repositórios, faça uma nova requisição
    if (hasNextPage && count < MAX_REPOSITORIES) {
      await fetchData(endCursor, count);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
};

fetchData().then(() => {
  // Feche o stream de gravação quando terminar
  writeStream.end();
});