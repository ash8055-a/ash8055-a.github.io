function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // ✅ Send token to your backend for verification
    fetch("/login-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server response:", data);
        // Example: redirect to dashboard
        if (data.success) {
            window.location.href = "/dashboard";
        }
    })
    .catch(err => console.error("Login error:", err));
}
