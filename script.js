// 교육용 허용 이모지 목록 (필터링 완료)
const allowedEmojis = [
"😀","😁","😂","😅","😊","😍","🥰","😎","🤔","😢","😭","😡","😴",
"🥳","😇","😰","😱","🤗","😌","🙂","🙃",
"🌈","⭐","🌙","☀","🌊","🔥","❄",
"🐶","🐱","🐻","🐼","🐸","🦊","🐯"
];

const grid = document.getElementById("emojiGrid");
const emoji1El = document.getElementById("emoji1");
const emoji2El = document.getElementById("emoji2");
const resultImg = document.getElementById("resultImg");
const completeBtn = document.getElementById("completeBtn");

let selected = [];

allowedEmojis.forEach(e => {
  const span = document.createElement("span");
  span.textContent = e;
  span.onclick = () => selectEmoji(e);
  grid.appendChild(span);
});

function selectEmoji(e) {
  if (selected.length < 2 && !selected.includes(e)) {
    selected.push(e);
  }

  if (selected.length === 1) emoji1El.textContent = selected[0];
  if (selected.length === 2) {
    emoji2El.textContent = selected[1];
    loadEmojiKitchen(selected[0], selected[1]);
  }
}

function loadEmojiKitchen(e1, e2) {
  const code1 = toCodePoint(e1);
  const code2 = toCodePoint(e2);

  const url = `https://emojik.vercel.app/s/${code1}_${code2}?size=128`;

  resultImg.src = url;

  resultImg.onerror = () => {
    resultImg.src = "";
    alert("이 조합은 없습니다.");
  };

  resultImg.onload = () => {
    completeBtn.disabled = false;
    localStorage.setItem("emotionResult", url);
  };
}

function toCodePoint(emoji) {
  return emoji.codePointAt(0).toString(16);
}

// 설정 버튼
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");

settingsBtn.onclick = () => settingsModal.classList.remove("hidden");
document.getElementById("closeSettings").onclick =
() => settingsModal.classList.add("hidden");

document.getElementById("saveSettings").onclick = () => {
  const name = document.getElementById("studentName").value;
  const classNumber = document.getElementById("classNumber").value;
  const file = document.getElementById("avatarUpload").files[0];

  localStorage.setItem("studentName", name);
  localStorage.setItem("classNumber", classNumber);

  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      localStorage.setItem("avatar", e.target.result);
    };
    reader.readAsDataURL(file);
  }

  alert("저장 완료");
  settingsModal.classList.add("hidden");
};
