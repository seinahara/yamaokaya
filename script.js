// 🔽 ヘルパー関数は上に書く
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔽 メニュー配列たち
const ramen = [
  { name: "特製味噌ラーメン", price: 830 },
  { name: "特製味噌ネギラーメン", price: 980 },
  { name: "特製味噌チャーシュー麺", price: 1110 },
  { name: "特製味噌ネギチャーシュー麺", price: 1260 },
  { name: "プレミアム塩とんこつ", price: 950 },
  { name: "期間限定ラーメン", price: 950 },
];

const sides = [
  { name: "ネギマヨチャーシュー丼", price: 370 },
  { name: "コロチャーシュー丼", price: 370 },
  { name: "特製ギョーザ", price: 370 },
  { name: "チャーシュー丼", price: 370 },
  { name: "チャーハン", price: 370 },
  { name: "玉子かけご飯", price: 330 },
  { name: "ライス", price: 210 },
  { name: "半ライス", price: 160 }
];

const toppings = [
  { name: "チャーシュー5枚", price: 350 },
  { name: "コロチャーシュー15個", price: 350 },
  { name: "白髪ネギ", price: 160 },
  { name: "コロチャーシュー6個", price: 140 },
  { name: "味付玉子", price: 140 },
  { name: "メンマ", price: 140 },
  { name: "穂先メンマ", price: 140 },
  { name: "ホウレン草", price: 80 },
  { name: "海苔5枚", price: 140 },
  { name: "黒ばら海苔", price: 140 },
  { name: "薬味ネギ", price: 80 },
  { name: "青ネギ", price: 80 },
  { name: "コーン", price: 80 },
  { name: "バター", price: 80 },
  { name: "背脂変更", price: 80 },
  { name: "もやし", price: 60 },
  { name: "紅生姜", price: 50 }
];

function generateMenu() {
  const budget = parseInt(document.getElementById("budget").value);
  const out = document.getElementById("resultArea");
  out.innerHTML = "";

  if (isNaN(budget) || budget <= 0) {
    out.textContent = "😅 予算を正しく入力してください。";
    return;
  }

  let rem = budget;
  const result = [];

  // 1. 🍜 ラーメン（1つ選ぶまでループ）
  const ramenChoices = [...ramen].sort(() => 0.5 - Math.random());
  let ramenChoice = null;
  for (let r of ramenChoices) {
    if (r.price <= rem) {
      ramenChoice = r;
      break;
    }
  }

  if (ramenChoice) {
    result.push(ramenChoice);
    rem -= ramenChoice.price;
  }

  // 2. 🍚 サイド（1つ選ぶまでループ）
  const sideChoices = [...sides].sort(() => 0.5 - Math.random());
  let sideChoice = null;
  for (let s of sideChoices) {
    if (s.price <= rem) {
      sideChoice = s;
      break;
    }
  }

  if (!ramenChoice && sideChoice) {
    // ラーメン選べなかった場合のみサイドを追加
    result.push(sideChoice);
    rem -= sideChoice.price;
  } else if (sideChoice) {
    // ラーメン選べてサイドも選べた場合は追加OK
    result.push(sideChoice);
    rem -= sideChoice.price;
  }

  // 3. 🧂 トッピング（複数選べるだけ選ぶ）
  const toppingChoices = [...toppings].sort(() => 0.5 - Math.random());
  let toppingAdded = false;
  toppingChoices.forEach(t => {
    if (t.price <= rem) {
      result.push(t);
      rem -= t.price;
      toppingAdded = true;
    }
  });

  // 条件判定：何も選べなかった場合
  if (!ramenChoice && !sideChoice && !toppingAdded) {
    out.textContent = "😢 予算で選べるメニューがありません";
    return;
  }

  const used = budget - rem;

  out.innerHTML = `
    <div>
      <strong>🎯 結果（予算: ${budget}円）</strong>
      <ul>${result.map(i => `<li>${i.name} : ${i.price}円</li>`).join("")}</ul>
      <p>合計: <strong>${used}円</strong> / 残り: <strong>${rem}円</strong></p>
    </div>
  `;
}


function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('show');
  // メニューの表示・非表示で body にクラスを付け替え
  document.body.classList.toggle('menu-open', nav.classList.contains('show'));

}

// 外側クリックで閉じる処理
document.addEventListener('click', function (event) {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('menuToggle');

  const clickedInsideNav = nav.contains(event.target);
  const clickedHamburger = hamburger.contains(event.target);

  if (nav.classList.contains('show') && !clickedInsideNav && !clickedHamburger) {
    nav.classList.remove('show');
    document.body.classList.remove('menu-open');
    hamburger.textContent = '☰';
  }
});