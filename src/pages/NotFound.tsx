import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
    );
  }, [location.pathname]);

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-essence/5 px-4 pt-16 pb-10">
        <div className="max-w-md w-full text-center animate-fade-up">
          <div className="relative mb-6 mx-auto w-64 h-64">
            <div className="absolute inset-0 animate-house-float">
              <svg
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
              >
                <path
                    d="M256 60.8L32 253.6V480H192V352H320V480H480V253.6L256 60.8Z"
                    fill="#E5F3FF"
                    stroke="#0EA5E9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M192 480V352H320V480"
                    stroke="#0EA5E9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M384 192V96H320V136"
                    stroke="#0EA5E9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M256 60.8L480 253.6"
                    stroke="#0EA5E9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M256 60.8L32 253.6"
                    stroke="#0EA5E9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M240 352H272V384H240V352Z"
                    fill="#0EA5E9"
                />
              </svg>
            </div>

            {/* 404 overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-extrabold text-essence/80 animate-pulse-soft">404</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl shadow-essence p-8 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Дом не найден
            </h1>
            <p className="text-gray-600 mb-8">
              Похоже, вы пытаетесь найти дом, которого не существует. Возможно, он был перемещен или снесен.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                  to="/"
                  className="button-essence inline-flex items-center w-full sm:w-auto justify-center"
              >
                <Home size={18} className="mr-2" />
                Вернуться домой
              </Link>

              <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto"
              >
                <ArrowLeft size={18} className="mr-2" />
                Вернуться назад
              </button>
            </div>
          </div>

          <div className="mt-8 text-gray-500 text-sm animate-fade-in">
            <p>
              Хотите узнать больше о строительстве дома вашей мечты?{" "}
              <Link to="/" className="text-essence hover:underline">
                Посетите наш каталог
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default NotFound;