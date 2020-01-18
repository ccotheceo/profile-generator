function devProfileGen() {
    const inquirer = require("inquirer");
    const fs = require("fs");
    const axios = require('axios').default;
    const generateHTML = require('./generateHTML');
    const puppeteer = require('puppeteer');
  
    let profileImg;
    let githubUsername;
    let userCity;
    let userGithubProfileURL;
    let userBlogURL;
    let userBio;
    let numberOfRepos;
    let numberofFollowers;
    let numberofUsersFollowing;
    let userCompany;
  
    // Github username and theme color.
    inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Github username?"
            },
            {
                type: "list",
                message: "Please select a theme color.",
                name: "colors",
                choices: [
                    "green",
                    "blue",
                    "pink",
                    "red",
                    "black"
                ]
            }
        ])
        .then(function (userInput) {
            // we create a json file with that information.
            var githubUsername = userInput.username.split(' ').join('') + ".json";
  
            fs.writeFile(githubUsername, JSON.stringify(userInput, null, '\t'), function (err) {
  
                if (err) {
                  
                    // logs the error
                
                    return console.log(err);
                }
  
              
                // If no error axios request for user info
             
                const queryUrl = "https://api.github.com/users/" + userInput.username;
                const queryStarUrl = "https://api.github.com/users/" + userInput.username + "/starred";
                
                // axios functions
                
                githubQuery(queryUrl).then(function (response) {
                    githubQueryStars(queryStarUrl).then(function (responseStars) {
                        var options = { format: 'tabloid' };
                     
                        // Puts info into an HTML then a pdf.
                      
                        var rendered = generateHTML(userInput, response, responseStars, profileImg, githubUsername, userCity, userGithubProfileURL, userBlogURL, userBio, numberOfRepos, numberofFollowers, numberofUsersFollowing, userCompany);
  
                        fs.writeFile(userInput.username + '.html', rendered, (err) => {
                            if (err) throw err;
                            console.log('HTML file created ');
                        });
  
                        (async () => {
  
                            try {
                                const browser = await puppeteer.launch();
                                const page = await browser.newPage();
                                await page.setContent(rendered);
                                await page.emulateMedia('screen');
                                await page.pdf({
                                    path: `${userInput.username}.pdf`, format: 'A4', printBackground: true
                                });
                                console.log("PDF conversion sucess!");
                                await browser.close();
                            }
                            catch (errorPuppeteer) {
                                console.log(errorPuppeteer);
                            }
                        })();
  
                    })
                });
  
            });
        });
  
  
    function githubQuery(queryUrl) {
  
        return axios.get(queryUrl)
            .then(function (response) {
             
  
                profileImg = response.data.avatar_url + ".png";
  
  
                githubUsername = response.data.login;
  
                userCity = response.data.location;
  
                userGithubProfileURL = response.data.html_url;
  
                userBlogURL = response.data.blog;
  
                userBio = response.data.bio;
  
                numberOfRepos = response.data.public_repos;
  
                numberofFollowers = response.data.followers;
  
                userCompany = response.data.company;
  
                numberofUsersFollowing = response.data.following
                return response;
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            })
    }
  
    // Starred repos
    function githubQueryStars(queryStarUrl) {
  
        return axios.get(queryStarUrl)
            .then(function (responseStars) {
                return responseStars.data.length;
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }
  }
  
  devProfileGen();