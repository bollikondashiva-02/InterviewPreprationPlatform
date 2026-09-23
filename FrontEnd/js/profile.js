
console.log("profile.js loaded");

// =========================
// GET ELEMENTS
// =========================

const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const userVerified = document.getElementById("userVerified");
const message = document.getElementById("message");

// =========================
// GET JWT TOKEN
// =========================

const token = localStorage.getItem("token");

// =========================
// CHECK LOGIN
// =========================

if (!token) {

```
message.innerText =
    "Please login first ❌";

setTimeout(() => {
    window.location.href = "index.html";
}, 1500);
```

}

// =========================
// LOAD PROFILE
// =========================

async function loadProfile() {


try {

    const response = await fetch(
        `${API}/profile`,
        {
            method: "GET",

            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );


    if (!response.ok) {

        message.innerText =
            "Unable to load profile ❌";

        return;
    }


    const user = await response.json();

    console.log(
        "Profile data:",
        user
    );


    // =========================
    // DISPLAY USER DATA
    // =========================

    userId.innerText =
        user.id;

    userName.innerText =
        user.name;

    userEmail.innerText =
        user.email;

    userRole.innerText =
        user.role;

    userVerified.innerText =
        user.verified
            ? "Yes ✅"
            : "No ❌";


} catch (error) {

    console.error(
        "Profile error:",
        error
    );

    message.innerText =
        "Server error ❌";
}


}

// =========================
// LOAD PROFILE
// =========================

if (token) {
loadProfile();
}
