document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:2941/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Erfolgreicher Login
                messageDiv.innerHTML = `<p>Login erfolgreich</p>`;
                // Hier könntest du den Benutzer zum Dashboard weiterleiten oder andere Aktionen ausführen.
                // Speichere das Token z.B. im localStorage für zukünftige Anfragen.
                // localStorage.setItem('token', data.token);
                window.location.href = 'index.html'; // 
            } else {
                // Login-Fehler
                messageDiv.innerHTML = `<p>${data.error}</p>`;
            }
        } catch (error) {
            console.error('Fehler beim Login:', error);
        }
    });
});
