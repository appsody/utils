const fs = require('fs');

const path = "../appsody_reports/"

module.exports = {
    createLogFile: function(extension, array, cb) {

        ensurePathExists(path, 0744, function(err) {
            if (err) {
                cb(err)
            }
            else {
                d = new Date().toISOString().slice(0,10);
                var filename = `${path}${d}_${extension}`

                writeFile(filename, array, function(err) {
                    if (err) {
                        cb(err)
                    } 
                });
            }
        });
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