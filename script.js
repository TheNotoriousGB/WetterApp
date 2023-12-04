const apiUrl = 'http://localhost:2940/api/v1/entities'; // Hier die API-URL anpassen

function displayWeatherData(data) {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = ''; // Leeren des Container-Elements

  const input = document.getElementById("input").value.trim(); // Eingabewert abrufen und Trimmen

  if (typeof input === 'string' || input instanceof String) { // Überprüfen, ob input ein String ist
    const filteredData = data.filter(item => item.location === input);

    if (filteredData.length > 0) {
      const weatherItem = document.createElement("div");
      weatherItem.classList.add("weather-item");

      const locationElement = document.createElement("p");
      locationElement.textContent = `Ort: ${filteredData[0].location}`;

      const temperatureElement = document.createElement("p");
      temperatureElement.textContent = `Temperatur: ${filteredData[0].temperature} °C`;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Beschreibung: ${filteredData[0].description}`;

      weatherItem.appendChild(locationElement);
      weatherItem.appendChild(temperatureElement);
      weatherItem.appendChild(descriptionElement);

      weatherContainer.appendChild(weatherItem);
    } else {
      console.error(`Stadt '${input}' nicht gefunden.`);
    }
  } else {
    console.error("Ungültige Eingabe.");
  }
}

function getWeatherDataFromAPI(cityName) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data); // Anzeige der Wetterdaten
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Daten:', error);
    });
}

document.getElementById("submitButton").addEventListener("click", function() {
  getWeatherDataFromAPI();
});

// Funktion zum Laden des Inhalts basierend auf der Hash-Änderung
function loadContent() {
  const content = document.querySelector('.content');
  let path = window.location.hash.substring(1); // Hole den Pfad aus der URL

  if (path === '') {
    path = '/'; // Setze den Pfad auf die Startseite, wenn keine Hash-Werte vorhanden sind
  }

  fetch(`/pages${path}.html`) // Lade den HTML-Inhalt der entsprechenden Seite
    .then(response => response.text())
    .then(html => {
      content.innerHTML = html; // Füge den HTML-Inhalt in den Hauptbereich ein
    })
    .catch(error => {
      console.error('Fehler beim Laden der Seite:', error);
    });
}

// Event-Listener, um loadContent() bei Änderung des Hash-Wertes aufzurufen
window.addEventListener('hashchange', loadContent);

// Beim Laden der Seite loadContent() aufrufen, um den initialen Inhalt zu laden
window.addEventListener('load', loadContent);