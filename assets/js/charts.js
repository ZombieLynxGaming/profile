function createHorizontalBarChart(ctx, userValue, avgValue, label) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
                {
                    label: label,
                    data: [userValue],
                    backgroundColor: '#C82626', // Red for user
                    barThickness: 6,
                    borderRadius: 10,
                    barPercentage: 1
                },
                {
                    label: 'Average',
                    data: [avgValue],
                    backgroundColor: '#00FFFF', // Blue for average
                    barThickness: 6,
                    borderRadius: 10,
                    barPercentage: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            categoryPercentage: 1,
            scales: {
                x: {
                    beginAtZero: true,
                    display: false
                },
                y: {
                    display: false
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
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeCharts(user) {
    createHorizontalBarChart(document.getElementById('killsChart').getContext('2d'), user.kills, user.averages.avgKills, user.displayName);
    createHorizontalBarChart(document.getElementById('deathsChart').getContext('2d'), user.deaths, user.averages.avgDeaths, user.displayName);
    createHorizontalBarChart(document.getElementById('kdChart').getContext('2d'), user.kd, user.averages.avgKD, user.displayName);
    createHorizontalBarChart(document.getElementById('dailiesChart').getContext('2d'), user.dailies, user.averages.avgDailies, user.displayName);
    createHorizontalBarChart(document.getElementById('weekliesChart').getContext('2d'), user.weeklies, user.averages.avgWeeklies, user.displayName);
    createHorizontalBarChart(document.getElementById('bossesKilledChart').getContext('2d'), user.bkilled, user.averages.avgBossKills, user.displayName);
}

document.addEventListener("DOMContentLoaded", function() {
    const messageElement = document.getElementById("message");
    if (messageElement && messageElement.textContent.trim() !== '') {
        messageElement.style.visibility = 'visible';
        setTimeout(() => {
            messageElement.style.visibility = 'hidden';
        }, 5000); // 5000ms = 5 seconds
    }
});
