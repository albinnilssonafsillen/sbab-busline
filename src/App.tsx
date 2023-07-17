import { useState, useEffect } from 'react';
import { getBusLines } from './lib/getBusLines';
import Spinner from './UI/spinner.jsx';
import './App.css';

interface BusLine {
  LineNumber: string;
  StopName: string;
}
interface BusLinesArray extends Array<BusLine> {}

function App() {
  const [busLines, setBusLines] = useState<BusLinesArray | null>(null);
  const [loader, setLoader] = useState<Boolean>(false);

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

  return (
    <>
      <h1>10 buses in SL with the most stops</h1>
      <div className="card">
        {loader && <Spinner />}

        {busLines?.map((line, index) => (
          <div key={index}>
            BussNummer: {line.LineNumber} Stop: {line.StopName}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
