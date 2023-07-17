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
      <h2>SL busslinjer med flest antal stopp:</h2>
      <div className="card">
        {loader && <Spinner />}
        {busLines?.map((line, index) => (
          <button key={index} onClick={() => renderSelectLine(line.LineNumber)}>
            Buss: {line.LineNumber} 
             {/* Stop: {line.StopNames.length} */}
          </button>
        ))}
        {selectedLine && (
          <div> 
            <h3>{lineNumber}</h3>
            <h3>
              Start: {selectedLine[0]} -{' '}
               Slut: {selectedLine[selectedLine.length - 1]}
            </h3>
            <div>
              {selectedLine.map((stop, index) => (
                <p key={index}>{stop}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
