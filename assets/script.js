function getWeather(searchInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=" + config.weather;
    
    fetch(apiUrl).then(function(response){
        console.log("functionfired");
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);



              });
        }
    })

};

$("#search").on("click", function(){
    var searchInput = document.querySelector("#city").value;
    console.log(searchInput);

    getWeather(searchInput);
});