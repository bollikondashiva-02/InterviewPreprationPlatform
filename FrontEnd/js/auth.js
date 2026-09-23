console.log("auth.js loaded");


// =========================
// LOGIN
// =========================

async function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    if (!email || !password) {

        alert("Please enter email and password");

        return;
    }

    console.log("Login email:", email);
    console.log("API URL:", `${API}/users/login`);

    try {

        const response = await fetch(
            `${API}/users/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        console.log("Login HTTP status:", response.status);

        // Read response as text first
        const text = await response.text();

        console.log("Login raw response:", text);

        let data = {};

        try {
            data = JSON.parse(text);
        }
        catch (jsonError) {

            console.error(
                "JSON parsing error:",
                jsonError
            );
        }

        console.log("Login response:", data);


        // =========================
        // LOGIN SUCCESS
        // =========================

        if (response.ok) {

            console.log("Login successful");

            console.log(
                "JWT:",
                data.token
            );

            console.log(
                "User:",
                data.user
            );


            // Check token
            if (!data.token) {

                console.error(
                    "JWT token missing from response"
                );

                alert(
                    "Login response does not contain token ❌"
                );

                return;
            }


            // Save JWT
            localStorage.setItem(
                "token",
                data.token
            );


            // Save user
            if (data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }


            console.log(
                "Token saved:",
                localStorage.getItem("token")
            );


            alert(
                "Login Successful ✅"
            );


            // Go dashboard
            window.location.href =
                "dashboard.html";

        }

        // =========================
        // LOGIN FAILED
        // =========================

        else {

            console.error(
                "Login failed:",
                response.status,
                data
            );

            alert(
                data.message ||
                "Invalid email or password ❌"
            );
        }

    }

    catch (error) {

        console.error(
            "LOGIN FETCH ERROR:",
            error
        );

        alert(
            "Server Error ❌\n\n" +
            error.message
        );
    }
}



// =========================
// REGISTER
// =========================

async function register() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!name || !email || !password) {

        alert(
            "Please fill all fields"
        );

        return;
    }


    console.log(
        "Register email:",
        email
    );

    console.log(
        "Register API:",
        `${API}/users/register`
    );


    try {

        const response = await fetch(
            `${API}/users/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );


        console.log(
            "Register HTTP status:",
            response.status
        );


        const text =
            await response.text();


        console.log(
            "Register raw response:",
            text
        );


        let data = {};

        try {

            data = JSON.parse(text);

        }
        catch (jsonError) {

            console.error(
                "Register JSON parsing error:",
                jsonError
            );
        }


        console.log(
            "Register response:",
            data
        );


        if (response.ok) {

            alert(
                "Registration successful ✅\n\n" +
                "A verification email has been sent to:\n" +
                email +
                "\n\n" +
                "Please open your email and click the verification link."
            );

        }

        else {

            alert(
                data.message ||
                "Registration failed ❌"
            );
        }

    }

    catch (error) {

        console.error(
            "REGISTER FETCH ERROR:",
            error
        );

        alert(
            "Server Error ❌\n\n" +
            error.message
        );
    }
}