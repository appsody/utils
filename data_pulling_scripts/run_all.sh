for entry in ./*.js
do
  echo "$entry"
  `node $entry`
done
`python ../data_pulling_utils/json_to_csv.py ../appsody_reports/`