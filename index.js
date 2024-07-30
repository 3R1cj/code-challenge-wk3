// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');
    
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    renderList();

    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });

    shoppingList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const index = e.target.dataset.index;
            items[index].purchased = !items[index].purchased;
            updateLocalStorage();
            renderList();
        }
    });

    clearListButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.dataset.index = index;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            shoppingList.appendChild(li);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
});
