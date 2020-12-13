var http = require('http');
var fs = require('fs');
var token = "NULL";
var previousCode;
var code;
http.createServer(function (req, res) {

    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*" // implementation of CORS
    });

    req.on("data", async function (data) {

          code = data.toString("utf8");

          if(code != previousCode) {

            previousCode = code;

            const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");

            const auth = createOAuthAppAuth({
              clientId: "25efd33f244c9c0ae0d6",
              clientSecret: "0afe685f276806b646fd1d61f6c930d11e2b95fe",
            });

            const tokenAuthentication = await auth({
              type: "token",
              code: code, // code from OAuth web flow, see https://git.io/fhd1D
            });

            token = tokenAuthentication.token;

            res.end(token);
          } else {
            res.end("code invalid")
          }


    });

}).listen(8080, "http://github-access.darragh.io/nodejs");
console.log("Server running at https://github-access.darragh.io/nodejs:8080");
