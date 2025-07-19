import React, { useState } from "react";
import { destinations } from "./destinations";
import "./App.css";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  const startRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedDestination(null);
    setSpinCount(0);

    // ルーレット演出
    const totalSpins = Math.floor(Math.random() * 30) + 40; // 40-70回転
    const finalIndex = Math.floor(Math.random() * destinations.length);

    let currentSpins = 0;
    const interval = setInterval(() => {
      currentSpins++;
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
      setSpinCount(currentSpins);

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
    setSpinCount(0);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚂 どこいく？ 🎯</h1>
        <p>桃太郎電鉄風 目的地ルーレット</p>
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
            {isSpinning && (
              <div className="spin-counter">回転中... ({spinCount}回転)</div>
            )}
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
          </div>
        )}

        <div className="destination-list">
          <h3>📍 目的地一覧</h3>
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
        </div>
      </main>

      <footer className="footer">
        <p>🚂 良い旅を！ 🎌</p>
      </footer>
    </div>
  );
}

export default App;
