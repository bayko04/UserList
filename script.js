const API = 'https://jsonplaceholder.typicode.com/users';
const users = document.querySelector('.users');
const cardsList = document.querySelector('.cards-list');
const reload = document.getElementById('reload');
const sortWithout = document.getElementById('without-sort');
const sortName = document.getElementById('sort-name');
const sortEmail = document.getElementById('sort-email');
const showError = document.createElement('h2');

const fetchData = async () => {
    try {
        const response = await fetch(API);

        if (!response.ok) {
            showError.textContent = `HTTP error! Status: ${response.status}`;
            users.appendChild(showError);
            return;
        }

        const data = await response.json();
        let sortedData = data.slice();

        const renderData = () => {
            cardsList.innerHTML = '';
            sortedData.forEach(item => {
                const card = document.createElement('div');
                const name = document.createElement('h5');
                const email = document.createElement('p');
                const phone = document.createElement('p');

                card.classList.add('card');

                name.textContent = item.name;
                email.textContent = item.email;
                phone.textContent = item.phone;

                card.appendChild(name);
                card.appendChild(email);
                card.appendChild(phone);
                cardsList.appendChild(card);
            });
        };

        const handleSort = (type) => {
            cardsList.innerHTML = '';

            switch (type) {
                case 'name':
                    sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'email':
                    sortedData = data.slice().sort((a, b) => a.email.localeCompare(b.email));
                    break;
                default:
                    sortedData = data.slice();
            }
            renderData();
        };

        const handleReload = async () => {
            cardsList.innerHTML = '';
            sortedData = data.slice();
            await fetchData();
            renderData();
        };

        renderData();
        reload.addEventListener('click', handleReload);
        sortWithout.addEventListener('click', () => handleSort());
        sortName.addEventListener('click', () => handleSort('name'));
        sortEmail.addEventListener('click', () => handleSort('email'));

    } catch (error) {
        
        showError.textContent = `Error: ${error.message}`;
        users.appendChild(showError);
    }
};

fetchData();