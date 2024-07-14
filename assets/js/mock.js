import { displayUserProfile } from './userProfile.js';
import { displayMedals } from './medals.js';
import { initializePopovers } from './popovers.js';
import { initializeCharts } from './charts.js';

export function fetchMockUserProfile() {
    console.log("Using mock user profile");
    const mockUser = {
        displayName: "Danulsan",
        avatar: "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1192640/638ff86cd1eb7b7368d146f034688280e6f0db09.gif",
        points: 1234,
        membership: "Admins",
        message: "This is a mock user for testing purposes.",
        tribe: "Tribe of Danulsan",
        kills: 10,
        deaths: 5,
        kd: 1.0,
        dailies: 3,
        weeklies: 7,
        bkilled: 1,
        pvpDamage: 501,
        totalDeaths: 10,
        minutesPlayed: 15000,
        alphaKills: 25,
        tamedDinos: 50,
        missionsCompleted: 55,
        fiberHarvest: 100000,
        rareFlowerHarvest: 100,
        fishCaught: 3,
        purpleOSD: 1, 
        alphaReaperKills: 1, 
        desertTitanTamed: 1, 
        averages: {
            avgKills: 8,
            avgDeaths: 4,
            avgKD: 2.0,
            avgDailies: 2,
            avgWeeklies: 5,
            avgBossKills: 1,
        },
        leaderboard: [
            { Name: "Player1", PlayerKills: 100, KD: 3.5 },
            { Name: "Player2", PlayerKills: 90, KD: 3.0 },
            { Name: "Player3", PlayerKills: 80, KD: 2.5 },
        ],
        tribeMembers: [
            {
                name: "Kintokid",
                avatar: "https://avatars.akamai.steamstatic.com/f00d07ea063355891b611f35dd4aeb30295e7dc0_full.jpg",
                initial: "M",
                kills: 5,
                deaths: 2,
                kd: 2.5,
            },
            {
                name: "Linthoss",
                avatar: "https://avatars.akamai.steamstatic.com/d4d3da034c914a25c9815da96369c3ace351114e_full.jpg",
                initial: "M",
                kills: 3,
                deaths: 1,
                kd: 3.0,
            },
            {
                name: "PoorDawg",
                avatar: "https://avatars.akamai.steamstatic.com/39f57db4946eda3f415674a3fbe989ed6e1d03e4_full.jpg",
                initial: "M",
                kills: 3,
                deaths: 1,
                kd: 3.0,
            },
            {
                name: "John",
                avatar: "https://avatars.akamai.steamstatic.com/3604ac34b47c87e187d151f22aa17e107253ce34_medium.jpg",
                initial: "M",
                kills: 3,
                deaths: 1,
                kd: 3.0,
            },
        ],
    };
    displayUserProfile(mockUser);
    initializeCharts(mockUser);
    initializePopovers();
    displayMedals(mockUser); // Display mock medals
}



export function fetchMockUserStats() {
    const mockStats = {
        kills: 1,
        pvpDamage: 600,
        deaths: 3,
        totalDeaths: 3,
        kd: 2.5,
        minutesPlayed: 8000,
        alphaKills: 25,
        tamedDinos: 2,
        dailies: 3,
        weeklies: 1,
        missionsCompleted: 15,
    };

    displayMedals(mockStats);
}
