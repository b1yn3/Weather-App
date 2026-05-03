const WEATHERapiKey='';
const GIFapiKey = '';

const location = 'Metro Manila';
const unitGroup = 'metric';
const contentType = 'json';

import './style.css';
import './image.png';

// Fetch from the APIs
async function fetchWeatherTime(){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${WEATHERapiKey}&contentType=${contentType}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error){
        console.error(error);
    }
}

async function fetchRedPanda(){
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIFapiKey}&tag=red+panda&rating=g`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        return data
    } catch(error) {
        console.error(error)
    }
}

async function makeUI(){
    const main = document.querySelector('main');
    const data = await fetchWeatherTime();
    const rp = await fetchRedPanda();

    main.innerHTML = ""; 

    const detailsDiv = document.createElement('div');
    const img = document.createElement('img'); 
    img.src = rp.data.images.original.url;     

    const addressC = document.createElement('p');
    addressC.className = 'address';
    const descC = document.createElement('p');
    descC.className = 'desc';
    const tempC = document.createElement('p');
    tempC.className = 'temp';
    const condC = document.createElement('p');
    condC.className = 'cond';

    addressC.textContent = `Address: ${data.address}`;
    descC.textContent = `Description: ${data.description}`;
    tempC.textContent = `Temperature: ${data.currentConditions.temp}`;
    condC.textContent = `Conditions: ${data.currentConditions.conditions}`;

    detailsDiv.append(addressC, descC, tempC, condC);
    main.append(detailsDiv, img);
}

document.querySelector('button').addEventListener('click', makeUI);

