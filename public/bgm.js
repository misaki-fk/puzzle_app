document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("sounds/bgm.mp3");
  audio.loop = true;
  audio.volume = 1.0;
  audio.muted = true; // 最初は muted（規制回避）

  window.BGM_AUDIO = audio;

  // 最初のワンクリックで再生開始 & unmute
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        audio.muted = false;
      });
    }
  }, { once: true });

  // ミュートボタン
  const btn = document.getElementById("mute-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      audio.muted = !audio.muted;
      btn.textContent = audio.muted ? "🔇" : "🔊";
    });
  }
});

