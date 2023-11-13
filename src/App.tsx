import { useState } from "react";
import "./App.css";

const guests = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

function calculateOccupancy(premiumRooms: any, economyRooms: any) {
  const sortedGuests = [...guests].sort((a, b) => b - a);
  const economyGuestsNumber = guests.filter(v => +v < 100).length

  let premiumOccupancy = 0;
  let economyOccupancy = 0;
  let premiumRevenue = 0;
  let economyRevenue = 0;
  let economyGuests = economyGuestsNumber
  let upgradesLeft = 1

  for (const guest of sortedGuests) {
    if (guest >= 100 && premiumRooms > 0) {
      premiumOccupancy++;
      premiumRevenue += guest;
      premiumRooms--;
    }
    else if (guest < 100) {
      if (economyGuests > economyRooms && upgradesLeft > 0 && premiumRooms > 0) {
        premiumOccupancy++;
        premiumRevenue += guest;
        premiumRooms--;
        economyGuests--;
        upgradesLeft--;
      }
      else if (economyRooms > 0) {
        economyOccupancy++;
        economyRevenue += guest;
        economyRooms--;
        economyGuests--;
      }
    } else {
      continue;
    }
  }
  return {
    premiumOccupancy,
    economyOccupancy,
    premiumRevenue,
    economyRevenue,
  };
}

function App() {
  const [premiumRooms, setPremiumRooms] = useState(0);
  const [economyRooms, setEconomyRooms] = useState(0);
  const [occupancy, setOccupancy] = useState<any>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const result = calculateOccupancy(premiumRooms, economyRooms);
    setOccupancy(result);
  };

  return (
    <div className="root">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Free Premium Rooms:</p>
            <input
              type="number"
              value={premiumRooms}
              onChange={(event) =>
                setPremiumRooms(parseInt(event.target.value, 10))
              }
            />
          </div>
          <br />
          <div>
            <p>Free Economy Rooms:</p>
            <input
              type="number"
              value={economyRooms}
              onChange={(event) =>
                setEconomyRooms(parseInt(event.target.value, 10))
              }
            />
          </div>
          <br />
          <button type="submit">Calculate Occupancy</button>
        </form>
        {occupancy && (
          <div>
            <p>
              Usage Premium: {occupancy.premiumOccupancy} (EUR{" "}
              {occupancy.premiumRevenue})
            </p>
            <p>
              Usage Economy: {occupancy.economyOccupancy} (EUR{" "}
              {occupancy.economyRevenue})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;