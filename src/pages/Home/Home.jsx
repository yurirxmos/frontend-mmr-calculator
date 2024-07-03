import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Credits from "../../components/Credits/Credits";
import logo from "../../assets/imgs/logo.png";
import search_logo from "../../assets/imgs/search_logo.png";
import bronze from "../../assets/imgs/elos/bronze.webp";
import challenger from "../../assets/imgs/elos/challenger.webp";
import diamond from "../../assets/imgs/elos/diamond.webp";
import gold from "../../assets/imgs/elos/gold.webp";
import emerald from "../../assets/imgs/elos/emerald.webp";
import grandmaster from "../../assets/imgs/elos/grandmaster.webp";
import iron from "../../assets/imgs/elos/iron.webp";
import master from "../../assets/imgs/elos/master.webp";
import platinum from "../../assets/imgs/elos/platinum.webp";
import silver from "../../assets/imgs/elos/silver.webp";

const LoadingAnimation = () => (
  <div className="loading-animation">
    <div className="spinner"></div>
  </div>
);

const Home = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [lpRange, setLpRange] = useState("17-24");
  const [eloData, setEloData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://backend-mmr-calculator.vercel.app/";

  const tierList = {
    IRON: iron,
    BRONZE: bronze,
    SILVER: silver,
    GOLD: gold,
    PLATINUM: platinum,
    EMERALD: emerald,
    DIAMOND: diamond,
    MASTER: master,
    GRANDMASTER: grandmaster,
    CHALLENGER: challenger,
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);

    if (!gameName || !tagLine) {
      setError("Please enter both Game Name and Tag Line.");
      return;
    }

    setEloData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${backendUrl}elo/${gameName}/${tagLine}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const adjustedData = data.map((entry) => ({
          ...entry,
          tier: adjustElo(entry.tier),
        }));
        setEloData(adjustedData);
        setError(null);
      } else {
        setError(
          "Error retrieving player data. Check summoner name and API key."
        );
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 404) {
        setError("Player not found. Please check the Game Name and Tag Line.");
      } else {
        setError("An error occurred during the request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const adjustElo = (tier) => {
    const tierOrder = Object.keys(tierList);
    let tierIndex = tierOrder.indexOf(tier);

    if (lpRange === "5-16") {
      tierIndex = Math.max(0, tierIndex - 1);
    } else if (lpRange === "25-29") {
      tierIndex = Math.min(tierOrder.length - 1, tierIndex + 1);
    } else if (lpRange === "30-40") {
      tierIndex = Math.min(tierOrder.length - 1, tierIndex + 2);
    }

    return tierOrder[tierIndex];
  };

  return (
    <div className="home">
      <div className="header">
        <img src={logo} />
      </div>

      <form onSubmit={handleSearch} className="search">
        <p>Search</p>
        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          placeholder="#BR1"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
        <button type="submit">
          <img src={search_logo} alt="Search" />
        </button>
      </form>

      <div className="lp">
        <p>LP Gain</p>
        <select value={lpRange} onChange={(e) => setLpRange(e.target.value)}>
          <option value="5-16">5-16</option>
          <option value="17-24">17-24</option>
          <option value="25-29">25-29</option>
          <option value="30-40">30-40</option>
        </select>
      </div>

      <div className="result">
        {loading && <LoadingAnimation />}
        {eloData && !loading && (
          <div>
            {eloData.map((entry, index) => (
              <div key={index} className="mmr">
                <img src={tierList[entry.tier]} alt={entry.tier} />
                <p>This player has the MMR corresponding to: {entry.tier}</p>
              </div>
            ))}
          </div>
        )}
        {error && <p style={{ color: "#F75555" }}>{error}</p>}
      </div>

      <Credits />
    </div>
  );
};

export default Home;
