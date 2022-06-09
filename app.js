// on page load this will execute
window.addEventListener("load", () => {
  let longitude;
  let latitude;

  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-span");

  
  // get the user's current date & time data
  let date = document.querySelector(".date");
  let currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  currentDate = dateFormatter.format(currentDate);
  

  // if the user allows location access, fetch data from the weather API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=3b988c978207414fb3e82720220906&q=${latitude},${longitude}&days=1`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          // get all of the relevant current weather data for today
          const { temp_c, temp_f, is_day, precip_mm } = data.current;
          const desc = data.current.condition.text;
          const { country, name } = data.location;

          // Set DOM elements from the API
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = desc;
          locationTimezone.textContent = `${name}, ${country}`;
          date.textContent = currentDate;

          // Find the appropriate icon associated with the current weather
          setIcon(desc, document.querySelector(".icon"), is_day, precip_mm);

          // toggle weather between celsius and fahrenheit when clicked
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp_c;
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = temp_f;
            }
          });
        });
    });
  } else {
    h1.textContent = "This app won't work without location enabled.";
  }

  // conditionally render skycons based on specific parameters 
  function setIcon(desc, iconID, isDay, precitipation) {
    let icon = "";
    const skycons = new Skycons({ color: "white" });
    desc = desc.toLowerCase();
    skycons.play();
    if (desc.includes("snow")) {
      icon = isDay ? "SNOW_SHOWERS_DAY" : "SNOW_SHOWERS_NIGHT";
    } else if (desc.includes("rain") && precitipation < 5) {
      icon = isDay ? "SHOWERS_DAY" : "SHOWERS_NIGHT";
    } else if (desc.includes("rain")) {
      icon = "RAIN";
    } else if (desc.includes("partly cloudy")) {
      icon = isDay ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
    } else if (desc.includes("thunder") || desc.includes("storm")) {
      icon = "THUNDER";
    } else if (desc.includes("cloudy")) {
      icon = "CLOUDY";
    } else if (desc.includes("wind")) {
      icon = "WIND";
    } else if (desc.includes("fog")) {
      icon = "FOG";
    } else {
      isDay ? "CLEAR_DAY" : "CLEAR_NIGHT";
    }
    return skycons.set(iconID, Skycons[icon]);
  }
});

