const emojiGrid = document.getElementById("emojiGrid");
const emojiModal = document.getElementById("emojiModal");
const openPicker = document.getElementById("openPicker");
const closeEmoji = document.getElementById("closeEmoji");

const emoji1El = document.getElementById("emoji1");
const emoji2El = document.getElementById("emoji2");
const resultImg = document.getElementById("resultImg");

let selected = [];

/* 금지 이모지 */
const banned = ["🔪","🔫","💣","🩸","🏳️‍🌈"];

/* 전체 이모지 범위 자동 생성 */
for(let i=0x1F300;i<=0x1FAFF;i++){
  const emoji = String.fromCodePoint(i);
  if(!banned.includes(emoji)){
    const span=document.createElement("span");
    span.textContent=emoji;
    span.onclick=()=>selectEmoji(emoji);
    emojiGrid.appendChild(span);
  }
}

openPicker.onclick=()=>emojiModal.classList.remove("hidden");
closeEmoji.onclick=()=>emojiModal.classList.add("hidden");

function selectEmoji(e){
if(selected.length<2 && !selected.includes(e)){
selected.push(e);
}

if(selected.length===1) emoji1El.textContent=selected[0];
if(selected.length===2){
emoji2El.textContent=selected[1];
loadKitchen(selected[0],selected[1]);
emojiModal.classList.add("hidden");
}
}

function loadKitchen(e1,e2){
const c1=e1.codePointAt(0).toString(16);
const c2=e2.codePointAt(0).toString(16);
const url=`https://emojik.vercel.app/s/${c1}_${c2}?size=128`;
resultImg.src=url;
resultImg.onerror=()=>{resultImg.src="";}
selected=[];
}
