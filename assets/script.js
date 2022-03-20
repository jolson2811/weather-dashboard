function getWeather(searchInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=e61750891a4fdfde0e65aaf0535b7f1f";
    
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