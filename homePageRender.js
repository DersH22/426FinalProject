
async function renderHomePage() {
    let newsFeed = await retrieveNewsFeed();
    console.log(newsFeed);
    renderNewsFeed(newsFeed.data.results);
}

async function retrieveNewsFeed() {
    const result = await axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=SgAae3IpNtJtnG1f2ySeckEkczkNntW0',
      });
    return result;
}

async function renderNewsFeed(results) {
    const $news = $('#newsFeed');
    for(let i=0; i<4; i++){
        $news.append(
            results[i]);
    }
};




$(function() {
    renderHomePage();

});