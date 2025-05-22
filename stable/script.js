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

let CurrentElo;
let CurrentRank;
let CurrentTier;
let CurrentPlace;
let NeededElo;
let Wins;
let Losses;
let Draws;
let EloChanges;

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
            CurrentRank = json.data.current.tier.name;
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
        if (json.data.players[499] && json.data.players[499].rr > json.data.thresholds[3].threshold) {
            NeededElo = json.data.players[499].rr;
        } else {
            NeededElo = json.data.thresholds[3].threshold;
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Gets win/loss stats
async function getWL() {
    try {
        let date = new Date().toISOString().slice(0,10);
        const url = `https://api.henrikdev.xyz/valorant/v2/stored-mmr-history/${region}/${platform}/${nickname}/${tag}?size=50&api_key=${api_key}`;
        const response = await fetch(url , { cache: `no-store` });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(`getWL():`);
        console.log(json);
        let EloLastGame = json.data[0].elo;
        let EloFirstGame;
        let u = 0;
        Wins = 0;
        Losses = 0;
        Draws = 0;
        for (i = 0; json.data[i].date.toString().includes(date); ++i) {
            if (json.data[i].last_change < 0) {
                ++Losses;
            } else if (json.data[i].last_change > 5) {
                ++Wins;
            } else {
                ++Draws;
            }
            ++u;
        }
        EloFirstGame = json.data[u].elo;
        EloChanges = EloLastGame - EloFirstGame;
    } catch (error) {
        console.error(error.message);
    }
}

async function setPageData() {
    try {
        document.getElementsByClassName(`RankPicture`)[0].src = `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${CurrentTier}/largeicon.png`;
        document.getElementsByClassName(`CurrentRank`)[0].innerHTML = `${CurrentRank}`;
        document.getElementsByClassName(`CurrentRank`)[0].style.setProperty(`color`, text_color);
        document.getElementsByClassName(`Draws`)[0].innerHTML = (Draws >= 10) ? `Draws: ${Draws}` : `Draws: 0${Draws}`;
        if (Draws > 0) {
            document.getElementsByClassName(`Draws`)[0].style.setProperty(`color`, text_color);
        }
        document.getElementsByClassName(`Wins`)[0].innerHTML = (Wins >= 10) ? `Wins: ${Wins}` : `Wins: 0${Wins}`;
        if (Wins > 0) {
            document.getElementsByClassName(`Wins`)[0].style.setProperty(`color`, text_color);
        }
        document.getElementsByClassName(`Losses`)[0].innerHTML = (Losses >= 10) ? `Losses: ${Losses}` : `Losses: 0${Losses}`;
        if (Losses > 0) {
            document.getElementsByClassName(`Losses`)[0].style.setProperty(`color`, text_color);
        }
        if (Wins > 0 || Losses > 0 || Draws > 0) {
            document.getElementsByClassName(`EloChangesText`)[0].style.color = `${text_color}`;
        }
        if (EloChanges > 0) {
            if (EloChanges >= 100) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${EloChanges}`;
            } else if (EloChanges >= 10) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `<i>0</i>${EloChanges}`;
            } else {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `<i>00</i>${EloChanges}`;
            }
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, text_color);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`color`, `#242526`);
        } else if (EloChanges < 0) {
            if (EloChanges <= -100) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${-EloChanges}`;
            } else if (EloChanges <= -10) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `<i>0</i>${-EloChanges}`;
            } else {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `<i>00</i>${-EloChanges}`;
            }
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, `#242526`);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`color`, text_color);
        } else {
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, `#242526`);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`color`, `#242526`);
        }
        let CurrentEloString = `<i>000</i>0`;
        if (CurrentElo >= 1000) {
            CurrentEloString = `${CurrentElo}`;
        } else if (CurrentElo >= 100) {
            CurrentEloString = `<i>0</i>${CurrentElo}`;
        } else if (CurrentElo >= 10) {
            CurrentEloString = `<i>00</i>${CurrentElo}`;
        } else {
            CurrentEloString = `<i>000</i>${CurrentElo}`;
        }
        let NeededEloString = `<i>0</i>100`;
        if (CurrentTier > 23) {
            if (NeededElo >= 1000) {
                NeededEloString = `${NeededElo}`;
            } else if (NeededElo >= 100) {
                NeededEloString = `<i>0</i>${NeededElo}`;
            }
        }
        document.getElementsByClassName(`CurrentEloText`)[0].innerHTML = `${CurrentEloString}/${NeededEloString}`;
        document.getElementsByClassName(`CurrentEloText`)[0].style.setProperty(`color`, text_color);
        document.getElementsByClassName(`ProgressBarProgress`)[0].style.transform = (CurrentTier >= 24) ? `translateX(${Math.min(-50+(CurrentElo/NeededElo*50), 0)}%)` : `translateX(${Math.min(-50+(CurrentElo/2), 0)}%)`;
    } catch (error) {
        console.log(`Caught an error`);
    }
}

// Gets new data and set it on page
async function updatePageData() {
    getCurrentElo();
    getNeededElo();
    getWL();
    setTimeout(() => {setPageData(); console.log(`Page data set`)}, 4500);
}

updatePageData();
let timerId = setInterval(() => {updatePageData(); console.log(`Page data updated`)}, 60000);