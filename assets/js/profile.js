// profile.js

const API_BASE_URL = "http://192.168.1.200:1111";

function fetchUserProfile() {
    console.log('Fetching user profile');
    fetch(`${API_BASE_URL}/api/profile`)
        .then(response => {
            console.log('Response received:', response);
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
    const usernameElement = document.getElementById('username');
    const avatarElement = document.getElementById('avatar');
    const tribeElement = document.getElementById('tribe');
    const pointsElement = document.getElementById('points');
    const membershipElement = document.getElementById('membership');
    const killsElement = document.getElementById('kills');
    const deathsElement = document.getElementById('deaths');
    const kdElement = document.getElementById('kd');
    const dailiesElement = document.getElementById('dailies');
    const weekliesElement = document.getElementById('weeklies');
    const bkilledElement = document.getElementById('bkilled');

    if (usernameElement) usernameElement.textContent = data.displayName;
    if (avatarElement) avatarElement.src = data.photos[2].value;
    if (tribeElement) tribeElement.textContent = data.tribe;
    if (pointsElement) pointsElement.textContent = data.points;
    if (membershipElement) {
        membershipElement.textContent = data.membership;
        membershipElement.style.backgroundColor = data.membershipColor;
    }
    if (killsElement) killsElement.textContent = data.kills;
    if (deathsElement) deathsElement.textContent = data.deaths;
    if (kdElement) kdElement.textContent = data.kd;
    if (dailiesElement) dailiesElement.textContent = data.dailies;
    if (weekliesElement) weekliesElement.textContent = data.weeklies;
    if (bkilledElement) bkilledElement.textContent = data.bkilled;

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
