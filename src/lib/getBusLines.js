import axios from 'axios';

export async function getBusLines() {
  try {
    const busLines = await getAllBusLines();

    const stops = await getBusStops();

    mergeAPICallsData(busLines, stops);

    const cleanedData = cleanData(busLines);

    const busLineCounts = getBusLineCount(cleanedData);

    const top10BusLines = getTop10BusLines(busLineCounts);

    const filteredData = getTop10BusLinesData(cleanedData, top10BusLines);

    const stopNamesByLineNumber = getDataToReturn(filteredData);

    sortLineNumberByBusStopsCount(stopNamesByLineNumber);

    return stopNamesByLineNumber;
  } catch (error) {
    throw new Error(`An Error occurred in [getBusLines] Error: ${error}`);
  }
}

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

function mergeAPICallsData(busLines, stops) {
  busLines.map((busLine) => {
    const busStopName = stops.filter(
      (busStop) =>
        busStop.StopPointNumber === busLine.JourneyPatternPointNumber &&
        busStop.StopPointName !== undefined
    )[0];
    busLine.StopName = busStopName?.StopPointName;
  });
}

async function getBusStops() {
  const busStops = await axios.get('http://localhost:3000/api/busstops');
  const stops = busStops.data.ResponseData.Result;
  return stops;
}

async function getAllBusLines() {
  const busLinesres = await axios.get('http://localhost:3000/api/buslines');
  const busLines = busLinesres.data.ResponseData.Result;
  return busLines;
}

// module.exports = {
//   getBusLines,
//   cleanData,
//   getBusLineCount,
//   getTop10BusLines,
//   getTop10BusLinesData,
//   getDataToReturn,
// };
