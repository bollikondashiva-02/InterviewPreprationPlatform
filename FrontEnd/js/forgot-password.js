console.log("forgot-password.js loaded");

const form = document.getElementById("forgotPasswordForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {


event.preventDefault();

const email = emailInput.value.trim();

if (!email) {
    message.innerText = "Please enter your email ❌";
    return;
}

try {

    const response = await fetch(
        `${API}/users/forgot-password?email=${encodeURIComponent(email)}`,
        {
            method: "POST"
        }
    );

    const data = await response.text();

    console.log("Forgot password response:", data);

    if (response.ok) {

        message.innerText =
            "Reset link sent to your email ✅";

        form.reset();

    } else {

        message.innerText =
            data || "Unable to send reset link ❌";
    }

} catch (error) {

    console.error(
        "Forgot password error:",
        error
    );

    message.innerText =
        "Server error ❌";
}


});
