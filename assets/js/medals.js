import { initializePopovers } from './popovers.js';

export const medalTiers = {
    PlayerKills: [1, 3, 5, 7, 9, 10],
    PVPDamage: [500, 999, 1999, 2999, 4999, 5000],
    PlayerDeaths: [6, 5, 4, 3, 2, 1],
    TotalDeaths: [61, 60, 49, 39, 19, 10],
    KD: [0.99, 1.99, 2.99, 3.99, 4.99, 5],
    MinutesPlayed: [3000, 6000, 15000, 20000, 25000, 25000],
    AlphaKills: [5, 8, 15, 20, 30, 31],
    TamedDinos: [2, 4, 6, 8, 10, 11],
    DailyQuestsCompleted: [1, 2, 3, 4, 5, 6],
    WeeklyQuestsCompleted: [1, 2, 3, 4, 5, 6],
    MissionsCompleted: [9, 19, 29, 39, 49, 50],
  };
  
  export const tierNames = [
    "bronze",
    "silver",
    "gold",
    "platinum",
    "diamond",
    "legendary",
  ];
  
  export function getTier(value, thresholds) {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) {
        return tierNames[i];
      }
    }
    return null;
  }
  
  export function displayMedals(user) {
    const stats = [
      { key: "PlayerKills", value: user.kills },
      { key: "PVPDamage", value: user.pvpDamage },
      { key: "PlayerDeaths", value: user.deaths },
      { key: "TotalDeaths", value: user.totalDeaths },
      { key: "KD", value: user.kd },
      { key: "MinutesPlayed", value: user.minutesPlayed },
      { key: "AlphaKills", value: user.alphaKills },
      { key: "TamedDinos", value: user.tamedDinos },
      { key: "DailyQuestsCompleted", value: user.dailies },
      { key: "WeeklyQuestsCompleted", value: user.weeklies },
      { key: "MissionsCompleted", value: user.missionsCompleted },
    ];
  
    const evaluatedStats = stats
      .map((stat) => {
        const thresholds = medalTiers[stat.key];
        const tier = getTier(stat.value, thresholds);
        return tier ? { key: stat.key, value: stat.value, tier } : null;
      })
      .filter((stat) => stat !== null);
  
    evaluatedStats.sort((a, b) => {
      const tierA = tierNames.indexOf(a.tier);
      const tierB = tierNames.indexOf(b.tier);
      if (tierA !== tierB) {
        return tierB - tierA;
      }
      const hierarchy = [
        "PlayerKills",
        "PVPDamage",
        "PlayerDeaths",
        "TotalDeaths",
        "KD",
        "MinutesPlayed",
        "AlphaKills",
        "TamedDinos",
        "DailyQuestsCompleted",
        "WeeklyQuestsCompleted",
        "MissionsCompleted",
      ];
      return hierarchy.indexOf(a.key) - hierarchy.indexOf(b.key);
    });
  
    const topStats = evaluatedStats.slice(0, 3);
    const medalsContainer = document.querySelector(".medals");
    medalsContainer.innerHTML = "";
  
    if (topStats.length === 0) {
      displayNoMedalsMessage();
    } else {
      const medalIcons = {
        PlayerKills: "playerkills-medal.png",
        PVPDamage: "pvpdamage-medal.png",
        PlayerDeaths: "playerdeaths-medal.png",
        TotalDeaths: "totaldeaths-medal.png",
        KD: "kd-medal.png",
        MinutesPlayed: "minutesplayed-medal.png",
        AlphaKills: "alphakills-medal.png",
        TamedDinos: "tameddinos-medal.png",
        DailyQuestsCompleted: "dailyquestscompleted-medal.png",
        WeeklyQuestsCompleted: "weeklyquestscompleted-medal.png",
        MissionsCompleted: "missionscompleted-medal.png",
      };
  
      topStats.forEach((stat) => {
        const medalDiv = document.createElement("div");
        medalDiv.classList.add(
          "mx-1",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "medal",
          "circle",
          stat.tier
        );
        medalDiv.style.height = "28px";
        medalDiv.style.width = "28px";
        medalDiv.style.borderRadius = "50%";
        medalDiv.setAttribute("data-bs-toggle", "popover");
        medalDiv.setAttribute("data-bs-html", "true");
  
        // Define the display name for the stat
        let displayName = stat.key.replace(/([A-Z])/g, " $1").trim();
        if (displayName === "K D") {
          displayName = "K/D";
        }
  
        const messages = {
          PlayerKills: "Aquired PVP Kills!",
          PVPDamage: "What's your damage?!",
          PlayerDeaths: "If you don't get it right the first time...",
          TotalDeaths: "Even PVE is your jam!",
          KD: "For better or worse you sure do like PVP!",
          MinutesPlayed: "Grass? Why would I want to touch that?",
          AlphaKills: "Going red for the red guy!",
          TamedDinos: "Raising an army?",
          DailyQuestsCompleted: "Are you in it for the prizes?",
          WeeklyQuestsCompleted: "Pay me in riches!",
          MissionsCompleted: "That skiff won't tame itself!",
        };
  
        medalDiv.setAttribute(
          "data-bs-content",
          `
                  <div class="text-center text-white">
                      <div class="profile-card d-flex align-items-center justify-content-between">
                          <div class="ps-0 rounded d-flex justify-content-start" style="border: 1px solid red">
                              <img class="text-center align-self-center rounded-circle popover-avatar-2 ${
                                stat.tier
                              }" src="./assets/images/${
            medalIcons[stat.key]
          }" alt="${stat.key}" style="width: 18px; height: 18px;">
                              <div class="profile-info ps-2 pe-4 align-items-center">
                                  <div class="my-0 text-start text-white tribe-member-text-1 m-0 p-0 medal-font-1"><strong>${displayName}</strong></div>
                                  <div class="fw-light my-0 text-start align-items-start align-top text-white tribe-member-text-2 m-0 p-0 medal-font-1">${
                                    stat.tier.charAt(0).toUpperCase() +
                                    stat.tier.slice(1)
                                  }</div>
                              </div>
                          </div>
                          <div class="stat-number-big fw-bolder text-start">${
                            stat.value
                          }</div>
                      </div>
                      <div class="text-start">${messages[stat.key]}</div>
                  </div>
              `
        );
  
        const medalImg = document.createElement("img");
        medalImg.src = `./assets/images/${medalIcons[stat.key]}`;
        medalImg.alt = stat.key;
        medalImg.style.width = "18px";
        medalImg.style.height = "18px";
        medalImg.style.border = "1px solid rgb(128, 128, 128, .2)";
  
        medalDiv.appendChild(medalImg);
        medalsContainer.appendChild(medalDiv);
  
        console.log(`Medal for ${stat.key} created with popover.`);
      });
  
      // Initialize popovers for the new medal elements
      initializePopovers();
    }
  }
  
  function displayNoMedalsMessage() {
    const medalsContainer = document.querySelector(".medals");
    medalsContainer.innerHTML = "<p>You have not earned any medals</p>";
  }
  