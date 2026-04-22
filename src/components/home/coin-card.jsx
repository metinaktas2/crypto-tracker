import { Star, TrendingDown, TrendingUp } from "lucide-react";
import {
  formatBigNumber,
  formatPercentage,
  formatPrice,
} from "../../utils/helpers";
import { Link } from "react-router-dom";

const CoinCard = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  const infoArray = [
    {
      label: "Fiyat",
      value: (
        <span className="text-xl font-bold">
          {formatPrice(coin.current_price)}
        </span>
      ),
    },
    {
      label: "24s Değişim",
      value: (
        <span
          className={`flex items-center space-x-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
          <span className="font-semibold">
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </span>
      ),
    },
    {
      label: "Market Cap",
      value: (
        <span className="font-semibold">
          {formatBigNumber(coin.market_cap)}
        </span>
      ),
    },
    {
      label: "24s Hacim",
      value: (
        <span className="text-sm">{formatBigNumber(coin.total_volume)}</span>
      ),
    },
  ];
  return (
    <Link
      to={`/coin/${coin.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg  p-6 cursor-pointer hover:scale-105 transform transition duration-300"
    >
      {/* top part */}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="relative">
            <img
              src={coin.image}
              alt={coin.symbol}
              className="size-12 rounded-full"
            />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full size-6 flex items-center justify-center">
              {coin.market_cap_rank}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {coin.symbol}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
              {coin.name}
            </p>
          </div>
        </div>
        {/* Favorite button */}
        <button className="p-2 rounded-full transition">
          <Star className="size-5" />
        </button>
      </div>

      {/* Coin Info */}
      <div className="space-y-3">
        {infoArray.map((item, key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
            <p className="text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom part */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>#{coin.market_cap_rank}</span>
          <span>
            {new Date(coin.last_updated).toLocaleDateString("tr", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
