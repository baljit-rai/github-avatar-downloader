var fs = require('fs');
var https = require('https');
var request = require('request');
var GITHUB_USER = "baljit-rai";
var GITHUB_TOKEN = "6856000a09972c30cd8a887e42dc0a56afbc896e";
var UserAgent = 'baljit-rai: ';
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('A suh dude, Welcome to the GitHub Avatar Downloader!');

function checkArgs(owner, name) {
  if (owner === undefined || name === undefined) {
    console.log(" Bruh......, enter the correct arguments");
  } else {
    getRepoContributors(repoOwner, repoName, getAvatars);
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = ''
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'baljit-rai' //User agent for header
    }
  };

  request.get(options)
    .on('error', function(err) {
      console.log(err);
    })
    .on('response', function(response) {
      console.log('Response Status Code: ', response.statusCode);

    })

  .on('data', function(data) {
    string += data;
  })

  .on('end', function() {
    string = JSON.parse(string);
    cb(string);
  })

}

function downloadImageByURL(url, filePath, userName) {
  var stream = request.get(url)
    .on('error', function(err) {
      throw err;
    })

  .on('response', function(response) {
    extention = response.headers['content-type'].split('/')
    stream.pipe(fs.createWriteStream(filePath + '/' + userName + "." + extention[1]));
    console.log('Hold up fam, downloading avatar....');
    console.log("Download Complete: See who helped to link and build the vision, my guy!");

  })

  .on('end', function(response) {
    console.log("Download Complete: See who helped to link and build the vision, my guy!");
  })

}

var getAvatars = function(jsonOBJ) {
  for (var i in jsonOBJ) {
    downloadImageByURL(jsonOBJ[i].avatar_url, 'avatars', jsonOBJ[i].login);
  }
  //console.log(jsonOBJ[i].avatar_url);
}



checkArgs(repoOwner, repoName);







// https://api.github.com/repos/jquery/jquery/contributors
//6856000a09972c30cd8a887e42dc0a56afbc896e