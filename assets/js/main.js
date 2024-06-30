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

    document.querySelectorAll(".username").forEach(elem => elem.innerText = user.displayName);
    document.querySelectorAll(".avatar").forEach(elem => elem.src = user.avatar);
    document.querySelectorAll(".points").forEach(elem => elem.innerText = user.points);
    document.querySelectorAll(".membership").forEach(elem => {
        elem.innerText = user.membership;
        elem.className = 'membership';
        elem.classList.add(membershipClasses[user.membership] || 'standard');
    });
    document.querySelectorAll(".message").forEach(elem => elem.innerText = user.message);
    document.querySelectorAll(".tribe").forEach(elem => elem.innerText = user.tribe);
    document.querySelectorAll(".kills").forEach(elem => elem.innerText = user.kills);
    document.querySelectorAll(".deaths").forEach(elem => elem.innerText = user.deaths);
    document.querySelectorAll(".kd").forEach(elem => elem.innerText = user.kd);
    document.querySelectorAll(".dailies").forEach(elem => elem.innerText = user.dailies);
    document.querySelectorAll(".weeklies").forEach(elem => elem.innerText = user.weeklies);
    document.querySelectorAll(".bkilled").forEach(elem => elem.innerText = user.bkilled);

    // Display tribe members
    const tribeMembersContainer = document.querySelector('.tribe-members');
    tribeMembersContainer.innerHTML = '';
    const pastelColors = ['pastel-blue', 'pastel-green', 'pastel-purple', 'pastel-pink', 'pastel-yellow', 'pastel-orange', 'pastel-teal', 'pastel-red'];
    user.tribeMembers.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        if (member.avatar) {
            const memberImg = document.createElement('img');
            memberImg.src = member.avatar;
            memberImg.classList.add('tribe-member-avatar');
            memberDiv.appendChild(memberImg);
        } else {
            memberDiv.classList.add('tribe-member-initial', pastelColors[index % pastelColors.length]);
            memberDiv.innerText = member.initial;
        }
        memberDiv.style.zIndex = user.tribeMembers.length - index; // Ensure the first icon is on top
        tribeMembersContainer.appendChild(memberDiv);
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

function createHorizontalBarChart(ctx, label, userData, averageData) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [label],
            datasets: [
                {
                    label: 'Your Stat',
                    data: [userData],
                    backgroundColor: 'rgba(200, 38, 38, 0.6)', // Semi-transparent red for user
                    borderColor: '#C82626', // Red for user
                    borderWidth: 1
                },
                {
                    label: 'Average',
                    data: [averageData],
                    backgroundColor: 'rgba(0, 255, 255, 0.6)', // Semi-transparent blue for average
                    borderColor: '#00FFFF', // Blue for average
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}

function initializeCharts(user) {
    const stats = [
        { id: 'killsChart', label: 'Kills', userData: user.kills, averageData: user.averages.avgKills },
        { id: 'deathsChart', label: 'Deaths', userData: user.deaths, averageData: user.averages.avgDeaths },
        { id: 'kdChart', label: 'KD Ratio', userData: user.kd, averageData: user.averages.avgKD },
        { id: 'dailiesChart', label: 'Dailies', userData: user.dailies, averageData: user.averages.avgDailies },
        { id: 'weekliesChart', label: 'Weeklies', userData: user.weeklies, averageData: user.averages.avgWeeklies },
        { id: 'bossesChart', label: 'Bosses Killed', userData: user.bkilled, averageData: user.averages.avgBossKills }
    ];

    stats.forEach(stat => {
        const ctx = document.getElementById(stat.id).getContext('2d');
        if (ctx) {
            createHorizontalBarChart(ctx, stat.label, stat.userData, stat.averageData);
        } else {
            console.warn(`Canvas for ${stat.label} not found.`);
        }
    });
}
