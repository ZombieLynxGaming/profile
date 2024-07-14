export function formatNumber(num, max) {
    return Math.min(num, max) === max ? `${max / 1000}k` : num;
  }
  
  export function displayAchievements(user) {
    const achievements = [
      { id: "alphaKillsAchievement", value: user.alphaKills, max: 20 },
      { id: "missionsCompletedAchievement", value: user.missionsCompleted, max: 56 },
      { id: "fiberHarvest", value: user.fiberHarvest, max: 100000, format: true },
      { id: "rareFlowerHarvest", value: user.rareFlowerHarvest, max: 100 },
      { id: "fishCaught", value: user.fishCaught, max: 3 },
      { id: "purpleOSD", value: user.purpleOSD, max: 1 },
      { id: "alphaReaperKills", value: user.alphaReaperKills, max: 1 },
      { id: "desertTitanTamed", value: user.desertTitanTamed, max: 1 },
      { id: "dailiesAchievement", value: user.dailies, max: 7 },
      { id: "weekliesAchievement", value: user.weeklies, max: 2 },
      { id: "bossKills", value: user.bkilled, max: 1 },
      { id: "playerKills", value: user.kills, max: 2 },
      { id: "tribeMate", value: user.tribeMembers && user.tribeMembers.length > 0 ? 1 : 0, max: 1 },
      { id: "oneHourPlayed", value: user.minutesPlayed >= 60 ? 1 : 0, max: 1 },
      { id: "tamedDinosAchievement", value: user.tamedDinos, max: 20 },
    ];
  
    achievements.forEach(achievement => {
      updateAchievement(achievement.id, achievement.value, achievement.max, achievement.format);
    });
  
    reorderAchievements();
  }
  
  function updateAchievement(id, value, max, format = false) {
    const elem = document.getElementById(id);
    if (elem) {
      const achievementValue = Math.min(value, max);
      if (format) {
        elem.innerText = achievementValue >= 1000 ? `${achievementValue / 1000}k` : achievementValue;
      } else {
        elem.innerText = achievementValue;
      }
      if (achievementValue >= max) {
        const parentElem = elem.closest(".achievement-item");
        if (parentElem) {
          console.log(`Achievement ${id} reached. Marking as achieved.`);
          parentElem.classList.add("achieved");
        } else {
          console.warn(`Parent element for ${id} not found.`);
        }
      } else {
        console.log(`Achievement ${id} not yet reached. Value: ${achievementValue}`);
      }
    } else {
      console.warn(`Element with ID ${id} not found.`);
    }
  }
  
  function reorderAchievements() {
    const container = document.querySelector(".scrollable-content.achievements");
    if (!container) {
      console.warn("Achievements container not found.");
      return;
    }
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
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
      progressBar.setAttribute("aria-valuenow", achievedCount);
    }
  
    // Update the text showing the number of achievements unlocked
    const achievementsText = document.querySelector(".fw-light span");
    if (achievementsText) {
      achievementsText.innerText = `${achievedCount} / ${totalCount} (${progressPercentage.toFixed(2)}%)`;
    }
  }
  