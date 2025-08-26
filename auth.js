// ==== CONFIG ====
const BACKEND_URL = "https://syndication-belle-scenarios-johnson.trycloudflare.com"; // your tunnel URL
const GOOGLE_CLIENT_ID = "102916135822-k4m8ggidifd1deqbkd6r409ojrj8pdba.apps.googleusercontent.com.apps.googleusercontent.com"; // Google Web client ID
const GITHUB_CLIENT_ID = "Ov23liDWpAiAISCWsBw5"; // GitHub OAuth App client ID
const GITHUB_CALLBACK_URL = `${https://syndication-belle-scenarios-johnson.trycloudflare.com}/github-callback`; // your backend endpoint

// ==== GOOGLE SIGN-IN CALLBACK ====
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    fetch(`${BACKEND_URL}/login-callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            console.log("Login successful:", data.user);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            showUserInfo(data.user);
        } else {
            console.error("Login failed:", data.error);
            alert("Login failed: " + data.error);
        }
    })
    .catch(err => console.error("Error sending credential:", err));
}

// ==== GITHUB LOGIN ====
function githubLogin() {
    const scope = "read:user user:email";
    const redirectUri = encodeURIComponent(GITHUB_CALLBACK_URL);
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}`;
    window.location.href = url; // redirect user to GitHub OAuth
}

// ==== SHOW LOGGED-IN USER ====
function showUserInfo(user) {
    const infoDiv = document.getElementById("user-info");
    if (!user) {
        infoDiv.innerHTML = "";
        return;
    }

    // Use only one template literal with proper backticks and braces
    infoDiv.innerHTML = `
        <p>Logged in as: ${user.name || user.login} (${user.email || "No email"})</p>
        <img src="${user.picture || user.avatar_url}" alt="Profile Picture" style="width:50px; border-radius:50%;">
        <button id="logout-btn">Logout</button>
    `;

    document.getElementById("logout-btn").onclick = logout;
}


// ==== LOGOUT ====
function logout() {
    sessionStorage.removeItem("user");
    showUserInfo(null);
    fetch(`${BACKEND_URL}/logout`, { method: "POST" });
    if(window.google?.accounts?.id) google.accounts.id.disableAutoSelect();
}

// ==== GOOGLE SIGN-IN BUTTON ====
function renderGoogleButton() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
}

// ==== INIT ====
window.onload = function() {
    renderGoogleButton();

    // Restore session if exists
    const storedUser = sessionStorage.getItem("user");
    if(storedUser) showUserInfo(JSON.parse(storedUser));

    // Attach GitHub login button
    const githubBtn = document.getElementById("github-login-btn");
    if(githubBtn) githubBtn.onclick = githubLogin;
};
