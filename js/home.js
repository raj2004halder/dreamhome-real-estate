async function checkLogin() {

    const authNav =
        document.getElementById("authNav");

    if (!authNav) return;

    try {

        const response = await fetch(
            "http://localhost:5001/api/users/profile",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {

            // User is NOT logged in
            authNav.innerHTML = `
                <a href="login.html" class="login-link">
                    Login
                </a>
            `;

            return;
        }

        const data = await response.json();

        const user = data.user;

        // User IS logged in
        authNav.innerHTML = `

            <a href="profile.html" class="profile-link">
                <i class="fa-solid fa-user"></i>
                ${user.name}
            </a>

            <button
                id="logoutBtn"
                class="logout-btn"
                type="button">
                Logout
            </button>

        `;

        document
            .getElementById("logoutBtn")
            .addEventListener("click", logoutUser);

    } catch (error) {

        console.error("Authentication check failed:", error);

        authNav.innerHTML = `
            <a href="login.html" class="login-link">
                Login
            </a>
        `;
    }
}


async function logoutUser() {

    try {

        const response = await fetch(
            "http://localhost:5001/api/users/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (response.ok) {

            window.location.href = "index.html";

        } else {

            alert("Logout failed");

        }

    } catch (error) {

        console.error("Logout error:", error);

    }
}


checkLogin();