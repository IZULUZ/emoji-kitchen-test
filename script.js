// 테스트용 이모지
const emojis = ["😀","😢","😡","😍","🥳","😭","😎","🤔"];

const emojiList = document.getElementById("emoji-list");
const resultImg = document.getElementById("result-img");
const errorMsg = document.getElementById("error-msg");

let selected = [];

emojis.forEach(e => {
  const span = document.createElement("span");
  span.textContent = e;
  span.onclick = () => selectEmoji(e);
  emojiList.appendChild(span);
});

function selectEmoji(e) {
  if (selected.length < 2 && !selected.includes(e)) {
    selected.push(e);
  }

  if (selected.length === 2) {
    loadEmojiKitchen(selected[0], selected[1]);
  }
}

// 🔥 이모지 키친 이미지 로딩 함수
function loadEmojiKitchen(e1, e2) {

  const code1 = toCodePoint(e1);
  const code2 = toCodePoint(e2);

  const url = `https://emojik.vercel.app/s/${code1}_${code2}?size=256`;

  resultImg.src = url;

  resultImg.onerror = () => {
    errorMsg.textContent = "이 조합은 존재하지 않습니다.";
    resultImg.src = "";
  };

  resultImg.onload = () => {
    errorMsg.textContent = "";
  };

  selected = [];
}

// 유니코드 변환 함수
function toCodePoint(emoji) {
  return emoji.codePointAt(0).toString(16);
}
