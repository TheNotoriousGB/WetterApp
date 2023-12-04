
// Wähle das Formular und die Eingabefelder im Dokument aus
const form = document.querySelector('form');
const table = document.querySelector('table');
const locationInput = document.querySelector('#location');
const temperatureInput = document.querySelector('#temperature');
const descriptionInput = document.querySelector('#description');

const api_url = 'http://localhost:2940/api/v1/entities';

// Füge einen Event-Listener hinzu, der auf das Absenden des Formulars reagiert
form.addEventListener('submit', (event) => {
  // Verhindere das Neuladen der Seite
  event.preventDefault();

  // Erfasse die Werte der Eingabefelder
  const locationValue = locationInput.value;
  const temperatureValue = temperatureInput.value;
  const descriptionValue = descriptionInput.value;

  // Zeige die Werte der Eingabefelder in der Konsole an
  console.log(locationValue, temperatureValue, descriptionValue);

  // Erstelle ein Objekt mit den Daten
  const data = {
    location: locationValue,
    temperature: temperatureValue,
    description: descriptionValue
  };

  // Sende die Daten an den Server
  fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(message => console.log(message))
  .catch(error => console.error('Fehler:', error));
});

// Laden Sie die Daten aus der JSON-Datei
fetch(api_url)
  .then(response => response.json())
  .then(data => {
    // Verwenden Sie hier die Daten
    data.forEach(item => {
      const row = document.createElement('tr');
      const locationCell = document.createElement('td');
      const temperatureCell = document.createElement('td');
      const descriptionCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      const changeButton = document.createElement('button');

      locationCell.textContent = item.location;
      temperatureCell.textContent = item.temperature;
      descriptionCell.textContent = item.description;
      deleteButton.textContent = 'Löschen';
      changeButton.textContent = 'Ändern';

      deleteButton.id = 'delete';
      changeButton.id = 'change';

      actionCell.appendChild(deleteButton);
      actionCell.appendChild(changeButton);

      row.appendChild(locationCell);
      row.appendChild(temperatureCell);
      row.appendChild(descriptionCell);
      row.appendChild(actionCell);

      table.appendChild(row);
    });
  })
  .catch(error => console.error('Fehler:', error));


 // Event-Listener für den "Löschen"-Button
table.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    const row = event.target.parentNode.parentNode;
    const locationValue = row.children[0].textContent;

    // Sende eine DELETE-Anfrage an den Server
    fetch(`${api_url}/${locationValue}`, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      // Entferne die Zeile aus der Tabelle
      row.remove();
    })
    .catch(error => console.error('Fehler:', error));
  }
});

// Event-Listener für den "Ändern"-Button
table.addEventListener('click', (event) => {
  if (event.target.id === 'change') {
    const row = event.target.parentNode.parentNode;
    const locationValue = row.children[0].textContent;
    const newTemperatureValue = prompt('Geben Sie den neuen Temperaturwert ein');

    // Sende eine PUT-Anfrage an den Server
    fetch(`${api_url}/${locationValue}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ temperature: newTemperatureValue })
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      // Aktualisiere den Temperaturwert in der Tabelle
      row.children[1].textContent = newTemperatureValue;
    })
    .catch(error => console.error('Fehler:', error));
  }
});