//userInput needs to be defined-- does this mean I have to copy and paste this into index.js?


const colors = {
    green: {
      wrapperBackground: "#27512C",
      headerBackground: "#5BAD62",
      headerColor: "black",
      photoBorderColor: "#FFA987"
    },
    blue: {
      wrapperBackground: "#2081C3",
      headerBackground: "#101D42",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#43291F",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "#226F54"
    },
    black: {
      wrapperBackground: "black",
      headerBackground: "gray",
      headerColor: "white",
      photoBorderColor: "red"
    }
  };
  
  function generateHTML(userInput, response, responseStars, profileImg, githubUsername, userCity, userGithubProfileURL, userBlogURL, userBio, numberOfRepos, numberofFollowers, numberofUsersFollowing, userCompany) {
    return `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
          <title>${userInput.username}</title>
          <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[userInput.colors].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: ${colors[userInput.colors].headerBackground};
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[userInput.colors].headerBackground};
           color: ${colors[userInput.colors].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[userInput.colors].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[userInput.colors].headerBackground};
             color: ${colors[userInput.colors].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
          </head>
          <body class="wrapper">
          <div class="col">
          <header>
              <div class="photo-header">
                <div class="row"><img src="${profileImg}" alt="profile-img">
                </div>
                <div class="container" style="padding-top:0; padding-bottom:0;">
                  <h3>Hi!</h3>
                  <h4>My name is ${response.data.name}!</h4>
                  <h6>Currently @ ${userCompany}</h6>
                </div>
                <div class="links-nav">
                  <span class="nav-link"><a href="https://www.google.com/maps/place/${userCity}"><i class="fas fa-location-arrow"></i> ${userCity}</a></span>
                  <span class="nav-link"><a href="${userGithubProfileURL}"><i class="fab fa-github"></i> Github</a></span>
                  <span class="nav-link"><a href="${userBlogURL}"><i class="fas fa-rss"></i> Blog</a></span>
                </div>
                
            </div>
            </header>
          
            <main class="container">
              <div class="col">
                  <h5>${userBio}</h5>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <h5>Public Repositories</h5>
                      <h6>${numberOfRepos}</h6>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <h5>Starred Projects</h5>
                      <h6>${responseStars}</h6>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <h5>Followers</h5>
                      <h6>${numberofFollowers}</h6>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <h5>Following</h5>
                      <h6>${numberofUsersFollowing}</h6>
                    </div>
                  </div>
                </div> <!--closes row-->
              
            </div> <!--closes container-->
            </main>
          </div>
        </body>
      </html>`
  }
  
  module.exports = generateHTML;