var request = require('request');
var https = require('https');
var GITHUB_USER = "baljit-rai";
var GITHUB_TOKEN = "6856000a09972c30cd8a887e42dc0a56afbc896e";
var UserAgent = 'baljit-rai: ';

console.log('A suh dude, Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = ''
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'baljit-rai' //User agent for header
    }
  };

  request.get(options)
  .on('error', function(err) {
    throw err;
  })
  .on('response', function(response) {
    console.log('Response Status Code: ', response.statusCode);
    console.log('Put your feet up fam, downloading avatar....');
  })

  .on('data', function(data) {
    string += data;
  })

  .on('end', function() {
    console.log("Download Complete: See who helped to link and build the vision, my guy!");
    string = JSON.parse(string);
    cb(string);
  })

}

var  getAvatars = function(jsonOBJ) {
  var i = 1
  for(var j in jsonOBJ)
    console.log(jsonOBJ[j].avatar_url);
}


getRepoContributors("jquery", "jquery", getAvatars);






// https://api.github.com/repos/jquery/jquery/contributors
//6856000a09972c30cd8a887e42dc0a56afbc896e