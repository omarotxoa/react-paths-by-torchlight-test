import React, { useState, useEffect } from "react";

const items = [
  {
    name: "Sword of the Undead",
    description: "A cursed sword that drains the life force of its wielder.",
    value: "50 gold",
  },
  {
    name: "Wand of Fireball",
    description: "A wand that shoots fireballs with devastating effect.",
    value: "25 gold",
  },
  {
    name: "Cloak of Invisibility",
    description: "A cloak that renders the wearer invisible to the naked eye.",
    value: "75 gold",
  },
  // Add more items here
];

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
                <strong>{item.name}</strong>: {item.description} (Value: {item.value})
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