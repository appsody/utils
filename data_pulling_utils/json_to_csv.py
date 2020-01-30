from os import walk, path, remove

from datetime import date    

import csv, json, sys, logging


if sys.argv[1] is not None:
  
  today = date.today().isoformat()
  targetFolder = sys.argv[1] + today + "/"

  f = []
  for (dirpath, dirnames, filenames) in walk(targetFolder):
      f.extend(filenames)
      break

  for file in f:
    if ".csv" not in file and "_comparison" in file:
      fileInput = targetFolder + file
      fileOutput = fileInput[:-5] + ".csv"

      inputFile = open(fileInput)
      outputFile = open(fileOutput, 'w')
      data = json.load(inputFile)
      inputFile.close()

      output = csv.writer(outputFile)

      output.writerow(data[0].keys())  # header row

      for row in data:
          output.writerow(row.values())
      output.writerow("")