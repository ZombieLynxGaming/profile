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

    // Check if user.kd is a number and format it to one decimal place
    const kdValue = !isNaN(user.kd) ? user.kd.toFixed(1) : user.kd;
    document.querySelectorAll(".kd").forEach(elem => elem.innerText = kdValue);

    document.querySelectorAll(".dailies").forEach(elem => elem.innerText = user.dailies);
    document.querySelectorAll(".weeklies").forEach(elem => elem.innerText = user.weeklies);
    document.querySelectorAll(".bkilled").forEach(elem => elem.innerText = user.bkilled);

    // Display tribe members
    const tribeMembersContainer = document.querySelector('.tribe-members');
    tribeMembersContainer.innerHTML = '';
    const pastelColors = ['pastel-blue', 'pastel-green', 'pastel-purple', 'pastel-pink', 'pastel-yellow', 'pastel-orange', 'pastel-teal', 'pastel-red'];
    user.tribeMembers.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('tribe-member-initial', pastelColors[index % pastelColors.length]);
        memberDiv.innerText = member.initial;
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
