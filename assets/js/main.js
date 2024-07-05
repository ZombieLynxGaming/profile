const API_BASE_URL = "https://profile.zlg.gg:1111";  // Update to HTTPS

document.addEventListener('DOMContentLoaded', () => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
        console.error('No token found, using mock data');
        fetchMockUserProfile();
        fetchMockUserStats(); // Fetch mock user stats
        return;
    }
    fetchUserProfile(token);
});

function fetchMockUserProfile() {
    console.log('Using mock user profile');
    const mockUser = {
        displayName: 'Danulsan',
        avatar: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1192640/638ff86cd1eb7b7368d146f034688280e6f0db09.gif',
        points: 1234,
        membership: 'Gold',
        message: 'This is a mock user for testing purposes.',
        tribe: 'Tribe of Danulsan',
        kills: 10,
        deaths: 5,
        kd: 2.0,
        dailies: 3,
        weeklies: 7,
        bkilled: 1,
        pvpDamage: 600,
        totalDeaths: 3,
        minutesPlayed: 8000,
        alphaKills: 5,
        tamedDinos: 2,
        missionsCompleted: 15,
        averages: {
            avgKills: 8,
            avgDeaths: 4,
            avgKD: 2.0,
            avgDailies: 2,
            avgWeeklies: 5,
            avgBossKills: 1
        },
        leaderboard: [
            { Name: 'Player1', PlayerKills: 100, KD: 3.5 },
            { Name: 'Player2', PlayerKills: 90, KD: 3.0 },
            { Name: 'Player3', PlayerKills: 80, KD: 2.5 },
        ],
        tribeMembers: [
            {
                name: 'Member1',
                avatar: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1192640/638ff86cd1eb7b7368d146f034688280e6f0db09.gif',
                initial: 'M',
                kills: 5,
                deaths: 2,
                kd: 2.5
            },
            {
                name: 'Member2',
                avatar: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1192640/638ff86cd1eb7b7368d146f034688280e6f0db09.gif',
                initial: 'M',
                kills: 3,
                deaths: 1,
                kd: 3.0
            }
        ]
    };
    displayUserProfile(mockUser);
    initializeCharts(mockUser);
    displayMessage(mockUser.message);
    initializePopovers();
    displayMedals(mockUser); // Display mock medals
}

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
        displayMedals(data); // Display medals
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        fetchMockUserProfile(); // Use mock data on error
    });
}

const medalTiers = {
    PlayerKills: [1, 3, 5, 7, 9, 10],
    PVPDamage: [500, 999, 1999, 2999, 4999, 5000],
    PlayerDeaths: [6, 5, 4, 3, 2, 1],
    TotalDeaths: [61, 60, 49, 39, 19, 10],
    KD: [0.99, 1.99, 2.99, 3.99, 4.99, 5],
    MinutesPlayed: [3000, 6000, 15000, 20000, 25000, 25000],
    AlphaKills: [5, 8, 15, 20, 30, 31],
    TamedDinos: [2, 4, 6, 8, 10, 11],
    DailyQuestsCompleted: [1, 2, 3, 4, 5, 6],
    WeeklyQuestsCompleted: [1, 2, 3, 4, 5, 6],
    MissionsCompleted: [9, 19, 29, 39, 49, 50]
};

const tierNames = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'legendary'];

function getTier(value, thresholds) {
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (value >= thresholds[i]) {
            return tierNames[i];
        }
    }
    return null;
}

function displayMedals(user) {
    const stats = [
        { key: 'PlayerKills', value: user.kills },
        { key: 'PVPDamage', value: user.pvpDamage },
        { key: 'PlayerDeaths', value: user.deaths },
        { key: 'TotalDeaths', value: user.totalDeaths },
        { key: 'KD', value: user.kd },
        { key: 'MinutesPlayed', value: user.minutesPlayed },
        { key: 'AlphaKills', value: user.alphaKills },
        { key: 'TamedDinos', value: user.tamedDinos },
        { key: 'DailyQuestsCompleted', value: user.dailies },
        { key: 'WeeklyQuestsCompleted', value: user.weeklies },
        { key: 'MissionsCompleted', value: user.missionsCompleted }
    ];

    const evaluatedStats = stats.map(stat => {
        const thresholds = medalTiers[stat.key];
        const tier = getTier(stat.value, thresholds);
        return tier ? { key: stat.key, value: stat.value, tier } : null;
    }).filter(stat => stat !== null);

    evaluatedStats.sort((a, b) => {
        const tierA = tierNames.indexOf(a.tier);
        const tierB = tierNames.indexOf(b.tier);
        if (tierA !== tierB) {
            return tierB - tierA;
        }
        const hierarchy = ['PlayerKills', 'PVPDamage', 'PlayerDeaths', 'TotalDeaths', 'KD', 'MinutesPlayed', 'AlphaKills', 'TamedDinos', 'DailyQuestsCompleted', 'WeeklyQuestsCompleted', 'MissionsCompleted'];
        return hierarchy.indexOf(a.key) - hierarchy.indexOf(b.key);
    });

    const topStats = evaluatedStats.slice(0, 3);
    const medalsContainer = document.querySelector('.medals');
    medalsContainer.innerHTML = '';

    if (topStats.length === 0) {
        displayNoMedalsMessage();
    } else {
        const medalIcons = {
            PlayerKills: 'playerkills-medal.png',
            PVPDamage: 'pvpdamage-medal.png',
            PlayerDeaths: 'playerdeaths-medal.png',
            TotalDeaths: 'totaldeaths-medal.png',
            KD: 'kd-medal.png',
            MinutesPlayed: 'minutesplayed-medal.png',
            AlphaKills: 'alphakills-medal.png',
            TamedDinos: 'tamedinos-medal.png',
            DailyQuestsCompleted: 'dailyquestscompleted-medal.png',
            WeeklyQuestsCompleted: 'weeklyquestscompleted-medal.png',
            MissionsCompleted: 'missionscompleted-medal.png'
        };

        topStats.forEach(stat => {
            const medalDiv = document.createElement('div');
            medalDiv.classList.add('mx-1', 'd-flex', 'justify-content-center', 'align-items-center', 'medal', 'circle', stat.tier);
            medalDiv.style.height = '28px';
            medalDiv.style.width = '28px';
            medalDiv.style.borderRadius = '50%';

            const medalImg = document.createElement('img');
            medalImg.src = `./assets/images/${medalIcons[stat.key]}`;
            medalImg.alt = stat.key;
            medalImg.style.width = '18px';
            medalImg.style.height = '18px';
            medalImg.style.border = '1px solid rgb(128, 128, 128, .2)';

            medalDiv.appendChild(medalImg);
            medalsContainer.appendChild(medalDiv);
        });
    }
}

function displayNoMedalsMessage() {
    const medalsContainer = document.querySelector('.medals');
    medalsContainer.innerHTML = '<p>You have not earned any medals</p>';
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

    avatarElems.forEach(elem => {
        if (elem) {
            if (user.avatar && user.avatar.endsWith('_full.gif')) {
                elem.src = user.avatar;
            } else if (user.avatar) {
                elem.src = user.avatar.replace('_full.jpg', '_full.gif');
            } else {
                elem.src = ''; // Or set a default avatar if needed
            }
        }
    });

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
                    <div class="profile-image col-6 ps-0 rounded d-flex justify-content-center" style="border: 1px solid green;">
                        <img class="text-center align-self-center rounded-circle popover-avatar w-75" src="${member.avatar || ''}" alt="Profile Image">
                    </div>
                    <div class="profile-info flex-grow-1 col-6 ps-0 pe-4">
                        <div class=" my-0 text-center text-white tribe-member-text-1 m-0 p-0"><strong>${member.name}</strong></div>
                        <div class=" fw-light my-0 text-center align-items-start align-top text-white tribe-member-text-2 m-0 p-0 mb-15">${user.tribe}</div>
                        <div class="row d-flex justify-content-around mt-3">
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kills.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.kills}</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/deaths.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.deaths}</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kd.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.kd}</div>
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
        
        // Show popover on click and keep it visible
        popoverTriggerEl.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default click behavior
            console.log(`Showing popover for element: ${popoverTriggerEl}`);
            popover.show();
            adjustPopoverDimensions(popover._element);
        });
        
        // Optional: Add a way to hide the popover
        document.addEventListener('click', (event) => {
            if (!popoverTriggerEl.contains(event.target) && !document.querySelector('.popover').contains(event.target)) {
                popover.hide();
            }
        });
        
        return popover;
    });
}

function adjustPopoverDimensions(popoverElement) {
    setTimeout(() => {
        const popoverInner = popoverElement.querySelector('.popover-inner');
        if (popoverInner) {
            popoverInner.style.height = '186px'; // Adjust this value as needed
            popoverInner.style.width = '350px';  // Adjust this value as needed
            console.log(`Adjusted popover dimensions for element: ${popoverElement}`);
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

// Example function to fetch mock stats (optional)
function fetchMockUserStats() {
    const mockStats = {
        kills: 1,
        pvpDamage: 600,
        deaths: 3,
        totalDeaths: 3,
        kd: 2.5,
        minutesPlayed: 8000,
        alphaKills: 5,
        tamedDinos: 2,
        dailies: 3,
        weeklies: 1,
        missionsCompleted: 15
    };

    displayMedals(mockStats);
}

