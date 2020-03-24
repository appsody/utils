const { graphql } = require('@octokit/graphql')
const tools = require('../data_pulling_utils/data_pulling_tools');

const args = process.argv.slice(2)

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
  }
}

const queryTotals = async (repo, org) => {
  const graphqlWithAuth = graphql.defaults({
      headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`
      }
  })
  let data
  try {
      data = await graphqlWithAuth(`
  {
    repository(name: "${repo}", owner: "${org}") {
      forks {
        totalCount
      }
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
    }
  }`)
  } catch (err) {
      if (err.name === 'HttpError') {
          setTimeout(() => {
              queryTotals(repo, org)
          }, 10000)
      } else {
          throw (err)
      }
  } finally {

      const single = {
          "repo": repo,
          "stars": data.repository.stargazers.totalCount,
          "watchers": data.repository.watchers.totalCount,
          "forks": data.repository.forks.totalCount,
      }
      return single;
  }
}

var queries = [
  ['appsody', 'stacks'],
  ['appsody', 'appsody']
];
results = [];

const callQueries = async () => {

  const start = async () => {
      await asyncForEach(queries, async (q) => {
          let res = await (queryTotals(q[1], q[0]));
          results.push(res)
      });

      tools.createLogFile(`stars_watchers_forks.json`, results, function(err) {
          console.log(err);
      });
      
      if(args[0] != undefined) {
        tools.createComparisonFile("stars_watchers_forks", results, "repo", args[0]);
      }
  }
  start();
}

callQueries();