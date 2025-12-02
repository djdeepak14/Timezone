import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react';

export const WeatherIcon = ({ condition, className }) => {
  switch (condition) {
    case 'Sunny': return <Sun className={`text-yellow-400 ${className}`} />;
    case 'Clear Night': return <Moon className={`text-slate-200 ${className}`} />;
    case 'Cloudy': return <Cloud className={`text-gray-300 ${className}`} />;
    case 'Rain': return <CloudRain className={`text-blue-300 ${className}`} />;
    case 'Snow': return <CloudSnow className={`text-white ${className}`} />;
    case 'Storm': return <CloudLightning className={`text-purple-300 ${className}`} />;
    case 'Windy': return <Wind className={`text-slate-300 ${className}`} />;
    default: return <Sun className={`text-yellow-400 ${className}`} />;
  }
};
