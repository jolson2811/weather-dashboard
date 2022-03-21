function getWeather(searchInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=" + config.weather;

    fetch(apiUrl).then(function (response) {
        console.log("functionfired");
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                var city = data.name;

                var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + config.weather;
                fetch(apiUrl2).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log("apiCall2", data);
                            document.getElementById("current-name").innerText = "City: " + city;
                            document.getElementById("current-temp").innerText = "Temp: " + data.current.temp;
                            document.getElementById("current-wind").innerText = "Wind: " + data.current.wind_speed + " MPH";
                            document.getElementById("current-humidity").innerText = "Humidity: " + data.current.humidity + " %";
                            document.getElementById("current-uv").innerText = "UV Index: " + data.current.uvi;
                            

                            if (parseInt(data.current.uvi) <= 2) {
                                $("#current-uv").addClass("list-group-item-success");
                            } 

                            if (parseInt(data.current.uvi) >=3 && parseInt(data.current.uvi) <=7) {
                                $("#current-uv").addClass("list-group-item-warning");
                            } 

                            if (parseInt(data.current.uvi) > 7) {
                                $("#current-uv").addClass("list-group-item-danger");
                            } 


                            for (var i = 0; i < 5; i++) {
                                var tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + (i + 1));
                                var setDate = tomorrow.toLocaleDateString();
                                document.getElementById("f" + i + "-date").innerText = setDate;
                                document.getElementById("f" + i + "-temp").innerText = "Temp: " + data.daily[i].temp.day;
                                document.getElementById("f" + i + "-wind").innerText = "Wind: " + data.daily[i].wind_speed + " MPH";
                                document.getElementById("f" + i + "-humidity").innerText = "Humidity: " + data.daily[i].humidity + " %";
                                document.getElementById("f" + i + "-uv").innerText = "UV Index: " + data.daily[i].uvi;
                            }
                        });
                    }
                })


            });
        }
    })

};

function getDate() {
    let today = new Date().toLocaleDateString();
    document.getElementById("current-date").innerText = today;
};

var colors = ["green", "yellow", "red"];


function uvColor() {

}

$("#search").on("click", function () {
    var searchInput = document.querySelector("#city").value;
    console.log(searchInput);

    getWeather(searchInput);
    getDate();
});