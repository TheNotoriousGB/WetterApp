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

            if (response.ok) {
                const data = await response.json();
                // Erfolgreicher Login
                messageDiv.innerHTML = `<p>Login erfolgreich</p>`;
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = 'index.html';
            } else {
                // Login-Fehler
                const data = await response.json();
                messageDiv.innerHTML = `<p>${data.error}</p>`;
            }
        } catch (error) {
            console.error('Fehler beim Login:', error);
        }

    });
});
