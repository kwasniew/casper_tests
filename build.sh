ln -sf `pwd`/phantomjs/macosx/phantomjs-1.7.0-macosx/bin/phantomjs /usr/local/bin/phantomjs
ln -sf `pwd`/casperjs/bin/casperjs /usr/local/bin/casperjs

cd test;
casperjs ap_main_page.js
