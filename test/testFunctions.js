function sortLineNumberByBusStopsCount(stopNamesByLineNumber) {
  stopNamesByLineNumber.sort((a, b) => {
    const stopNamesCountA = a.StopNames.length;
    const stopNamesCountB = b.StopNames.length;

    return stopNamesCountB - stopNamesCountA;
  });
}

function getDataToReturn(filteredData) {
  const stopNamesByLineNumber = [];

  for (const entry of filteredData) {
    const { LineNumber, StopName } = entry;

    const lineIndex = stopNamesByLineNumber.findIndex(
      (item) => item.LineNumber === LineNumber
    );

    if (lineIndex !== -1) {
      stopNamesByLineNumber[lineIndex].StopNames.push(StopName);
    } else {
      stopNamesByLineNumber.push({
        LineNumber,
        StopNames: [StopName],
      });
    }
  }
  return stopNamesByLineNumber;
}

function getTop10BusLinesData(cleanedData, top10BusLines) {
  const filteredData = cleanedData.filter((line) =>
    top10BusLines.includes(line.LineNumber)
  );

  return filteredData;
}

function getTop10BusLines(busLineCounts) {
  return Object.keys(busLineCounts)
    .sort((a, b) => busLineCounts[b] - busLineCounts[a])
    .slice(0, 10);
}

function getBusLineCount(cleanedData) {
  const busLineCounts = {};
  for (const line of cleanedData) {
    if (!busLineCounts[line.LineNumber]) {
      busLineCounts[line.LineNumber] = 0;
    }
    busLineCounts[line.LineNumber]++;
  }
  return busLineCounts;
}

function cleanData(busLines) {
  // Filter all Buslines with the DirectionCode = "1"
  const busLinesWithoutDuplicates = busLines.filter(
    (line) => line.DirectionCode === '1'
  );

  // Filter all Buslines that does have an assigned value in StopName
  const removeIfStopPointNameisUndefined = busLinesWithoutDuplicates.filter(
    (busLine) => busLine.StopName !== undefined
  );

  // Filter out duplicates if buslines have the same LineNumber and Same StopName
  // (e.g. LinuNumber 631 with JourneyPatternPointnumber ""60050" and ""60054" & "63019" and ""63020")
  const filteredBusStops = busLinesWithoutDuplicates.filter(
    (item, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t.LineNumber === item.LineNumber && t.StopName === item.StopName
        )
      );
    }
  );

  return filteredBusStops;
}

module.exports = {
  cleanData,
  getBusLineCount,
  getTop10BusLines,
  getTop10BusLinesData,
  getDataToReturn,
};
