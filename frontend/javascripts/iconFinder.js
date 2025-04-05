// Helper function to map short description to an icon URL, with priority
export function getWeatherIcon(description) {
    // Convert to lowercase for easier comparison
    const desc = description.toLowerCase();
  
    // Check for specific weather conditions with a switch statement
    switch (true) {
      case desc.includes("snow"):
        return "./assets/snow.png";  
      case desc.includes("rain"):
        return "./assets/rain.png"; 
      case desc.includes("storm"):
        return "./assets/storm.png"; 
      case desc.includes("cloud"):
        return "./assets/cloudy.png"; 
      case desc.includes("sun") || desc.includes("clear"):
        return "./assets/sun.png"; 
      case desc.includes("wind"):
        return "./assets/partly-cloudy.png";
      default:
        return "./assets/sun.png";
    }
  }
  