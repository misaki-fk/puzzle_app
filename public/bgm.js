// 共通 BGMオブジェクト
const bgm = new Audio("sounds/bgm.mp3");
bgm.loop = true;
bgm.volume = 0.4;

// どこかでボタンを押したら再生開始
export function startBgm() {
  bgm.play();
}

// ミュート切り替え（必要なら）
export function toggleMute() {
  bgm.muted = !bgm.muted;
}
