function dayTheme() {
  let main = document.querySelector(".main");
  const time = new Date();
  const hours = time.getHours();
  if (hours < 6) {
    main.classList.toggle("main-night");
  } else if (hours < 9) {
    main.classList.toggle("main-dawn");
  } else if (hours < 12) {
    main.classList.toggle("main-morning");
  } else if (hours < 18) {
    main.classList.toggle("main-day");
  } else if (hours < 22) {
    main.classList.toggle("main-afternoon");
  } else {
    main.classList.toggle("main-night");
  }
}
dayTheme();

const search = document.querySelector(".search__input"),
  image = document.querySelector(".weather__img"),
  temp = document.querySelector(".weather__number"),
  sunrice = document.querySelector(".sun__sunrice-value"),
  sunset = document.querySelector(".sun__sunset-value"),
  address = document.querySelector(".location__address"),
  wDay = document.getElementById("day"),
  time = document.getElementById("time"),
  humidity = document.getElementById("humidity"),
  pressure = document.getElementById("pressure"),
  feels = document.getElementById("feels"),
  minTemp = document.getElementById("min-temp"),
  maxTemp = document.getElementById("max-temp"),
  windSpeed = document.getElementById("wind-speed"),
  windDirection = document.getElementById("wind-direction"),
  windDeg = document.querySelector(".wind__image");

setInterval(() => {
  let date = new Date();
  let days = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  wDay.innerText = day;
  time.innerText = hours + ":" + minutes + ":" + seconds;
}, 1000);

function requestApi() {
  search.addEventListener("keypress", (event) => {
    if (event.keyCode == 13) {
      let city = (address.innerText = search.value);
      // search.placeholder = `${search.value}`;
      search.value = "";
      let apiKey = "2068d1e1fc58b4004b21256098ae5d15",
        API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      fetch(API)
        .then((weather) => weather.json())
        .then((data) => {
          temp.innerText = Math.round(data.main.temp - 273);
          let imgN = data.weather[0].icon;
          image.src = `https://openweathermap.org/img/wn/${imgN}@2x.png`;
          let sunRice = new Date(data.sys.sunrise * 1000),
            sunSet = new Date(data.sys.sunset * 1000),
            srh = sunRice.getHours(),
            ssh = sunSet.getHours(),
            srm = sunRice.getMinutes(),
            ssm = sunSet.getMinutes();
          if (srh < 10) {
            srh = "0" + srh;
          }
          if (srm < 10) {
            srm = "0" + srm;
          }
          if (ssh < 10) {
            ssh = "0" + ssh;
          }
          if (ssm < 10) {
            ssm = "0" + ssm;
          }
          sunrice.innerText = srh + ":" + srm;
          sunset.innerText = ssh + ":" + ssm;

          humidity.innerText = Math.round(data.main.humidity) + "%";
          pressure.innerText = Math.round(data.main.pressure) + " мм";
          feels.innerText = Math.round(data.main.feels_like - 273) + "°C";
          maxTemp.innerText = Math.round(data.main.temp_max - 273) + "°C";
          minTemp.innerText = Math.round(data.main.temp_min - 273) + "°C";
          windSpeed.innerText = Math.round(data.wind.speed) + " м/с";
          let WindDeg = Math.round(data.wind.deg);
          if (WindDeg > 338 && WindDeg < 360) {
            windDeg.style.transform = "rotate(0deg)";
            windDirection.innerText = "Північний";
          } else if (WindDeg > 0 && WindDeg < 23) {
            windDeg.style.transform = "rotate(0deg)";
            windDirection.innerText = "Північний";
          } else if (WindDeg > 23 && WindDeg < 68) {
            windDeg.style.transform = "rotate(45deg)";
            windDirection.innerText = "Північно-східний";
          } else if (WindDeg > 68 && WindDeg < 113) {
            windDeg.style.transform = "rotate(90deg)";
            windDirection.innerText = "Східний";
          } else if (WindDeg > 113 && WindDeg < 158) {
            windDeg.style.transform = "rotate(135deg)";
            windDirection.innerText = "Південно-східний";
          } else if (WindDeg > 158 && WindDeg < 203) {
            windDeg.style.transform = "rotate(180deg)";
            windDirection.innerText = "Південний";
          } else if (WindDeg > 203 && WindDeg < 248) {
            windDeg.style.transform = "rotate(225deg)";
            windDirection.innerText = "Південно-західний";
          } else if (WindDeg > 248 && WindDeg < 293) {
            windDeg.style.transform = "rotate(270deg)";
            windDirection.innerText = "Західний";
          } else if (WindDeg > 293 && WindDeg < 338) {
            windDeg.style.transform = "rotate(315deg)";
            windDirection.innerText = "Північно-західний";
          }
          console.log(data);
        });
    }
  });
}
requestApi();
