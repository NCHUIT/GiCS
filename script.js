(function checkBrowser() {
  var ua = window.navigator.userAgent;
  var olderThanIE11 = /MSIE/.test(ua);
  if (olderThanIE11) {
    if (window.location.href.match('/application/download_browser')) return;
    window.location = '/application/download_browser';
  }
})();
//<![CDATA[
var terrainMapping = {
  "1": "wild/ocean", "2": "grass/grass", "3": "grass/house_hut", "4": "grass/pool", "5": "grass/sheep_ranch",
  "6": "sand/sand", "8": "sand/beach", "10": "hill/forest", "11": "hill/mountain", "13": "sakura/sakura",
  "15": "snow/snow", "16": "snow/snowman", "17": "sakura/sakura_tree", "18": "sakura/sakura_ohtorii",
  "21": "snow/penguin", "26": "sakura/sakura_shrine", "27": "grass/house_manor", "28": "grass/house_villa",
  "34": "snow/ice_house", "35": "sand/beach_resort", "41": "golden/golden_terrain", "42": "golden/golden_statue",
  "43": "wild/floodwood1", "44": "grass/lotus1", "45": "grass/lotus2", "46": "maple/maple", "47": "maple/maple_acorn",
  "48": "gene/gene", "49": "circuit/circuit", "50": "hill/kumquat_tree", "51": "special/terre_horn",
  "52": "sand/coral_shoal", "53": "sand/coral_island", "54": "sand/coral_mermaid_island", "55": "grass/marigold_patch",
  "56": "grass/marigold_field", "57": "grass/marigold_garden", "58": "grass/hyacinth_patch", "59": "grass/hyacinth_field",
  "60": "grass/hyacinth_garden", "61": "grass/lavender_patch", "62": "grass/lavender_field", "63": "grass/lavender_garden",
  "64": "grass/farmhouse", "65": "maple/squirrel", "66": "maple/autumn_castle", "70": "special/fort",
  "71": "special/pillbox", "72": "special/castle", "73": "sand/camel_caravan", "74": "sand/oasis", "75": "sand/pyramid",
  "76": "team/base", "79": "team/explosion", "82": "sand/carousel", "83": "sand/pirate_ship", "84": "sand/ferris_wheel",
  "85": "sand/coconut_tree", "86": "maple/autumn_ship", "87": "grass/palace_museum", "88": "snow/reindeer",
  "89": "grass/british_museum", "90": "grass/winter_palace", "91": "grass/tomorrow_star", "92": "grass/vatican_museum",
  "93": "grass/cow_ranch", "94": "grass/metropolitan_museum", "95": "grass/louvre_museum", "96": "grass/ntu/fu_bell",
  "97": "grass/ntu/palm_avenue", "98": "grass/farmers_market", "99": "sand/dragon_boat", "100": "sand/polaris",
  "101": "grass/su_huan_jen", "102": "grass/luan_shih_kuang_dao", "103": "grass/ye_shiao_chai", "104": "wild/swirlcell",
  "105": "sand/testrite_festival", "106": "maple/thoughts_of_autumn", "107": "sand/testrite_pumpkin",
  "108": "hill/black_bear", "109": "grass/thanksgiving", "110": "hill/rock_tiger", "111": "sand/ntu/fish_ship",
  "112": "sand/ntu/chihkan_tower", "113": "hill/fetnet_deer", "115": "snow/testrite_xmas_tree", "116": "snow/bonio_xmas_tree",
  "117": "hill/taiwan_blue_magpie", "118": "sand/moonlight_terrain", "119": "hill/taiwan_macaque", "120": "grass/black_sheep",
  "121": "grass/pink_cow", "122": "grass/brown_horse", "123": "grass/white_horse", "124": "hill/taiwan_butterfly",
  "125": "hill/apple_tree", "126": "sand/dreamy_carousel", "127": "sand/dreamy_pirate_ship", "128": "sand/dreamy_ferris_wheel",
  "129": "golden/steel_statue", "130": "grass/white_house", "131": "grass/pink_house", "132": "grass/golden_house",
  "133": "wild/deep_sea_beasts", "134": "grass/rijks_museum", "135": "sand/boundless_star_ring",
  "136": "grass/white_hat_hacker", "137": "grass/black_hat_hacker", "138": "grass/chan_chao", "139": "grass/du_du_cat",
  "140": "sand/info_security_soldier", "141": "sand/trojan_virus", "142": "maple/crystalline_palace", "143": "grass/road_a",
  "144": "grass/road_b", "145": "grass/road_c", "146": "grass/road_d", "147": "grass/road_e", "148": "grass/tree_bo",
  "149": "grass/hu_hu_cat", "150": "grass/seesaw", "151": "grass/tree_bo_sister", "152": "snow/santa_claus",
  "153": "grass/la_la_cat", "154": "sand/halley_comet", "155": "grass/tree_pa", "156": "grass/lu_lu_cat",
  "157": "grass/pon_pon_cat", "158": "grass/control_center", "159": "grass/rd_center", "160": "grass/dragon_factory",
  "161": "grass/tree_ma", "162": "grass/mia_figurine", "163": "sand/esun_bank_logo", "164": "grass/windmill",
  "165": "grass/iwin_soldier", "166": "grass/ningxiaks_cat", "167": "grass/maro_figurine", "168": "grass/baatar_figurine",
  "169": "grass/sophie_figurine", "170": "grass/kachina_figurine", "171": "grass/amir_figurine", "172": "grass/csc_badge",
  "173": "sand/dragon_boat_2020", "174": "grass/thunder_of_wisdom", "175": "grass/cheers", "176": "grass/aishiteru",
  "177": "grass/millet_festival", "178": "grass/bubble_tea_shop", "179": "grass/braggy", "180": "grass/arc_de_triomphe",
  "181": "grass/eiffel_tower", "182": "grass/notre_dame_de_paris", "183": "grass/dolly", "184": "grass/draca",
  "185": "grass/roman_warrior", "186": "grass/laser_island", "187": "maple/osmanthus_tree", "188": "grass/armored_knight",
  "189": "grass/the_power_of_love", "190": "grass/pumpkin_carriage", "191": "grass/candy_house", "192": "grass/beanstalk",
  "193": "sand/doha_art_museum", "194": "snow/monkeys_hot_spring", "195": "grass/house_of_straw",
  "196": "grass/house_of_sticks", "197": "grass/house_of_bricks", "198": "grass/teacher_tree",
  "199": "grass/wish_general_store", "200": "grass/esun_surplus_year_after_year", "201": "grass/ling_ling",
  "202": "grass/fried_chicken_shop", "203": "sakura/sakura_picnic", "204": "grass/chunghwa_telecom_gold_coin",
  "205": "grass/esun_happy_childrens_day", "206": "grass/defensive_shield", "207": "grass/patron_saint_of_cybersecurity",
  "208": "hill/observatory", "209": "hill/ruins", "210": "hill/mysterious_pyramid", "211": "grass/chiao_chiao",
  "212": "grass/black_winged_stilt", "213": "grass/ntpc_castle", "214": "grass/hsiao_hsiao", "215": "sand/golden_gate_bridge",
  "216": "sand/statue_of_liberty", "217": "sand/empire_state_building", "218": "sand/traditional_ice_cream_bike",
  "219": "grass/eco_water_cube", "220": "grass/cloud_baby", "221": "grass/gorilla_koko", "222": "grass/whales_tears",
  "223": "grass/aishiteru_digital_chaining", "224": "grass/mango_shaved_ice_shop",
  "225": "grass/disaster_prevention_little_warrior", "226": "grass/magic_eco_friendly_suit", "227": "grass/dr_q",
  "228": "grass/vitality_fruits_and_vegetables", "229": "grass/e_du", "230": "sand/agile_killer_whale_tica",
  "231": "grass/hepatitis_b_vaccine_40th_anniversary", "232": "grass/christchurch_art_gallery",
  "233": "grass/power_saving_lover_power_boss", "234": "grass/benq_lion", "235": "grass/kao_kirei_captain",
  "236": "grass/dr_bobo", "237": "maple/jade_rabbit_pounding_medicine", "238": "grass/agile_chameleon",
  "239": "sand/grand_egyptian_museum", "240": "grass/rainbow_paradise", "241": "sand/flying_bus", "242": "sand/teacups",
  "243": "sand/drop_tower", "244": "sand/boca", "245": "grass/patron_saint_of_cybersecurity_20", "246": "grass/panay",
  "247": "grass/ali", "248": "grass/the_power_of_love_throw_into_the_dream", "249": "sand/dreamy_flying_bus",
  "250": "sand/dreamy_teacups", "251": "sand/dreamy_drop_tower", "252": "sand/queen_elizabeth_ii_tower",
  "253": "sand/tower_bridge", "254": "sand/buckingham_palace", "255": "grass/ataw", "256": "grass/mia_stone_statue",
  "257": "grass/maro_stone_statue", "258": "grass/baatar_stone_statue", "259": "grass/sophie_stone_statue",
  "260": "grass/kachina_stone_statue", "261": "grass/amir_stone_statue", "262": "grass/sword_in_the_stone",
  "263": "sand/captain_mia_from_true_or_false_picket", "264": "sand/detective_amir_from_true_or_false_picket",
  "265": "grass/straight_sand_road", "266": "grass/southeast_sand_road", "267": "grass/southwest_sand_road",
  "268": "grass/inverted_y_shaped_sand_road", "269": "grass/y_shaped_sand_road", "270": "snow/gassho_style_house",
  "271": "grass/hkhs_crown", "272": "grass/hkhs_diamond", "273": "grass/hkhs_closed_treasure_chest",
  "274": "grass/hkhs_treasure_chest", "275": "grass/badminton_star_huhu", "276": "sand/seaside_wind_power_plant",
  "277": "grass/bunny_hot_air_balloon", "278": "grass/cat_hot_air_balloon", "279": "grass/piggy_hot_air_balloon",
  "280": "grass/lohas_sports_arena", "281": "sand/the_honest_wind_lion_god_of_kinmen", "282": "sakura/red_bridge",
  "283": "grass/baseball_star_ponpon", "284": "grass/little_dumplings_specialty_store", "285": "sand/kinmens_telephone_booth",
  "286": "grass/tender_teacher_tree", "287": "grass/swing_chair", "288": "grass/fountain", "289": "grass/terrace",
  "290": "grass/table_tennis_star_lala", "291": "grass/happy_ling_ling", "292": "sand/deyue_gun_tower",
  "293": "grass/cybersecurity_ninja", "294": "grass/tower_of_knowledge", "295": "grass/golden_turret",
  "296": "grass/magic_stone_circle", "297": "grass/glowing_makers", "298": "grass/smiley_hsiao_hsiao",
  "299": "grass/serious_chiao_chiao", "300": "grass/kao_kirei_captain_part_2", "301": "grass/xiao_fei_li",
  "302": "grass/gics_girls_in_cyber_security"
};
var characterIDMapping = {
  "1": "eagle", "2": "lizard", "3": "wolf", "4": "antelope", "5": "cat", "6": "cheetah",
  "7": "alicia", "8": "zoey", "9": "ming", "10": "erik", "11": "asad", "12": "mika",
  "13": "tiencai", "14": "sikadeer", "15": "wangfu", "16": "draca", "17": "dolly", "18": "broomy"
};
//]]>

// Client ID and API key from the Developer Console
var CLIENT_ID = '289902636224-oro06s681gdgk1kqrv8o1oca2shocfr4.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCRfe3-dnm9GGMH_PFm9m5WHBMb_8U9HXY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var 時鐘 = document.getElementById("時鐘").children;
var 靜音切換按鈕 = document.getElementById("靜音切換按鈕");
var 載入提示 = document.getElementById('載入提示');
var 載入按鈕 = document.getElementById('載入按鈕');
var 登入按鈕 = document.getElementById('登入按鈕');
var 登出按鈕 = document.getElementById('登出按鈕');
var 送出按鈕 = document.getElementById('送出按鈕');
var 狀態欄 = document.getElementById('狀態欄');
var 錯誤訊息視窗 = document.getElementById('錯誤訊息視窗');
var 錯誤訊息視窗內文 = document.getElementById('錯誤訊息視窗內文');
var 錯誤訊息視窗登入按鈕 = document.getElementById('錯誤訊息視窗登入按鈕');
var 正解音效 = document.getElementById('victory_sound_effect');
var 錯題音效 = document.getElementById('keep_going_sound_effect');
var 點擊音效 = document.getElementById('panel_btn_click_sound_effect');

var 輸入框 = [
  document.forms[0]['entry.892031688'],
  document.forms[0]['entry.977089316'],
  document.forms[0]['entry.657500498'],
  document.forms[0]['entry.1532072947'],
  document.forms[0]['entry.1090409630']
];

var 暫存題庫 = [], 題庫 = [];
var 目前題目, 正確答案;

var 目前背景音樂 = new Audio();

function 切換背景音樂(哪個) {
  switch (哪個) {
    case 'map': document.getElementById('fight_background_music').muted = true; break;
    case 'fight': document.getElementById('map_background_music').muted = true;
  }
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

var 靜音狀態 = 0;
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
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
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
  欄高自適應(輸入框[0]);
  正確答案 = String(目前題目[1]);
  目前題目 = 打亂陣列(目前題目.slice(1));
  // console.log(current);
  for (let 元素 of 輸入框.slice(1)) {
    元素.value = 目前題目.pop();
    元素.innerHTML = 元素.value;
    欄高自適應(元素);
  }
  目前題目 = 輸入框[0].innerHTML;
  // console.log(bgm.src);
  切換背景音樂('fight');
  載入提示.style.display = 'none';
}

// From https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function 檢查答案(選項) {
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
}

function 欄高自適應(元素) {
  元素.style.height = "auto";
  元素.style.height = 元素.scrollHeight + "px";
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} 訊息 Text to be placed in pre element.
 */
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
  $('#說明視窗').modal('show');
}

/**
 * From https://developers.google.com/sheets/api/quickstart/js
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw
 * test: https://docs.google.com/spreadsheets/d/1o6qXeil50N9-J_ONMDZybYeHt1aZ9ReSIFwtVnRYk4E
 */
function 重載題庫() {
  載入提示.style.display = 'flex';
  重設狀態欄();
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1mLuYzFZp-zuLn1w8OMAo9XT99kzyMYVd3Zq299FYNlw', // real
    // spreadsheetId: '1o6qXeil50N9-J_ONMDZybYeHt1aZ9ReSIFwtVnRYk4E', // for test authority
    range: '2022 GiCS!B2:F',
  }).then(function (response) {
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
    if(只是看看) return;
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

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function 初始化客戶端() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(更新登入狀態);
    // Handle the initial sign-in state.
    if (!更新登入狀態()) 登入();
  }, 錯誤 => 彈出錯誤訊息(JSON.stringify(錯誤, null, 2)));
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function 載入客戶端() {
  gapi.load('client:auth2', 初始化客戶端);
}

function 清除輸入框() {
  切換背景音樂('map');
  document.forms[0].reset();
  for (input of document.forms[0]) {
    input.value = input.innerHTML = null;
    欄高自適應(input);
  }
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
    if ((value && value.length > 5 && String(row[0]).indexOf(value) > -1)
      || (innerHTML && innerHTML.length > 5 && String(row[0]).indexOf(innerHTML) > -1)) {
      alert("有這個題目了");
      return true;
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
    輸入框[0].value = 輸入框[0].innerHTML = 目前題目;
    $('#送出按鈕').hide();
    $('#下一題按鈕').show()
  } else if (ai > -1 && bi > -1 && ci > -1 && di > -1) {
    $('#下一題按鈕').hide();
    $('#送出按鈕').show()
    let temp;
    const tip = "\n這是正確答案嗎?\n按下取消(Esc)選為錯誤答案、確定(Enter)選為正確答案";
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
  for (let 元素 of 輸入框)
    欄高自適應(元素);
}

var 介面狀態;
function 調整介面() {
  if (window.screen.width < 767) {
    if (介面狀態 == '小') return;
    介面狀態 = '小';
    for (let 元素 of 輸入框)
      欄高自適應(元素);
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
    for (let 元素 of 輸入框)
      欄高自適應(元素);
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
function 計時() {
  const t = new Date();
  let hms = [t.getHours(),t.getMinutes(),t.getSeconds()];
  hms = checkTime(hms[0])+checkTime(hms[1])+checkTime(hms[2]);
  for(const i in 時鐘) 時鐘[i].innerHTML=hms[i];
  setTimeout(計時, 1000-t%1000);
}

function checkTime(i=0) {
  return (i < 10 ? '0' + i : i.toString());  // add zero in front of numbers < 10
}

// EventListener
document.getElementById('下一題按鈕').onclick = 下一題;
document.getElementById('清除按鈕').onclick = 清除輸入框;
document.getElementById('選單說明按鈕').onclick = 彈出說明視窗;
document.getElementById('驚嘆號按鈕').onclick = 彈出說明視窗;
document.getElementById('按鈕A').onclick = e => 檢查答案(輸入框[1]);
document.getElementById('按鈕B').onclick = e => 檢查答案(輸入框[2]);
document.getElementById('按鈕C').onclick = e => 檢查答案(輸入框[3]);
document.getElementById('按鈕D').onclick = e => 檢查答案(輸入框[4]);

document.getElementById('step1').onclick = e => {
  $('#step1').addClass('active'); $('#step1_info').show();
  $('#step2').removeClass('active'); $('#step2_info').hide();
  $('#step3').removeClass('active'); $('#step3_info').hide()
};

document.getElementById('step2').onclick = e => {
  $('#step1').removeClass('active'); $('#step1_info').hide();
  $('#step2').addClass('active'); $('#step2_info').show();
  $('#step3').removeClass('active'); $('#step3_info').hide()
};

document.getElementById('step3').onclick = e => {
  $('#step1').removeClass('active'); $('#step1_info').hide();
  $('#step2').removeClass('active'); $('#step2_info').hide();
  $('#step3').addClass('active'); $('#step3_info').show()
};

載入提示.onclick = 下一題;
送出按鈕.onclick = 送出題目;
靜音切換按鈕.onclick = 靜音切換;

// When the user clicks on the button, scroll to the top of the document
至頂按紐.onclick = e => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

錯誤訊息視窗登入按鈕.onclick =登入;
登入按鈕.onclick = 登入;

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
  // Handle the initial sign-in state.
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

window.onresize = 調整介面;
window.onfocus = e => {
  更新登入狀態(gapi.auth2.getAuthInstance().isSignedIn.get(), true);
  調整介面();
};
window.onblur = e => {
  調整介面();
  登入按鈕.style.display = 'none';
  登出按鈕.style.display = 'none';
  載入按鈕.style.display = 'block';
}
// from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = e => {
  if (document.body.scrollTop > 20
    || document.documentElement.scrollTop > 20) {
    至頂按紐.style.display = "block";
  } else {
    至頂按紐.style.display = "none";
  }
};

document.body.onload = e => { 靜音切換(); 調整介面(); 計時(); };
document.body.onclick = e => { 音效播放(點擊音效); 調整介面() };
document.body.onkeydown = e => {
  音效播放(點擊音效);
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