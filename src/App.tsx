import { useState, useEffect } from 'react';
import { getBusLines } from './lib/getBusLines';
import Spinner from './UI/spinner.jsx';
import './App.css';

interface BusLine {
  LineNumber: string;
  StopNames: string;
}
interface BusLinesArray extends Array<BusLine> {}

function App() {
  const [busLines, setBusLines] = useState<BusLinesArray | null>(null);
  const [loader, setLoader] = useState<Boolean>(false);
  const [selectedLine, setSelectedLine] = useState<string[] | null>(null);
  const [lineNumber, setLineNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const data: any = await getBusLines();
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
      <h1>10 buses in SL with the most stops</h1>
      <div className="card">
        {loader && <Spinner />}
        {busLines?.map((line, index) => (
          <button key={index} onClick={() => renderSelectLine(line.LineNumber)}>
            BussNummer: {line.LineNumber} Stop: {line.StopNames[0]}
          </button>
        ))}
        {selectedLine && (
          <div>
            <h2>
              Vald buslinje: {lineNumber} {selectedLine[0]} -{' '}
              {selectedLine[selectedLine.length - 1]}
            </h2>
            <ul>
              {selectedLine.map((stop, index) => (
                <li key={index}>{stop}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
