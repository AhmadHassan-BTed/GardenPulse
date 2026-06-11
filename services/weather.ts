export interface ForecastDay {
  id: string;
  dayLabel: string;
  icon: 'sun' | 'cloud' | 'cloud-rain' | 'cloud-lightning' | 'cloud-snow';
  high: number;
  low: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  locationName: string;
  uvIndex: number;
  rainChance: number;
  sunrise: string;  // e.g. "05:24 AM"
  sunset: string;   // e.g. "09:12 PM"
  forecast: ForecastDay[];
}

function mapConditionToIcon(main: string): ForecastDay['icon'] {
  const c = main.toLowerCase();
  if (c.includes('thunder')) return 'cloud-lightning';
  if (c.includes('rain') || c.includes('drizzle')) return 'cloud-rain';
  if (c.includes('snow')) return 'cloud-snow';
  if (c.includes('cloud')) return 'cloud';
  return 'sun';
}

function formatUnixTime(unix: number, timezoneOffset: number): string {
  const d = new Date((unix + timezoneOffset) * 1000);
  const hours = d.getUTCHours();
  const mins = d.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
}

/**
 * Fetches current weather + 3-day forecast from the OpenWeather API.
 */
export async function fetchLocalWeather(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    throw new Error('OpenWeather API key is not configured.');
  }

  // Fetch current weather
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const currentRes = await fetch(currentUrl);
  if (!currentRes.ok) {
    throw new Error(`OpenWeather current API returned status: ${currentRes.status}`);
  }
  const currentData = await currentRes.json();

  const temp = Math.round(currentData?.main?.temp ?? 0);
  const condition = currentData?.weather?.[0]?.main ?? 'Unknown';
  const humidity = currentData?.main?.humidity ?? 0;
  const locationName = currentData?.name ?? 'Unknown';
  const timezoneOffset = currentData?.timezone ?? 0;
  const sunriseUnix = currentData?.sys?.sunrise;
  const sunsetUnix = currentData?.sys?.sunset;

  const sunrise = sunriseUnix ? formatUnixTime(sunriseUnix, timezoneOffset) : '—';
  const sunset = sunsetUnix ? formatUnixTime(sunsetUnix, timezoneOffset) : '—';

  // Fetch 5-day / 3-hour forecast and extract 3 daily summaries
  let forecast: ForecastDay[] = [];
  let uvIndex = 0;
  let rainChance = 0;

  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=24`;
    const forecastRes = await fetch(forecastUrl);
    if (forecastRes.ok) {
      const forecastData = await forecastRes.json();
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Group by day, take 3 future days
      const dailyMap = new Map<string, { temps: number[]; conditions: string[]; pops: number[] }>();
      const todayStr = new Date().toISOString().split('T')[0];

      for (const item of forecastData.list || []) {
        const dateStr = item.dt_txt?.split(' ')[0];
        if (!dateStr || dateStr === todayStr) continue;

        if (!dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, { temps: [], conditions: [], pops: [] });
        }
        const entry = dailyMap.get(dateStr)!;
        entry.temps.push(item.main?.temp ?? 0);
        entry.conditions.push(item.weather?.[0]?.main ?? 'Clear');
        entry.pops.push((item.pop ?? 0) * 100);
      }

      let dayIdx = 0;
      for (const [dateStr, data] of dailyMap) {
        if (dayIdx >= 3) break;
        const d = new Date(dateStr);
        const high = Math.round(Math.max(...data.temps));
        const low = Math.round(Math.min(...data.temps));
        const dominantCondition = data.conditions
          .sort((a, b) => data.conditions.filter((c) => c === b).length - data.conditions.filter((c) => c === a).length)[0];

        forecast.push({
          id: String(dayIdx + 1),
          dayLabel: dayLabels[d.getDay()],
          icon: mapConditionToIcon(dominantCondition),
          high,
          low,
        });
        dayIdx++;
      }

      // Extract rain chance from today's first entries
      const todayEntries = (forecastData.list || []).filter((item: any) => item.dt_txt?.startsWith(todayStr));
      if (todayEntries.length > 0) {
        rainChance = Math.round(Math.max(...todayEntries.map((e: any) => (e.pop ?? 0) * 100)));
      }
    }
  } catch (err) {
    console.warn('Forecast fetch failed, continuing with current weather only:', err);
  }

  // Fetch UV index from OneCall if available
  try {
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const uvRes = await fetch(uvUrl);
    if (uvRes.ok) {
      const uvData = await uvRes.json();
      uvIndex = Math.round(uvData?.value ?? 0);
    }
  } catch {
    // UV index is non-critical, default to 0
  }

  return {
    temp,
    condition,
    humidity,
    locationName,
    uvIndex,
    rainChance,
    sunrise,
    sunset,
    forecast,
  };
}
