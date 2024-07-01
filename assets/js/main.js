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
                <div class="profile-card d-flex align-items-center row">
                    <div class="profile-image me-3 col-6 ps-0 rounded" style="border: 1px solid green;">
                        <img class="text-start align-self-start rounded-circle popover-avatar" src="${member.avatar || ''}" alt="Profile Image">
                    </div>
                    <div class="profile-info flex-grow-1 col-5">
                        <div class=" my-0 text-center"><strong>${member.name}</strong></div>
                        <div class=" fw-light my-0 text-center">${user.tribe}</div>
                        <div class="d-flex justify-content-around mt-2">
                            <div class="stat">
                                <img src="./assets/images/kills.png" alt="" style="width: 10px; height: 10px;">
                                <div>${member.kills}</div>
                            </div>
                            <div class="stat">
                                <img src="./assets/images/deaths.png" alt="" style="width: 10px; height: 10px;">
                                <div>${member.deaths}</div>
                            </div>
                            <div class="stat">
                                <img src="./assets/images/kd.png" alt="" style="width: 10px; height: 10px;">
                                <div>${member.kd}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        `);
        memberDiv.setAttribute('data-bs-placement', 'top');

        if (member.avatar) {
            const memberImg = document.createElement('img');
            memberImg.src = member.avatar;
            memberImg.classList.add('tribe-member-avatar');
            memberDiv.appendChild(memberImg);
        } else {
            memberDiv.classList.add('tribe-member-initial', pastelColors[index % pastelColors.length]);
            memberDiv.innerText = member.initial;
        }
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
            console.log(`Showing popover for element: ${popoverTriggerEl}`);
            popover.show();
            adjustPopoverHeight(popover._element);
        });
        popoverTriggerEl.addEventListener('mouseleave', () => {
            console.log(`Hiding popover for element: ${popoverTriggerEl}`);
            popover.hide();
        });
        return popover;
    });
}

function adjustPopoverHeight(popoverElement) {
    setTimeout(() => {
        const popoverInner = popoverElement.querySelector('.popover-inner');
        if (popoverInner) {
            popoverInner.style.height = '186px'; // Adjust this value as needed
            console.log(`Adjusted popover height for element: ${popoverElement}`);
        }
    }, 0);
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
