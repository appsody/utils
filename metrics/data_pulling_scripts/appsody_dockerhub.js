const axios = require('axios');
const tools = require('../data_pulling_utils/data_pulling_tools');

const args = process.argv.slice(2)

retrieveData();

 async function retrieveData() {


    const AuthStr = `token ${process.env.GITHUB_API_KEY}`
    const URL = 'https://hub.docker.com/v2/repositories/appsody/?page=1&page_size=100';

    axios.get(URL, { headers: { Authorization: AuthStr } })
    .then(response => {

        dockerHubResultsArray = [];
        for (let item of response.data.results) {

            const date = new Date(item.last_updated)
            var readableTimestamp = tools.addZeroPrefix(date.getDate()) + "-" + tools.addZeroPrefix((date.getMonth() +1)) + "-" + tools.addZeroPrefix(date.getFullYear());

            const single = {
                "name": item.name,
                "pull_count": item.pull_count,
                "last_updated": readableTimestamp
            }
            dockerHubResultsArray.push(single);
        }

        tools.createLogFile("dockerhub_appsody.json", dockerHubResultsArray, function(err) {
            console.log(err);
         });

         if(args[0] != undefined) {
             tools.createComparisonFile("dockerhub_appsody", dockerHubResultsArray, "name", args[0]);
         }

    })
    .catch((error) => {
        console.log('error ' + error);
    });
 }