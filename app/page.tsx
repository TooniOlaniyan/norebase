"use client";
import React, { useState, useEffect } from "react";
export default function Home() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  interface Coin {
    csupply: string;
    id: string;
    market_cap_usd: string;
    msupply: string;
    name: string;
    nameid: string;
    percent_change_1h: string;
    percent_change_7d: string;
    percent_change_24h: string;
    price_btc: string;
    price_usd: string;
    rank: number;
    symbol: string;
    tsupply: string;
    volume24: number;
    volume24a: number;
  }

  const fetchCoins = async (page: number) => {
    const baseUrl = `https://api.coinlore.net/api/tickers/?limit=100`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    const coins = data.data.slice((page - 1) * 10, page * 10);
    setData(coins);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins(currentPage);
  }, [currentPage]);

  if (loading) {
    return <div className="flex justify-center items-center h-full font-bold text-2xl">Loading Coins, this wont take long.... Chill for Norebase Okay 😘</div>;
  }

  return (
    <div className="w-full max-w-[35rem] h-auto min-h-[26rem] overflow-y-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:hidden">
        {data.map((coin, index) => (
          <div
            key={coin.id}
            className={`p-2 ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="text-left">💰 Coin: {coin.name}</div>
              <div className="text-left">📄 Code: {coin.symbol}</div>
              <div className="text-left">🤑 Price: {coin.price_usd}</div>
              <div className="text-left">📈 Total Supply: {coin.tsupply}</div>
            </div>
          </div>
        ))}
      </div>
      <table className="hidden md:table w-full">
        <thead>
          <tr>
            <th className="text-left">💰 Coin</th>
            <th className="text-left">📄 Code</th>
            <th className="text-left">🤑 Price</th>
            <th className="text-left">📈 Total Supply</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin, index) => (
            <tr
              key={coin.id}
              className={index % 2 === 0 ? "bg-gray-300" : "bg-white"}
            >
              <td className="text-left p-1">{coin.name}</td>
              <td className="text-left p-1">{coin.symbol}</td>
              <td className="text-left p-1">{coin.price_usd}</td>
              <td className="text-left p-1">{coin.tsupply}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 p-3">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "hidden" : "flex items-center"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="ml-2 font-semibold">Previous</span>
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 10} 
          className={currentPage === 10 ? "hidden" : "ml-auto flex items-center"}
        >
          <span className="mr-2 font-semibold">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
