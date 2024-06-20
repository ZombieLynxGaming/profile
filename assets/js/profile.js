// profile.js

const API_BASE_URL = "https://profile.zlg.gg:1111";  // Update to HTTPS

function fetchUserProfile() {
    console.log('Fetching user profile');
    const token = new URLSearchParams(window.location.search).get('token');
    console.log('Token:', token);  // Log the token to verify it's being extracted correctly
    if (!token) {
        console.error('No token found');
        return;
    }

    fetch(`${API_BASE_URL}/api/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Response received:', response); // Log the response
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
    console.log('Displaying user profile:', data);  // Log user data for verification
    const usernameElements = document.querySelectorAll('.username');
    const avatarElements = document.querySelectorAll('.avatar');
    const tribeElements = document.querySelectorAll('.tribe');
    const pointsElements = document.querySelectorAll('.points');
    const membershipElements = document.querySelectorAll('.membership');
    const killsElements = document.querySelectorAll('.kills');
    const deathsElements = document.querySelectorAll('.deaths');
    const kdElements = document.querySelectorAll('.kd');
    const dailiesElements = document.querySelectorAll('.dailies');
    const weekliesElements = document.querySelectorAll('.weeklies');
    const bkilledElements = document.querySelectorAll('.bkilled');

    usernameElements.forEach(elem => elem.textContent = data.displayName);
    avatarElements.forEach(elem => elem.src = data.avatar);
    tribeElements.forEach(elem => elem.textContent = data.tribe);
    pointsElements.forEach(elem => elem.textContent = data.points);
    membershipElements.forEach(elem => {
        elem.textContent = data.membership;
        setMembershipColor(elem); // Set the color based on the membership
    });
    killsElements.forEach(elem => elem.textContent = data.kills);
    deathsElements.forEach(elem => elem.textContent = data.deaths);
    kdElements.forEach(elem => elem.textContent = data.kd);
    dailiesElements.forEach(elem => elem.textContent = data.dailies);
    weekliesElements.forEach(elem => elem.textContent = data.weeklies);
    bkilledElements.forEach(elem => elem.textContent = data.bkilled);

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

function setMembershipColor(elem) {
    const membership = elem.textContent;
    switch (membership) {
        case 'Admin':
            elem.style.background = 'radial-gradient(circle, #dd163b, #8b0000)'; // Red gradient
            break;
        case 'Vibranium':
            elem.style.background = 'radial-gradient(circle, #8a2be2, #4b0082)'; // BlueViolet gradient
            break;
        case 'Diamond':
            elem.style.background = 'radial-gradient(circle, #00bfff, #1e90ff)'; // LightBlue gradient
            break;
        case 'Gold':
            elem.style.background = 'radial-gradient(circle, #ffd700, #daa520)'; // Gold gradient
            break;
        case 'Standard':
        default:
            elem.style.background = 'radial-gradient(circle, #6c757d, #495057)'; // Silver gradient
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();
});
