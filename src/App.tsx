import { useState, useEffect } from 'react';
import { getBusLines } from './lib/getBusLines';
import BusStops from './components/BusStops';
import Spinner from './UI/spinner.jsx';
import './App.css';

interface BusLine {
  LineNumber: string;
  StopNames: string[];
}
interface BusLinesArray extends Array<BusLine> {}

function App() {
  const [busLines, setBusLines] = useState<BusLinesArray | null>(null);
  const [loader, setLoader] = useState<Boolean>(false);
  const [selectedLine, setSelectedLine] = useState<string[] | null>(null);
  const [lineNumber, setLineNumber] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const data: BusLinesArray = await getBusLines();
        setBusLines(data);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderSelectLine = (lineNumber: string) => {
    setLineNumber(lineNumber);
    const selectedBusLine = busLines?.find(
      (line) => line.LineNumber === lineNumber
    );

    if (selectedBusLine) {
      setSelectedLine([...selectedBusLine.StopNames]);
    }
  };

  return (
    <>
      <h2>Topp 10 listan av SL bussar med flest stopp:</h2>
      {loader && <Spinner />}
      {!loader && busLines && (
        <div className="card">
          {busLines?.map((line, index) => (
            <button
              key={index}
              onClick={() => renderSelectLine(line.LineNumber)}
            >
              Buss: {line.LineNumber}
            </button>
          ))}
          {selectedLine && (
            <BusStops selectedLine={selectedLine} lineNumber={lineNumber} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
