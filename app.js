// on page load this will execute
window.addEventListener("load", () => {
  let longitude;
  let latitude;

  // if the user allows location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const api = `http://api.weatherapi.com/v1/forecast.json?key=3b988c978207414fb3e82720220906&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // get all of the current weather data for today
          const {temp_c, temp_f, feels_like_c, feels_like_f } = data.current
          const summary = data.current.condition.text
        });
    });
  } else {
    h1.textContent = "This app won't work without location enabled.";
  }
});
