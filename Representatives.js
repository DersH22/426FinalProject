


async function getRepresentatives() {
    let address = formAddress()
    const result = await axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=SgAae3IpNtJtnG1f2ySeckEkczkNntW0',
      });
    return result
}

function formAddress






$(function() {
    renderHomePage();
});