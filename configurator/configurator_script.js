import tinycolor from "https://esm.sh/tinycolor2";

const nickname_input = document.getElementById("nickname_input");
const tag_input = document.getElementById("tag_input");
const api_key_input = document.getElementById("api_key_input");
const region_input = document.getElementById("region_input");
const link_box = document.getElementById("link_box");
const checkbox_input = document.getElementById("platform-switch");

const bg_red = document.getElementById("bg_red");
const bg_green = document.getElementById("bg_green");
const bg_blue = document.getElementById("bg_blue");
const bg_alpha = document.getElementById("bg_alpha");
const bg_hex = document.getElementById("bg_hex");
const bg = document.getElementById("bg");

const txt_red = document.getElementById("txt_red");
const txt_green = document.getElementById("txt_green");
const txt_blue = document.getElementById("txt_blue");
const txt_alpha = document.getElementById("txt_alpha");
const txt_hex = document.getElementById("txt_hex");
const txt = document.getElementById("txt");

const left_red = document.getElementById("left_red");
const left_green = document.getElementById("left_green");
const left_blue = document.getElementById("left_blue");
const left_alpha = document.getElementById("left_alpha");
const left_hex = document.getElementById("left_hex");
const left = document.getElementById("left");

const right_red = document.getElementById("right_red");
const right_green = document.getElementById("right_green");
const right_blue = document.getElementById("right_blue");
const right_alpha = document.getElementById("right_alpha");
const right_hex = document.getElementById("right_hex");
const right = document.getElementById("right");

const root = document.querySelector(`:root`);

let platform_input = "pc";

function createLink() {
    let string = `https://mixikq.github.io/Valorant-Daily-Stats/stable/daily-stats.html?nickname=${encodeURIComponent(nickname_input.value)}&tag=${encodeURIComponent(tag_input.value)}&amp;region=${region_input.value}&platform=${platform_input}&api_key=<a style="filter: blur(2px);">${api_key_input.value}</a>&bg_color=${tinycolor(bg_hex.value).toHex8()}&text_color=${tinycolor(txt_hex.value).toHex8()}&bar_color_left=${tinycolor(left_hex.value).toHex8()}&bar_color_right=${tinycolor(right_hex.value).toHex8()}`;
    link_box.innerHTML = string;
}

function setBackgroundColor() {
    let color = tinycolor({r: bg_red.value, g: bg_green.value, b: bg_blue.value, a: bg_alpha.value / 255}).toHex8String();
    root.style.setProperty("--background-color", color);
    bg_hex.value = color;
    createLink();
}
function setBackgroundColorFromHex() {
    let color = tinycolor(bg_hex.value).toRgb();
    bg_red.value = color.r;
    bg_green.value = color.g;
    bg_blue.value = color.b;
    bg_alpha.value = color.a * 255;
    root.style.setProperty("--background-color", bg_hex.value);
    createLink();
}

bg_hex.addEventListener("input", setBackgroundColorFromHex);
bg_red.addEventListener("input", setBackgroundColor);
bg_green.addEventListener("input", setBackgroundColor);
bg_blue.addEventListener("input", setBackgroundColor);
bg_alpha.addEventListener("input", setBackgroundColor);


function setTextColor() {
    let color = tinycolor({r: txt_red.value, g: txt_green.value, b: txt_blue.value, a: txt_alpha.value / 255}).toHex8String();
    root.style.setProperty("--text-color", color);
    txt_hex.value = color;
    createLink();
}
function setTextColorFromHex() {
    let color = tinycolor(txt_hex.value).toRgb();
    txt_red.value = color.r;
    txt_green.value = color.g;
    txt_blue.value = color.b;
    txt_alpha.value = color.a * 255;
    root.style.setProperty("--text-color", txt_hex.value);
    createLink();
}

txt_hex.addEventListener("input", setTextColorFromHex);
txt_red.addEventListener("input", setTextColor);
txt_green.addEventListener("input", setTextColor);
txt_blue.addEventListener("input", setTextColor);
txt_alpha.addEventListener("input", setTextColor);


function setLeftColor() {
    let color = tinycolor({r: left_red.value, g: left_green.value, b: left_blue.value, a: left_alpha.value / 255}).toHex8String();
    root.style.setProperty("--left-color", color);
    left_hex.value = color;
    createLink();
}
function setLeftColorFromHex() {
    let color = tinycolor(left_hex.value).toRgb();
    left_red.value = color.r;
    left_green.value = color.g;
    left_blue.value = color.b;
    left_alpha.value = color.a * 255;
    root.style.setProperty("--left-color", left_hex.value);
    createLink();
}

left_hex.addEventListener("input", setLeftColorFromHex);
left_red.addEventListener("input", setLeftColor);
left_green.addEventListener("input", setLeftColor);
left_blue.addEventListener("input", setLeftColor);
left_alpha.addEventListener("input", setLeftColor);


function setRightColor() {
    let color = tinycolor({r: right_red.value, g: right_green.value, b: right_blue.value, a: right_alpha.value / 255}).toHex8String();
    root.style.setProperty("--right-color", color);
    right_hex.value = color;
    createLink();
}
function setRightColorFromHex() {
    let color = tinycolor(right_hex.value).toRgb();
    right_red.value = color.r;
    right_green.value = color.g;
    right_blue.value = color.b;
    right_alpha.value = color.a * 255;
    root.style.setProperty("--right-color", right_hex.value);
    createLink();
}

right_hex.addEventListener("input", setRightColorFromHex);
right_red.addEventListener("input", setRightColor);
right_green.addEventListener("input", setRightColor);
right_blue.addEventListener("input", setRightColor);
right_alpha.addEventListener("input", setRightColor);

nickname_input.addEventListener("input", createLink);
tag_input.addEventListener("input", createLink);
api_key_input.addEventListener("input", createLink);

const ap_button = document.getElementById("ap");
const br_button = document.getElementById("br");
const eu_button = document.getElementById("eu");
const kr_button = document.getElementById("kr");
const latam_button = document.getElementById("latam");
const na_button = document.getElementById("na");

const dropdown = document.querySelector(".dropdown-content");

function setRegion(reg) {
    region_input.value = reg;
    createLink();
}

ap_button.addEventListener("click", function() { setRegion("ap"); });
br_button.addEventListener("click", function() { setRegion("br"); });
eu_button.addEventListener("click", function() { setRegion("eu"); });
kr_button.addEventListener("click", function() { setRegion("kr"); });
latam_button.addEventListener("click", function() { setRegion("latam"); });
na_button.addEventListener("click", function() { setRegion("na"); });

checkbox_input.addEventListener("change", function() {
    if (this.checked) {
        document.getElementsByClassName("switch-inner")[0].innerHTML = "Console";
        platform_input = "console";
    } else {
        document.getElementsByClassName("switch-inner")[0].innerHTML = "PC";
        platform_input = "pc";
    }
    createLink();
});