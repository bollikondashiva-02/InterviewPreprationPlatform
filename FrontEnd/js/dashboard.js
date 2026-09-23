
const token = localStorage.getItem("token");

// If no token, user is not logged in
if (!token) {
  alert("Please login first!");
  window.location.href = "index.html";
}


// Load dashboard data
async function loadDashboard() {

  try {

    // Decode email from JWT
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );
    console.log("JWT payload:", JSON.stringify(payload));

    const email = payload.sub;

    console.log("Email from JWT:", email);

    console.log("Logged-in email:", email);


    // Call Spring Boot user API
    const response = await fetch(
      `http://127.0.0.1:3001/api/users/email/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );


    if (!response.ok) {

      alert("Session expired. Please login again.");

      localStorage.removeItem("token");

      window.location.href = "index.html";

      return;
    }


    const user = await response.json();

    console.log("User data:", user);


    // Display user information
    document.getElementById("welcome").innerText =
      `Welcome, ${user.name} 👋`;

    document.getElementById("email").innerText =
      `Email: ${user.email}`;


  } catch (error) {

    console.error("Dashboard error:", error);

    alert("Server Error");

  }
}


// Logout
function logout() {

  localStorage.removeItem("token");

  alert("Logged out successfully!");

  window.location.href = "index.html";
}


// Start dashboard
loadDashboard();

