'use client';

import { useState } from 'react';
import { fetchWeatherData } from '../services/weather';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchWeatherData(city);
    if (data) {
      setWeatherData(data);
    } else {
      setError('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
    }
    setLoading(false);
  };

  const prepareChartData = () => {
    if (!weatherData || !weatherData.forecast) return null;

    // Preparar os dados para o gráfico
    const dates = weatherData.forecast.list.map((item) => {
      const date = new Date(item.dt * 1000);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    const temps = weatherData.forecast.list.map((item) => item.main.temp);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temps,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  return (
    <div>
      <h1>Busque a previsão do tempo</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {loading && <p>Carregando ...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          {}
          <h2>Temperatura atual em {weatherData.currentWeather.name}</h2>
          <p>Temperatura: {weatherData.currentWeather.main.temp} °C</p>
          <p>Condição: {weatherData.currentWeather.weather[0].description}</p>

          {}
          <h2>Previsão dos próximos dias para {weatherData.currentWeather.name}</h2>
          <Line data={prepareChartData()} />
        </div>
      )}
    </div>
  );
}
