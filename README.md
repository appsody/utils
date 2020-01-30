# utils
Repository to store various utilities related to Appsody project


### Data Pulling scripts

In order to execute any of these scripts, you'll need to first export your GitHub API Key to an environment variable called `GITHUB_API_KEY`.

  - run_all.sh
  
    Runs all of the `.js` scripts in this folder consecutively, then runs `../data_pulling_utils/json_to_csv.py` which creates a `.csv` file for any comparisons made against the previous month (if the `.json` files from last month are found). 
    In order for the comparison to be made, the data from the previous month would have had to have been collected on the same day (e.g 01/12/19 and 01/01/2020); gathering data after the 28th day of the month wouldn't be recommended.
    
  - appsody_dockerhub.js
  
    Gets the pull count for each of the repositories on [appsody's dockerhub](https://hub.docker.com/u/appsody), and when the repository was last updated.
    
  - appsody_releases.js
  
    Gets the the download count for each of the binaries for every release of appsody from [the GitHub releases](https://github.com/appsody/appsody/releases).
    
  - appsody_stars_watchers_forks.js
  
    Gets the number of stars, watchers, and forks for the [appsody/stacks repository](https://github.com/appsody/stacks) and the [appsody/appsody repository](https://github.com/appsody/appsody).


All of the results are stored in an `appsody_reports/DATE/` folder.
