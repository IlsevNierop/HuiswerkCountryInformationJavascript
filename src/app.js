import axios from "axios";

const countryList = document.getElementById("countries");
const errorMessage = document.getElementById("error");



function switchRegionForColor(region) {
    switch (region) {
        case "Africa":
            return "blue";
        case "Asia":
            return "red";
        case "Europe":
            return "yellow";
        case "Oceania":
            return "purple";
        case "Americas":
            return "green";
        case "Antarctic":
            return "grey";
        default:
            return "grey";
    }

}

function errorHandling(e) {
    //errors afvangen in console
    console.error(e);
    //errors communiceren in de UI
    if (e.response.status === 404) {
        errorMessage.textContent = "Page not found | 404";
    } else if (e.response.status === 500) {
        errorMessage.textContent = "Internal server error | 500";
    }
}

function mapCountryArrayInnerHTML(array) {
    array.map((country) => {
        //destructuring:
        const { flag, region, name: {common: countryName}, population } = country;

        countryList.innerHTML +=
            `<li>
                    <div class="row-country">
                    <span>${flag}</span>
                    <h4 class="${switchRegionForColor(region)}">${countryName}</h4>
                    </div>
                    <p>Has a population of ${population} people</p>
                    </li>`;
    });
}

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=flag,name,population,region");
        const countryArray = response.data;
        countryArray.sort((a, b) => a.population - b.population);
        mapCountryArrayInnerHTML(countryArray);
    } catch (e) {
        errorHandling(e);
    }
}

void fetchCountries();







