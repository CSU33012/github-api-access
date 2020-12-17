# github-api-access

A full version of this code is running on my personal website @ https://github-access.darragh.io

Unfortunately due to the way Github Authentication works regarding tokens, you cannot use the 'Get all info' button feature which is available on my website.
This means there is no point in running the NodeJS server on your local machine, as it serves no purpose. The difference between 'get all info' and 'get public info'
is that 'get all info' allows the user to authenticate my app to see non-public information that is available on the API.

To run my code, simply download repository and open the index.html file in any web browser. You can then input your username and it will fetch public information
that is available by accessing the github API such as your username, when you created your account and the number of public repositories you have currently.
(private repos are automatically set to zero when you get public info).

The necessity of the NodeJS server for authentication is that the Github url that developers send the code which they received from the initial authentication website after the user 
authenticate does not allow 'Cross-Origin-Remote-Sharing' otherwise known as 'CORS' to any website, this means that when said Github url receives the code sent by my javascript function,
it will send the user access token back, but it won't include 'Cross-Origin-Remote-Sharing: *' as a header, which means that the web browser will block the incoming information.
To bypass this I set up a NodeJS server which is currently running on my personal webserver, this NodeJS server receives the code from the browser, then sends the code to the 
aforementioned Github Authentication page, and since NodeJS runs independantly of the browser, it receives the token and then sends it back to the user's browser, thus bypassing the 
CORS limitation.
