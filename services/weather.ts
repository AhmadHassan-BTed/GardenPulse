export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  locationName: string;
}

/**
 * Fetches current weather from the OpenWeather API based on latitude and longitude.
 * 
 * @param lat Latitude
 * @param lon Longitude
 * @returns Clean mapped WeatherData object
 */
export async function fetchLocalWeather(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    throw new Error('OpenWeather API key is not configured.');
  }

  // Fetch metric units for standard Celsius values
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenWeather API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract values matching the expected schema
    const temp = data?.main?.temp ?? 20;
    const condition = data?.weather?.[0]?.main ?? 'Clear';
    const humidity = data?.main?.humidity ?? 50;
    const locationName = data?.name ?? 'My Garden';

    return {
      temp: Math.round(temp),
      condition,
      humidity,
      locationName,
    };
  } catch (error) {
    console.error('Weather fetch failed:', error);
    throw error;
  }
}
