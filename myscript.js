import { request } from "https://cdn.skypack.dev/@octokit/request";

  window.onload = getCode;

  $('#myButton').on('click', function (e) {
      //your awesome code here
      console.log("hello world");
      getData();
   })

  async function getData() {
    /*
    const {
      url,
      clientId,
      redirectUrl,
      login,
      scopes,
      state,
    } = oauthAuthorizationUrl({
      clientId: "Iv1.39eb7d200d6ceb3a",
      redirectUrl: "https://github-access.darragh.io",
      login: document.getElementById("userinput").value,
      scopes: ["repo", "admin:org"],
      state: "secret123",
    });
    //window.location.href = url;
    */
    var client_id = "25efd33f244c9c0ae0d6";
    window.location.href = "https://github.com/login/oauth/authorize?client_id="+client_id+"&scope=repo"+"&login="+document.getElementById("userinput").value;

  }

  /*
  async function getToken() {

    const urlParams = new URLSearchParams(window.location.search);
    var client_id = "Iv1.39eb7d200d6ceb3a";
    var client_secret = "e860f2028e1381fca4901275385b55a971fb352a";
    var code = urlParams.get('code');

    $.ajax('https://github.com/login/oauth/access_token',   // request url
        {
      type: 'POST',
      dataType: 'application/x-www-form-urlencoded',
      client_id: "Iv1.39eb7d200d6ceb3a",
      client_secret: "e860f2028e1381fca4901275385b55a971fb352a",
      code: urlParams.get('code'),
      success: function(jsondata){
        console.log("hurray!");
          }
        }
      )

    //const result = await request("POST https://github.com/login/oauth/access_token", {
    //  client_id: "Iv1.39eb7d200d6ceb3a",
    //  client_secret: "e860f2028e1381fca4901275385b55a971fb352a",
    //  code: urlParams.get('code')
    //});

    //var xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function() {
      //if (this.readyState == 4 && this.status == 200) {
        //document.getElementById("username").innerHTML =
        //this.responseText;
      //}
    //}

    //xhttp.open("GET", "https://cors-proxy.htmldriven.com/?url=https://github.com/login/oauth/access_token?client_id=Iv1.39eb7d200d6ceb3a&client_secret=e860f2028e1381fca4901275385b55a971fb352a&code=244baa1ef6651b0fc84a", true);
    //xhttp.send();

  }
  */

  function getCode() {
    const urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get("code");
    if(code != null) {
      console.log("code received, sending request to nodejs");
      getToken(code);
    }
  }

  function getToken(code) {
    $.ajax('https://github-access.darragh.io/nodejs',   // request url
        {
          type: "POST",
          data: code,
          success: function (response) {
            if(response != "code invalid") {
              console.log("access token received: " + response);
              getUserData(response);
            }
          },
          error: function(err) {
            console.log(err);
          }
        }
      )
  }

  async function getUserData(accessToken) {
    console.log("fetching user data");
    const userInformation = await request("GET /user", {
      headers: {
        authorization: "token " + accessToken,
      },
    });


    setUsername(userInformation.data.login);
    calculateAndSetAccountAge(userInformation.data.created_at);

    const repoInformation = await request("GET /user/repos", {
      headers: {
        authorization: "token " + accessToken,
      },
    });

    calculateNumberOfPublicAndPrivateRepos(repoInformation.data, userInformation.data.public_repos);
  }

  function setUsername(username) {
    document.getElementById("username").innerHTML = "<b>Username: </b>" + username;
  }

  function calculateAndSetAccountAge(creationDate) {
    var year = creationDate.substring(0,4);
    var month = creationDate.substring(5,7);
    var day = creationDate.substring(8,10);
    document.getElementById("account-age").innerHTML = "<b>Account-Age: </b>" + Math.round((((((new Date() - new Date(parseInt(year), parseInt(month), parseInt(day)))/1000)/60)/60)/24)) + " days.";
  }

  function calculateNumberOfPublicAndPrivateRepos(repodata, numberOfPublicRepos) {
    var publicRepos=numberOfPublicRepos;
    var privateRepos=repodata.length-numberOfPublicRepos;
    document.getElementById("public-repos").innerHTML = "<b>Public Repos: </b>" + publicRepos;
    document.getElementById("private-repos").innerHTML = "<b>Private Repos: </b>" + privateRepos;
  }
