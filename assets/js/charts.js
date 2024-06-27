document.addEventListener("DOMContentLoaded", function() {
    const messageElement = document.getElementById("message");
    if (messageElement && messageElement.textContent.trim() !== '') {
        messageElement.style.visibility = 'visible';
        setTimeout(() => {
            messageElement.style.visibility = 'hidden';
        }, 5000); // 5000ms = 5 seconds
    }

    // Mock user data
    const mockUser = {
        displayName: 'Grimcrusher',
        avatar: 'assets/images/avatar.png',
        tribe: 'Futile',
        points: 12345,
        membership: 'Vibranium',
        kills: 12,
        deaths: 6,
        kd: 2.0,
        dailies: 4,
        weeklies: 12,
        bkilled: 12,
        averages: {
            avgKills: 10,
            avgDeaths: 5,
            avgKD: 1.8,
            avgDailies: 2,
            avgWeeklies: 10,
            avgBossKills: 8
        }
    };

    // Display mock user profile
    displayUserProfile(mockUser);

    // Initialize charts with mock data
    initializeCharts(mockUser);
});

function displayUserProfile(user) {
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
        elem.className = `membership ${membershipClasses[user.membership] || 'standard'}`;
    });
    document.querySelectorAll(".tribe").forEach(elem => elem.innerText = user.tribe);
    document.querySelectorAll(".kills").forEach(elem => elem.innerText = user.kills);
    document.querySelectorAll(".deaths").forEach(elem => elem.innerText = user.deaths);
    document.querySelectorAll(".kd").forEach(elem => elem.innerText = user.kd);
    document.querySelectorAll(".dailies").forEach(elem => elem.innerText = user.dailies);
    document.querySelectorAll(".weeklies").forEach(elem => elem.innerText = user.weeklies);
    document.querySelectorAll(".bkilled").forEach(elem => elem.innerText = user.bkilled);
}

function createRadialChart(ctx, user) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Kills', 'Deaths', 'KD Ratio', 'Dailies', 'Weeklies', 'Bosses Killed'],
            datasets: [
                {
                    label: user.displayName,
                    data: [user.kills, user.deaths, user.kd, user.dailies, user.weeklies, user.bkilled],
                    backgroundColor: 'rgba(200, 38, 38, 0.2)', // Transparent red for user
                    borderColor: '#C82626', // Red for user
                    pointBackgroundColor: '#C82626'
                },
                {
                    label: 'Average',
                    data: [user.averages.avgKills, user.averages.avgDeaths, user.averages.avgKD, user.averages.avgDailies, user.averages.avgWeeklies, user.averages.avgBossKills],
                    backgroundColor: 'rgba(0, 255, 255, 0.2)', // Transparent blue for average
                    borderColor: '#00FFFF', // Blue for average
                    pointBackgroundColor: '#00FFFF'
                }
            ]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    angleLines: {
                        display: true
                    },
                    pointLabels: {
                        display: true, // Display point labels
                        callback: function(value, index) {
                            return ['Kills', 'Deaths', 'KD Ratio', 'Dailies', 'Weeklies', 'Bosses Killed'][index];
                        }
                    },
                    ticks: {
                        display: false // Hide the numbers
                    }
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
    const radialChartCtx = document.getElementById('radialChart').getContext('2d');
    if (radialChartCtx) {
        createRadialChart(radialChartCtx, user);
    } else {
        console.warn('Radial chart canvas not found.');
    }
}
