import { useNavigate, useParams } from "react-router"
import { fetchCoinData } from "../api/coinGecko";
import { useEffect, useState } from "react";

export const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoinData();
  }, [id])

  const loadCoinData = async () => {
    try {
      const data = await fetchCoinData(id);
      setCoin(data)
    } catch (err) {
      console.error("Error fetching crypto: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading coin data...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="app">
        <div className="no-results">
          <p>Coin not found</p>
          <button onClick={() => navigate("/")}>Go back</button>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>
        </div>
      </header>
    </div>
  );
}