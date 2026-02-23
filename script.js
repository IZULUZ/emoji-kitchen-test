// =====================
// 이모지 생성
// =====================

const emojiRanges = [
  [0x1F600, 0x1F64F],
  [0x1F300, 0x1F5FF],
  [0x1F680, 0x1F6FF],
  [0x2600, 0x26FF],
  [0x1F900, 0x1F9FF]
];

const banned = ["🔪","🩸","💣","🔫","⚔️","🗡️","🍺","🍷","🥃","🚬","💋","👙","💀"];

let selected = [];

function generateEmojis(){
  const list = [];
  emojiRanges.forEach(range=>{
    for(let i=range[0]; i<=range[1]; i++){
      const e = String.fromCodePoint(i);
      if(!banned.includes(e)) list.push(e);
    }
  });
  return list;
}

const emojiList = generateEmojis();

// =====================
// 이모지 모달
// =====================

function openEmojiModal(){
  document.getElementById("emojiModal").style.display="block";
}

function closeEmojiModal(){
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

// =====================
// 설정 모달
// =====================

function openSettingsModal(){
  document.getElementById("settingsModal").style.display="block";
  loadSavedSettings();
}

function closeSettingsModal(){
  document.getElementById("settingsModal").style.display="none";
}

function saveSettings(){
  const name = document.getElementById("studentName").value;
  const classNum = document.getElementById("studentClass").value;
  const fileInput = document.getElementById("profileImage");

  localStorage.setItem("studentName", name);
  localStorage.setItem("studentClass", classNum);

  if(fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      localStorage.setItem("profileImage", e.target.result);
    }
    reader.readAsDataURL(fileInput.files[0]);
  }

  alert("저장되었습니다!");
  closeSettingsModal();
}

function loadSavedSettings(){
  document.getElementById("studentName").value =
    localStorage.getItem("studentName") || "";

  document.getElementById("studentClass").value =
    localStorage.getItem("studentClass") || "";
}

// =====================

document.addEventListener("DOMContentLoaded",()=>{
  loadEmojis();
});
