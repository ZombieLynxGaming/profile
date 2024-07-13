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

  usernameElems.forEach((elem) => (elem ? (elem.innerText = user.displayName) : null));
  avatarElems.forEach((elem) => (elem ? (elem.src = user.avatar) : null));
  pointsElems.forEach((elem) => (elem ? (elem.innerText = user.points) : null));
  membershipElems.forEach((elem) => {
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
  messageElems.forEach((elem) => (elem ? (elem.innerText = user.message) : null));
  tribeElems.forEach((elem) => (elem ? (elem.innerText = user.tribe) : null));
  killsElems.forEach((elem) => (elem ? (elem.innerText = user.kills) : null));
  deathsElems.forEach((elem) => (elem ? (elem.innerText = user.deaths) : null));
  kdElems.forEach((elem) => (elem ? (elem.innerText = user.kd) : null));
  dailiesElems.forEach((elem) => (elem ? (elem.innerText = user.dailies) : null));
  weekliesElems.forEach((elem) => (elem ? (elem.innerText = user.weeklies) : null));
  bkilledElems.forEach((elem) => (elem ? (elem.innerText = user.bkilled) : null));

  const pvpDamageElem = document.getElementById("pvpDamage");
  if (pvpDamageElem) {
    pvpDamageElem.innerText = Math.min(user.pvpDamage, 600);
  }

  const totalDeathsElem = document.getElementById("totalDeaths");
  if (totalDeathsElem) {
    totalDeathsElem.innerText = Math.min(user.totalDeaths, 30);
  }

  const kdRatioElem = document.getElementById("kdRatio");
  if (kdRatioElem) {
    kdRatioElem.innerText = Math.min(user.kd, 2.0);
  }

  const minutesPlayedElem = document.getElementById("minutesPlayed");
  if (minutesPlayedElem) {
    minutesPlayedElem.innerText = Math.min(user.minutesPlayed, 36000);
  }

  // Display PvP Damage Tier
  const pvpDamageTierElem = document.getElementById("pvpDamageTier");
  if (pvpDamageTierElem) {
    const tier = getTier(user.pvpDamage, medalTiers.PVPDamage);
    pvpDamageTierElem.className = tier; // Set the class to the tier name
  }

  // Display Deaths Tier
  const deathsTierElem = document.getElementById("deathsTier");
  if (deathsTierElem) {
    const tier = getTier(user.deaths, medalTiers.PlayerDeaths);
    deathsTierElem.className = tier; // Set the class to the tier name
  }

  // Display Total Deaths Tier
  const totalDeathsTierElem = document.getElementById("totalDeathsTier");
  if (totalDeathsTierElem) {
    const tier = getTier(user.totalDeaths, medalTiers.TotalDeaths);
    totalDeathsTierElem.className = tier; // Set the class to the tier name
  }

  // Display Alpha Kills Tier
  const alphaKillsTierElem = document.getElementById("alphaKillsTier");
  if (alphaKillsTierElem) {
    const tier = getTier(user.alphaKills, medalTiers.AlphaKills);
    alphaKillsTierElem.className = tier; // Set the class to the tier name
  }

  // Display Dailies Tier
  const dailiesTierElem = document.getElementById("dailiesTier");
  if (dailiesTierElem) {
    const tier = getTier(user.dailies, medalTiers.DailyQuestsCompleted);
    dailiesTierElem.className = tier; // Set the class to the tier name
  }

  // Display Weeklies Tier
  const weekliesTierElem = document.getElementById("weekliesTier");
  if (weekliesTierElem) {
    const tier = getTier(user.weeklies, medalTiers.WeeklyQuestsCompleted);
    weekliesTierElem.className = tier; // Set the class to the tier name
  }

  // Display Missions Completed Tier
  const missionsCompletedTierElem = document.getElementById("missionsCompletedTier");
  if (missionsCompletedTierElem) {
    const tier = getTier(user.missionsCompleted, medalTiers.MissionsCompleted);
    missionsCompletedTierElem.className = tier; // Set the class to the tier name
  }

  // Display Kills Tier
  const killsTierElem = document.getElementById("killsTier");
  if (killsTierElem) {
    const tier = getTier(user.kills, medalTiers.PlayerKills);
    killsTierElem.className = tier; // Set the class to the tier name
  }

  // Display Minutes Played Tier
  const minutesPlayedTierElem = document.getElementById("minutesPlayedTier");
  if (minutesPlayedTierElem) {
    const tier = getTier(user.minutesPlayed, medalTiers.MinutesPlayed);
    minutesPlayedTierElem.className = tier; // Set the class to the tier name
  }

  // Display KD Tier
  const kdTierElem = document.getElementById("kdTier");
  if (kdTierElem) {
    const tier = getTier(user.kd, medalTiers.KD);
    kdTierElem.className = tier; // Set the class to the tier name
  }

  // Display Tamed Dinos Tier
  const tamedDinosTierElem = document.getElementById("tamedDinosTier");
  if (tamedDinosTierElem) {
    const tier = getTier(user.tamedDinos, medalTiers.TamedDinos);
    tamedDinosTierElem.className = tier; // Set the class to the tier name
  }

  function convertMinutesToDaysHours(minutes) {
    const days = Math.floor(minutes / 1440); // 1440 minutes in a day
    const hours = Math.floor((minutes % 1440) / 60); // Remaining minutes converted to hours
    return `${days}d ${hours}hr`;
  }

  // Function to format numbers to display as 'k' if necessary
  function formatNumber(num, max) {
    return Math.min(num, max) === max ? `${max / 1000}k` : num;
  }

  //  Who's the real Alpha? Achievement
  const alphaKillsElem = document.getElementById("alphaKillsAchievement");
  if (alphaKillsElem) {
    alphaKillsElem.innerText = Math.min(user.alphaKills, 20);
  }
  //  Let's skiff to the chase! Achievement
  const missionsCompletedElem = document.getElementById("missionsCompletedAchievement");
  if (missionsCompletedElem) {
    missionsCompletedElem.innerText = Math.min(user.missionsCompleted, 56);
  }
  //  Get your daily fiber! Achievement
  const fiberHarvestElem = document.getElementById("fiberHarvest");
  if (fiberHarvestElem) {
    fiberHarvestElem.innerText = formatNumber(user.fiberHarvest, 100000);
  }
  //  It's not that rare... Achievement
  const rareFlowerHarvestElem = document.getElementById("rareFlowerHarvest");
  if (rareFlowerHarvestElem) {
    rareFlowerHarvestElem.innerText = Math.min(user.rareFlowerHarvest, 100);
  }
  //  Bait Master Achievement
  const fishCaughtElem = document.getElementById("fishCaught");
  if (fishCaughtElem) {
    fishCaughtElem.innerText = Math.min(user.fishCaught, 3);
  }
  //  I'm plum excited about this! Achievement
  const purpleOSDElem = document.getElementById("purpleOSD");
  if (purpleOSDElem) {
    purpleOSDElem.innerText = Math.min(user.purpleOSD, 1);
  }
  //  Don't fear the Reaper Achievement
  const alphaReaperKillsElem = document.getElementById("alphaReaperKills");
  if (alphaReaperKillsElem) {
    alphaReaperKillsElem.innerText = Math.min(user.alphaReaperKills, 1);
  }
  //  I ain't smitin' no Titan! Achievement
  const desertTitanTamedElem = document.getElementById("desertTitanTamed");
  if (desertTitanTamedElem) {
    desertTitanTamedElem.innerText = Math.min(user.desertTitanTamed, 1);
  }
  //  Daily Diligence Achievement
  const dailiesElem = document.getElementById("dailiesAchievement");
  if (dailiesElem) {
    dailiesElem.innerText = Math.min(user.dailies, 7);
  }
  //  Weekly Warrior Achievement
  const weekliesElem = document.getElementById("weekliesAchievement");
  if (weekliesElem) {
    weekliesElem.innerText = Math.min(user.weeklies, 2);
  }
  //  You're the boss! Achievement
  const bossKillsElem = document.getElementById("bossKills");
  if (bossKillsElem) {
    bossKillsElem.innerText = Math.min(user.bkilled, 1);
  }
  //  Redrum, Redrum! Achievement
  const playerKillsElem = document.getElementById("playerKills");
  if (playerKillsElem) {
    playerKillsElem.innerText = Math.min(user.kills, 2);
  }
  // Just don't get insided! Achievement
  const tribeMateElem = document.getElementById("tribeMate");
  if (tribeMateElem) {
    tribeMateElem.innerText = user.tribeMembers && user.tribeMembers.length > 1 ? 1 : 0;
  }
  // This is my life! Achievement
  const oneHourPlayedElem = document.getElementById("oneHourPlayed");
  if (oneHourPlayedElem) {
    oneHourPlayedElem.innerText = user.minutesPlayed >= 60 ? 1 : 0;
  }
  //  Dino Tamer Achievement
  const tamedDinosElem = document.getElementById("tamedDinosAchievement");
  if (tamedDinosElem) {
    tamedDinosElem.innerText = Math.min(user.tamedDinos, 20);
  }

  function updateAchievement(id, value, target, max, format = false) {
    const elem = document.getElementById(id);
    if (elem) {
      const achievementValue = Math.min(value, max);
      if (format) {
        elem.innerText = achievementValue >= 1000 ? `${achievementValue / 1000}k` : achievementValue;
      } else {
        elem.innerText = achievementValue;
      }
      if (achievementValue >= max) {
        elem.closest(`.${target}`).classList.add("achieved");
      }
    }
  }

  updateAchievement("alphaKillsAchievement", user.alphaKills, "alphaKills", 20);
  updateAchievement("missionsCompletedAchievement", user.missionsCompleted, "missionsCompleted", 56);
  updateAchievement("tribeMate", user.tribeMembers && user.tribeMembers.length > 1 ? 1 : 0, "tribeMate", 1);
  updateAchievement("fiberHarvest", user.fiberHarvest, "fiberHarvest", 100000, true);
  updateAchievement("rareFlowerHarvest", user.rareFlowerHarvest, "rareFlowerHarvest", 100);
  updateAchievement("fishCaught", user.fishCaught, "fishCaught", 3);
  updateAchievement("oneHourPlayed", user.minutesPlayed >= 60 ? 1 : 0, "oneHourPlayed", 1);
  updateAchievement("tamedDinosAchievement", user.tamedDinos, "tamedDinos", 20);
  updateAchievement("dailiesAchievement", user.dailies, "daily", 7);
  updateAchievement("weekliesAchievement", user.weeklies, "weekly", 2);
  updateAchievement("bossKills", user.bkilled, "bossKills", 1);
  updateAchievement("playerKills", user.kills, "playerKills", 2);
  updateAchievement("purpleOSD", user.purpleOSD, "purpleOSD", 1);
  updateAchievement("alphaReaperKills", user.alphaReaperKills, "alphaReaperKills", 1);
  updateAchievement("desertTitanTamed", user.desertTitanTamed, "desertTitanTamed", 1);

  function reorderAchievements() {
    const container = document.querySelector(".scrollable-content.achievements");
    const items = Array.from(container.querySelectorAll(".achievement-item"));

    // Sort items so that achieved ones are last
    items.sort((a, b) => {
      const aAchieved = a.classList.contains("achieved");
      const bAchieved = b.classList.contains("achieved");
      return aAchieved - bAchieved;
    });

    // Append items back to the container in the new order
    items.forEach((item) => container.appendChild(item));

    // Calculate and update progress bar
    const achievedCount = items.filter((item) => item.classList.contains("achieved")).length;
    const totalCount = items.length;
    const progressPercentage = (achievedCount / totalCount) * 100;

    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", achievedCount);

    // Update the text showing the number of achievements unlocked
    const achievementsText = document.querySelector(".fw-light span");
    achievementsText.innerText = `${achievedCount} / ${totalCount} (${progressPercentage.toFixed(2)}%)`;
  }

  // Call reorderAchievements after updating achievements
  reorderAchievements();

  // Call reorderAchievements after updating achievements
  reorderAchievements();

  // Display tribe members
  const tribeMembersContainer = document.querySelector(".tribe-members");
  tribeMembersContainer.innerHTML = "";
  const pastelColors = ["pastel-blue", "pastel-green", "pastel-purple", "pastel-pink", "pastel-yellow", "pastel-orange", "pastel-teal", "pastel-red"];
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
                        <div class="my-0 text-start text-white tribe-member-text-1 m-0 p-0"><strong>${member.name}</strong></div>
                        <div class="fw-light my-0 text-start align-items-start align-top text-white tribe-member-text-2 m-0 p-0 mb-15">${
                          user.tribe
                        }</div>
                        <div class="row d-flex justify-content-around mt-3">
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kills.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.kills}</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/deaths.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.deaths}</div>
                            </div>
                            <div class="stat col-4 px-2">
                                <img src="./assets/images/kd.png" alt="" style="width: 12px !important; height: 12px !important;">
                                <div class="stat-number-small fw-bolder">${member.kd}</div>
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
      memberDiv.classList.add("tribe-member-initial", pastelColors[index % pastelColors.length]);
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
            <td class="text-center">${player.KD ? player.KD.toFixed(1) : "N/A"}</td>
        `;
    leaderboard.appendChild(row);
  });

  console.log("Leaderboard data populated:", user.leaderboard); // Log the leaderboard data
}
