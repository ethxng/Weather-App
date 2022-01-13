async function getAPI(data){
    // (units = imperial) is Farenheit
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data + '&appid=57455ba022648fb0749860a02443a2dd&units=imperial';
    let response = await fetch(url, {mode: 'cors'});
    let result = await response.json();
    return result;
}

function getData(obj){
    // arr = [name, weather.description, main.temp, main.feels_like, wind.speed, main.humidity]
    let arr = [obj.name, obj.weather[0].description, obj.main.temp, obj.main.feels_like, obj.wind.speed, obj.main.humidity];
    return arr;
}

function createFramework(info){
    // info is an array contains the necessary data 
    let container = document.querySelector(".container");
    document.querySelectorAll(".box").forEach((b) => {
        b.parentNode.removeChild(b);
    });
    let box = document.createElement('div');
    box.classList.add('box');
    box.style.cssText = "height: 400px; width: 350px; border: 1px solid black; margin-top: 200px; margin-left: 50px";
    container.appendChild(box);

    let data = document.createElement('div');
    data.classList.add('data');
    data.style.cssText = "padding: 15px";
    box.appendChild(data);

    let name = document.createElement('div');
    name.textContent = info[0];
    name.style.cssText = "font-size: 35px; color: white; font-weight: 100px; padding: 10px";
    data.appendChild(name);

    let description = document.createElement('div');
    description.textContent = info[1];
    description.style.cssText = "font-size: 30px; color: white; padding: 10px";
    data.appendChild(description);

    let mainTemp = document.createElement('div');
    mainTemp.textContent = info[2] + '°F';
    mainTemp.style.cssText = "font-size: 40px; color: white; padding: 10px";
    data.appendChild(mainTemp);

    let feels_like = document.createElement('div');
    feels_like.textContent = "Feels like: " + info[3] + '°F';
    feels_like.style.cssText = "font-size: 30px; color: white; padding: 10px";
    data.appendChild(feels_like);

    let wind = document.createElement("div");
    wind.textContent = "Wind: " + info[4] + " MPH";
    wind.style.cssText = "font-size: 30px; color: white; padding: 10px";
    data.appendChild(wind);

    let humidity = document.createElement("div");
    humidity.textContent = "Humidity: " + info[5] + "%";
    humidity.style.cssText = "font-size: 30px; color: white; padding: 10px";
    data.appendChild(humidity);
}

async function addGIF(description){
    let container = document.querySelector(".container");
    if (document.querySelector('img') != null)
        document.querySelector('img').parentNode.removeChild(document.querySelector('img'));
    let img = document.createElement('img');

    // fetch a GIF from Giphy API
    let url = 'https://api.giphy.com/v1/gifs/translate?api_key=warphZZbyQnU52oKptO9qjjovhirlgod&s=' + description;
    let response = await fetch(url, {mode: 'cors'});
    let gif = await response.json();

    img.src = gif.data.images.original.url;
    img.style.cssText = 'height: 400px; width: 350px; margin-top: 200px';
    container.appendChild(img);
}

// generate a default page when the user first entered
function defaultPage(){
    let arr = ["Mars", 'cold and red', '-81', '∞', '62', '80-100'];
    createFramework(arr);
    addGIF(arr[0]);
}

function main(){
    let myInput = document.querySelector(".search");
    defaultPage();
    myInput.addEventListener("keyup", async function(event) {
        event.preventDefault();
        if (event.keyCode === 13){
            let input = myInput.value;
            let result = await getAPI(input);
            if (result.cod === "404"){
                alert("The city you entered is not valid. Try again!");
            }
            else{
                let data = getData(result);
                createFramework(data);
                addGIF(data[1]);
            }
            myInput.value = '';
        }
    });
}

main();