// ============================
// 이모지 자동 생성 + 교육 필터
// ============================

// 이모지 범위
const emojiRanges = [
  [0x1F600, 0x1F64F],
  [0x1F300, 0x1F5FF],
  [0x1F680, 0x1F6FF],
  [0x2600, 0x26FF],
  [0x1F900, 0x1F9FF]
];

// 제외 이모지
const banned = [
  "🔪","🩸","💣","🔫","⚔️","🗡️",
  "🍺","🍷","🥃","🚬",
  "💋","👙","💀"
];

let selected = [];

// 이모지 생성
function generateEmojis(){
  const list = [];
  emojiRanges.forEach(range=>{
    for(let i=range[0]; i<=range[1]; i++){
      const emoji = String.fromCodePoint(i);
      if(isValidEmoji(emoji)) list.push(emoji);
    }
  });
  return list;
}

function isValidEmoji(e){
  if(banned.includes(e)) return false;
  return true;
}

const emojiList = generateEmojis();

// ============================
// UI 기능
// ============================

function openModal(){
  document.getElementById("emojiModal").style.display="block";
}

function closeModal(){
  document.getElementById("emojiModal").style.display="none";
}

function loadEmojis(){
  const grid = document.getElementById("emojiGrid");
  emojiList.forEach(e=>{
    const span=document.createElement("span");
    span.className="emoji";
    span.innerText=e;
    span.onclick=()=>selectEmoji(e);
    grid.appendChild(span);
  });
}

function selectEmoji(e){
  if(selected.length<2){
    selected.push(e);
  }else{
    selected=[e];
  }
  updateExpression();
}

function updateExpression(){
  const exp=document.getElementById("expression");
  if(selected.length===0){
    exp.innerText="? + ? =";
  }
  else if(selected.length===1){
    exp.innerText=selected[0]+" + ? =";
  }
  else{
    exp.innerText=selected[0]+" + "+selected[1]+" = "+selected[0]+selected[1];
  }
}

// 자동 실행
document.addEventListener("DOMContentLoaded",()=>{
  loadEmojis();
});
