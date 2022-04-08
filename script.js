const 時鐘 = document.getElementById("時鐘").children;
const 靜音切換按鈕 = document.getElementById("靜音切換按鈕");
const 載入提示 = document.getElementById('載入提示');
const 載入按鈕 = document.getElementById('載入按鈕');
const 登入按鈕 = document.getElementById('登入按鈕');
const 登出按鈕 = document.getElementById('登出按鈕');
const 送出按鈕 = document.getElementById('送出按鈕');
const 至頂按鈕 = document.getElementById('至頂按鈕');
const 狀態欄 = document.getElementById('狀態欄');
const 錯誤訊息視窗 = document.getElementById('錯誤訊息視窗');
const 錯誤訊息視窗內文 = document.getElementById('錯誤訊息視窗內文');
const 錯誤訊息視窗登入按鈕 = document.getElementById('錯誤訊息視窗登入按鈕');
const 載入背景音樂 = document.getElementById('map_background_music')
const 答題背景音樂 = document.getElementById('fight_background_music')
const 正解音效 = document.getElementById('victory_sound_effect');
const 錯題音效 = document.getElementById('keep_going_sound_effect');
const 點擊音效 = document.getElementById('panel_btn_click_sound_effect');

var 輸入框 = [
  document.forms[0][0],
  document.forms[0][1],
  document.forms[0][2],
  document.forms[0][3],
  document.forms[0][4],
];

var 選擇年份 = '';

var 暫存題庫 = [], 題庫 = [], 目前題目 = [], 正確答案;

var 目前背景音樂 = new Audio(), 靜音狀態 = 0;

// From https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));

function 切換背景音樂(哪個) {
  答題背景音樂.muted = 載入背景音樂.muted = true;
  目前背景音樂 = document.getElementById(哪個 + '_background_music');
  if (靜音狀態 == 2) {
    目前背景音樂.muted = false;
    目前背景音樂.play();
  }
}

function 音效播放(音效) {
  音效.currentTime = 0;
  音效.play();
}

function 靜音切換() {
  switch (靜音狀態) {
    case 0: 靜音狀態 = 1;
      靜音切換按鈕.innerHTML = `<i class="fa fa-volume-down"></i>`;
      正解音效.muted = 錯題音效.muted = 點擊音效.muted = false;
      return;
    case 1: 靜音狀態 = 2;
      靜音切換按鈕.innerHTML = `<i class="fa fa-volume-up"></i>`;
      目前背景音樂.muted = false;
      目前背景音樂.play();
      return;
    case 2: 靜音狀態 = 0;
      靜音切換按鈕.innerHTML = `<i class="fa fa-volume-mute"></i>`;
      正解音效.muted = 錯題音效.muted = 點擊音效.muted = true;
      目前背景音樂.muted = true;
  }
}

function 打亂陣列(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // console.log(array);
  return array;
}

function 下一題() {
  載入提示.style.display = 'flex';
  $('#送出按鈕').hide();
  $('#下一題按鈕').show()
  document.getElementById('answer-panel-question-content').scrollTo(0, 0);
  if (暫存題庫.length < 1) 更新登入狀態();
  目前題目 = 暫存題庫.pop();
  輸入框[0].value = 輸入框[0].innerHTML = 目前題目[0];
  正確答案 = String(目前題目[1]);
  目前題目 = 打亂陣列(目前題目.slice(1));
  // console.log(current);
  for (let 元素 of 輸入框.slice(1)) {
    元素.value = 目前題目.pop();
    元素.innerHTML = 元素.value;
  }
  for (const i in 輸入框)
    目前題目[i] = 輸入框[i].innerHTML;
  // console.log(bgm.src);
  切換背景音樂('fight');
  調整介面();
  載入提示.style.display = 'none';
}

async function 檢查答案(選項) {
  if (送出按鈕.style.display == 'none') {
    // console.log(正確答案,'\n',選項.value,'\n',選項.innerHTML);
    if (正確答案 === 選項.value || 正確答案 === 選項.innerHTML) {
      錯題音效.pause();
      音效播放(正解音效);
      await sleep(50);
      if (confirm('⭕答對啦！\n\n' + 正確答案 + '\n\n按下取消(Esc)返回、確定(Enter)下一題'))
        下一題();
    } else {
      正解音效.pause();
      音效播放(錯題音效);
    }
  } else {
    for (const 元素 of 輸入框.slice(1)) {
      if (元素.value == 選項.value || 元素.innerHTML == 選項.innerHTML) {
        [輸入框[1].value, 輸入框[1].innerHTML, 選項.value, 選項.innerHTML] =
          [選項.value, 選項.innerHTML, 輸入框[1].value, 輸入框[1].innerHTML];
      }
    }
    調整介面();
  }
}

function 欄高自適應(元素) {
  元素.style.height = "auto";
  元素.style.height = 元素.scrollHeight + "px";
}

function 狀態欄續寫(訊息) {
  狀態欄.appendChild(document.createTextNode(訊息 + '\n'));
}

function 重設狀態欄(訊息 = `👉目前題庫有${題庫.length}題(新到舊)`) {
  狀態欄.innerHTML = 訊息 + '\n';
}

function 彈出錯誤訊息(訊息) {
  重設狀態欄('⚠️錯誤訊息');
  狀態欄續寫(訊息);
  錯誤訊息視窗內文.innerHTML = 訊息;
  $('#錯誤訊息視窗').modal('show');
  錯誤訊息視窗.style.left = 'unset';
}

function 彈出說明視窗() {
  $('#說明視窗 iframe').attr("height", screen.height * .7);
  $('#說明視窗').modal('show');
}

/**
 * From https://developers.google.com/sheets/api/quickstart/js
 * test: https://docs.google.com/spreadsheets/d/1o6qXeil50N9-J_ONMDZybYeHt1aZ9ReSIFwtVnRYk4E
 * real: https://docs.google.com/spreadsheets/d/1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw
 */
async function 重載題庫() {
  載入提示.style.display = 'flex';
  重設狀態欄();
  $('#選擇視窗').modal('show');
  while(!選擇年份) await sleep(1000);
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw', // real
    // spreadsheetId: '1o6qXeil50N9-J_ONMDZybYeHt1aZ9ReSIFwtVnRYk4E', // test
    range: 選擇年份,
  }).then(function (response) {
    選擇年份 = '';
    載入提示.style.display = 'flex';
    var range = response.result;
    if (range.values.length > 0) {
      題庫 = 暫存題庫 = range.values;
      重設狀態欄();
      題庫.reverse();
      const fmt = ['🤔', '⭕正確答案: ', '錯誤答案1: ', '錯誤答案2: ', '錯誤答案3: '];
      for (const row of 題庫)
        for (const i in fmt)
          狀態欄續寫('\n' + fmt[i] + row[i]);
      打亂陣列(暫存題庫);
      下一題();
    } else 彈出錯誤訊息('No data found.');
  }, 回應 => 彈出錯誤訊息('Error: ' + 回應.result.error.message));
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function 更新登入狀態(isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get(), 只是看看) {
  //console.log('isSignedIn:',isSignedIn,typeof isSignedIn);
  載入按鈕.style.display = 'none';
  if (isSignedIn) {
    登入按鈕.style.display = 'none';
    登出按鈕.style.display = 'block';
    if (只是看看) return;
    重載題庫();
  } else {
    登入按鈕.style.display = 'block';
    登出按鈕.style.display = 'none';
  }
  return isSignedIn;
}

function 登入() {
  載入提示.style.display = 'flex';
  載入按鈕.style.display = 'block';
  登入按鈕.style.display = 'none';
  切換背景音樂('map');
  try {
    gapi.auth2.getAuthInstance().signIn();
  } catch (e) {
    console.log(e);
  }
}

function 清除輸入框() {
  切換背景音樂('map');
  document.forms[0].reset();
  for (input of document.forms[0])
    input.value = input.innerHTML = null;
  調整介面();
  $('#送出按鈕').hide();
  $('#下一題按鈕').show();
}

function 送出題目() {
  if (送出按鈕.style.display == 'none' || 檢查題目()) return;
  else if (confirm(輸入框[1].value + '\n\n是正確答案嗎?\n\n按下確定(Enter)送至 Google 試算表')) {
    document.forms[0].submit();
    $('#送出按鈕').hide()
    $('#下一題按鈕').show();
    更新登入狀態();
  }
  if (!gapi.auth2.getAuthInstance().isSignedIn.get())
    彈出錯誤訊息('未登入');
}

function 檢查題目() {
  const value = 輸入框[0].value;
  const innerHTML = 輸入框[0].innerHTML;
  for (const row of 題庫)
    if ((value && value.length > 5
      && String(row[0]).indexOf(value) > -1)
      || (innerHTML && innerHTML.length > 5
        && String(row[0]).indexOf(innerHTML) > -1)) {
      if (!confirm(`有這個題目了，檢查正確答案無誤?

⭕正確答案: ${row[1]}

錯誤答案1: ${row[2]}
錯誤答案2: ${row[3]}
錯誤答案3: ${row[4]}

按下取消(Esc)以關閉，確定(Enter)以編輯/送出修改
👉記得到試算表刪掉原來錯的，自動刪除開發中...`)) return true;
      else break;
    }
  // console.clear();
  // console.log(database);
  return false;
}

function 輸入() {
  切換背景音樂('map');
  let content = String(輸入框[0].value);
  let ai = content.indexOf('\nA\n');
  let bi = content.indexOf('\nB\n', ai);
  let ci = content.indexOf('\nC\n', bi);
  let di = content.indexOf('\nD\n', ci);
  // console.log(ai, bi, ci, di);
  let ans = [
    content.substring(ai + 3, bi),
    content.substring(bi + 3, ci),
    content.substring(ci + 3, di),
    content.substring(di + 3)
  ];
  if (ai > 5) 輸入框[0].value = content.substring(0, ai);
  if (檢查題目()) {
    for (const i in 輸入框)
      輸入框[i].value = 輸入框[i].innerHTML = 目前題目[i];
    $('#送出按鈕').hide();
    $('#下一題按鈕').show()
  } else if (ai > -1 && bi > -1 && ci > -1 && di > -1) {
    $('#下一題按鈕').hide();
    $('#送出按鈕').show()
    let temp;
    const tip = `

這是正確答案嗎?
按下取消(Esc)選為錯誤答案、確定(Enter)選為正確答案`;
    for (let i = -1; !confirm((temp = ans[++i]) + tip);)
      if (i == 2) { temp = ans[3]; break; }
    ans.splice(ans.indexOf(temp), 1);
    // console.log(ans);
    輸入框[1].value = temp;
    for (const i of Array(3).keys())
      輸入框[2 + i].value = 輸入框[2 + i].innerHTML = ans[i];
  } else if (
    (輸入框[1].value || 輸入框[1].innerHTML) &&
    (輸入框[2].value || 輸入框[2].innerHTML) &&
    (輸入框[3].value || 輸入框[3].innerHTML) &&
    (輸入框[4].value || 輸入框[4].innerHTML)
  ) {
    $('#下一題按鈕').hide();
    $('#送出按鈕').show()
  }
  // console.log(ai,bi,ci,di);
  調整介面();
}

var 介面狀態;
function 調整介面() {
  for (let 元素 of 輸入框)
    欄高自適應(元素);
  if (innerWidth < 767) {
    if (介面狀態 == '小') return;
    介面狀態 = '小';
    $('#answer-panel').addClass('attack_modal_m');
    $('#answer-panel').addClass('attack_modal_m_sprite');
    $('#answer-panel').removeClass('panel');
    $('#answer-panel').removeClass('attack_modal_reading_sprite');
    $('.input-group-area').attr('data-selection-count', 6);
    $('.input-group-area .attack_modal_sprite').addClass('attack_modal_m_sprite');
    $('.input-group-area .attack_modal_sprite').removeClass('attack_modal_sprite');
    $('.btn04').addClass('btn04_m');
    $('.btn04').removeClass('btn04');
  } else {
    if (介面狀態 == '大') return;
    介面狀態 = '大';
    $('#answer-panel').addClass('panel');
    $('#answer-panel').addClass('attack_modal_reading_sprite');
    $('#answer-panel').removeClass('attack_modal_m');
    $('#answer-panel').removeClass('attack_modal_m_sprite');
    $('.input-group-area').attr('data-selection-count', 4);
    $('.input-group-area .attack_modal_m_sprite').addClass('attack_modal_sprite');
    $('.input-group-area .attack_modal_m_sprite').removeClass('attack_modal_m_sprite');
    $('.btn04_m').addClass('btn04');
    $('.btn04_m').removeClass('btn04_m');
  }
}

// from https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
const 補零 = i => i < 10 ? '0' + i : i.toString();  // add zero in front of numbers < 10
function 計時() {
  const t = new Date();
  let hms = [t.getHours(), t.getMinutes(), t.getSeconds()];
  hms = 補零(hms[0]) + 補零(hms[1]) + 補零(hms[2]);
  for (const i in 時鐘) if (時鐘[i].innerHTML != hms[i]) 時鐘[i].innerHTML = hms[i];
  setTimeout(計時, 1000 - new Date() % 1000);
}

// EventListener
document.getElementById('清除按鈕').onclick = 清除輸入框;
document.getElementById('下一題按鈕').onclick = 載入提示.onclick = 下一題;
document.getElementById('選單說明按鈕').onclick =
  document.getElementById('驚嘆號按鈕').onclick = 彈出說明視窗;
document.getElementById('按鈕A').onclick = e => 檢查答案(輸入框[1]);
document.getElementById('按鈕B').onclick = e => 檢查答案(輸入框[2]);
document.getElementById('按鈕C').onclick = e => 檢查答案(輸入框[3]);
document.getElementById('按鈕D').onclick = e => 檢查答案(輸入框[4]);

document.getElementById('選擇視窗2021按鈕').onclick = e => {
  選擇年份 = '2021!B2:F';
  document.forms[0][0].setAttribute("name", "entry.892031688");
  document.forms[0][1].setAttribute("name", "entry.977089316");
  document.forms[0][2].setAttribute("name", "entry.657500498");
  document.forms[0][3].setAttribute("name", "entry.1532072947");
  document.forms[0][4].setAttribute("name", "entry.1090409630");
}

document.getElementById('選擇視窗2022按鈕').onclick = e => {
  選擇年份 = '2022!B2:F';
  document.forms[0][0].setAttribute("name", "entry.1911469271");
  document.forms[0][1].setAttribute("name", "entry.1072618664");
  document.forms[0][2].setAttribute("name", "entry.1728754073");
  document.forms[0][3].setAttribute("name", "entry.1621978531");
  document.forms[0][4].setAttribute("name", "entry.1926198241");
}

送出按鈕.onclick = 送出題目;
靜音切換按鈕.onclick = 靜音切換;

// When the user clicks on the button, scroll to the top of the document
至頂按鈕.onclick = e => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

錯誤訊息視窗登入按鈕.onclick = 登入按鈕.onclick = 登入;

登出按鈕.onclick = e => {
  重設狀態欄('您已登出');
  載入按鈕.style.display = 'block';
  切換背景音樂('map');
  暫存題庫 = 題庫 = 目前題目 = 正確答案 = [];
  清除輸入框();
  gapi.auth2.getAuthInstance().signOut();
  更新登入狀態(false);
};

載入按鈕.onclick = e => {
  更新登入狀態();
  下一題();
};

// From https://stackoverflow.com/questions/13623280/onclick-select-whole-text-textarea
for (const 元素 of 輸入框) {
  元素.addEventListener("input", 輸入);
  元素.onfocus = e => {
    元素.select();
    // Work around Chrome's little problem
    元素.onmouseup = function () {
      // Prevent further mouseup intervention
      元素.onmouseup = null;
      return false;
    };
  };
}

onload = onresize = 調整介面;
onfocus = e => {
  更新登入狀態(gapi.auth2.getAuthInstance().isSignedIn.get(), true);
  調整介面();
  if(載入提示.style.display!='none') 輸入框[0].focus();
};
onblur = e => {
  調整介面();
  登入按鈕.style.display = 登出按鈕.style.display = 'none';
  載入按鈕.style.display = 'block';
}
// from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// When the user scrolls down 20px from the top of the document, show the button
onscroll = e => {
  調整介面(); console.log('test');
  if (document.body.scrollTop > innerHeight
    || document.documentElement.scrollTop > innerHeight) {
    至頂按鈕.style.display = "block";
  } else {
    至頂按鈕.style.display = "none";
  }
};

document.body.onload = e => { 靜音切換(); 調整介面(); 計時() };
document.body.onclick = e => 音效播放(點擊音效);
document.body.onkeydown = e => {
  if (e.target == document.body) switch (e.key.toUpperCase()) {
    default: //console.log(e.key);
      break; case ' ': e.preventDefault(); 下一題();
      break; case '1': case 'A':
      if (e.target.tagName.toUpperCase() != 'TEXTAREA')
        檢查答案(輸入框[1]);
      break; case '2': case 'B':
      if (e.target.tagName.toUpperCase() != 'TEXTAREA')
        檢查答案(輸入框[2]);
      break; case '3': case 'C':
      if (e.target.tagName.toUpperCase() != 'TEXTAREA')
        檢查答案(輸入框[3]);
      break; case '4': case 'D':
      if (e.target.tagName.toUpperCase() != 'TEXTAREA')
        檢查答案(輸入框[4]);
      break; case 'M':
      if (e.target.tagName.toUpperCase() != 'TEXTAREA')
        靜音切換();
      break; case 'enter':
      if (送出按鈕.style.display != 'none')
        送出題目();
      break; case 'escape': 清除輸入框();
  }
};

/**
 * On load, called to load the auth2 library and API client library.
 * Initializes the API client library and sets up sign-in state  listeners.
 */
gapi.load('client:auth2', e => {
  gapi.client.init({
    // Client ID and API key from the Developer Console
    clientId: '289902636224-oro06s681gdgk1kqrv8o1oca2shocfr4.apps.googleusercontent.com',
    apiKey: 'AIzaSyCRfe3-dnm9GGMH_PFm9m5WHBMb_8U9HXY',
    /**Array of API discovery doc URLs for APIs used by the quickstart */
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    /**Authorization scopes required by the API; multiple scopes can be
     * included, separated by spaces. */
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly"
  }).then(e => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(更新登入狀態);
    // Handle the initial sign-in state.
    if (!更新登入狀態()) 登入();
  }, 錯誤 => 彈出錯誤訊息(JSON.stringify(錯誤, null, 2)));
});