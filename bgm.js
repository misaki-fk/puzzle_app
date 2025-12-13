  // -------- BGM 初期化 --------
  if (!window.BGM_AUDIO) {
    const audio = new Audio("sounds/bgm.mp3");
    audio.loop = true;
    audio.muted = true;
    audio.volume = 1.0;
    audio.play().catch(() => {});
    window.BGM_AUDIO = audio;

    // ミュート状態の保持
    if (window.BGM_FORCE_MUTED === undefined) {
      window.BGM_FORCE_MUTED = true;
    }

    audio.muted = window.BGM_FORCE_MUTED;
  }

  const bgm = window.BGM_AUDIO;

  // -------- ミュートボタン --------
  const btn = document.getElementById("mute-btn");
  if (btn) {
    btn.textContent = bgm.muted ? "🔇" : "🔊";

    btn.addEventListener("click", () => {
      const willUnmute = bgm.muted;

      bgm.muted = !bgm.muted;
      window.BGM_FORCE_MUTED = bgm.muted;
      btn.textContent = bgm.muted ? "🔇" : "🔊";

    // ★ ここを追加
    if (willUnmute) {
      bgm.play().catch(() => {});
    }
    });
  }

// -------- メニューボタン効果音 + 遷移 --------
const seClick = document.getElementById("se-click-audio");
const menuButtons = document.querySelectorAll(".menu-btn");

// メニューが存在しないページ（ゲーム画面）ではスキップ
if (menuButtons.length > 0) {
  menuButtons.forEach(button => {
    button.addEventListener("click", () => {

      // 効果音
      if (seClick) {
        seClick.currentTime = 0;
        seClick.play().catch(() => {});
      }

      const link = button.dataset.link;

      // BGM ミュート状態保持
      const keepMuted = window.BGM_FORCE_MUTED;

      setTimeout(() => {
        bgm.muted = keepMuted;
      }, 10);

      // 遷移
      setTimeout(() => {
        location.href = link;
      }, 130);
    });
  });
}