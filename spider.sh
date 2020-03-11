#!/bin/sh
  
#set env

basepath=$(cd `dirname $0`; pwd)
export PATH=/usr/local/node/bin:/sbin:/bin:/usr/bin
cd $basepath
node scropy/app.js


# add crontab
# crontab -e
# apkdown spider
# 18 15 * * * /home/works/node/apkdown/spider.sh
# service cron restart