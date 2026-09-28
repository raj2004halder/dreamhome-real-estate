const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const location =
        document.getElementById("location").value;

    const type =
        document.getElementById("propertyType").value;

    const bhk =
        document.getElementById("bhk").value;

    const budget =
        document.getElementById("budget").value;


    const params = new URLSearchParams();

    params.set("location", location);
    params.set("type", type);
    params.set("bhk", bhk);
    params.set("budget", budget);


    window.location.href =
        `properties.html?${params.toString()}`;

});