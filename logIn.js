
function onLoginLoad() {
    const $body = $('.body');
    $('.body').on("click", ".Login", handleLoginButtonPress)
}


async function handleLoginButtonPress(event) {
    console.log("clicked button")
    username = document.getElementById("username")
    password = document.getElementById("password")
    let response = await sendLoginMessage(username, password)
    console.log(response)
    if (response.data == "Not Found") {
        renderUserNotFound()
    } else if (response.data == "unauthorized") {
        renderIncorrectPassword()
    } else if (response.data == true) {
        window.location.href = "./homePage.html"
    }
}

function renderUserNotFound() {

}

function renderIncorrectPassword() {
    
}



async function sendLoginMessage(username, password) {
    const result = await axios({
        method: 'post',
        url: "http://localhost:3030/login",
        data: {
            login: username.value,
            password: password.value
        }
      })
    return result
}








$(function() {
    onLoginLoad();
});
