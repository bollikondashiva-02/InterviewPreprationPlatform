console.log("reset-password.js loaded");


// =========================
// GET RESET TOKEN
// =========================

const params =
    new URLSearchParams(
        window.location.search
    );

const token =
    params.get("token");

const message =
    document.getElementById("message");


// =========================
// CHECK TOKEN
// =========================

if (!token) {

    message.innerText =
        "Invalid or missing reset link ❌";

}


// =========================
// RESET PASSWORD
// =========================

async function resetPassword() {

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    // Check password
    if (!password || !confirmPassword) {

        message.innerText =
            "Please enter both passwords ❌";

        return;
    }


    // Check matching passwords
    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match ❌";

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/users/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`,
                {
                    method: "POST"
                }
            );


        const data =
            await response.text();


        console.log(
            "Reset password response:",
            data
        );


        if (response.ok) {

            message.innerText =
                "Password reset successfully ✅";

            // Disable button
            document.querySelector(
                "button"
            ).disabled = true;

            // Redirect to login after 2 seconds
            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 2000);

        } else {

            message.innerText =
                data ||
                "Password reset failed ❌";
        }

    }
    catch (error) {

        console.error(
            "Reset password error:",
            error
        );

        message.innerText =
            "Server error ❌";
    }
}