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
                    borderWidth: 1,
                    barThickness: 10 // Set bar thickness (default is 32)
                },
                {
                    label: 'Average',
                    data: [averageData],
                    backgroundColor: 'rgba(0, 255, 255, 0.6)', // Semi-transparent blue for average
                    borderColor: '#00FFFF', // Blue for average
                    borderWidth: 1,
                    barThickness: 10 // Set bar thickness (default is 32)
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    barPercentage: 0.5, // Adjust bar percentage (default is 0.9)
                    categoryPercentage: 0.5 // Adjust category percentage (default is 0.8)
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
