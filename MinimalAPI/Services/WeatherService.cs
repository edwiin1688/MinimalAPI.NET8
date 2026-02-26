namespace MinimalAPI.Services;

public class WeatherService
{
    public string[] GetWeatherConditions() =>
    [
        "Sunny",
        "Cloudy",
        "Rainy",
        "Snowy"
    ];

    public int GetTemperature(string condition) => condition switch
    {
        "Sunny" => 30,
        "Cloudy" => 20,
        "Rainy" => 15,
        "Snowy" => 0,
        _ => throw new ArgumentException("Invalid condition")
    };
}
