import React, { useState } from 'react';

const Home = () => {
  const [summonerName, setSummonerName] = useState('');
  const [eloData, setEloData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'SUA_CHAVE_DE_API'; 

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        method: 'GET',
        headers: {
          'X-Riot-Token': apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEloData(data);
        setError(null);
      } else {
        setError('Erro ao obter dados do jogador. Verifique o nome de invocador e a chave de API.');
      }
    } catch (error) {
      setError('Ocorreu um erro na solicitação. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  return (
    <div className="home">
      <div className="region">
        <p>Region</p>
        <select name="region">
          <option value="BR">Brazil</option>
          <option value="NA">North America</option>
        </select>
      </div>

      <div className="search">
        <p>Search</p>
        <input
          type="text"
          placeholder="Game Name + BR1"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
        />
        <button onClick={handleSearch}>Search Elo</button>
      </div>

      <div className="result">
        {eloData && (
          <div>
            <p>Summoner Level: {eloData.summonerLevel}</p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Home;
