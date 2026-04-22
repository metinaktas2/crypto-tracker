const InfoCard = ({ label, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ">{label}</p>
          <div
            className={`${
              label.includes("Toplam") ? "text-2xl font-bold" : "text-lg "
            }  text-gray-900 dark:text-white`}
          >
            {value}
          </div>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default InfoCard;
