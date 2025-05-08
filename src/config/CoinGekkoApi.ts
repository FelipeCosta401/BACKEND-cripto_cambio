import axios from "axios";

const CoinGekkoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export default CoinGekkoApi;
