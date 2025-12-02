export const getTimeData = (timezone) => {
    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone,
    });
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long', month: 'short', day: 'numeric', timeZone: timezone,
    });
    const hourFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: timezone });
  
    const timeString = timeFormatter.format(now);
    const dateString = dateFormatter.format(now);
    const hour = parseInt(hourFormatter.format(now), 10);
  
    return { timeString, dateString, hour };
  };
  
  export const getDayPhase = (hour) => {
    if (hour >= 5 && hour < 8) return 'sunrise';
    if (hour >= 8 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'sunset';
    return 'night';
  };
  
  export const getSimulatedWeather = (city, hour) => {
    const isNight = hour < 6 || hour > 19;
    let temp = city.baseTemp;
  
    if (isNight) temp -= 5;
    if (hour >= 12 && hour <= 15) temp += 3;
  
    let condition = "Clear";
  
    if (city.climate === "rainy" && Math.random() > 0.4) condition = "Rain";
    if (city.climate === "desert" && Math.random() > 0.9) condition = "Cloudy";
    if (city.climate === "cold" && temp < 0) condition = "Snow";
    if (city.climate === "humid" && Math.random() > 0.7) condition = "Cloudy";
    if (city.climate === "variable" && Math.random() > 0.5) condition = "Windy";
    if (city.climate === "windy" && Math.random() > 0.4) condition = "Windy";
  
    if (condition === "Clear") condition = isNight ? "Clear Night" : "Sunny";
  
    return {
      temp: Math.round(temp),
      condition,
      humidity: city.climate === "humid" ? 80 : city.climate === "desert" ? 20 : 45,
      wind: city.climate === "windy" ? 25 : 10,
    };
  };
  