
async function renderHomePage() {
    let newsFeed = await retrieveNewsFeed()
    console.log(newsFeed)
    //renderNewsFeed(newsFeed.data.results)
    const $body = $('.body');
    $('.body').on("click", ".reps", handleRepButtonPress)
    
}


function handleRepButtonPress() {
    window.location.href = "./Representatives.html"
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