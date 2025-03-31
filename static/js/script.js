document.addEventListener('DOMContentLoaded', function() {
    const monthDisplay = document.getElementById('month-display');
    const daysGrid = document.getElementById('days-grid');
    const selectedNameDisplay = document.getElementById('selected-name');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name-button');
    const nameList = document.getElementById('name-list');
    const previousMonthButton = document.getElementById('previous-month');
    const nextMonthButton = document.getElementById('next-month');
    
    let currentDate = new Date();
    let selectedName = '';
    let names = {};


            let newMonth = currentMonth + delta;
            let newYear = currentYear;

            if (newMonth > 12) {
                newMonth = 1;
                newYear++;
            } else if (newMonth < 1) {
                newMonth = 12;
                newYear--;
            }

            window.location.href = `/?month=${newMonth}&year=${newYear}`;
        }
        window.onload = function() {
            let name = document.getElementById("user-name").innerText;
            if (name === "None") {
                let name = prompt("Por favor, introduce tu nombre:");
                if (name) {
                    // Redirect to a route that handles saving the name
                    window.location.href = `/set_name?name=${name}`;
                }
            }
        };

    function loadNames() {
        const storedNames = getCookie('names');
        if (storedNames) {
            names = JSON.parse(storedNames);
            updateNameList();
        }
    }

    function updateNameList() {
        nameList.innerHTML = '';
        for (const id in names) {
            const li = document.createElement('li');
            li.textContent = names[id];
            li.onclick = () => selectName(id);
            nameList.appendChild(li);
        }
    }

    function selectName(id) {
        selectedName = names[id];
        selectedNameDisplay.textContent = `Selected Name: ${selectedName}`;
    }

    function addName() {
        const name = nameInput.value.trim();
        if (name) {
            const id = Date.now().toString();
            names[id] = name;
            setCookie('names', JSON.stringify(names), 7);
            updateNameList();
            nameInput.value = '';
        }
    }

    function changeMonth(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction);
        renderCalendar();
    }

    function renderCalendar() {
        monthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        daysGrid.innerHTML = '';
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayButton = document.createElement('button');
            dayButton.textContent = i;
            dayButton.onclick = () => selectDay(i);
            daysGrid.appendChild(dayButton);
        }
    }

    function selectDay(day) {
        const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        if (selectedName) {
            if (confirm(`Do you want to select ${selectedName} for ${dayKey}?`)) {
                alert(`Day selected successfully: ${dayKey}`);
            }
        } else {
            alert(`Day selected successfully: ${dayKey}`);
        }
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    }

    addNameButton.onclick = addName;
    previousMonthButton.onclick = () => changeMonth(-1);
    nextMonthButton.onclick = () => changeMonth(1);

    loadNames();
    renderCalendar();
});