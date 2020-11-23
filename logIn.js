
function onLoginLoad() {
    const $body = $('.body');
    $('.body').on("click", ".Login", handleLoginButtonPress)
    $('.body').on("click", ".createAccount", handleCreateButtonPress)
}

async function handleCreateButtonPress(event) {
    window.location.href = "./createAccount.html"
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
        /* let sessionUser = {
            user: username.value
        }
        sessionStorage.setItem("user", sessionUser);
        let user = sessionStorage.getItem("user") */
        window.location.href = "./homePage.html"
    }
}

function renderUserNotFound() {
    const $alert = $('div.alert');
    $alert.append('<h3>User not found. Click Create Account to join!</h3>');
}

function renderIncorrectPassword() {
    const $alert = $('div.alert');
    $alert.append('<h3>Incorrect password was entered</h3><br><p>Remember letters are case-sensitive.</p>');
}



async function sendLoginMessage(username, password) {
    console.log("sending");
    const result = await axios({
        method: 'post',
        url: "http://localhost:3030/login",
        withCredentials: true,
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
