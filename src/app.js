import axios from "axios";

const countryList = document.getElementById("countries");
const errorMessage = document.getElementById("error");

// function getCountryColor(continent) {
//     switch (continent) {
//         case "Africa":
//             continent = "blue";
//             break;
//         case "Asia":
//             continent = "red";
//             break;
//         case "Europe":
//             continent = "yellow";
//             break;
//         case "Oceania":
//             continent = "purple";
//             break;
//         case "North America":
//             continent = "green";
//             break;
//         case "South America":
//             continent = "light-green";
//             break;
//         case "Antarctica":
//             continent = "grey";
//             break;
//         default:
//             continent = "black";
//     }
//     return continent;
// }

function mapCountryArrayInnerHTML(array) {
    array.map((country) => {
        const continent = country.region;
        // getCountryColor(continent);
        countryList.innerHTML +=
            `<li>
                    <p>${country.flag}</p>
                    <h4 class="${continent}">${country.name.common}</h4>
                    <p>Has a population of ${country.population} people</p>
                    </li>`;
    });
}


async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=flag,name,population,continents,region");
        const countryArray = response.data;
        console.log(countryArray);
        countryArray.sort((a, b) => a.population - b.population);
        mapCountryArrayInnerHTML(countryArray);
    } catch (e) {
        //errors afvangen in console
        console.error(e);
        //errors communiceren in de UI
        if (e.response.status === 404) {
            errorMessage.textContent = "Page not found | 404";
        } else if (e.response.status === 500) {
            errorMessage.textContent = "Internal server error | 500";
        }
    }
}

void fetchCountries();






