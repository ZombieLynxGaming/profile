const https = require('https');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const arkshop = require('./db/arkshop');
const permissions = require('./db/permissions');
const stats = require('./db/stats');
const axios = require('axios');
require('dotenv').config();

const app = express();

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'your-refresh-secret-key';
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const CALLBACK_URL = 'https://profile.zlg.gg:1111'; // Update as needed

// SSL Certificate
const privateKey = fs.readFileSync('C:/AMPDatastore/Instances/ZLGProfileBackend01/node-server/app/certificates/profile.zlg.gg-key.pem', 'utf8');
const certificate = fs.readFileSync('C:/AMPDatastore/Instances/ZLGProfileBackend01/node-server/app/certificates/profile.zlg.gg-crt.pem', 'utf8');
const ca = fs.readFileSync('C:/AMPDatastore/Instances/ZLGProfileBackend01/node-server/app/certificates/profile.zlg.gg-chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Configure CORS
app.use(cors({
    origin: 'https://zlg.gg', // Frontend domain or IP for production
    credentials: true // Allow credentials (cookies) to be sent
}));

// Use JSON middleware
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'Lax'
    }
}));

// Initialize Passport and configure it to use session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
    returnURL: CALLBACK_URL + '/auth/steam/return',
    realm: CALLBACK_URL.split('/auth')[0],
    apiKey: STEAM_API_KEY
},
(identifier, profile, done) => {
    process.nextTick(() => {
        profile.identifier = identifier;
        return done(null, profile);
    });
}));

app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.identifier }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.identifier }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    res.redirect(`https://zlg.gg/profile?token=${token}&refreshToken=${refreshToken}`);
});

app.get('/api/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        const steamId = decoded.id.split('/').pop();
        getUserData(steamId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json({ error: 'Database query error' }));
    });
});

app.post('/api/refresh-token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token not provided' });

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid refresh token' });

        const newToken = jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ id: decoded.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
        res.json({ token: newToken, refreshToken: newRefreshToken });
    });
});

async function getUserData(steamId) {
    try {
        const arkshopResults = await queryPromise(arkshop, 'SELECT Points, last_points_added FROM arkshopplayers WHERE SteamId = ?', [steamId]);

        if (arkshopResults.length === 0) {
            return {
                displayName: 'N/A',
                points: 0,
                membership: 'Standard',
                message: 'User does not exist in any game yet. Please login to a game and try again.',
                tribe: 'N/A',
                kills: 0,
                deaths: 0,
                kd: 0,
                dailies: 0,
                weeklies: 0,
                bkilled: 0,
                averages: { avgKills: 0, avgDeaths: 0, avgKD: 0, avgDailies: 0, avgWeeklies: 0, avgBossKills: 0 },
                leaderboard: [],
                avatar: '',
                tribeMembers: []
            };
        }

        let points = arkshopResults[0].Points;
        const lastPointsAdded = arkshopResults[0].last_points_added ? new Date(arkshopResults[0].last_points_added) : null;
        let message = '';

        if (!lastPointsAdded || new Date().toDateString() !== lastPointsAdded.toDateString()) {
            points += 20;
            await queryPromise(arkshop, 'UPDATE arkshopplayers SET Points = ?, last_points_added = ? WHERE SteamId = ?', [points, new Date(), steamId]);
            message = 'You have received 20 points today!';
        } else {
            message = 'You have already claimed your 20 points for today.';
        }

        const permResults = await queryPromise(permissions, 'SELECT TimedPermissionGroups, PermissionGroups FROM ark_permissions.players WHERE SteamId = ?', [steamId]);

        let membership = 'Standard';
        if (permResults.length > 0) {
            const allGroups = [...permResults[0].TimedPermissionGroups.split(','), ...permResults[0].PermissionGroups.split(',')];
            if (allGroups.includes('Admins')) membership = 'Admins';
            else if (allGroups.includes('Vibranium')) membership = 'Vibranium';
            else if (allGroups.includes('Diamond')) membership = 'Diamond';
            else if (allGroups.includes('Gold')) membership = 'Gold';
        }

        const statsResults = await queryPromise(stats, 'SELECT Name, TribeName, PlayerKills, PlayerDeaths, `K/D` AS KD, DailyQuestsCompleted, WeeklyQuestsCompleted, BossKills, PVPDamage, TotalDeaths, MinutesPlayed, AlphaKills, TamedDinos, MissionsCompleted FROM lethalquests_stats WHERE SteamId = ?', [steamId]);

        const leaderboardResults = await queryPromise(stats, 'SELECT Name, PlayerKills, `K/D` AS KD FROM lethalquests_stats ORDER BY PlayerKills DESC LIMIT 10');
        const avgResults = await queryPromise(stats, 'SELECT AVG(PlayerKills) AS avgKills, AVG(PlayerDeaths) AS avgDeaths, AVG(`K/D`) AS avgKD, AVG(DailyQuestsCompleted) AS avgDailies, AVG(WeeklyQuestsCompleted) AS avgWeeklies, AVG(BossKills) AS avgBossKills FROM lethalquests_stats');

        const truncateName = (name) => (name.length > 12 ? name.slice(0, 12) + '...' : name);
        const steamApiResponse = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`);
        const avatar = steamApiResponse.data.response.players[0]?.avatarfull || null;

        if (statsResults.length === 0) {
            return {
                displayName: 'N/A',
                points,
                membership,
                message,
                tribe: 'N/A',
                kills: 0,
                deaths: 0,
                kd: 0,
                dailies: 0,
                weeklies: 0,
                bkilled: 0,
                averages: { avgKills: 0, avgDeaths: 0, avgKD: 0, avgDailies: 0, avgWeeklies: 0, avgBossKills: 0 },
                leaderboard: [],
                avatar: avatar,
                tribeMembers: []
            };
        }

        const statsData = statsResults[0];
        const tribeName = statsData.TribeName;

        const tribeMembersResults = await queryPromise(stats, 'SELECT Name, CAST(SteamId AS CHAR) AS SteamId, PlayerKills, PlayerDeaths, `K/D` AS KD FROM lethalquests_stats WHERE TribeName = ? AND SteamId != ?', [tribeName, steamId]);

        const tribeMembers = await Promise.all(tribeMembersResults.map(async (member) => {
            try {
                const memberSteamApiResponse = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${member.SteamId}`);
                const memberAvatar = memberSteamApiResponse.data.response.players[0]?.avatarfull || null;
                return { name: member.Name, avatar: memberAvatar, initial: member.Name.charAt(0).toUpperCase(), kills: member.PlayerKills, deaths: member.PlayerDeaths, kd: member.KD };
            } catch (error) {
                return { name: member.Name, avatar: null, initial: member.Name.charAt(0).toUpperCase(), kills: member.PlayerKills, deaths: member.PlayerDeaths, kd: member.KD };
            }
        }));

        const kd = statsData.KD !== null ? statsData.KD.toFixed(1) : 'N/A';
        const averages = avgResults[0];

        return {
            displayName: statsData.Name,
            points,
            membership,
            message,
            tribe: statsData.TribeName,
            kills: statsData.PlayerKills,
            deaths: statsData.PlayerDeaths,
            kd,
            dailies: statsData.DailyQuestsCompleted,
            weeklies: statsData.WeeklyQuestsCompleted,
            bkilled: statsData.BossKills,
            pvpDamage: statsData.PVPDamage,
            totalDeaths: statsData.TotalDeaths,
            minutesPlayed: statsData.MinutesPlayed,
            alphaKills: statsData.AlphaKills,
            tamedDinos: statsData.TamedDinos,
            missionsCompleted: statsData.MissionsCompleted,
            averages,
            leaderboard: leaderboardResults.map(player => ({ Name: truncateName(player.Name), PlayerKills: player.PlayerKills, KD: player.KD })),
            avatar: avatar,
            tribeMembers: tribeMembers
        };
    } catch (err) {
        throw err;
    }
}

function queryPromise(db, query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT || 1111, () => {
    console.log(`HTTPS Server is running on https://localhost:${process.env.PORT || 1111}`);
});
