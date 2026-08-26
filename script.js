// ===============================
// Weather App - El Oued
// ===============================


// 1. HTML Elements
const cityName = document.querySelector(".city-name");
const temperatureElement = document.querySelector(".temperature");
const descriptionElement = document.querySelector(".weather-description");

const windValue = document.querySelector(".wind-value");
const humidityValue = document.querySelector(".humidity-value");
const sunValue = document.querySelector(".sun-value");

const hourlyCards = document.querySelector(".hourly-cards");


// 2. El Oued Coordinates
const latitude = 33.35608;
const longitude = 6.86319;


// 3. Open-Meteo API
const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&hourly=temperature_2m,weather_code` +
    `&daily=sunshine_duration` +
    `&timezone=auto`;


// 4. Get Weather Data
fetch(weatherUrl)

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        console.log(data);


        // ===============================
        // CURRENT WEATHER
        // ===============================

        const currentTemperature =
            data.current.temperature_2m;

        const currentHumidity =
            data.current.relative_humidity_2m;

        const currentWind =
            data.current.wind_speed_10m;

        const currentWeatherCode =
            data.current.weather_code;


        // City
        cityName.textContent = "El Oued, Algeria";


        // Temperature
        temperatureElement.textContent =
            `${currentTemperature}°`;


        // Wind
        windValue.textContent =
            `${currentWind} km/h`;


        // Humidity
        humidityValue.textContent =
            `${currentHumidity}%`;


        // Sun Hours
        const sunshineSeconds =
            data.daily.sunshine_duration[0];

        const sunshineHours =
            (sunshineSeconds / 3600).toFixed(1);

        sunValue.textContent =
            `${sunshineHours}h`;


        // ===============================
        // CURRENT WEATHER DESCRIPTION
        // ===============================

        if (currentWeatherCode === 0) {

            descriptionElement.textContent =
                "Clear Sky";

        } else if (
            currentWeatherCode === 1 ||
            currentWeatherCode === 2
        ) {

            descriptionElement.textContent =
                "Partly Cloudy";

        } else if (currentWeatherCode === 3) {

            descriptionElement.textContent =
                "Overcast";

        } else if (
            currentWeatherCode >= 51 &&
            currentWeatherCode <= 67
        ) {

            descriptionElement.textContent =
                "Rain";

        } else if (
            currentWeatherCode >= 80 &&
            currentWeatherCode <= 82
        ) {

            descriptionElement.textContent =
                "Rain Showers";

        } else if (currentWeatherCode >= 95) {

            descriptionElement.textContent =
                "Thunderstorm";

        } else {

            descriptionElement.textContent =
                "Unknown";
        }


        // ===============================
        // HOURLY DATA
        // ===============================

        const hourlyTimes =
            data.hourly.time;

        const hourlyTemperatures =
            data.hourly.temperature_2m;

        const hourlyWeatherCodes =
            data.hourly.weather_code;


        // ===============================
        // FIND CURRENT HOUR
        // ===============================

        const currentHour =
            new Date().getHours();

        const startIndex =
            hourlyTimes.findIndex(function(time) {

                return new Date(time).getHours()
                    === currentHour;

            });


        // ===============================
        // REMOVE OLD HTML CARDS
        // ===============================

        hourlyCards.innerHTML = "";


        // ===============================
        // CREATE 4 CARDS
        // ===============================

        for (
            let i = startIndex;
            i < startIndex + 4;
            i++
        ) {

            // Card
            const card =
                document.createElement("div");

            card.classList.add("card");


            // ===============================
            // ICON
            // ===============================

            const icon =
                document.createElement("i");

            const code =
                hourlyWeatherCodes[i];


            if (code === 0) {

                icon.className =
                    "fa-solid fa-sun";

            } else if (
                code === 1 ||
                code === 2
            ) {

                icon.className =
                    "fa-solid fa-cloud-sun";

            } else if (code === 3) {

                icon.className =
                    "fa-solid fa-cloud";

            } else if (
                code >= 51 &&
                code <= 67
            ) {

                icon.className =
                    "fa-solid fa-cloud-rain";

            } else if (
                code >= 80 &&
                code <= 82
            ) {

                icon.className =
                    "fa-solid fa-cloud-showers-heavy";

            } else if (code >= 95) {

                icon.className =
                    "fa-solid fa-cloud-bolt";

            }


            card.appendChild(icon);


            // ===============================
            // TIME
            // ===============================

            const date =
                new Date(hourlyTimes[i]);

            const hour =
                date.getHours();


            let formattedTime;


            if (hour === 0) {

                formattedTime = "12 AM";

            } else if (hour === 12) {

                formattedTime = "12 PM";

            } else if (hour > 12) {

                formattedTime =
                    `${hour - 12} PM`;

            } else {

                formattedTime =
                    `${hour} AM`;
            }


            const time =
                document.createElement("p");


            if (i === startIndex) {

                time.textContent = "Now";

            } else {

                time.textContent =
                    formattedTime;
            }


            card.appendChild(time);


            // ===============================
            // TEMPERATURE
            // ===============================

            const temp =
                document.createElement("span");

            temp.textContent =
                `${hourlyTemperatures[i]}°`;


            card.appendChild(temp);


            // ===============================
            // ADD CARD TO PAGE
            // ===============================

            hourlyCards.appendChild(card);
        }

    })

    .catch(function(error) {

        console.log(
            "Something went wrong:",
            error
        );

    });