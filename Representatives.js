


async function getRepresentatives() {
    let address = await formURL()
    /* const result = await axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=SgAae3IpNtJtnG1f2ySeckEkczkNntW0',
      });
    return result */
}

async function formURL() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3030/userpersonalinfo',
      });
    address = result.body.address.split(" ")
    city = result.body.city.split(" ")
    state = result.body.state
    zip = result.body.zip
    url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="
    address.forEach(element => {
        url = url + element + '%20'
    });
    city.forEach(element => {
        url = url + element + '%20'
    });
    url = url + state + '%20'
    url = url + zip
    key = '&key=AIzaSyBMSC-3HHlKMug6RgB7_5bthnwm6jLfU68'
    url = url + key
    console.log(url)
}






$(function() {
    getRepresentatives();
});