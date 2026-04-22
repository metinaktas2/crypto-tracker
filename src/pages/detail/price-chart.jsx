import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useTheme } from "../../context/ThemeContext";
import { useMemo } from "react";

const PriceChart = ({ priceData, symbol, days }) => {
  const { isDarkMode } = useTheme();
  //Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    if (days <= 1) {
      return date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days <= 7) {
      return date.toLocaleDateString("tr-TR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });
    } else {
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
      });
    }
    return "x";
  };

  //Calculate price change
  const firstPrice = priceData[0]?.price || 0;
  const lastPrice = priceData.at(-1)?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  //Chart colors
  const lineColor = isPositive ? "#16a34a" : "#dc2626";
  const gradientColor = isPositive
    ? isDarkMode
      ? "rgba(34,197,94,0.1)"
      : "rgba(34,197,94,0.1)"
    : isDarkMode
    ? "rgba(239,68,68,0.1)"
    : "rgba(239,68,68,0.1)";

  //Chart data
  const data = {
    labels: priceData.map((item) => formatDate(item.timestamp)),
    datasets: [
      {
        label: `${symbol} Fiyat`,
        data: priceData.map((item) => item.price),
        borderColor: lineColor,
        backgroundColor: gradientColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: lineColor,
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  //Chart settings
  const chartOptions = useMemo(() => {
    const textColor = isDarkMode ? "#e5e7eb" : "#374151";
    const gridColor = isDarkMode ? "#374151" : "#e5e7eb";

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `${symbol} Fiyat Geçmişi (${days} gün)`,
          color: textColor,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: isDarkMode ? "#374151" : "#e5e7eb",
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              return `Fiyat: $${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}`;
            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            color: gridColor,
            borderColor: gridColor,
          },
          ticks: {
            color: textColor,
            maxTicksLimit: 8,
          },
        },
        y: {
          display: true,
          grid: {
            color: gridColor,
            borderColor: gridColor,
          },
          ticks: {
            color: textColor,
            callback: function (value) {
              if (value < 0.01) {
                return `$${value.toFixed(6)}`;
              } else if (value < 1) {
                return `$${value.toFixed(4)}`;
              } else if (value < 100) {
                return `$${value.toFixed(2)}`;
              } else {
                return `$${value.toLocaleString()}`;
              }
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      elements: {
        point: {
          hoverRadius: 8,
        },
      },
    };
  }, [symbol, days, isDarkMode]);

  return (
    <div className="h-80 w-full">
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default PriceChart;
