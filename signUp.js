// Warte, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // Wähle das Registrierungsformular und das Nachrichten-Div im DOM aus
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    // Füge einen Event-Listener hinzu, der auf das Absenden des Registrierungsformulars reagiert
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Verhindere das Standardverhalten des Formulars (Seiten-Neuladen)

        // Erfasse Benutzername und Passwort aus den Eingabefeldern
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Sende eine POST-Anfrage an den Server, um einen neuen Benutzer zu registrieren
            const response = await fetch('http://localhost:2941/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Sende Benutzername und Passwort im JSON-Format
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json(); // Verarbeite die Antwort als JSON, wenn der Typ korrekt ist
            } else {
                data = await response.text(); // Andernfalls verarbeite die Antwort als Text
            }

            if (response.ok) {
                // Wenn die Registrierung erfolgreich ist
                messageDiv.innerHTML = `<p>Registrierung erfolgreich</p>`; // Zeige Erfolgsmeldung an
                // Hier wird der Benutzer zur Login-Seite weitergeleitet.
                window.location.href = 'login.html';
            } else {
                // Wenn die Registrierung fehlschlägt
                messageDiv.innerHTML = `<p>${data.error || data}</p>`; // Zeige die Fehlermeldung an
            }
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error); // Zeige Fehlermeldung in der Konsole an
        }
    });
});
