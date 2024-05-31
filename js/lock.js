const correctPassword = "Amit Institue"; // Change this to your desired password

function unlockPage() {
    const passwordInput = document.getElementById("password").value;
    if (passwordInput === correctPassword) {
        // Redirect to the unlocked page
        window.location.href = "physics.html"; // Change "unlocked.html" to the path of your unlocked HTML page
    } else {
        alert("Incorrect password. Please try again.");
    }
}
