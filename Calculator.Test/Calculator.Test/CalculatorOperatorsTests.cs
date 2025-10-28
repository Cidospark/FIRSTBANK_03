using Calculator.App.CalcLib;
using Xunit.Sdk;

namespace Calculator.Test;

public class CalculatorOperatorsTests
{
    [Fact(Skip = "This test is skipped")]
    public void Test1()
    {
        Assert.True(true);
    }

    // public static IEnumerable<object[]> TestData { get; set; } = new List<object[]>
    // {
    //     new object[] {-5, -7, -12},
    //     new object[] {-3, -7, -10},
    //     new object[] {-5, -2, -7},
    // };

    // // name_stateOfMethod_result

    // [Fact]
    // public void Add_TwoPositiveNumbers_ReturnsCorrectSum()
    // {
    //     // Arrange
    //     var calc = new CalcOps();
    //     double a = 5;
    //     double b = 7;
    //     double expected = 12;

    //     // Act
    //     var actual = calc.Add(a, b);


    //     // Assert
    //     Assert.Equal(expected, actual);
    // }

    
    // [Theory]
    // [InlineData(-5, -7, -10)]
    // [InlineData(-3, -7, -10)]
    // [InlineData(-5, -2, -7)]
    // [InlineData(-2, -7, -9)]
    // public void Add_TwoNegativeNumbers_ReturnsCorrectSum(double a, double b, double expected)
    // {
    //     // Arrange
    //     var calc = new CalcOps();

    //     // Act
    //     var actual = calc.Add(a, b);


    //     // Assert
    //     Assert.Equal(expected, actual);
    // }

    // [Theory]
    // [MemberData(nameof(TestData))]
    // public void Add_OnePositiveNumbersAndOneNegativeNumber_ReturnsCorrectSum(double a, double b, double expected)
    // {
    //     // Arrange
    //     var calc = new CalcOps();

    //     // Act
    //     var actual = calc.Add(a, b);


    //     // Assert
    //     Assert.Equal(expected, actual);
    // }

    // [Theory]
    // [ClassData(typeof(TestClassData))]
    // public void Add_MaxNumberAndOneNegativeNumber_MaxNumber(double a, double b, double expected)
    // {
    //     // Arrange
    //     var calc = new CalcOps();

    //     // Act
    //     var actual = calc.Add(a, b);


    //     // Assert
    //     Assert.Equal(expected, actual);
    // }


    [Fact]
    public void Add_NullValueAndRealValue_ShouldThrowError()
    {
        // arrange
        var calc = new CalcOps();
        string a = null;
        string b = "7";

        // assert
        Assert.Throws<NullReferenceException>(() => calc.Add(a, b));
    }
}
