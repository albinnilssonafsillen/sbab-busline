import axios from 'axios';

export async function getBusLines() {
  try {
    const busLines = await getAllBusLines();

    const stops = await getBusStops();

    addData(busLines, stops);

    const cleanedData = cleanData(busLines);

    //REMOVE DUPLICATES WHEN THEY HAVE THE SAME DIRECTION CODE, LINENUMBER AND STOPNAME
    // removeDuplicatesIfSameLineNumberAndStopName(cleanedData);

    const busLineCounts = getBusLineCount(cleanedData);

    const top10BusLines = getTop10BusLines(busLineCounts);

    const filteredData = sortBusLines(
      cleanedData,
      top10BusLines,
      busLineCounts
    );

    console.log(filteredData);

    return filteredData;
  } catch (error) {
    throw new Error(`An Error occurred in [getBusLines] Error: ${error}`);
  }
}

function sortBusLines(cleanedData, top10BusLines, busLineCounts) {
  const filteredData = cleanedData.filter((line) =>
    top10BusLines.includes(line.LineNumber)
  );

  filteredData.sort(
    (a, b) => busLineCounts[b.LineNumber] - busLineCounts[a.LineNumber]
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
  const busLinesWithoutDuplicates = busLines.filter(
    (line) => line.DirectionCode === '1'
  );

  const removeIfStopPointNameisUndefined = busLinesWithoutDuplicates.filter(
    (busLine) => busLine.StopName !== undefined
  );
  return removeIfStopPointNameisUndefined;
}

function addData(busLines, stops) {
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

function removeDuplicatesIfSameLineNumberAndStopName(
  busLinesWithoutDuplicates
) {
  const filteredDataBusStops = busLinesWithoutDuplicates.filter(
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

  console.log(
    'Removed if StopName & Linenumbers are the same =>',
    filteredDataBusStops
  );
}
