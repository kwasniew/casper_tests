export  PHANTOMJS_HOME=`pwd`/phantomjs/linux64/phantomjs-1.7.0-linux-x86_64/bin
export CASPERJS_HOME=`pwd`/casperjs/bin/

PATH="$PATH":$PHANTOMJS_HOME:$CASPERJS_HOME

echo 'Phantom version: ' `phantomjs --version`;
echo 'Casper version:  ' `casperjs --version`;

cd test;
casperjs test ap_main_page.js --url=$1;

exit 0;
