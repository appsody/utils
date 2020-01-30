const fs = require('fs');
const moment = require('moment');

const folderPath = "../appsody_reports/"

module.exports = {
    createLogFile: function(extension, array, cb) {

        ensurePathExists(folderPath, 0744, function(err) {
            if (err) {
                cb(err)
            }
        });

        d = new Date().toISOString().slice(0, 10);

        var filePath = `${folderPath}${d}/`
        ensurePathExists(filePath, 0744, function(err) {
            if (err) {
                cb(err)
            } else {
                var filename = `${filePath}${extension}`

                writeFile(filename, array, function(err) {
                    if (err) {
                        cb(err)
                    }
                });
            }
        })
    },
    addZeroPrefix: function(num) {
        if (num.toString().length < 2) {
            return `0${num}`;
        } else {
            return num;
        }
    },
    createComparisonFile: function(filename, newRes, id) {
        var lastMonth = moment().subtract(1, 'months').toDate();
        readableLastMonth = `${this.addZeroPrefix(lastMonth.getFullYear())}-${this.addZeroPrefix((lastMonth.getMonth() + 1))}-${this.addZeroPrefix(lastMonth.getDate())}`;
        
        oldResPath = `../appsody_reports/${readableLastMonth}/${filename}.json`;
        fs.access(oldResPath, fs.F_OK, (err) => {
            if (err) {
                console.error("No file for last month found.")
                return
            }
            
            let rawdata = fs.readFileSync(oldResPath);
            let oldRes = JSON.parse(rawdata); 

            var comparison = compareToLast(oldRes, newRes, id);
            this.createLogFile(`${filename}_comparison.json`, comparison, function(err) {
                console.log(err);
            });
        })
    }
};

function ensurePathExists(path, mask, cb) {
    if (typeof mask == 'function') {
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
                cb(null);
            } else {
                cb(err);
            }
        } else {
            cb(null);
        }
    });
}

function writeFile(filename, array, cb) {
    fs.writeFile(filename, JSON.stringify(array, null, 4), 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            cb(err);
        } else {
            cb(null);
        }
    });
}

function compareToLast(oldRes, newRes, id) {
    comparisons = [];

    for (let i = 0; i < newRes.length; i++) {
        let single = {};
        switch (id) {
            case "repo":

                var noMatch = true;
                for (let j = 0; j < oldRes.length; j++) {
                    if (newRes[i].repo === oldRes[j].repo) {
                        noMatch = false;

                        single = {
                            "repo": newRes[i].repo,
                            "stars": newRes[i].stars - oldRes[j].stars,
                            "watchers": newRes[i].watchers - oldRes[j].watchers,
                            "forks": newRes[i].forks - oldRes[j].forks
                        }
                    }
                }
                if (noMatch) {
                    single = newRes[i];
                }
                comparisons.push(single);
                break;
            case "name":
                var noMatch = true;
                for (let j = 0; j < oldRes.length; j++) {
                    if (newRes[i].name === oldRes[j].name) {
                        noMatch = false;

                        single = {
                            "name": newRes[i].name,
                            "pull_count": newRes[i].pull_count - oldRes[j].pull_count,
                            "last_updated": newRes[i].last_updated
                        }
                    }
                }
                if (noMatch) {

                    single = {
                        "name": newRes[i].name,
                        "pull_count": newRes[i].pull_count,
                        "last_updated": newRes[i].last_updated
                    }
                }

                comparisons.push(single);
                break;

            case "cli_binary":
            var noMatch = true;
            for (let j = 0; j < oldRes.length; j++) {
                if (newRes[i].cli_binary === oldRes[j].cli_binary && newRes[i].release === oldRes[j].release) {
                    noMatch = false;

                    single = {
                        "release": newRes[i].release,
                        "cli_binary": newRes[i].cli_binary,
                        "download_count": newRes[i].download_count - oldRes[j].download_count
                    }
                }
            }
            if (noMatch) {
                single = {
                    "release": newRes[i].release,
                    "cli_binary": newRes[i].cli_binary,
                    "download_count": newRes[i].download_count
                }
            }

            comparisons.push(single);
            break;
        }
    }
    return comparisons;
} 