


  function test() {
    console.log("hello world");
  }

  $('#myButton').on('click', function (e) {
      //your awesome code here
      console.log("hello world");
      getData();
   })

  async function getData() {
    const result = await request("GET /orgs/:org/repos", {
    headers: {
      authorization: "token 0000000000000000000000000000000000000001",
    },
    org: "octokit",
    type: "private",
    });

    console.log(`${result.data.length} repos found.`);
  }
