// Login and Signup form
function register() {
    const username_r = document.getElementById("username");
    const email_r = document.getElementById("email_r");
    const password_r = document.getElementById("password_r");
    const confirm_pass_r = document.getElementById("confirm_password");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validemail = emailRegex.test(email_r.value)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const validPass = passwordRegex.test(password_r.value)
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (!users) {
        users = []
    }
    let value_check;
    if (username_r.value === "") {
        document.getElementById("reg_user_modify").style.display = "block"
        username_r.focus()
        value_check = false;
    }
    else if (!validemail) {
        document.getElementById("reg_email_modify").style.display = "block"
        email_r.value = ""
        email_r.focus()
        value_check = false;
        document.getElementById("reg_user_modify").style.display = "none"
    }
    else if (!validPass) {
        document.getElementById("reg_pass_modify").style.display = "block"
        password_r.value = ""
        password_r.focus()
        value_check = false;
        document.getElementById("reg_user_modify").style.display = "none"
        document.getElementById("reg_email_modify").style.display = "none"
    }
    else if (confirm_pass_r.value !== password_r.value) {
        document.getElementById("reg_conf_pass_modify").style.display = "block"
        confirm_pass_r.value = ""
        confirm_pass_r.focus()
        value_check = false;
        document.getElementById("reg_user_modify").style.display = "none"
        document.getElementById("reg_email_modify").style.display = "none"
        document.getElementById("reg_pass_modify").style.display = "none"
    }
    else {
        value_check = true
    }
    if (value_check) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email_r.value) {
                alert("User is already registered");
                emptyInputValues(username_r, email_r, password_r, confirm_pass_r);
                return;
            }
        }
        // document.getElementsByClassName("modify_text").style.display = "none"
        const user_obj = {
            name: username_r.value,
            email: email_r.value,
            password: password_r.value
        }
        users.push(user_obj);
        localStorage.setItem("users", JSON.stringify(users))
        emptyInputValues(username_r, email_r, password_r, confirm_pass_r);
        document.getElementById("reg_user_modify").style.display = "none"
        document.getElementById("reg_email_modify").style.display = "none"
        document.getElementById("reg_pass_modify").style.display = "none"
        document.getElementById("reg_conf_pass_modify").style.display = "none"

    }
    // else {
    //     alert("Enter values correctly")
    // }

}
function emptyInputValues(name, email, password, confirmPassword) {
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
        arguments[i].value = "";
    }
}
let login_value = false;
function login() {
    let users = JSON.parse(localStorage.getItem("users"));
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if (users) {
        for (let i = 0; i < users.length; i++) {

            if (users[i].email === email.value && users[i].password === password.value) {
                login_value = true
                alert("User Logged in")
                window.location.reload()
            }
            else if (users[i].email === email.value && users[i].password !== password.value) {
                document.getElementById("log_pass_modify").style.display = "block";

                login_value = true;
                // password.value = ""
                emptyInputValues(password);
                password.focus();
                document.getElementById("log_email_modify").style.display = "none"
            }
        }
    }
    else {
        login_value = false;
    }
    if (!login_value) {
        document.getElementById("log_email_modify").style.display = "block"
        email.focus();
        emptyInputValues(email, password);
        // alert("this user is not registered")
    }
    else if (login_value) {
        // document.getElementById("log_pass_modify").style.display = "none";
        document.getElementById("log_email_modify").style.display = "none"
    }

}
const container = document.getElementById("body_container")
function addclass() {
    container.classList.add("active")
    // document.getElementsByTagName("input").value = ""
}
function removeclass() {
    // document.getElementsByTagName("input").value = ""
    container.classList.remove("active")
}