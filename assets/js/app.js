(async function(){
    

    /* 
        Промисификация получения координат. Функция не помеченя как async НО в коде фукнции явно возвращается Promise. Внутри создаваемого и возвращаемого Promise выполняется получение координат и если они получены успешно то делается resolve, в случае неудачного получения - делается reject.
    */
    function getCoords(){

        /* Создаём и возвращаем Promise, это позволит при вызове функции применить await */
        return new Promise((resolve, reject) => {

            globalThis.navigator.geolocation.getCurrentPosition( successInfo => {
                resolve({
                    lat: successInfo.coords.latitude,
                    lon: successInfo.coords.longitude
                });
            }, failInfo => reject(failInfo) )

        });

    }

    let userCoords = await getCoords(); // Вызываем нашу промисифицированную функцию для получения координат;

    const weatherAPIKey = '9f118bfa230072d3603183e520cea4af'; // Ключ к API-сервису OpenWeather;

    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userCoords.lat}&lon=${userCoords.lon}&units=metric&appid=${weatherAPIKey}`; // URL к API-сервису OpenWeather для получения текущей погоды по координатам;

    let weatherData = await fetch(weatherURL); 
        weatherData = await weatherData.json();

    let weatherDateTime = new Date(weatherData.dt * 1000); //На основании timestamp'а получаем дату/время на которое сервис выдал информацию о погоде.  
  
    console.log(`${weatherData.name}: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp} C° (at ${weatherDateTime.toLocaleString()})`); // Выводим название города, описание погоды, температуру и дату/время определения погоды. 
    
})()

   