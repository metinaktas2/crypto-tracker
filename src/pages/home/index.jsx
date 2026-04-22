import { useCallback, useEffect, useMemo, useState } from "react";
import { coinApi } from "../../services/coinApi";
import Error from "../../components/error";
import Searchbar from "../../components/home/searchbar";
import { RefreshCw, TrendingUp } from "lucide-react";
import InfoCard from "../../components/home/info-card";
import Loader from "../../components/loader";
import CoinCard from "../../components/home/coin-card";
import Refresh from "./refresh";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCoins = useCallback((isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setLoading(true);

    coinApi
      .getTopCoins()
      .then((data) => {
        setCoins(data);
        setLastUpdated(new Date());
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);

  //Auto refreshing - every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      fetchCoins(true);
    }, 30000);

    return () => {
      clearInterval(id);
    };
  }, []);

  //Filter the searched word
  const filtredCoins = useMemo(() => {
    if (!searchTerm.trim()) return coins;

    const term = searchTerm.toLowerCase();

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term)
    );
  }, [coins, searchTerm]);

  const onSearch = useCallback((text) => {
    setSearchTerm(text);
  }, []);

  if (error) return <Error message={error} refetch={fetchCoins} />;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900  dark:text-white">
            Kripto Para Piyasası
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            En popüler kripto para birimleri
          </p>
        </div>

        {/* Search and refresh */}
        <div className="flex items-center space-x-4 gap-5">
          <Searchbar onSearch={onSearch} />

          <button
            onClick={() => fetchCoins(true)}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <RefreshCw
              className={`size-5 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          label="Toplam Coin"
          value={coins.length}
          icon={<TrendingUp className="size-8 text-blue-500" />}
        />
        <InfoCard
          label="Son Güncelleme"
          value={
            lastUpdated ? lastUpdated.toLocaleTimeString("tr") : "Yükleniyor..."
          }
          icon={<RefreshCw className="size-8 text-green-500" />}
        />
        <InfoCard
          label="Durum"
          value={
            <div className="flex items-center space-x-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span>Canlı</span>
            </div>
          }
        />
      </div>

      {/* Listing */}
      {loading && coins.length < 1 ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Refresh status */}
      <Refresh show={refreshing} />
    </div>
  );
};

export default Home;
