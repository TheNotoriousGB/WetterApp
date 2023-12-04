// Warte, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // Wähle das Anmeldeformular und das Nachrichten-Div im DOM aus
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // Füge einen Event-Listener hinzu, der auf das Absenden des Anmeldeformulars reagiert
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Verhindere das Standardverhalten des Formulars (Seiten-Neuladen)

        // Erfasse Benutzername und Passwort aus den Eingabefeldern
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Sende eine POST-Anfrage an den Server, um die Anmeldeinformationen zu überprüfen
            const response = await fetch('http://localhost:2941/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Sende Benutzername und Passwort im JSON-Format
            });

            if (response.ok) {
                // Wenn die Anmeldung erfolgreich ist
                const data = await response.json();
                messageDiv.innerHTML = `<p>Login erfolgreich</p>`; // Zeige Erfolgsmeldung an
                localStorage.setItem('accessToken', data.accessToken); // Speichere den Zugriffstoken im localStorage
                window.location.href = 'index.html'; // Leite den Benutzer zur Hauptseite weiter
            } else {
                // Wenn die Anmeldung fehlschlägt
                const data = await response.json();
                messageDiv.innerHTML = `<p>${data.error}</p>`; // Zeige den Fehlernachricht im Nachrichten-Div an
            }
        } catch (error) {
            console.error('Fehler beim Login:', error); // Zeige Fehlermeldung in der Konsole an
        }
    });
});
