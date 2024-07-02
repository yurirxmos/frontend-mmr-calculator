import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Credits from "../../components/Credits/Credits";

const Home = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [lpRange, setLpRange] = useState("17-24");
  const [eloData, setEloData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:3000";

  const handleSearch = async () => {
    setLoading(true); // Inicia o indicador de carregamento
    try {
      const response = await axios.get(
        `${backendUrl}/elo/${gameName}/${tagLine}`,
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
          "Erro ao obter dados do jogador. Verifique o nome de invocador e a chave de API."
        );
      }
    } catch (error) {
      setError(
        "Ocorreu um erro na solicitação. Verifique sua conexão com a internet e tente novamente."
      );
    } finally {
      setLoading(false); // Finaliza o indicador de carregamento
    }
  };

  const adjustElo = (tier) => {
    const tierOrder = [
      "IRON",
      "BRONZE",
      "SILVER",
      "GOLD",
      "PLATINUM",
      "EMERALD",
      "DIAMOND",
      "MASTER",
      "GRANDMASTER",
      "CHALLENGER",
    ];
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
        <h1>MMR</h1>
        <h2>CALCULATOR</h2>
      </div>

      <div className="lp">
        <p>LP Gain</p>
        <select value={lpRange} onChange={(e) => setLpRange(e.target.value)}>
          <option value="5-16">5-16</option>
          <option value="17-24">17-24</option>
          <option value="25-29">25-29</option>
          <option value="30-40">30-40</option>
        </select>
      </div>

      <div className="search">
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
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="result">
        {loading && <p>Loading...</p>}
        {eloData && !loading && (
          <div>
            {eloData.map((entry, index) => (
              <div key={index}>
                <p>
                  This player has the MMR corresponding to: {entry.tier}
                </p>
              </div>
            ))}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>


      <Credits />
    </div>
  );
};

export default Home;
