using MinimalAPI.Services;

namespace MinimalAPI.Tests;

public class WeatherServiceTests
{
    [Fact]
    public void GetWeatherConditions_ReturnsFourConditions()
    {
        var service = new WeatherService();
        var result = service.GetWeatherConditions();
        
        Assert.Equal(4, result.Length);
    }

    [Theory]
    [InlineData("Sunny", 30)]
    [InlineData("Cloudy", 20)]
    [InlineData("Rainy", 15)]
    [InlineData("Snowy", 0)]
    public void GetTemperature_ReturnsCorrectTemperature(string condition, int expectedTemp)
    {
        var service = new WeatherService();
        var result = service.GetTemperature(condition);
        
        Assert.Equal(expectedTemp, result);
    }

    [Fact]
    public void GetTemperature_ThrowsExceptionForInvalidCondition()
    {
        var service = new WeatherService();
        
        Assert.Throws<ArgumentException>(() => service.GetTemperature("Invalid"));
    }
}
