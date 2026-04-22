import { AlertCircle } from "lucide-react";

const Error = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <AlertCircle className="size-12 text-red-400" />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Veri Yüklenemedi !
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
      <button
        onClick={refetch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
