.bronze {
border-radius: 50%;
background: linear-gradient(90deg, rgba(83,45,4,1) 0%, rgba(121,75,9,1) 35%, rgba(83,45,4,1) 100%);
border: 2px solid rgb(88, 49, 3);
}

.silver {
background: linear-gradient(90deg, rgba(124,124,124,1) 0%, rgba(167,167,167,1) 35%, rgba(124,124,124,1) 100%);
border: 2px solid silver;
}

.gold {
background: linear-gradient(90deg, #b88926 0%, #e3a823 35%, #b88926 100%);
border: 2px solid #ffc02f;
}

.platinum {
background: linear-gradient(90deg, rgb(37, 158, 102) 0%, rgb(47, 196, 126) 35%, rgb(37, 158, 102) 100%);
border: 2px solid rgb(79, 204, 156);
}

.diamond {
background: linear-gradient(90deg, rgba(17, 129, 129) 0%, rgb(36, 192, 192) 35%, rgb(17, 129, 129) 100%);
border: 2px solid turquoise;
}

.legendary {
background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 36%, rgba(252,176,69,1) 67%, rgba(97,252,69,1) 100%);
border: 2px solid rgb(255, 100, 44);
}


1. Query stats db the following columns for the user and return to front end the results
2. Only top 3 get displayed keeping the heirachy in mind
   - legendary > diamond > platinum > gold > silver > bronze
   - PlayerKills > PVPDamage > PlayerDeaths > TotalDeaths > K/D > MinutesPlayed > AlphaKills > TamedDinos > DailyQuestsCompleted > WeeklyQuestsCompleted > MissionsCompleted
3. The tier (legendary - bronze) is higher priority than the columns (PlayerKills - MissionsCompleted)
4. So if legendary TotalDeaths you would give the class .legendary to the div with the class medal and so on. I have made 3 divs with class .medal. the first will go in the first div with that class, then the second and finally the third. i have the example below

Example -

- PlayerKills = 1
- PVPDamage = 600
- TotalDeaths = 3
- AlphaKills = 45

You would display TotalDeaths (legendary), AlphaKills (legendary), PVPDamage (Silver) in that order and not show PlayerKills (bronze) because its tier is the lowest. The lockouts for each tier are below.

PlayerKills Bronze 1 or 2 Silver 3 or 4 Gold 5 or 6 Platinum 7 or 8 Diamond 9 Legendary 10+
PVPDamage Bronze 100 - 500 Silver 501 - 999 Gold 1000 - 1999 Platinum 2000 - 2999 Diamond 3000 - 4999 Legendary 5000+
PlayerDeaths Legendary < 2 Diamond 2 Platinum 3 Gold 4 Silver 5 Bronze 6+
TotalDeaths Legendary < 10 Diamond 11-19 Platinum 20-39 Gold 40 - 49 Silver 50 - 60 Bronze 61+
K/D Legendary 5+ Diamond 4 - 4.99 Platinum 3 - 3.99 Gold 2 - 2.99 Silver 1 - 1.99 Bronze .5 - .99
MinutesPlayed Bronze 1500 - 3000 Silver 3001 - 6000 Gold 6001 -15000 Platinum 15001 - 20000 Diamond 20001 - 25000 Legendary 25000 +
AlphaKills Bronze 1-5 Silver 6 - 8 Gold 9 - 15 Platinum 16 - 20 Diamond 21 - 30 Legendary 31 +
TamedDinos Bronze 1 or 2 Silver 3 or 4 Gold 5 or 6 Platinum 7 or 8 Diamond 9 or 10 Legendary 11+
DailyQuestsCompleted Bronze 1 Silver 2 Gold 3 Platinum 4 Diamond 5 Legendary 6+
WeeklyQuestsCompleted Bronze 1 Silver 2 Gold 3 Platinum 4 Diamond 5 Legendary 6+
MissionsCompleted Bronze 5 - 9 Silver 10 - 19 Gold 20 - 29 Platinum 30 - 39 Diamond 40 - 49 Legendary 50+

                                    <div class="d-flex justify-content-md-center medals">
                                        <div class="mx-1 d-flex justify-content-center align-items-center medal legendary"
                                            style="height: 20px; width: 20px; border-radius: 50%;">
                                            <img src="./assets/images/totaldeaths-medal.png" alt="" style="width: 22px !important; height: 22px !important; border: 1px solid rgb(128, 128, 128, .2); border-radius: 50%;">
                                        </div>
                                        <div class="mx-2 d-flex justify-content-center align-items-center medal legendary"
                                            style="height: 20px; width: 20px; border-radius: 50%;">
                                            <img src="./assets/images/alphakills-medal.png" alt="" style="width: 22px !important; height: 22px !important; border: 1px solid rgb(128, 128, 128, .2); border-radius: 50%;">
                                        </div>
                                        <div class="mx-1 d-flex justify-content-center align-items-center medal silver"
                                            style="height: 20px; width: 20px; border-radius: 50%;">
                                            <img src="./assets/images/pvpdamage-medal.png" alt="" style="width: 22px !important; height: 22px !important; border: 1px solid rgb(128, 128, 128, .2); border-radius: 50%;">
                                        </div>
                                    </div>

