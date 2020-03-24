# utils

## metrics
Repository to store various utilities related to Appsody project


### Data Pulling scripts

In order to execute any of these scripts, you'll need to first export your GitHub API Key to an environment variable called `GITHUB_API_KEY`.

  - run_all.sh
  
    Usage:
      - Can be passed a date in the form of `YYY-MM-DD`. This date would have to correspond to a folder in `metrics/appsody_reports/` which contains data from a previous run, to provide the total amount gained/lost since that date. 
      
      - For example: `sh run_all.sh 2020-02-10` would give the results of the current most up-to-date information, as well as a data compared to the results on the 10th of February 2020.
  
    Runs all of the `.js` scripts in this folder consecutively, then runs `../data_pulling_utils/json_report_to_csv.py` which creates a `.csv` file for any comparisons again'st the given date (if the `.json` files from that date are found).
    
  - appsody_dockerhub.js
  
    Gets the pull count for each of the repositories on [appsody's dockerhub](https://hub.docker.com/u/appsody), and when the repository was last updated.
    
  - appsody_releases.js
  
    Gets the the download count for each of the binaries for every release of appsody from [the GitHub releases](https://github.com/appsody/appsody/releases).
    
  - appsody_stars_watchers_forks.js
  
    Gets the number of stars, watchers, and forks for the [appsody/stacks repository](https://github.com/appsody/stacks) and the [appsody/appsody repository](https://github.com/appsody/appsody).


All of the results are stored in an `appsody_reports/DATE/` folder.
