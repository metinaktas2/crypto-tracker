const CoinDescription = ({ coin }) => {
  console.log(coin);

  return (
    <div className="detail-container whitespace-pre-wrap text-gray-600 dark:text-gray-400">
      <p className="text-2xl text-center mb-2">{coin.name}</p>
      {coin?.description?.en
        ? coin.description.en
        : "Açıklama Verisi Bulunamadı..."}
    </div>
  );
};

export default CoinDescription;
