const axios = require('axios');
const tools = require('../data_pulling_utils/tools');

const args = process.argv.slice(2)

retrieveData();

 async function retrieveData() {


    const AuthStr = `token ${process.env.GITHUB_API_KEY}`
    const URL = 'https://api.github.com/repos/appsody/appsody/releases';

    axios.get(URL, { headers: { Authorization: AuthStr } })
    .then(response => {
        releaseResultsArray = [];
        for (let item of response.data) {

            let name = item.tag_name
    
            for (let asset of item.assets) {
                const single = {
                "release": name,
                "cli_binary": asset.name,
                "download_count": asset.download_count
                }
    
                releaseResultsArray.push(single);
            }
        }

        tools.createLogFile("releases_appsody.json", releaseResultsArray, function(err) {
            console.log(err);
         });

         if(args[0] != undefined) {
             tools.createComparisonFile("releases_appsody", releaseResultsArray, "cli_binary", args[0]);
         }

    })
    .catch((error) => {
        console.log('error ' + error);
    });
 }