const core = require('@actions/core');
const github = require('@actions/github');
var fs = require('fs');
const request = require('request');

try {
  const appPath = core.getInput('app-path');
  console.log(`appPath -  ${appPath}!`);
  core.setSecret('api-key');
  const apiKey = core.getInput('api-key');
  const groupId = core.getInput('group-id');
  //NowSecure Platform API - group Id gets appended to route the bianry properly
  const apiUrl = "https://lab-api.nowsecure.com/build/?group=" + groupId;
  console.log("about to build the request with url " + apiUrl + "\n and key " + apiKey + "\n\n and group " + groupId)
  //Sends the binary
  request({
    url: apiUrl,
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      'content-type' : 'application/binary',
      'authorization' : 'Bearer ' + apiKey
    },
    encoding: null,
    body: fs.createReadStream(appPath)
   }, (error, response, body) => {
        if (error) {
          console.log("Error uploading binary");
          core.setFailed(error.message);
        } else {
          console.log("Binary uploaded successfully!")
        }
   });

} catch (error) {
  core.setFailed(error.message);
}