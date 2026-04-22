import { Moon, Star, Sun, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

TrendingUp;
const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-lg">
              <TrendingUp />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Crypto Tracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kripto para takip sistemi
              </p>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Star className="size-5" />
              <span className="text-sm">1</span>
            </div>

            {/* Theme button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {isDarkMode ? (
                <Sun className="size-5 text-yellow-500" />
              ) : (
                <Moon className="size-5 text-gray-600" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Canlı
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
