
const params = new URLSearchParams(
    window.location.search
);

const token = params.get("token");

const message =
    document.getElementById("message");


if (!token) {

    message.innerText =
        "Invalid verification link ❌";

} else {

    verifyEmail(token);

}


async function verifyEmail(token) {

    try {

        const response = await fetch(
            `${API}/users/verify?token=${encodeURIComponent(token)}`,
            {
                method: "GET"
            }
        );

        // Backend returns plain text
        const data = await response.text();


        if (response.ok) {

            message.innerText =
                "Email verified successfully ✅";

        } else {

            message.innerText =
                data || "Verification failed ❌";

        }

    } catch (error) {

        console.error(
            "Verification error:",
            error
        );

        message.innerText =
            "Server error ❌";
    }

}

