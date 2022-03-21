function getWeather(searchInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=" + config.weather;

    fetch(apiUrl).then(function (response) {
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
                            document.getElementById("current-icon").setAttribute("src", "http://openweathermap.org/img/w/"+ data.current.weather[0].icon +".png");
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
                                document.getElementById("f" + i + "-icon").setAttribute("src", "http://openweathermap.org/img/w/"+ data.daily[i].weather[0].icon +".png");
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

function getHistory() {
    var history = JSON.parse(localStorage.getItem("history"));
    console.log("history", history);
    var html = "";
    if (history) {
        for (var i = 0; i < history.length; i++) {
            html += '<div id="'+ history[i] + '" class="btn btn-block btn-secondary">' + history[i] + '</div>';
            console.log(html);
        }
        $("#history").html(html);
    } 
}

function saveCity(searchInput) {
    var history = JSON.parse(localStorage.getItem("history"));
    if (history) {
        history.push(searchInput);
    } else {
        history = [];
        history.push(searchInput);
    }
    localStorage.setItem("history", JSON.stringify(history));
    getHistory();
    console.log(history)
}

getHistory();

$("#search").on("click", function () {
    var searchInput = document.querySelector("#city").value;
    console.log(searchInput);

    getWeather(searchInput);
    getDate();
    saveCity(searchInput);
});

$("#history").on("click", ".btn", function () {
    var idString = "#" + this.id;
    var textInput = $(idString).text();
    getWeather(textInput);
    getDate();
});