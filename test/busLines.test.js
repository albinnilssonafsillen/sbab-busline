const { testData } = require('./testData');
const {
  cleanData,
  getBusLineCount,
  getTop10BusLines,
  getTop10BusLinesData,
  getDataToReturn,
} = require('./testFunctions');

test('check length of array', () => {
  expect(testData.length).toBeGreaterThan(20000);
});

test('check if no DirectionCode with the value of "2" exist', () => {
  const data = cleanData(testData);
  const hasDirectionCode2 = data.some((d) => d.DirectionCode === '2');
  expect(hasDirectionCode2).toBe(false);
});

test('check if return 10 LineNumbers', () => {
  const cleanedData = cleanData(testData);
  const busLineCounts = getBusLineCount(cleanedData);
  const top10BusLines = getTop10BusLines(busLineCounts);

  expect(top10BusLines.length).toBe(10);
});

test('LineNumbers exisit in the filteredData', () => {
  const cleanedData = cleanData(testData);
  const busLineCounts = getBusLineCount(cleanedData);
  const top10BusLines = getTop10BusLines(busLineCounts);
  const filteredData = getTop10BusLinesData(cleanedData, top10BusLines);

  expect(
    filteredData.every((line) => top10BusLines.includes(line.LineNumber))
  ).toBe(true);
});

test('should return an empty array when no filteredData is provided', () => {
  const stopNamesByLineNumber = getDataToReturn([]);

  expect(stopNamesByLineNumber).toEqual([]);
});

test('Check if all LineNumber have more than 70 stops', () => {
  const cleanedData = cleanData(testData);
  const busLineCounts = getBusLineCount(cleanedData);
  const top10BusLines = getTop10BusLines(busLineCounts);
  const filteredData = getTop10BusLinesData(cleanedData, top10BusLines);
  const stopNamesByLineNumber = getDataToReturn(filteredData);

  for (const stopNames of stopNamesByLineNumber) {
    expect(stopNames.StopNames.length).toBeGreaterThan(70);
  }
});
