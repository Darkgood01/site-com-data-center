document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const itemForm = document.getElementById('item-form');
    const itemList = document.getElementById('item-list');
    const categoryFilter = document.getElementById('category-filter');
    const logoutButton = document.getElementById('logout-button');
    const visitorAccessButton = document.createElement('button');
    visitorAccessButton.textContent = 'Acessar como Visitante';
    document.getElementById('auth-section').appendChild(visitorAccessButton);

    // Função para verificar autenticação
    function isAuthenticated() {
        const token = localStorage.getItem('token');
        if (token) {
            const expiration = new Date(localStorage.getItem('tokenExpiration'));
            return expiration > new Date();
        }
        return false;
    }

    // Função para gerar token de visitante
    function generateVisitorToken() {
        const token = 'visitor-token';
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Expira em 1 semana
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationDate);
        toggleSections();
        alert('Acesso de visitante ativado por 1 semana.');
        fetchItems();
    }

    // Adiciona evento de clique para acesso de visitante
    visitorAccessButton.addEventListener('click', generateVisitorToken);

    function toggleSections() {
        document.getElementById('auth-section').style.display = isAuthenticated() ? 'none' : 'block';
        document.getElementById('app-section').style.display = isAuthenticated() ? 'block' : 'none';
    }
    toggleSections();

    // Registro de novo usuário
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            await res.json();
            alert('Usuário registrado com sucesso!');
        } catch (error) {
            console.error(error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenExpiration', new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)); // 1 semana
            toggleSections();
            fetchItems();
        } catch (error) {
            console.error(error);
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        toggleSections();
        itemList.innerHTML = '';
    });

    if (isAuthenticated()) fetchItems();
});
