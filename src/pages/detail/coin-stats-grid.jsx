import { Activity, BarChart } from "lucide-react";
import { formatBigNumber, formatPrice } from "../../utils/helpers";

const CoinStatsGrid = ({ coin }) => {
  const stats = [
    {
      title: "Market Cap",
      value: formatBigNumber(coin.market_data.market_cap.usd),
      subtitle: `#${coin.market_cap_rank}`,
      icon: BarChart,
      color: "blue",
    },
    {
      title: "24s Hacim",
      value: formatBigNumber(coin.market_data.total_volume.usd),
      icon: Activity,
      color: "green",
    },
    {
      title: "24s Yüksek/Düşük",
      value: null,
      isRange: true,
      low: formatPrice(coin.market_data.high_24h.usd),
      high: formatPrice(coin.market_data.low_24h.usd),
    },
    {
      title: "Tüm Zamanlar Yüksek",
      value: formatPrice(coin.market_data.ath.usd),
      subtitle: new Date(coin.market_data.ath_date.usd).toLocaleDateString(
        "tr-TR"
      ),
    },
    {
      title: "Tüm Zamanlar Düşük",
      value: formatPrice(coin.market_data.atl.usd),
      subtitle: new Date(coin.market_data.atl_date.usd).toLocaleDateString(
        "tr-TR"
      ),
    },
    {
      title: "Son Güncelleme",
      value: new Date(coin.market_data.last_updated).toLocaleString("tr-TR"),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="detail-container">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>

              {stat.isRange ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Yüksek:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.high}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Düşük:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.low}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {" "}
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.subtitle}
                    </p>
                  )}
                </>
              )}
            </div>

            {stat.icon && (
              <div className={`text-${stat.color}-500`}>
                <stat.icon className="size-8" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinStatsGrid;
