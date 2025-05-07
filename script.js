let CurrentElo;
let CurrentTier;
let CurrentPlace;
let NeededElo;
let Wins;
let Loses;
let EloChanges;

const ranks = {
    3 : "Iron 1",
    4 : "Iron 2",
    5 : "Iron 3",
    6 : "Bronze 1",
    7 : "Bronze 2",
    8 : "Bronze 3",
    9 : "Silver 1",
    10 : "Silver 2",
    11 : "Silver 3",
    12 : "Gold 1",
    13 : "Gold 2",
    14 : "Gold 3",
    15 : "Plat 1",
    16 : "Plat 2",
    17 : "Plat 3",
    18 : "Diam 1",
    19 : "Diam 2",
    20 : "Diam 3",
    21 : "Asc 1",
    22 : "Asc 2",
    23 : "Asc 3",
    24 : "Imm 1",
    25 : "Imm 2" , 
    26 : "Imm 3",
    27 : "Radiant"
}

// Gets current elo on account
async function getCurrentElo() {
    try {
        const url = `https://api.henrikdev.xyz/valorant/v3/mmr/${region}/${platform}/${nickname}/${tag}?api_key=${api_key}`;
        const response = await fetch(url , { cache: `no-store` });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(`getCurrentElo():`);
        console.log(json);
        if (json.data.current.tier.id) {
            CurrentElo = json.data.current.rr;
            CurrentTier = json.data.current.tier.id;
        }
        if (json.data.current.leaderboard_placement) {
            CurrentPlace = json.data.current.leaderboard_placement.rank;
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Gets needed elo for radiant
async function getNeededElo() {
    try {
        const url = `https://api.henrikdev.xyz/valorant/v3/leaderboard/${region}/${platform}?api_key=${api_key}`;
        const response = await fetch(url , { cache: `no-store` });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(`getNeededElo():`);
        console.log(json);
        if (json.data.players[499] && json.data.players[499].rr > 550) {
            NeededElo = json.data.players[499].rr;
        } else {
            NeededElo = 550;
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Gets win/loss stats
   async function getWL() {
    try {
        let date = new Date().toISOString().slice(0,10);
        const url = `https://api.henrikdev.xyz/valorant/v2/mmr-history/${region}/${platform}/${nickname}/${tag}?api_key=${api_key}`; 
        const response = await fetch(url , { cache: `no-store` });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(`getWL():`);
        console.log(json);
        let EloLastGame = json.data.history[0].elo;
        let EloFirstGame;
        let u = 0;
        Wins = 0;
        Loses = 0;
        for (i = 0; json.data.history[i].date.toString().includes(date); i++) {
            if (json.data.history[i].last_change < 0) {
                Loses++;
            } else if (json.data.history[i].last_change > 5) {
                Wins++;
            }
            u++;
        }
        EloFirstGame = json.data.history[u].elo;
        EloChanges = EloLastGame - EloFirstGame;
    } catch (error) {
        console.error(error.message);
    }
}

// Set page data
async function setPageData() {
    try {
        let CurrentEloString = (CurrentTier >= 24) ? CurrentElo + `/` + NeededElo + ` RR` : ranks[CurrentTier] + ' : ' + CurrentElo + ' RR';
        document.getElementById(`CurrentElo1`).innerHTML = CurrentEloString;
        document.getElementById(`WL1`).innerHTML = `W ` + Wins + `-` + Loses + ` L`;
        document.getElementById(`EloChanges1`).innerHTML = (EloChanges > 0 ? `+` : ``) + EloChanges + ` RR`;
    } catch (error) {
        console.error(error.message);
    }
}

// Gets new data and set it on page
async function updatePageData() {
    getCurrentElo();
    getNeededElo();
    getWL();
    setTimeout(() => {setPageData(); console.log(`Page data set`)}, 3000);
}

updatePageData();
// setTimeout(() => {updatePageData();}, 3000);
let timerId = setInterval(() => {updatePageData(); console.log(`Page data updated`)}, 60000);