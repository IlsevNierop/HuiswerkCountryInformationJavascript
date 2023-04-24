import axios from "axios";

const countryList = document.getElementById("countries");
const errorMessage = document.getElementById("error");



function switchRegionForColor(region) {
    switch (region) {
        case "Africa":
            region = "blue";
            break;
        case "Asia":
            region = "red";
            break;
        case "Europe":
            region = "yellow";
            break;
        case "Oceania":
            region = "purple";
            break;
        case "Americas":
            region = "green";
            break;

        case "Antarctic":
            region = "grey";
            break;
    }
    return region;
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
        const { flag, region, name, population } = country;

        countryList.innerHTML +=
            `<li>
                    <div class="row-country">
                    <span>${flag}</span>
                    <h4 class="${switchRegionForColor(region)}">${name.common}</h4>
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






