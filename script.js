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

  // メニュー選択用コピー（毎回シャッフルする）
  let ramenPool = [...ramen];
  let sidePool = [...sides];
  let toppingPool = [...toppings];

  // ループで選び続ける
  let somethingAdded = true;
  while (rem > 0 && somethingAdded) {
    somethingAdded = false;

    // 🍜 ラーメン（1つ選ぶ）
    ramenPool = ramenPool.sort(() => 0.5 - Math.random());
    for (let r of ramenPool) {
      if (r.price <= rem) {
        result.push(r);
        rem -= r.price;
        somethingAdded = true;
        break;
      }
    }

    // 🍚 サイド（1つ選ぶ）
    sidePool = sidePool.sort(() => 0.5 - Math.random());
    for (let s of sidePool) {
      if (s.price <= rem) {
        result.push(s);
        rem -= s.price;
        somethingAdded = true;
        break;
      }
    }

    // 🧂 トッピング（複数OK）
    toppingPool = toppingPool.sort(() => 0.5 - Math.random());
    for (let t of toppingPool) {
      if (t.price <= rem) {
        result.push(t);
        rem -= t.price;
        somethingAdded = true;
        break; // 1個ずつ追加（たくさん回すため）
      }
    }
  }

  if (result.length === 0) {
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
  document.getElementById("openYamaokayaApp").addEventListener("click", function (e) {
    e.preventDefault(); // リンクの通常動作を無効化

    const userAgent = navigator.userAgent.toLowerCase();
    const isiOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    const appStoreURL = "https://apps.apple.com/jp/app/id6466559589";
    const playStoreURL = "https://play.google.com/store/apps/details?id=com.yamaokaya"; // ※実在する場合に修正
    const fallbackURL = "https://www.yamaokaya.com/shopapp/"; // PCやその他用

    if (isiOS) {
      // iOSならアプリスキーム試行（未対応ならApp Storeへ）
      const scheme = "yamaokaya://"; // カスタムスキーム（未確認の仮定）
      window.location = scheme;

      setTimeout(() => {
        window.location = appStoreURL;
      }, 2000);
    } else if (isAndroid) {
      // AndroidならPlayストアへ（※存在しない場合 fallback）
      window.location = playStoreURL;
    } else {
      // その他（PC等）
      window.location = fallbackURL;
    }
  });


