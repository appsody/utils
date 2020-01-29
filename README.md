# utils
Repository to store various utilities related to Appsody project


### Data Pulling scripts

In order to execute any of these scripts, you'll need to first export your GitHub API Key to an environment variable called `GITHUB_API_KEY`.

  - run_all.sh
  
    Runs all of the `.js` scripts in this folder consecutively, then runs `../data_pulling_utils/json_to_csv.py` which creates a `.csv` file for each of the `.json` results
    
  - appsody_dockerhub.js
  
    Gets the pull count for each of the repositories on [appsody's dockerhub](https://hub.docker.com/u/appsody), and when the repository was last updated.
    
  - appsody_releases.js
  
    Gets the the download count for each of the binaries for every release of appsody from [the GitHub releases](https://github.com/appsody/appsody/releases).
    
  - appsody_stars_watchers_forks.js
  
    Gets the number of stars, watchers, and forks for the [appsody/stacks repository](https://github.com/appsody/stacks) and the [appsody/appsody repository](https://github.com/appsody/appsody).


All of the results are stored in an `appsody_reports/DATE/` folder.

