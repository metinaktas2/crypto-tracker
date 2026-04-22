import { useCallback, useEffect, useState } from "react";
import { coinApi } from "../../services/coinApi";
import { useParams } from "react-router-dom";
import Error from "../../components/error";
import Loader from "../../components/loader";
import CoinHeader from "./coin-header";
import CoinPrice from "./coin-price";
import CoinChartSection from "./coin-chart-section";
import CoinStatsGrid from "./coin-stats-grid";
import CoinDescription from "./coin-description";
import Refresh from "../home/refresh";

const Detail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [coin, setCoin] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const fetchPriceHistory = useCallback(
    async (days = selectedPeriod) => {
      try {
        setHistoryLoading(true);
        const data = await coinApi.getPriceHistory(id, days);
        setPriceHistory(data);
      } catch (error) {
        setPriceHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    },
    [id, selectedPeriod]
  );

  const fetchCoinDetail = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const data = await coinApi.getCoinDetail(id);
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchCoinDetail();
    fetchPriceHistory();
  }, []);

  useEffect(() => {
    if (coin) {
      fetchPriceHistory(selectedPeriod);
      fetchCoinDetail(true);
    }
  }, [selectedPeriod]);

  const handleRefresh = () => {
    fetchCoinDetail(true);
    fetchPriceHistory();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Error
        message={error.message}
        refetch={() => {
          fetchCoinDetail();
          fetchPriceHistory();
        }}
      />
    );
  }
  return (
    <div className="space-y-6">
      <CoinHeader
        coin={coin}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
      />
      <CoinPrice coin={coin} />
      <CoinChartSection
        coin={coin}
        priceHistory={priceHistory}
        historyLoading={historyLoading}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <CoinStatsGrid coin={coin} />
      <CoinDescription coin={coin} />
      <Refresh show={refreshing} />
    </div>
  );
};

export default Detail;
