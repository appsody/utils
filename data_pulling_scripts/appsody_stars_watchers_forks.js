const { graphql } = require('@octokit/graphql')
const tools = require('./tools');

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
      setTimeout(() => { queryTotals(repo, org) }, 10000)
    } else { throw (err) }
  } finally {

    const single = {
      "repo": repo,
      "stars": data.repository.stargazers.totalCount,
      "watchers": data.repository.watchers.totalCount,
      "forks": data.repository.forks.totalCount,
    }

    tools.createLogFile(`stars_watchers_forks_${repo}.json`, [single], function(err) {
      console.log(err);
   });
  }
}

// TODO: Improve to make all append to the same logfile
queryTotals('appsody','appsody');
queryTotals('stacks','appsody')