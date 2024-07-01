const API_BASE_URL = "https://profile.zlg.gg:1111";  // Update to HTTPS

document.addEventListener('DOMContentLoaded', () => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    fetchUserProfile(token);
});

function fetchUserProfile(token) {
    console.log('Fetching user profile');
    fetch(`${API_BASE_URL}/api/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Response received:', response); // Log the response
        if (!response.ok) {
            if (response.status === 401) {
                displaySessionExpiredMessage();
            }
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('User data:', data);
        displayUserProfile(data);
        initializeCharts(data); // Initialize charts with user data
        displayMessage(data.message); // Display the message if it exists
        initializePopovers(); // Initialize Bootstrap popovers
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        document.getElementById('profile').innerText = 'Error fetching user profile: ' + error.message;
    });
}

function displayUserProfile(user) {
    console.log('Displaying user profile:', user);  // Log user data for verification
    const membershipClasses = {
        'Admins': 'admin',
        'Vibranium': 'vibranium',
        'Diamond': 'diamond',
        'Gold': 'gold',
        'Standard': 'standard'
    };

    const usernameElems = document.querySelectorAll(".username");
    const avatarElems = document.querySelectorAll(".avatar");
    const pointsElems = document.querySelectorAll(".points");
    const membershipElems = document.querySelectorAll(".membership");
    const messageElems = document.querySelectorAll(".message");
    const tribeElems = document.querySelectorAll(".tribe");
    const killsElems = document.querySelectorAll(".kills");
    const deathsElems = document.querySelectorAll(".deaths");
    const kdElems = document.querySelectorAll(".kd");
    const dailiesElems = document.querySelectorAll(".dailies");
    const weekliesElems = document.querySelectorAll(".weeklies");
    const bkilledElems = document.querySelectorAll(".bkilled");

    usernameElems.forEach(elem => elem ? elem.innerText = user.displayName : null);
    avatarElems.forEach(elem => elem ? elem.src = user.avatar : null);
    pointsElems.forEach(elem => elem ? elem.innerText = user.points : null);
    membershipElems.forEach(elem => {
        if (elem) {
            elem.innerText = user.membership;
            elem.className = 'membership';
            elem.classList.add(membershipClasses[user.membership] || 'standard');
        }
    });
    messageElems.forEach(elem => elem ? elem.innerText = user.message : null);
    tribeElems.forEach(elem => elem ? elem.innerText = user.tribe : null);
    killsElems.forEach(elem => elem ? elem.innerText = user.kills : null);
    deathsElems.forEach(elem => elem ? elem.innerText = user.deaths : null);
    kdElems.forEach(elem => elem ? elem.innerText = user.kd : null);
    dailiesElems.forEach(elem => elem ? elem.innerText = user.dailies : null);
    weekliesElems.forEach(elem => elem ? elem.innerText = user.weeklies : null);
    bkilledElems.forEach(elem => elem ? elem.innerText = user.bkilled : null);

    // Display tribe members
    const tribeMembersContainer = document.querySelector('.tribe-members');
    tribeMembersContainer.innerHTML = '';
    const pastelColors = ['pastel-blue', 'pastel-green', 'pastel-purple', 'pastel-pink', 'pastel-yellow', 'pastel-orange', 'pastel-teal', 'pastel-red'];

    user.tribeMembers.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('tribe-member');
        memberDiv.setAttribute('data-bs-toggle', 'popover');
        memberDiv.setAttribute('data-bs-html', 'true');
        memberDiv.setAttribute('data-bs-content', `
            <div class="text-center">
                <img src="${member.avatar || ''}" class="rounded-circle" style="width: 50px; height: 50px;">
                <div><strong>${member.name}</strong></div>
                <div>Tribe: ${user.tribe}</div>
                <div>Kills: ${member.kills}</div>
                <div>Deaths: ${member.deaths}</div>
                <div>K/D: ${member.kd}</div>
            </div>
        `);
        memberDiv.setAttribute('data-bs-placement', 'bottom');
        memberDiv.style.zIndex = user.tribeMembers.length - index;
        tribeMembersContainer.appendChild(memberDiv);

        console.log(`Tribe member ${member.name} created with popover.`);
    });

    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    user.leaderboard.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td>${player.Name}</td>
            <td class="text-center">${player.PlayerKills}</td>
            <td class="text-center">${player.KD ? player.KD.toFixed(1) : "N/A"}</td>
        `;
        leaderboard.appendChild(row);
    });

    console.log('Leaderboard data populated:', user.leaderboard); // Log the leaderboard data
}

function initializePopovers() {
    console.log('Initializing popovers');
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
        console.log(`Initializing popover for element: ${popoverTriggerEl}`);
        const popover = new bootstrap.Popover(popoverTriggerEl, {
            trigger: 'manual',
            placement: 'bottom',
            offset: [0, 0], // No offset to avoid the arrow
            customClass: 'no-arrow' // Custom class to remove arrow
        });
        popoverTriggerEl.addEventListener('mouseenter', () => {
            popover.show();
        });
        popoverTriggerEl.addEventListener('mouseleave', () => {
            popover.hide();
        });
        return popover;
    });
}

function displayMessage(message) {
    if (message) {
        const messageElement = document.getElementById('message');
        messageElement.innerText = message;
        messageElement.style.visibility = 'visible';
        setTimeout(() => {
            messageElement.style.visibility = 'hidden';
        }, 5000); // Display for 5 seconds
    }
}
