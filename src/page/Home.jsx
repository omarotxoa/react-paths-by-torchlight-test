import React, { useState, useEffect } from "react";
import items from "../loot/itemlist";

function Home() {
  const [cooldown, setCooldown] = useState(0);
  const [loot, setLoot] = useState([]);

  const scavenge = () => {
    if (cooldown === 0) {
      const randomLoot = [];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const item = items[randomIndex];
        randomLoot.push(item);
      }
      setLoot(randomLoot);
      setCooldown(300); // 5 minutes cooldown (300 seconds)
    }
  };

  const resetCooldown = () => {
    setCooldown(0);
    setLoot([]);
  };

  useEffect(() => {
    let interval = null;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const getCooldownText = () => {
    const minutes = Math.floor(cooldown / 60);
    const seconds = cooldown % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="home">
      <h1>Path's by Torchlight</h1>
      <button className="scavenge-button" onClick={scavenge} disabled={cooldown > 0}>
        {cooldown > 0 ? `Cooldown: ${getCooldownText()}` : "Scavenge"}
      </button>
      <button className="expedition-button">Expedition</button>
      <button className="jobs-button">Jobs</button>
      <button className="room-button">Room</button>
      <button className="profile-button">Profile</button>
      {loot.length > 0 && (
        <div>
          <h2>You found:</h2>
          <ul>
            {loot.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>: {item.description} ({item.value.gold} gold, {item.value.silver} silver, {item.value.copper} copper)
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={resetCooldown}>Reset Cooldown</button>
    </div>
  );
}

export default Home;