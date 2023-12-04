const apiUrl = 'http://localhost:2940/api/v1/entities'; // API-URL für Wetterdaten

// Funktion zum Anzeigen von Wetterdaten basierend auf der Eingabe
function displayWeatherData(data) {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = ''; // Leeren des Container-Elements

  const input = document.getElementById("input").value.trim(); // Eingabewert abrufen und Trimmen

  // Überprüfen, ob die Eingabe ein String ist
  if (typeof input === 'string' || input instanceof String) {
    const filteredData = data.filter(item => item.location === input);

    if (filteredData.length > 0) {
      // Erstellen der Wetteranzeige für die gefilterte Stadt
      const weatherItem = document.createElement("div");
      weatherItem.classList.add("weather-item");

      // Elemente für Ort, Temperatur und Beschreibung erstellen und hinzufügen
      const locationElement = document.createElement("p");
      locationElement.textContent = `Ort: ${filteredData[0].location}`;

      const temperatureElement = document.createElement("p");
      temperatureElement.textContent = `Temperatur: ${filteredData[0].temperature} °C`;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Beschreibung: ${filteredData[0].description}`;

      // Elemente der Wetteranzeige hinzufügen
      weatherItem.appendChild(locationElement);
      weatherItem.appendChild(temperatureElement);
      weatherItem.appendChild(descriptionElement);

      weatherContainer.appendChild(weatherItem); // Wetteranzeige hinzufügen
    } else {
      // Fehlermeldung anzeigen, wenn die Stadt nicht gefunden wurde
      console.error(`Stadt '${input}' nicht gefunden.`);
      const errorElement = document.createElement("p");
      errorElement.textContent = `Stadt '${input}' nicht gefunden.`;
      errorElement.classList.add("error-message"); // Klasse zum Styling oder zur Anzeige hinzufügen

      weatherContainer.appendChild(errorElement); // Fehlermeldung hinzufügen
    }
  } else {
    // Fehlermeldung für ungültige Eingabe anzeigen
    console.error("Ungültige Eingabe.");
  }
}

// Funktion zum Abrufen von Wetterdaten über die API
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

// Event-Listener für den Klick auf den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
  getWeatherDataFromAPI();
});

// Funktion zum Laden des Inhalts basierend auf der Hash-Änderung
function loadContent() {
  const content = document.querySelector('.content');
  let path = window.location.hash.substring(1); // Holen des Pfads aus der URL

  if (path === '') {
    path = '/'; // Setzen des Pfads auf die Startseite, wenn keine Hash-Werte vorhanden sind
  }

  // Laden des HTML-Inhalts der entsprechenden Seite
  fetch(`/pages${path}.html`)
    .then(response => response.text())
    .then(html => {
      content.innerHTML = html; // Einfügen des HTML-Inhalts in den Hauptbereich
    })
    .catch(error => {
      console.error('Fehler beim Laden der Seite:', error);
    });
}

// Event-Listener, um loadContent() bei Änderung des Hash-Wertes aufzurufen
window.addEventListener('hashchange', loadContent);

// loadContent() beim Laden der Seite aufrufen, um den initialen Inhalt zu laden
window.addEventListener('load', loadContent);
