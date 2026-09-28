const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5001/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            message.textContent =
                data.message || "Login failed";

            return;
        }

        message.textContent =
            "Login successful!";

        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 700);

    } catch (error) {

        message.textContent =
            "Server connection failed.";

        console.error(error);
    }

});