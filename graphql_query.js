const fetch = require('node-fetch');

const token = 'TOKEN'; // Replace with your own token

const query = `
query {
    search(query: "stars:>1", type: REPOSITORY, first: 50) {
      edges {
        node {
          ... on Repository {
            name
            createdAt
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
          }
        }
      }
    }
  }
`;

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(result => {
    const repos = result.data.search.edges.map(edge => edge.node);
    repos.forEach(repo => {
        // console.log("Data:");
        // console.log(JSON.stringify(repo, null, 2));

        const now = new Date();
        const createdAt = new Date(repo.createdAt);
        const updatedAt = new Date(repo.updatedAt);
        const age = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
        const timeSinceLastUpdate = Math.floor((now - updatedAt) / (1000 * 60 * 60 * 24));
        const issueRatio = repo.closedIssues.totalCount / repo.totalIssues.totalCount;

        console.log(`Repository: ${repo.name}`);
        console.log(`Age: ${age} days`);
        console.log(`Pull requests: ${repo.pullRequests.totalCount}`);
        console.log(`Releases: ${repo.releases.totalCount}`);
        console.log(`Time since last update: ${timeSinceLastUpdate} days`);
        console.log(`Primary language: ${repo.primaryLanguage ? repo.primaryLanguage.name : 'None'}`);
        console.log(`Issue ratio: ${issueRatio}`);
        console.log(`Updated At: ${repo.updatedAt}`);
        console.log('------------------------------');
    });
})
.catch(error => console.error('Error:', error));