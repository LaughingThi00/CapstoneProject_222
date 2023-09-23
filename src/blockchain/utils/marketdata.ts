import axios from 'axios';

export async function getPriceUSDTperVND() {
  const url =
    'https://www.okx.com/v2/market/rate/getRateByRateName/usd_vnd?t=1695195675703';
  try {
    const response = await axios.get(url, {});
    if (response) {
      return response.data.data[0].rateParities;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Request error:', error);
    return [];
  }
}

export async function getPriceAsset(symbol: string) {
  const url = 'https://www.binance.com/api/v1/ticker/bookTicker';
  try {
    const response = await axios.get(`${url}?symbol=${symbol}`);
    if (response) {
      const price = response.data;
      return price;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Request error:', error);
    return [];
  }
}
