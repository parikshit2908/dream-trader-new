import axios from "axios";

const API_KEY = "3a3f308780fb4d56b3aa187d7c402c34";
const BASE_URL = "https://api.twelvedata.com";

// ✅ Single stock price - returns just the price value
export const fetchPrice = async (symbol) => {
  try {
    // Handle different symbol formats
    let apiSymbol = symbol;
    
    // Convert Forex pairs (USD/INR -> USDINR)
    if (symbol.includes("/")) {
      apiSymbol = symbol.replace("/", "");
    }
    
    // For crypto, ensure proper format (BTC -> BTC/USD)
    const cryptoList = ["BTC", "ETH", "SOL", "DOGE"];
    if (cryptoList.includes(symbol)) {
      apiSymbol = `${symbol}/USD`;
    }

    const res = await axios.get(`${BASE_URL}/price`, {
      params: { symbol: apiSymbol, apikey: API_KEY },
    });

    if (res.data.status === "error" || res.data.code) {
      console.warn(`Error fetching ${symbol}:`, res.data.message);
      // Try with quote endpoint as fallback
      try {
        const quoteRes = await axios.get(`${BASE_URL}/quote`, {
          params: { symbol: apiSymbol, apikey: API_KEY },
        });
        if (quoteRes.data.close) {
          return parseFloat(quoteRes.data.close).toFixed(2);
        }
      } catch (e) {
        console.error("Fallback quote fetch failed:", e);
      }
      return null;
    }

    // Return price as string/number
    const price = res.data.price || res.data.close;
    return price ? parseFloat(price).toFixed(2) : null;
  } catch (err) {
    console.error("Error fetching price:", err);
    return null;
  }
};

// ✅ Chart data for sparklines - returns array of {time, value} objects
export const fetchChart = async (symbol, interval = "5min", outputsize = 20) => {
  try {
    // Handle different symbol formats
    let apiSymbol = symbol;
    
    // Convert Forex pairs (USD/INR -> USDINR)
    if (symbol.includes("/")) {
      apiSymbol = symbol.replace("/", "");
    }
    
    // For crypto, ensure proper format
    const cryptoList = ["BTC", "ETH", "SOL", "DOGE"];
    if (cryptoList.includes(symbol)) {
      apiSymbol = `${symbol}/USD`;
    }

    const res = await axios.get(`${BASE_URL}/time_series`, {
      params: { symbol: apiSymbol, interval, outputsize, apikey: API_KEY },
    });

    if (res.data.status === "error" || res.data.code) {
      console.warn(`Chart error for ${symbol}:`, res.data.message);
      return [];
    }

    // Format data for Recharts: {time, value}
    const values = res.data.values || [];
    return values
      .reverse()
      .map((item) => ({
        time: item.datetime || item.date || "",
        value: parseFloat(item.close || item.price || 0),
      }));
  } catch (err) {
    console.error("Error fetching chart data:", err);
    return [];
  }
};
