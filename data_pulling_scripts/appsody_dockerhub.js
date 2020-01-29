const axios = require('axios');
const tools = require('../data_pulling_utils/tools');

retrieveData();

 async function retrieveData() {


    const AuthStr = `token ${process.env.GITHUB_API_KEY}`
    const URL = 'https://hub.docker.com/v2/repositories/appsody/?page=1&page_size=100';

    axios.get(URL, { headers: { Authorization: AuthStr } })
    .then(response => {

        dockerHubResultsArray = [];
        for (let item of response.data.results) {
            const single = {
                "name": item.name,
                "pull_count": item.pull_count,
                "last_updated": item.last_updated
            }
            dockerHubResultsArray.push(single);
        }

        tools.createLogFile("dockerhub_appsody.json", dockerHubResultsArray, function(err) {
            console.log(err);
         });

    })
    .catch((error) => {
        console.log('error ' + error);
    });
 }

