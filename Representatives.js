


async function getRepresentatives() {
    let address = await formURL()

    console.log(address)
    const result = await axios({
        method: 'get',
        url: address,
      });
      console.log(result)
    return result 
}

async function formURL() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3030/userpersonalinfo',
        withCredentials: true,
      });
    console.log(result)
    address = result.data.address.split(" ")
    city = result.data.city.split(" ")
    state = result.data.state
    zip = result.data.zip
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
    return url
}






$(function() {
    getRepresentatives();
});