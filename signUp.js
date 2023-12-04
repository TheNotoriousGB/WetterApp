document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:2941/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (response.ok) {
                // Erfolgreiche Registrierung
                messageDiv.innerHTML = `<p>Registrierung erfolgreich</p>`;
                // Hier könnten Sie den Benutzer zum Login weiterleiten oder andere Aktionen ausführen.
                window.location.href = 'login.html';
            } else {
                // Registrierungsfehler
                messageDiv.innerHTML = `<p>${data.error || data}</p>`;
            }
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
        }
    });
});
