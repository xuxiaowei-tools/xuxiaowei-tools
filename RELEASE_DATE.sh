#!/bin/bash

if [[ ! -d src ]]; then
	echo "src文件夹不存在"
	exit
fi

dateTime=`date '+%Y-%m-%d %H:%M:%S'`
##echo $dateTime
echo "{\"date\":\"$dateTime\"}" > ./src/release_date.json

exit
