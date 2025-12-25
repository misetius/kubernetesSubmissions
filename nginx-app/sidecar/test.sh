#!/bin/bash
min=300
max=900

while :
do
    random_value=$(($RANDOM%($max-$min+1)+$min))
    echo $random_value
    sleep $random_value
    LOCATION=`curl --silent --location --output /dev/null --write-out "%{url_effective}\n" https://en.wikipedia.org/wiki/Special:Random `
    curl  $LOCATION > /www/index.html
done
    
