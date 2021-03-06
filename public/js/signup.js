$(document).ready(() => {

    const signUpForm = $("form.signup");
    const usernameInput = $("#username-input");
    const emailInput = $("#email-input");
    const passwordInput = $("#password-input");


    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.username, userData.email, userData.password);
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    function signUpUser(username, email, password) {
        $.post("/api/signup", {
            username: username,
            email: email,
            password: password
        })
            .then(() => {
                console.log("new user added");
                window.location.replace("/member");
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});