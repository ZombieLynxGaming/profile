import { getTier, medalTiers } from "./medals.js";

export function displayUserProfile(user) {
  console.log("Displaying user profile:", user); // Log user data for verification
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

  const usernameElems = document.querySelectorAll(".username");
  const avatarElems = document.querySelectorAll(".avatar");
  const pointsElems = document.querySelectorAll(".points");
  const membershipElems = document.querySelectorAll(".membership");
  const messageElems = document.querySelectorAll(".message");
  const tribeElems = document.querySelectorAll(".tribe");
  const killsElems = document.querySelectorAll(".kills");
  const deathsElems = document.querySelectorAll(".deaths");
  const kdElems = document.querySelectorAll(".kd");
  const dailiesElems = document.querySelectorAll(".dailies");
  const weekliesElems = document.querySelectorAll(".weeklies");
  const bkilledElems = document.querySelectorAll(".bkilled");

  usernameElems.forEach((elem) =>
    elem ? (elem.innerText = user.displayName) : null
  );
  avatarElems.forEach((elem) => (elem ? (elem.src = user.avatar) : null));
  pointsElems.forEach((elem) => (elem ? (elem.innerText = user.points) : null));
  membershipElems.forEach((elem) => {
    if (elem) {
      if (user.membership === "Admins") {
        elem.innerText = user.membership;
        elem.className = "membership";
        elem.classList.add(membershipClasses[user.membership] || "standard");
      } else {
        elem.innerHTML = `<img src="${membershipIcons[user.membership]}" alt="${
          user.membership
        }" style="width: 25px; height: 25px;">`;
      }
    }
  });
  messageElems.forEach((elem) =>
    elem ? (elem.innerText = user.message) : null
  );
  tribeElems.forEach((elem) => (elem ? (elem.innerText = user.tribe) : null));
  killsElems.forEach((elem) => (elem ? (elem.innerText = user.kills) : null));
  deathsElems.forEach((elem) => (elem ? (elem.innerText = user.deaths) : null));
  kdElems.forEach((elem) => (elem ? (elem.innerText = user.kd) : null));
  dailiesElems.forEach((elem) =>
    elem ? (elem.innerText = user.dailies) : null
  );
  weekliesElems.forEach((elem) =>
    elem ? (elem.innerText = user.weeklies) : null
  );
  bkilledElems.forEach((elem) =>
    elem ? (elem.innerText = user.bkilled) : null
  );
  

  // Display PvP Damage
  const pvpDamageElem = document.getElementById("pvpDamage");
  const pvpDamageTierElem = document.getElementById("pvpDamageTier");

  if (pvpDamageElem && pvpDamageTierElem) {
    const pvpDamage = user.pvpDamage;
    const tier = getTier(pvpDamage, medalTiers.PVPDamage);

    pvpDamageElem.innerText = pvpDamage;
    pvpDamageTierElem.className = tier; // Set the class to the tier name
  }

  // Display Deaths
  const deathsElem = document.getElementById("deaths");
  const deathsTierElem = document.getElementById("deathsTier");

  if (deathsElem && deathsTierElem) {
    const deaths = user.deaths;
    const tier = getTier(deaths, medalTiers.PlayerDeaths);

    deathsElem.innerText = deaths;
    deathsTierElem.className = tier; // Set the class to the tier name
  }

  // Display Total Deaths
const totalDeathsElem = document.getElementById("totalDeaths");
const totalDeathsTierElem = document.getElementById("totalDeathsTier");

if (totalDeathsElem && totalDeathsTierElem) {
    const totalDeaths = user.totalDeaths;
    const tier = getTier(totalDeaths, medalTiers.TotalDeaths);

    totalDeathsElem.innerText = totalDeaths;
    totalDeathsTierElem.className = tier; // Set the class to the tier name
}

// Display Alpha Kills
const alphaKillsElem = document.getElementById("alphaKills");
const alphaKillsTierElem = document.getElementById("alphaKillsTier");

if (alphaKillsElem && alphaKillsTierElem) {
    const alphaKills = user.alphaKills;
    const tier = getTier(alphaKills, medalTiers.AlphaKills);

    alphaKillsElem.innerText = alphaKills;
    alphaKillsTierElem.className = tier; // Set the class to the tier name
}

// Display Dailies
const dailiesElem = document.getElementById("dailies");
const dailiesTierElem = document.getElementById("dailiesTier");

if (dailiesElem && dailiesTierElem) {
    const dailies = user.dailies;
    const tier = getTier(dailies, medalTiers.DailyQuestsCompleted);

    dailiesElem.innerText = dailies;
    dailiesTierElem.className = tier; // Set the class to the tier name
}

// Display Weeklies
const weekliesElem = document.getElementById("weeklies");
const weekliesTierElem = document.getElementById("weekliesTier");

if (weekliesElem && weekliesTierElem) {
    const weeklies = user.weeklies;
    const tier = getTier(weeklies, medalTiers.WeeklyQuestsCompleted);

    weekliesElem.innerText = weeklies;
    weekliesTierElem.className = tier; // Set the class to the tier name
}

// Display Missions Completed
const missionsCompletedElem = document.getElementById("missionsCompleted");
const missionsCompletedTierElem = document.getElementById("missionsCompletedTier");

if (missionsCompletedElem && missionsCompletedTierElem) {
    const missionsCompleted = user.missionsCompleted;
    const tier = getTier(missionsCompleted, medalTiers.MissionsCompleted);

    missionsCompletedElem.innerText = missionsCompleted;
    missionsCompletedTierElem.className = tier; // Set the class to the tier name
}


  // Display Kills
  const killsElem = document.getElementById("kills");
  const killsTierElem = document.getElementById("killsTier");

  if (killsElem && killsTierElem) {
    const kills = user.kills;
    const tier = getTier(kills, medalTiers.PlayerKills);

    killsElem.innerText = kills;
    killsTierElem.className = tier; // Set the class to the tier name
  }

// Display Minutes Played
const minutesPlayedElem = document.getElementById("minutesPlayed");
const minutesPlayedTierElem = document.getElementById("minutesPlayedTier");

if (minutesPlayedElem && minutesPlayedTierElem) {
    const minutesPlayed = user.minutesPlayed;
    const tier = getTier(minutesPlayed, medalTiers.MinutesPlayed);

    minutesPlayedElem.innerText = convertMinutesToDaysHours(minutesPlayed); // Use the conversion function
    minutesPlayedTierElem.className = tier; // Set the class to the tier name
}

function convertMinutesToDaysHours(minutes) {
  const days = Math.floor(minutes / 1440); // 1440 minutes in a day
  const hours = Math.floor((minutes % 1440) / 60); // Remaining minutes converted to hours
  return `${days}d ${hours}hr`;
}

  // Display KD
  const kdElem = document.getElementById("kd");
  const kdTierElem = document.getElementById("kdTier");

  if (kdElem && kdTierElem) {
    const kd = user.kd;
    const tier = getTier(kd, medalTiers.KD);

    kdElem.innerText = kd;
    kdTierElem.className = tier; // Set the class to the tier name
  }

  // Display Tamed Dinos
  const tamedDinosElem = document.getElementById("tamedDinos");
  const tamedDinosTierElem = document.getElementById("tamedDinosTier");

  if (tamedDinosElem && tamedDinosTierElem) {
    const tamedDinos = user.tamedDinos;
    const tier = getTier(tamedDinos, medalTiers.TamedDinos);

    tamedDinosElem.innerText = tamedDinos;
    tamedDinosTierElem.className = tier; // Set the class to the tier name
  }

  // Display tribe members
  const tribeMembersContainer = document.querySelector(".tribe-members");
  tribeMembersContainer.innerHTML = "";
  const pastelColors = [
    "pastel-blue",
    "pastel-green",
    "pastel-purple",
    "pastel-pink",
    "pastel-yellow",
    "pastel-orange",
    "pastel-teal",
    "pastel-red",
  ];
  const fallbackImage = "./path/to/default-image.png"; // Replace with the path to your fallback image

  user.tribeMembers.forEach((member, index) => {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("tribe-member");
    memberDiv.setAttribute("data-bs-toggle", "popover");
    memberDiv.setAttribute("data-bs-html", "true");
    memberDiv.setAttribute(
      "data-bs-content",
      `
            <div class="text-center">
                <div class="profile-card d-flex align-items-center row">
                    <div class="profile-image col-6 ps-0 rounded d-flex justify-content-center">
                        <img class="text-center align-self-center rounded-circle popover-avatar w-75" src="${
                          member.avatar || fallbackImage
                        }" alt="Profile Image">
                    </div>
                    <div class="profile-info flex-grow-1 col-6 ps-0 pe-4">
                        <div class="my-0 text-start text-white tribe-member-text-1 m-0 p-0"><strong>${
                          member.name
                        }</strong></div>
                        <div class="fw-light my-0 text-start align-items-start align-top text-white tribe-member-text-2 m-0 p-0 mb-15">${
                          user.tribe
                        }</div>
                        <div class="row d-flex justify-content-around mt-3">
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kills.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${
                                  member.kills
                                }</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/deaths.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${
                                  member.deaths
                                }</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kd.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${
                                  member.kd
                                }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        `
    );
    memberDiv.setAttribute("data-bs-placement", "top");
    memberDiv.classList.add("popover-tribe");

    if (member.avatar) {
      const memberImg = document.createElement("img");
      memberImg.src = member.avatar;
      memberImg.classList.add("tribe-member-avatar");
      memberDiv.appendChild(memberImg);
    } else {
      memberDiv.classList.add(
        "tribe-member-initial",
        pastelColors[index % pastelColors.length]
      );
      memberDiv.innerText = member.initial;
    }
    memberDiv.style.zIndex = user.tribeMembers.length - index;
    tribeMembersContainer.appendChild(memberDiv);

    console.log(`Tribe member ${member.name} created with popover.`);
  });

  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";

  user.leaderboard.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td>${player.Name}</td>
            <td class="text-center">${player.PlayerKills}</td>
            <td class="text-center">${
              player.KD ? player.KD.toFixed(1) : "N/A"
            }</td>
        `;
    leaderboard.appendChild(row);
  });

  console.log("Leaderboard data populated:", user.leaderboard); // Log the leaderboard data
}
