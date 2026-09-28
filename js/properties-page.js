// ==========================================
// GET SEARCH PARAMETERS
// ==========================================

const urlParams = new URLSearchParams(
    window.location.search
);

const selectedLocation =
    urlParams.get("location") || "all";

const selectedType =
    urlParams.get("type") || "all";

const selectedBhk =
    urlParams.get("bhk") || "all";

const selectedBudget =
    urlParams.get("budget") || "all";


// ==========================================
// FILTER
// ==========================================

const filteredProperties = properties.filter(property => {

    const locationMatch =
        selectedLocation === "all" ||
        property.location === selectedLocation;


    const typeMatch =
        selectedType === "all" ||
        property.type === selectedType;


    const bhkMatch =
        selectedBhk === "all" ||
        property.bhk === Number(selectedBhk);


    const budgetMatch =
        selectedBudget === "all" ||
        property.price <= Number(selectedBudget);


    return (
        locationMatch &&
        typeMatch &&
        bhkMatch &&
        budgetMatch
    );

});


// ==========================================
// DISPLAY
// ==========================================

const container =
    document.getElementById("propertyContainer");

const noResult =
    document.getElementById("noResult");

const resultCount =
    document.getElementById("resultCount");

const searchSummary =
    document.getElementById("searchSummary");


container.innerHTML = "";


if (filteredProperties.length === 0) {

    noResult.style.display = "block";

    resultCount.textContent =
        "0 properties found";

} else {

    noResult.style.display = "none";

    resultCount.textContent =
        `${filteredProperties.length} properties found`;


    filteredProperties.forEach(property => {

        const card =
            document.createElement("div");

        card.className =
            "property-card";


        card.innerHTML = `

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                >

                <span class="property-tag">
                    ${property.bhk} BHK
                </span>

                <button class="favorite">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>


            <div class="property-content">

                <h3>
                    ${property.title}
                </h3>

                <p class="location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${property.location}
                </p>

                <p class="price">
                    ${property.priceText}
                </p>

                <div class="property-details">

                    <span>
                        <i class="fa-solid fa-ruler-combined"></i>
                        ${property.area}
                    </span>

                    <span>
                        <i class="fa-solid fa-bed"></i>
                        ${property.bedrooms}
                    </span>

                    <span>
                        <i class="fa-solid fa-bath"></i>
                        ${property.bathrooms}
                    </span>

                </div>

                <button
                    class="view-btn"
                    onclick="viewProperty(${property.id})"
                >
                    View Details
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


// ==========================================
// SEARCH SUMMARY
// ==========================================

let summaryText = "All Properties";


if (
    selectedLocation !== "all" &&
    selectedBhk !== "all"
) {

    summaryText =
        `${selectedBhk} BHK Properties in ${selectedLocation}`;

} else if (selectedBhk !== "all") {

    summaryText =
        `${selectedBhk} BHK Properties`;

} else if (selectedLocation !== "all") {

    summaryText =
        `Properties in ${selectedLocation}`;

} else if (selectedType !== "all") {

    summaryText =
        `${selectedType} Properties`;
}


searchSummary.textContent = summaryText;


// ==========================================
// VIEW PROPERTY
// ==========================================

function viewProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) return;


    alert(
        `${property.title}\n\n` +
        `${property.priceText}\n` +
        `${property.location}\n` +
        `${property.area}`
    );

}