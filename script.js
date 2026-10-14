document.addEventListener("DOMContentLoaded",()=>{
    const cityInput=document.getElementById("city-input");
    const getWeatherBtn=document.getElementById("get-weather-btn");
    const weatherInfo=document.getElementById("weather-info");
    const cityNameDisplay=document.getElementById("city-name");
    const tempDisplay=document.getElementById("temp");
    const descDisplay=document.getElementById("description");
    const errormessage=document.getElementById("error-msg");
    const API_KEY="86115e91d531ee02fa36fc9f071b82f7";//env variable
    getWeatherBtn.addEventListener("click",async()=>{
        const city=cityInput.value.trim();
        if (!city) return;
        try{
            const weatherData=await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            showerror();
        }
    })
    async function fetchWeatherData(city){
        //gets the data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response=await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);
        if (!response.ok){
            throw new Error("City not found");
        }
        const data=await response.json();
        return data;
    }
    function displayWeatherData(data){
        //display
        console.log(data);
        const {name,main,weather}=data;
        cityNameDisplay.textContent=name;
        tempDisplay.textContent=`Temperature : ${main.temp} C`;
        descDisplay.textContent=`Weather : ${weather[0].description}`;
        //unlock the display
        weatherInfo.classList.remove('hidden');
        errormessage.classList.add('hidden');
    }
    function showerror(){
        weatherInfo.classList.remove("hidden");
        errormessage.classList.add("hidden");
    }
})
