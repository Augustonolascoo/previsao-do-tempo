export async function fetchCityCoordinates(city) {
    const apikey = '074381e2d34ccd3f6fae472a66fc04fd'; // Substitua pela sua chave da API
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
  
    try {
      const res = await fetch(geocodeUrl);
      if (!res.ok) {
        throw new Error('Cidade não encontrada');
      }
  
      const [cityData] = await res.json();
      if (!cityData) {
        throw new Error('Dados da cidade não encontrados');
      }
  
      return { lat: cityData.lat, lon: cityData.lon };
    } catch (error) {
      console.error('Erro ao buscar coordenadas da cidade:', error);
      return null;
    }
}

// Função para buscar a temperatura atual
export async function fetchCurrentWeather(lat, lon) {
    const apikey = '4cb32cd8d01bc25d273c6b95663ebce4'; // Substitua pela sua chave da API
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  
    try {
      const res = await fetch(currentWeatherUrl);
      if (!res.ok) {
        throw new Error('Erro ao buscar temperatura atual');
      }
  
      const currentWeatherData = await res.json();
      return currentWeatherData;
    } catch (error) {
      console.error('Erro ao buscar temperatura atual:', error);
      return null;
    }
}

// Função para buscar a previsão do tempo dos próximos dias
export async function fetchWeatherForecast(lat, lon) {
    const apikey = '4cb32cd8d01bc25d273c6b95663ebce4'; // Substitua pela sua chave da API
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  
    try {
      const res = await fetch(forecastUrl);
      if (!res.ok) {
        throw new Error('Erro ao buscar dados de previsão do tempo');
      }
  
      const forecastData = await res.json();
      return forecastData;
    } catch (error) {
      console.error('Erro ao buscar dados de previsão do tempo:', error);
      return null;
    }
}

// Função que faz ambas as requisições
export async function fetchWeatherData(city) {
    const coordinates = await fetchCityCoordinates(city);
    if (!coordinates) return null;
  
    // Buscar temperatura atual e previsão de 5 dias
    const [currentWeather, forecast] = await Promise.all([
      fetchCurrentWeather(coordinates.lat, coordinates.lon),
      fetchWeatherForecast(coordinates.lat, coordinates.lon),
    ]);
  
    if (!currentWeather || !forecast) return null;
  
    return {
      currentWeather,
      forecast,
    };
}
  
  