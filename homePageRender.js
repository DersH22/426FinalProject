async function renderHomePage() {
    let newsFeed = await retrieveNewsFeed()
    renderNewsFeed(newsFeed.data.results)
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

async function renderNewsFeed(results) {
    const $news = $('ul.news');
    console.log(results[0]);
    for(let i=0; i<3; i++){
        $news.append('<li><a class="sourceLink" href="'+ results[i].short_url +'"><h1>'+ results[i].title+'</h1><img alt="News source thumbnail" src=" '+ results[i].multimedia[1].url +'"></a>');
    }
};

$(function() {
    renderHomePage();

});