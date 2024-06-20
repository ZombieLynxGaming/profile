document.addEventListener('DOMContentLoaded', function() {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    fetchUserProfile(token);
});

function fetchUserProfile(token) {
    fetch('https://profile.zlg.gg:1111/api/profile', {  // Update to HTTPS
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('User data:', data);
        displayUserProfile(data);
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        document.getElementById('profile').innerText = 'Error fetching user profile: ' + error.message;
    });
}

function displayUserProfile(data) {
    const membershipColors = {
        'Admins': 'radial-gradient(circle, #dd163b, #8b0000)',
        'Vibranium': 'radial-gradient(circle, #d8ba0e, #d8ba0e)',
        'Diamond': 'radial-gradient(circle, #d8ba0e, #d8ba0e)',
        'Gold': 'radial-gradient(circle, #d8ba0e, #d8ba0e)',
        'Standard': 'radial-gradient(circle, #139257, #139257)'
    };

    const usernameElement = document.querySelectorAll('.username');
    const avatarElement = document.querySelectorAll('.avatar');
    const tribeElement = document.querySelectorAll('.tribe');
    const pointsElement = document.querySelectorAll('.points');
    const membershipElement = document.querySelectorAll('.membership');
    const killsElement = document.querySelectorAll('.kills');
    const deathsElement = document.querySelectorAll('.deaths');
    const kdElement = document.querySelectorAll('.kd');
    const dailiesElement = document.querySelectorAll('.dailies');
    const weekliesElement = document.querySelectorAll('.weeklies');
    const bkilledElement = document.querySelectorAll('.bkilled');

    if (usernameElement) usernameElement.forEach((elem) => elem.textContent = data.displayName);
    if (avatarElement) avatarElement.forEach((elem) => elem.src = data.avatar);
    if (tribeElement) tribeElement.forEach((elem) => elem.textContent = data.tribe);
    if (pointsElement) pointsElement.forEach((elem) => elem.textContent = data.points);
    if (membershipElement) {
        membershipElement.forEach((elem) => {
            elem.textContent = data.membership;
            elem.style.backgroundColor = membershipColors[data.membership] || membershipColors['Standard'];
        });
    }
    if (killsElement) killsElement.forEach((elem) => elem.textContent = data.kills);
    if (deathsElement) deathsElement.forEach((elem) => elem.textContent = data.deaths);
    if (kdElement) kdElement.forEach((elem) => elem.textContent = data.kd);
    if (dailiesElement) dailiesElement.forEach((elem) => elem.textContent = data.dailies);
    if (weekliesElement) weekliesElement.forEach((elem) => elem.textContent = data.weeklies);
    if (bkilledElement) bkilledElement.forEach((elem) => elem.textContent = data.bkilled);

    // For leaderboard
    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
        leaderboardElement.innerHTML = data.leaderboard.map((player, index) => `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td>${player.Name}</td>
                <td class="text-center">${player.PlayerKills}</td>
                <td class="text-center">${player.KD ? player.KD.toFixed(2) : 'N/A'}</td>
            </tr>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();
});
