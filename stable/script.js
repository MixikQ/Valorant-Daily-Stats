const urlParams = new URLSearchParams(window.location.search);

let nickname = (urlParams.has(`nickname`)) ? urlParams.get(`nickname`) : ``;
let tag = (urlParams.has(`tag`)) ? urlParams.get(`tag`) : ``;
let region = (urlParams.has(`region`)) ? urlParams.get(`region`) : ``;
let platform = (urlParams.has(`platform`)) ? urlParams.get(`platform`) : ``;
let api_key = (urlParams.has(`api_key`)) ? urlParams.get(`api_key`) : ``;
let bg_color = (urlParams.has(`bg_color`)) ? `#${urlParams.get(`bg_color`)}` : ``;
let text_color = (urlParams.has(`text_color`)) ? `#${urlParams.get(`text_color`)}` : ``;
let bar_color_left = (urlParams.has(`bar_color_left`)) ? `#${urlParams.get(`bar_color_left`)}` : ``;
let bar_color_right = (urlParams.has(`bar_color_right`)) ? `#${urlParams.get(`bar_color_right`)}` : ``;

const URInickname = encodeURIComponent(nickname);
const URItag = encodeURIComponent(tag);

let CurrentElo;
let CurrentRank;
let CurrentTier;
let CurrentPlace;
let NeededElo;
let Wins;
let Losses;
let Draws;
let EloChanges;

// Due to issues with leaderboard
if (region == "eu") {
    NeededElo = 550;
} else if (region == "na") {
    NeededElo = 450;
} else if (region == "latam") {
    NeededElo = 200;
} else if (region == "br") {
    NeededElo = 340;
} else if (region == "ap") {
    NeededElo = 400;
} else if (region == "kr") {
    NeededElo = 200;
}

// Gets current elo on account
async function getCurrentElo() {
    try {
        const url = `https://api.henrikdev.xyz/valorant/v3/mmr/${region}/${platform}/${URInickname}/${URItag}?api_key=${api_key}`;
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
        const url = `https://api.henrikdev.xyz/valorant/v2/stored-mmr-history/${region}/${platform}/${URInickname}/${URItag}?size=50&api_key=${api_key}`;
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
        for (i = 0; i < 50; ++i) {
            if (json.data[i].date.toString().includes(date)) {
                checkGame(json.data[i].match_id);
                if (json.data[i].tier.id != 0) {
                    ++u;
                }   
            } else {
                break;
            }
        }
        EloFirstGame = json.data[u].elo;
        EloChanges = EloLastGame - EloFirstGame;
    } catch (error) {
        console.error(error.message);
    }
}

async function checkGame(gameId) {
    try {
        const url = `https://api.henrikdev.xyz/valorant/v4/match/${region}/${gameId}?api_key=${api_key}`;
        const response = await fetch(url , { cache: `no-store` });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(`checkGame():`);
        console.log(json);
        let playerTeam;
        for (i = 0; i < 10; ++i) {
            if (json.data.players[i].name.toLowerCase() == nickname.toLowerCase() && json.data.players[i].tag.toLowerCase() == tag.toLowerCase()) {
                playerTeam = json.data.players[i].team_id;
                break;
            }
        }
        console.log(playerTeam);
        for (i = 0; i < 2; ++i) {
            if (json.data.teams[i].team_id == playerTeam) {
                if (json.data.teams[i].won == true) {
                    ++Wins;
                    return;
                } else if (json.data.teams[i].rounds.won == json.data.teams[i].rounds.lost) {
                    ++Draws;
                    return;
                } else {
                    ++Losses;
                    return;
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function setPageData() {
    try {
        document.getElementsByClassName(`RankPicture`)[0].src = `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${CurrentTier}/largeicon.png`;
        if (CurrentPlace) {
            document.getElementsByClassName(`CurrentRank`)[0].innerHTML = `${CurrentRank} #${CurrentPlace}`;
        } else { 
            document.getElementsByClassName(`CurrentRank`)[0].innerHTML = `${CurrentRank}`
        }
        document.getElementsByClassName(`CurrentRank`)[0].style.setProperty(`color`, text_color);
        document.getElementsByClassName(`Draws`)[0].innerHTML = (Draws >= 10) ? `Draws: ${Draws}` : `Draws: <i>0</i>${Draws}`;
        if (Draws > 0) {
            document.getElementsByClassName(`Draws`)[0].style.setProperty(`color`, text_color);
        }
        document.getElementsByClassName(`Wins`)[0].innerHTML = (Wins >= 10) ? `Wins: ${Wins}` : `Wins: <i>0</i>${Wins}`;
        document.getElementsByClassName(`Wins`)[0].style.setProperty(`color`, text_color);
        document.getElementsByClassName(`Losses`)[0].innerHTML = (Losses >= 10) ? `Losses: ${Losses}` : `Losses: <i>0</i>${Losses}`;
        document.getElementsByClassName(`Losses`)[0].style.setProperty(`color`, text_color);
        if (Wins > 0 || Losses > 0 || Draws > 0) {
            document.getElementsByClassName(`EloChangesText`)[0].style.color = `${text_color}`;
            if (EloChanges == 0) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${EloChanges}<i>00</i>`;
            }
        }
        if (EloChanges > 0) {
            if (EloChanges >= 100) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${EloChanges}`;
            } else if (EloChanges >= 10) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${EloChanges}<i>0</i>`;
            } else {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${EloChanges}<i>00</i>`;
            }
            document.getElementsByClassName(`EloChangesText`)[0].style.setProperty(`letter-spacing`, `0px`);
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, text_color);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`background-color`, `#00000000`);
        } else if (EloChanges < 0) {
            if (EloChanges <= -100) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${-EloChanges}`;
            } else if (EloChanges <= -10) {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${-EloChanges}<i>0</i>`;
            } else {
                document.getElementsByClassName(`EloChangesText`)[0].innerHTML = `${-EloChanges}<i>00</i>`;
            }
            document.getElementsByClassName(`EloChangesText`)[0].style.setProperty(`letter-spacing`, `0px`);
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, `#00000020`);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`background-color`, text_color);
        } else {
            document.getElementsByClassName(`EloChangesText`)[0].style.setProperty(`letter-spacing`, `-2px`);
            document.getElementsByClassName(`Plus`)[0].style.setProperty(`color`, `#00000020`);
            document.getElementsByClassName(`Minus`)[0].style.setProperty(`background-color`, `#00000000`);
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
        let NeededEloString = `100<i>0</i>`;
        if (CurrentTier > 23) {
            if (NeededElo >= 1000) {
                NeededEloString = `${NeededElo}`;
            } else if (NeededElo >= 100) {
                NeededEloString = `${NeededElo}<i>0</i>`;
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

const root = document.querySelector(`:root`);
root.style.setProperty(`--left-color`, bar_color_left);
root.style.setProperty(`--right-color`, bar_color_right);
root.style.setProperty(`--text-color`, text_color);
root.style.setProperty(`--background-color`, bg_color);

updatePageData();
let timerId = setInterval(() => {updatePageData(); console.log(`Page data updated`)}, 60000);