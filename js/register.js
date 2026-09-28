const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");


registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match";

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    city,
                    password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        message.textContent =
            "Account created successfully!";


        setTimeout(() => {

            window.location.href =
                "profile.html";

        }, 1000);


    } catch (error) {

        message.textContent =
            "Server connection failed.";

        console.error(error);

    }

});