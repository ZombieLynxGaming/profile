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
                        display: true,
                        color: '#808080' // Color of the spider web lines
                    },
                    grid: {
                        color: '#808080' // Color of the grid lines
                    },
                    pointLabels: {
                        display: true, // Display point labels
                        font: {
                            color: '#808080' // Color of the point labels
                        },
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
