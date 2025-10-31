using System.Collections;

namespace Calculator.Test;

public class TestClassData : IEnumerable<object[]>
{
    public IEnumerable<object[]> ReadData()
    {
        /* A case where the data are in this class
        yield return new object[] { -5, -7, -12 };
        yield return new object[] {-3, -7, -10};
        yield return new object[] {-5, -2, -7};
        */

        // A case where the data is fetched from a file
        var lines = File.ReadAllLines("TestCase.txt");
        foreach(var line in lines)
        {
            var splittedLine = line.Split(",");
            var a = double.Parse(splittedLine[0].Trim());
            var b = double.Parse(splittedLine[1].Trim());
            var expected = double.Parse(splittedLine[2].Trim());
            yield return new object[] { a, b, expected };
        }
    }

    public IEnumerator<object[]> GetEnumerator()
    {
        var yieldedData = ReadData();
        return yieldedData.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
