COMPARISON=$1

for entry in ./*.js
do
  echo "$entry"
  if [ -z "$COMPARISON" ]
  then
    `node $entry`
  else
    echo "Comparison $COMPARISON was given"
    `node $entry $COMPARISON`
  fi
done
`python ../data_pulling_utils/json_to_csv.py ../appsody_reports/`