import React, { useState } from "react";
import { destinations } from "./destinations";
import "./App.css";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinationListExpanded, setDestinationListExpanded] = useState(false);

  const startRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedDestination(null);

    // ルーレット演出
    const totalSpins = Math.floor(Math.random() * 30) + 40; // 40-70回転
    const finalIndex = Math.floor(Math.random() * destinations.length);

    let currentSpins = 0;
    const interval = setInterval(() => {
      currentSpins++;
      setCurrentIndex((prev) => (prev + 1) % destinations.length);

      // スピード調整（後半になるほど遅くなる）
      // const delay = Math.min(50 + currentSpins * 3, 200);

      if (currentSpins >= totalSpins) {
        clearInterval(interval);
        setCurrentIndex(finalIndex);
        setSelectedDestination(destinations[finalIndex]);
        setIsSpinning(false);
      }
    }, 50);
  };

  const resetRoulette = () => {
    setSelectedDestination(null);
    setCurrentIndex(0);
  };

  const toggleDestinationList = () => {
    setDestinationListExpanded(!destinationListExpanded);
  };

  const shareToX = () => {
    if (!selectedDestination) return;

    const shareText =
      `🚂 目的地ルーレットの結果 🎯\n\n` +
      `${selectedDestination.emoji} 次の目的地：${selectedDestination.name}\n` +
      `📍 ${selectedDestination.region}地方\n` +
      `🍴 名物：${selectedDestination.specialty}\n\n` +
      `${selectedDestination.description}\n\n` +
      `みなさんも一緒に旅行しませんか？ ✈️\n` +
      `#どこいく #目的地ルーレット #旅行 #${selectedDestination.region}`;

    const url = "https://rednamed-being.github.io/dokoiku/";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(url)}`;

    window.open(tweetUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚂 どこいく？ 🎯</h1>
        <p>目的地ルーレット</p>
      </header>

      <main className="main">
        <div className="roulette-container">
          <div
            className={`destination-display ${isSpinning ? "spinning" : ""}`}
          >
            <div className="destination-emoji">
              {destinations[currentIndex].emoji}
            </div>
            <div className="destination-name">
              {destinations[currentIndex].name}
            </div>
            {isSpinning && <div className="spin-counter">回転中...</div>}
          </div>
        </div>

        <div className="controls">
          <button
            className={`spin-button ${isSpinning ? "disabled" : ""}`}
            onClick={startRoulette}
            disabled={isSpinning}
          >
            {isSpinning ? "回転中..." : "ルーレットスタート！"}
          </button>

          {selectedDestination && !isSpinning && (
            <button className="reset-button" onClick={resetRoulette}>
              もう一度回す
            </button>
          )}
        </div>

        {selectedDestination && !isSpinning && (
          <div className="result-card">
            <div className="result-header">
              <h2>🎉 次の目的地が決まりました！ 🎉</h2>
            </div>
            <div className="destination-info">
              <div className="destination-main">
                <span className="destination-emoji-large">
                  {selectedDestination.emoji}
                </span>
                <h3>{selectedDestination.name}</h3>
                <div className="destination-region">
                  {selectedDestination.region}地方
                </div>
              </div>
              <div className="destination-details">
                <div className="specialty">
                  <strong>名物：</strong> {selectedDestination.specialty}
                </div>
                <div className="description">
                  {selectedDestination.description}
                </div>
              </div>
            </div>
            <div className="celebration">
              <div className="fireworks">✨🎊✨🎊✨</div>
              <p>素敵な旅になりそうですね！</p>
            </div>

            {/* X（Twitter）シェアボタン */}
            <div className="share-section">
              <button className="share-x-button" onClick={shareToX}>
                <span className="x-icon">𝕏</span>
                結果をXでシェア
              </button>
              <p className="share-description">
                友達と一緒に旅行計画を立てませんか？
              </p>
            </div>
          </div>
        )}

        <div className="destination-list">
          <div className="destination-list-header">
            <h3>📍 目的地一覧 ({destinations.length}箇所)</h3>
            <button
              className="toggle-button"
              onClick={toggleDestinationList}
              aria-label="目的地一覧を表示・非表示"
            >
              {destinationListExpanded ? "▼ たたむ" : "▶ 展開する"}
            </button>
          </div>
          {destinationListExpanded && (
            <div className="destination-grid">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className={`destination-item ${
                    currentIndex === destinations.indexOf(dest) ? "current" : ""
                  }`}
                >
                  <span className="item-emoji">{dest.emoji}</span>
                  <span className="item-name">{dest.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>🚂 良い旅を！ 🎌</p>
      </footer>
    </div>
  );
}

export default App;
