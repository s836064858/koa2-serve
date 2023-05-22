ps -ef|grep "node /home/dist/app.js"|grep -v color |awk '{print $2}'|xargs kill
cd /home/dist/app.js
npm install
nohup node /home/dist/app.js &