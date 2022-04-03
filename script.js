const entry = {
    題目: 'entry.892031688',
    正確答案: 'entry.977089316',
    錯誤答案1: 'entry.657500498',
    錯誤答案2: 'entry.1532072947',
    錯誤答案3: 'entry.1090409630'
}

// Client ID and API key from the Developer Console
var CLIENT_ID = '289902636224-oro06s681gdgk1kqrv8o1oca2shocfr4.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCRfe3-dnm9GGMH_PFm9m5WHBMb_8U9HXY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var pre = document.getElementById('content');
var 載入提示 = document.getElementById('loader');
var 載入按鈕 = document.getElementById('signloader_button');
var 登入按鈕 = document.getElementById('authorize_button');
var 登出按鈕 = document.getElementById('signout_button');
var 下一題按鈕 = document.getElementById('nextQuestion');
var 按鈕A = document.getElementById('buttonA');
var 按鈕B = document.getElementById('buttonB');
var 按鈕C = document.getElementById('buttonC');
var 按鈕D = document.getElementById('buttonD');
var 送出按鈕 = document.getElementById('submit');
var 清除按鈕 = document.getElementById('clear');
var 題目輸入框 = document.forms[0][entry.題目];
var 選項輸入框 = [
    document.forms[0][entry.正確答案],
    document.forms[0][entry.錯誤答案1],
    document.forms[0][entry.錯誤答案2],
    document.forms[0][entry.錯誤答案3]
];

var 暫存題庫 = [], 題庫 = [];
var 目前題目, 正確答案;

var 背景音樂 = new Audio('map_background_music.mp3');
背景音樂.loop = true;


// From https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
    // console.log(array);
    return array;
}

function 下一題() {
    載入提示.style.display = 'flex';
    送出按鈕.style.display = 'none';
    目前題目 = 暫存題庫.pop();
    if (暫存題庫.length < 1) 重載題庫();
    題目輸入框.innerHTML = 目前題目[0];
    目前題目.splice(0, 1);
    正確答案 = String(目前題目[0]);
    目前題目 = shuffle(目前題目);
    // console.log(current);
    選項輸入框[0].innerHTML = 目前題目.pop();
    選項輸入框[1].innerHTML = 目前題目.pop();
    選項輸入框[2].innerHTML = 目前題目.pop();
    選項輸入框[3].innerHTML = 目前題目.pop();
    題目輸入框.value = 題目輸入框.innerHTML;
    選項輸入框[0].value = 選項輸入框[0].innerHTML;
    選項輸入框[1].value = 選項輸入框[1].innerHTML;
    選項輸入框[2].value = 選項輸入框[2].innerHTML;
    選項輸入框[3].value = 選項輸入框[3].innerHTML;
    // console.log(bgm.src);
    戰鬥背景音樂();
    背景音樂.play();
    載入提示.style.display = 'none';
}

/**
 * From https://developers.google.com/sheets/api/quickstart/js
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw/edit
 */
function 重載題庫() {
    載入提示.style.display = 'flex';
    cleanPre();
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw',
        range: '2022 GiCS!B2:F',
    }).then(function (response) {
        載入提示.style.display = 'flex';
        cleanPre();
        var range = response.result;
        if (range.values.length > 0) {
            題庫 = 暫存題庫 = range.values; shuffle(暫存題庫);
            題庫.reverse();
            for (const row of 題庫)
                appendPre(`
  🤔${row[0]}
  ⭕正確答案:${row[1]}
  錯誤答案1:${row[2]}
  錯誤答案2:${row[3]}
  錯誤答案3:${row[4]}`);
            下一題();
        } else {
            appendPre('No data found.');
        }
    }, function (response) {
        appendPre('Error: ' + response.result.error.message);
    });
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        登入按鈕.onclick = handleAuthClick;
        登出按鈕.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    載入按鈕.style.display = 'none';
    if (isSignedIn) {
        登入按鈕.style.display = 'none';
        登出按鈕.style.display = 'block';
        重載題庫();
    } else {
        登入按鈕.style.display = 'block';
        登出按鈕.style.display = 'none';
    }
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    載入提示.style.display = 'flex';
    載入按鈕.style.display = 'block';
    登入按鈕.style.display = 'none';
    地圖背景音樂();
    背景音樂.play();
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    載入提示.style.display = 'flex';
    載入按鈕.style.display = 'block';
    地圖背景音樂();
    背景音樂.play();
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    pre.appendChild(document.createTextNode(message + '\n'));
}

function cleanPre() {
    document.getElementById('content').innerHTML = '👉狀態欄/目前題庫\n';
}

function 清除() {
    地圖背景音樂();
    document.forms[0].reset();
    for (input of document.forms[0]) {
        input.innerHTML = '';
        input.value = ''
    }
    送出按鈕.style.display = 'none';
}


function 送出題目() {
    if (送出按鈕.style.display != 'block') return;
    for (const row of 題庫)
        if (題目輸入框.value && String(row[0]).indexOf(題目輸入框.value) > -1) {
            alert("有這個題目了");
            return;
        }
    if (confirm(選項輸入框[0].value + '\n\n是正確答案嗎?\n\n按下確定(Enter)送至 Google 試算表')) {
        document.forms[0].submit();
        送出按鈕.style.display = 'none';
    }
    重載題庫();
}

function 檢查題目(question) {
    for (const row of 題庫)
        if (question && question.length > 5 && String(row[0]).indexOf(question) > -1) {
            alert("有這個題目了");
            return true;
        }
    // console.clear();
    // console.log(database);
    return false;
}

async function 檢查答案(選項) {
    if (正確答案 === 選項.value) {
        if (靜音狀態 > 0) new Audio('victory_sound_effect.mp3').play();
        await sleep(50);
        if (confirm('⭕答對啦！\n\n按下取消(Esc)返回、確定(Enter)下一題'))
            下一題();
    } else if (靜音狀態 > 0) new Audio('keep_going_sound_effect.mp3').play();
}

var 靜音狀態 = -1;
function 靜音切換() {
    switch (靜音狀態) {
        case -1: 靜音狀態 = 2;
            背景音樂.muted = false; 背景音樂.play();
            document.getElementById("volctrl").innerHTML = `<i class="volume up icon"></i>`;
            document.body.onclick = e => new Audio('panel_btn_click_sound_effect.mp3').play();
            return;
        case 0: 靜音狀態 = 1;
            document.getElementById("volctrl").innerHTML = `<i class="volume down icon"></i>`;
            document.body.onclick = e => new Audio('panel_btn_click_sound_effect.mp3').play();
            return;
        case 1: 靜音狀態 = 2;
            背景音樂.muted = false; 背景音樂.play();
            document.getElementById("volctrl").innerHTML = `<i class="volume up icon"></i>`;
            return;
        case 2: 靜音狀態 = 0;
            背景音樂.muted = true;
            document.getElementById("volctrl").innerHTML = `<i class="volume off icon"></i>`;
            document.body.onclick = e => e;
    }
}

登入按鈕.addEventListener("click", cleanPre);
登出按鈕.addEventListener("click", cleanPre);
下一題按鈕.addEventListener("click", 下一題);
送出按鈕.addEventListener("click", 送出題目);
清除按鈕.addEventListener("click", 清除);
按鈕A.addEventListener('click', e => 檢查答案(選項輸入框[0]));
按鈕B.addEventListener('click', e => 檢查答案(選項輸入框[1]));
按鈕C.addEventListener('click', e => 檢查答案(選項輸入框[2]));
按鈕D.addEventListener('click', e => 檢查答案(選項輸入框[3]));

function 地圖背景音樂() {
    if (背景音樂.src.indexOf('map_background_music.mp3') == -1)
        背景音樂.src = 'map_background_music.mp3';
    if (靜音狀態 == 2) 背景音樂.play();
}

function 戰鬥背景音樂() {
    if (背景音樂.src.indexOf('fight_background_music.mp3') == -1)
        背景音樂.src = 'fight_background_music.mp3';
    if (靜音狀態 == 2) 背景音樂.play();
}

題目輸入框.addEventListener("input", e => {
    地圖背景音樂();
    let content = String(題目輸入框.value);
    let ai = content.indexOf('\nA\n');
    let bi = content.indexOf('\nB\n', ai);
    let ci = content.indexOf('\nC\n', bi);
    let di = content.indexOf('\nD\n', ci);
    console.log(ai, bi, ci, di);
    let ans = [
        content.substring(ai + 3, bi),
        content.substring(bi + 3, ci),
        content.substring(ci + 3, di),
        content.substring(di + 3)
    ];
    var question = 題目輸入框.value;
    if (ai > -1 && bi > -1 && ci > -1 && di > -1) {
        題目輸入框.value = content.substring(0, ai);
        question = 題目輸入框.value;
        if (!檢查題目(question)) {
            送出按鈕.style.display = 'block';
            let temp;
            const tip = "\n\n按下取消(Esc)選為錯誤答案、確定(Enter)選為正確答案";
            for (let i = -1; !confirm((temp = ans[++i]) + tip);)
                if (i == 2) { temp = ans[3]; break; }
            ans.splice(ans.indexOf(temp), 1);
            // console.log(ans);
            document.forms[0][entry.正確答案].value = temp;
            for (let i = 0; 4 > ++i; document.forms[0][entry[`錯誤答案${i}`]].value = ans[i - 1]);
        }
    } else if (暫存題庫.length > -1 && question && !檢查題目(question)
        && 選項輸入框[0].value && 選項輸入框[1] && 選項輸入框[2] && 選項輸入框[3]) {
        送出按鈕.style.display = 'block';
    }
    console.log(`ai:${ai},bi:${bi},ci:${ci},di:${di}`);
});

document.getElementById("volctrl").addEventListener("click", 靜音切換);
document.body.onclick = e => 靜音切換();

// From https://stackoverflow.com/questions/13623280/onclick-select-whole-text-textarea
題目輸入框.onfocus = e => {
    題目輸入框.select();
    // Work around Chrome's little problem
    題目輸入框.onmouseup = function () {
        // Prevent further mouseup intervention
        題目輸入框.onmouseup = null;
        return false;
    };
};

for (const 元素 of 選項輸入框)
    元素.onfocus = e => {
        元素.select();
        // Work around Chrome's little problem
        元素.onmouseup = function () {
            // Prevent further mouseup intervention
            元素.onmouseup = null;
            return false;
        };
    };

document.body.addEventListener('keydown', e => {
    if (e.target == document.body) switch (e.key.toUpperCase()) {
        default: console.log(e.key);
            break; case ' ': e.preventDefault(); 下一題();
            break; case '1', 'A':
            if (e.target.tagName.toUpperCase() != 'TEXTAREA')
                檢查答案(選項輸入框[0]);
            break; case '2', 'B':
            if (e.target.tagName.toUpperCase() != 'TEXTAREA')
                檢查答案(選項輸入框[1]);
            break; case '3', 'C':
            if (e.target.tagName.toUpperCase() != 'TEXTAREA')
                檢查答案(選項輸入框[2]);
            break; case '4', 'D':
            if (e.target.tagName.toUpperCase() != 'TEXTAREA')
                檢查答案(選項輸入框[3]);
            break; case 'M':
            if (e.target.tagName.toUpperCase() != 'TEXTAREA')
                靜音切換();
            break; case 'enter':
            if (送出按鈕.style.display != 'none')
                送出題目();
            break; case 'escape': 清除();
    }
});