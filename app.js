// on page load this will execute
window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  // if the user allows location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const api = `http://api.weatherapi.com/v1/forecast.json?key=3b988c978207414fb3e82720220906&q=${latitude},${longitude}&days=1`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // get all of the relevant current weather data for today
          const { temp_c, is_day, precip_mm } = data.current;
          const desc = data.current.condition.text;
          const { country, localtime, name, tz_id } = data.location;

          // Set DOM elements from the API
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = desc;
          locationTimezone.textContent = `${name}, ${country}`;
          setIcons(
            desc,
            document.querySelector(".icon"),
            is_day,
            precip_mm,
          );
        });
    });
  } else {
    h1.textContent = "This app won't work without location enabled.";
  }

  function setIcons(desc, iconID, isDay, precitipation) {
    let icon = "";
    // weatherSummary = weatherSummary.toLowerCase()
    const skycons = new Skycons({ color: "white" });
    desc = desc.toLowerCase()
    skycons.play();
    if (desc.includes('snow')) {
        icon = isDay ? "SNOW_SHOWERS_DAY" : "SNOW_SHOWERS_NIGHT";
    } else if (desc.includes('rain') && precitipation < 5) {
        icon = isDay ? "SHOWERS_DAY" : "SHOWERS_NIGHT"
    } else if (desc.includes('rain')) {
        icon = 'RAIN'
    } else if (desc.includes('partly cloudy')) {
        icon = isDay ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
    } else if (desc.includes('thunder') || desc.includes('storm')) {
        icon = 'THUNDER'
    } else if (desc.includes('cloudy')) {
        icon = "CLOUDY"
    } else if (desc.includes('wind')) {
        icon = "WIND"
    } else if (desc.includes('fog')) {
        icon = "FOG"
    } else {
        isDay? "CLEAR_DAY" : 'CLEAR_NIGHT'
    }

    return skycons.set(iconID, Skycons[icon]);
  }

});
