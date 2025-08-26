// ==== CONFIG ====
const BACKEND_URL = "https://jersey-genome-thickness-skins.trycloudflare.com"; // your Cloudflare Tunnel URL
const GOOGLE_CLIENT_ID = "102916135822-k4m8ggidifd1deqbkd6r409ojrj8pdba.apps.googleusercontent.com"; // replace
const GITHUB_CLIENT_ID = "Ov23liDWpAiAISCWsBw5"; // replace
const GITHUB_CALLBACK_URL = `${BACKEND_URL}/github-callback`; // backend endpoint

// ==== GOOGLE SIGN-IN CALLBACK ====
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token:", response.credential);

    fetch(`${BACKEND_URL}/login-callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
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
    window.location.href = url;
}

// ==== SHOW LOGGED-IN USER ====
function showUserInfo(user) {
    const infoDiv = document.getElementById("user-info");
    if (!user) {
        infoDiv.innerHTML = "";
        return;
    }

    const name = user.name || user.login || "Unknown";
    const email = user.email || "No email";
    const picture = user.picture || user.avatar_url || "";

    infoDiv.innerHTML = `
        <p>Logged in as: ${name} (${email})</p>
        <img src="${picture}" alt="Profile Picture" style="width:50px; border-radius:50%;">
        <button id="logout-btn">Logout</button>
    `;

    document.getElementById("logout-btn").onclick = logout;
}

// ==== LOGOUT ====
function logout() {
    sessionStorage.removeItem("user");
    showUserInfo(null);
    fetch(`${BACKEND_URL}/logout`, { method: "POST" });
    if (window.google?.accounts?.id) google.accounts.id.disableAutoSelect();
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
    if (storedUser) showUserInfo(JSON.parse(storedUser));

    // GitHub button
    const githubBtn = document.getElementById("github-login-btn");
    if (githubBtn) githubBtn.onclick = githubLogin;
};
