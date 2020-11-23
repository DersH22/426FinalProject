function onCreateLoad() {
    const $body = $('.body');
    $('.body').on("click", ".createAccount", handleCreateButtonPress)
    $('.body').on("click", ".returnLogin", handleReturnButtonPress)
}

function handleReturnButtonPress() {
    window.location.href = "./logIn.html"
}

async function handleCreateButtonPress(event) {
    console.log("clicked button")
    username = document.getElementById("username")
    password = document.getElementById("password")
    address = document.getElementById("address")
    city = document.getElementById("city")
    state = document.getElementById("state")
    zip = document.getElementById("zip")

    userData = {
        "username": username.value,
        "password": password.value,
        "address": address.value,
        "city": city.value,
        "state": state.value,
        "zip": zip.value
    }

    let response = await sendCreateMessage(userData)
    console.log(response)

    if (response.data == "User Already Exists") {
        renderUserExists();
    } else {
        window.location.href = "./logIn.html"
    }    
}

async function sendCreateMessage(userData) {
    const result = await axios({
        method: 'post',
        url: "http://localhost:3030/createUser",
        //withCredentials: true,
        data: {
            login: userData.username,
            password: userData.password,
            address: userData.address,
            city: userData.city,
            state: userData.state,
            zip: userData.zip
        }
      })
    return result
}

function renderUserExists() {
    const $alert = $('div.alert');
    $alert.append('<h3>Username already taken. Please try a different name or return to login</h3>');
}

$(function() {
    onCreateLoad();
});
