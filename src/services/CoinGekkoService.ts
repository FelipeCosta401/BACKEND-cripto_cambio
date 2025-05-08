
import CoinGekkoApi from "../config/CoinGekkoApi";

export default class CoinGekkoService {
    async getCoinValue(coinId: string){
        return await CoinGekkoApi.get(`/simple/price?ids=${coinId}&vs_currencies=usd,brl`)
            .then((res) => {
                const brlCurrency = res.data[coinId].brl
                const usdCurrency = res.data[coinId].usd

                return { brlCurrency, usdCurrency}
            })
    }    
}