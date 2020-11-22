const loginButton = function(event) {
    console.log("test");

    loginDB(event);
}

async function loginDB(event) {

    let username = $("#username").attr("value");
    console.log(username);
    let password;


    /*
    //axios response
    const response = await axios({
        method: 'get',
        url: '',
        auth: {
            username: username,
            password: password
        }
    });
    */

    //if unsucessful, provide an alert message


    //if sucessful 1) store cookies?   2) redirect them to homepage
    //window.location.href = '';    
}


function loadIntoDOM() {

    //listener for login button
    $('.navigate').on("click", ".login", loginButton);

    //listener for create user button
}

$(function() {
    loadIntoDOM();
});