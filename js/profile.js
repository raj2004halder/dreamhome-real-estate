async function loadProfile() {

    try {

        const response = await fetch(
            "http://localhost:5001/api/users/profile",
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!response.ok) {

            window.location.href = "login.html";

            return;
        }

        const user = data.user;

        document.getElementById(
            "profileName"
        ).textContent = user.name;

        document.getElementById(
            "profileEmail"
        ).textContent = user.email;

        document.getElementById(
            "profilePhone"
        ).textContent =
            user.phone || "Not added";

        document.getElementById(
            "profileCity"
        ).textContent =
            user.city || "Not added";

        if (user.profileImage) {

            document.getElementById(
                "profileImage"
            ).src = user.profileImage;

        }

    } catch (error) {

        console.error(error);

        window.location.href = "login.html";
    }
}


loadProfile();


document
    .getElementById("logoutBtn")
    .addEventListener("click", async () => {

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

            }

        } catch (error) {

            console.error(error);

        }

    });