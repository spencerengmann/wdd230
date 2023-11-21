
const LATI = 5.5912029;
const LONG = -0.2623024;
const APIKEYS = "dd1c15f9845223a7a99783c584c93af6";
const weatherURLS = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATI}&lon=${LONG}&appid=${APIKEYS}&units=imperial`;

const ONE_DAY = 24 * 60 * 60 * 1000

function showForecast(forecasts){
    // Get dates for next three days
    console.log(forecasts);
    let dates = []
    let mydate = new Date();
    for (let i=0; i < 3; i++){
        mydate = new Date(mydate.getTime() + ONE_DAY)
        nextdate = mydate.toISOString().slice(0, 10)
        dates.push(nextdate)
    }
    console.log(dates)
    
    // Find the object with the highest temperature for each day
    highTemps = dates.map((date) => forecasts
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((currentObj, highObj) => currentObj.main.temp > highObj.main.temp ? currentObj : highObj)
    )    
    // Find the object with the lowest temperature for each day
    lowTemps = dates.map((date) => forecasts
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((currentObj, lowObj) => currentObj.main.temp < lowObj.main.temp ? currentObj : lowObj)        
    )    
    console.log(highTemps)
    console.log(lowTemps)

    // Add the forecast information to the HTML document
    weatherElt = document.querySelector("#weather")
    for (let i=0; i < 3; i++){
        let newsection = document.createElement("section");
        newsection.innerHTML = `<h3>${dates[i]}</h3><p>High: ${highTemps[i].main.temp.toFixed(0)}&deg;</p><p>Low: ${lowTemps[i].main.temp.toFixed(0)}&deg;</p>`
        weatherElt.append(newsection)
    }    
  
}

async function fetchForecast() {
    try {
      const response = await fetch(weatherURLS);
      if (response.ok) {
        const data = await response.json();        
        showForecast(data.list);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

fetchForecast()