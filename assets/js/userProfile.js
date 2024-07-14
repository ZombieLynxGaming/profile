import { getTier, medalTiers } from "./medals.js";
import { displayAchievements } from "./achievements.js";
import { displayTribeMembers } from "./tribeMembers.js";

export function displayUserProfile(user) {
  console.log("Displaying user profile:", user); // Log user data for verification
  updateBasicInfo(user);
  displayAchievements(user);
  updateStats(user);
  updateTierClasses(user);
  displayTribeMembers(user.tribeMembers, user.tribe);
  setTimeout(() => displayLeaderboard(user.leaderboard), 100); // Adding a small delay to ensure DOM is loaded
}

function updateBasicInfo(user) {
  const membershipClasses = {
    Admins: "admin",
    Vibranium: "vibranium",
    Diamond: "diamond",
    Gold: "gold",
    Standard: "standard",
  };

  const membershipIcons = {
    Gold: "./assets/images/golden-lynx.png",
    Vibranium: "./assets/images/vibranium-lynx.png",
    Diamond: "./assets/images/diamond-lynx.png",
    Standard: "./assets/images/standard-lynx.png",
    Admins: "", // Admin remains as text
  };

  const elements = [
    { selectors: ".username", value: user.displayName },
    { selectors: ".avatar", value: user.avatar, attr: 'src' },
    { selectors: ".points", value: user.points },
    { selectors: ".message", value: user.message },
    { selectors: ".tribe", value: user.tribe },
    { selectors: ".kills", value: user.kills },
    { selectors: ".deaths", value: user.deaths },
    { selectors: ".kd", value: user.kd },
    { selectors: ".dailies", value: user.dailies },
    { selectors: ".weeklies", value: user.weeklies },
    { selectors: ".bkilled", value: user.bkilled },
  ];

  elements.forEach(element => {
    const elems = document.querySelectorAll(element.selectors);
    elems.forEach(elem => {
      if (elem) {
        if (element.attr) {
          elem[element.attr] = element.value;
        } else {
          elem.innerText = element.value;
        }
      }
    });
  });

  const membershipElems = document.querySelectorAll(".membership");
  membershipElems.forEach(elem => {
    if (elem) {
      if (user.membership === "Admins") {
        elem.innerText = user.membership;
        elem.className = "membership";
        elem.classList.add(membershipClasses[user.membership] || "standard");
      } else {
        elem.innerHTML = `<img src="${membershipIcons[user.membership]}" alt="${user.membership}" style="width: 25px; height: 25px;">`;
      }
    }
  });
}

function updateStats(user) {
  const stats = [
    { id: "pvpDamage", value: user.pvpDamage },
    { id: "totalDeaths", value: user.totalDeaths },
    { id: "kdRatio", value: user.kd },
    { id: "minutesPlayed", value: user.minutesPlayed },
    { id: "alphaKills", value: user.alphaKills },
    { id: "tamedDinos", value: user.tamedDinos },
    { id: "missionsCompleted", value: user.missionsCompleted }
  ];

  stats.forEach(stat => {
    updateElementText(stat.id, stat.value);
  });
}

function updateTierClasses(user) {
  const tiers = [
    { id: "pvpDamageTier", value: user.pvpDamage, tierFunction: "PVPDamage" },
    { id: "deathsTier", value: user.deaths, tierFunction: "PlayerDeaths" },
    { id: "totalDeathsTier", value: user.totalDeaths, tierFunction: "TotalDeaths" },
    { id: "alphaKillsTier", value: user.alphaKills, tierFunction: "AlphaKills" },
    { id: "dailiesTier", value: user.dailies, tierFunction: "DailyQuestsCompleted" },
    { id: "weekliesTier", value: user.weeklies, tierFunction: "WeeklyQuestsCompleted" },
    { id: "missionsCompletedTier", value: user.missionsCompleted, tierFunction: "MissionsCompleted" },
    { id: "killsTier", value: user.kills, tierFunction: "PlayerKills" },
    { id: "minutesPlayedTier", value: user.minutesPlayed, tierFunction: "MinutesPlayed" },
    { id: "kdTier", value: user.kd, tierFunction: "KD" },
    { id: "tamedDinosTier", value: user.tamedDinos, tierFunction: "TamedDinos" }
  ];

  tiers.forEach(tier => {
    updateTierClass(tier.id, tier.value, tier.tierFunction);
  });
}

function updateElementText(id, value) {
  const elem = document.getElementById(id);
  if (elem) {
    console.log(`Updating element with ID ${id}: ${value}`);
    elem.innerText = value;
  } else {
    console.warn(`Element with ID ${id} not found.`);
  }
}

function updateTierClass(id, value, tierFunction) {
  const elem = document.getElementById(id);
  if (elem) {
    const tier = getTier(value, medalTiers[tierFunction], tierFunction === "PlayerDeaths" || tierFunction === "TotalDeaths");
    console.log(`Updating tier class for ID ${id}: ${tier}`);
    elem.className = `rounded-circle ${tier}`; // Set the class to the tier name
  } else {
    console.warn(`Element with ID ${id} not found.`);
  }
}

function displayLeaderboard(leaderboard) {
  const container = document.getElementById("leaderboard");
  if (!container) {
    console.warn("Leaderboard container not found.");
    return;
  }

  container.innerHTML = "";

  leaderboard.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td>${player.Name}</td>
            <td class="text-center">${player.PlayerKills}</td>
            <td class="text-center">${player.KD ? player.KD.toFixed(1) : "N/A"}</td>
        `;
    container.appendChild(row);
  });

  console.log("Leaderboard data populated:", leaderboard); // Log the leaderboard data
}

function convertMinutesToDaysHours(minutes) {
  const days = Math.floor(minutes / 1440); // 1440 minutes in a day
  const hours = Math.floor((minutes % 1440) / 60); // Remaining minutes converted to hours
  return `${days}d ${hours}hr`;
}
