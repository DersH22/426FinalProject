
async function renderHomePage() {
    let newsFeed = await retrieveNewsFeed()
    renderNewsFeed(newsFeed.data.results)
    console.log(newsFeed)
    
}




async function retrieveNewsFeed() {
    const result = await axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=SgAae3IpNtJtnG1f2ySeckEkczkNntW0',
      });
    return result
}








$(function() {
    renderHomePage();
});