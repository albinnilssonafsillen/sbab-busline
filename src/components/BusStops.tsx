import '../App.css';
import './BusStops.css';

interface BusStopsProps {
  selectedLine: string[];
  lineNumber: string;
}

const BusStops: React.FC<BusStopsProps> = ({ selectedLine, lineNumber }) => {
  return (
    <div>
      <div id="busInfo">
        <p id="selectedBus">
          Buss: {lineNumber} - Antal stopp: {selectedLine.length}
        </p>
        <p id="selectedBus">
          Start: {selectedLine[0]} - Slut:{' '}
          {selectedLine[selectedLine.length - 1]}
        </p>
      </div>
      <div id="busStops">
        {selectedLine.map((stop, index) => (
          <p key={index}>{stop}</p>
        ))}
      </div>
    </div>
  );
};

export default BusStops;
