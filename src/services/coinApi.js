import axios from "axios";

//create an axios example
const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
});

//All APIs
export const coinApi = {
  async getTopCoins() {
    try {
      const res = await api.get("/coins/markets", {
        params: { vs_currency: "usd" },
      });

      return res.data;
    } catch (error) {
      throw new Error(`Veri sağlanamıyor: ${error.message}`);
    }
  },

  //Get coin detail data

  async getCoinDetail(id) {
    try {
      const res = await api.get(`/coins/${id}`);

      return res.data;
    } catch (err) {
      throw new Error(`Coin verisi alınamadı${err.message}`);
    }
  },

  //Get coin historical price data
  async getPriceHistory(id, days = 7) {
    try {
      const res = await api.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: days,
          interval: days <= 1 ? undefined : "daily",
        },
      });

      //Historical price data from the API has been made more usable
      return res.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
        date: new Date(timestamp).toISOString(),
      }));
    } catch (err) {
      throw new Error(`Coin verisi alınamadı${err.message}`);
    }
  },
};
