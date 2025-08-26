// auth.js

// ==== CONFIG ====
const BACKEND_URL = "https://syndication-belle-scenarios-johnson.trycloudflare.com"; // <-- replace with your tunnel URL
const GOOGLE_CLIENT_ID = "102916135822-k4m8ggidifd1deqbkd6r409ojrj8pdba.apps.googleusercontent.com.apps.googleusercontent.com"; // <-- replace with your client ID

// ==== GOOGLE SIGN-IN CALLBACK ====
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Send the token to your Flask backend
    fetch(`${BACKEND_URL}/login-callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            console.log("Login successful:", data.user);
            // Store user info in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(data.user));
            showUserInfo(data.user);
        } else {
            console.error("Login failed:", data.error);
            alert("Login failed: " + data.error);
        }
    })
    .catch(err => {
        console.error("Error sending credential:", err);
    });
}

// ==== GOOGLE SIGN-IN BUTTON ====
function renderGoogleButton() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }  // customization
    );

    google.accounts.id.prompt(); // show the One Tap prompt
}

// ==== SHOW LOGGED-IN USER ====
function showUserInfo(user) {
    const infoDiv = document.getElementById("user-info");
    if(!user) {
        infoDiv.innerHTML = "";
        return;
    }
    infoDiv.innerHTML = `
        <p>Logged in as: ${user.name} (${user.email})</p>
        <img src="${user.picture}" alt="Profile Picture" style="width:50px; border-radius:50%;">
        <button id="logout-btn">Logout</button>
    `;

    document.getElementById("logout-btn").onclick = logout;
}

// ==== LOGOUT ====
function logout() {
    sessionStorage.removeItem("user");
    showUserInfo(null);
    // Optional: tell backend to destroy session
    fetch(`${BACKEND_URL}/logout`, { method: "POST" });
    google.accounts.id.disableAutoSelect(); // disables auto-login
}

// ==== INIT ====
window.onload = function() {
    renderGoogleButton();

    // restore session if exists
    const storedUser = sessionStorage.getItem("user");
    if(storedUser) {
        showUserInfo(JSON.parse(storedUser));
    }
};
