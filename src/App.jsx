import { useState } from "react";
import "./App.css"; // Import CSS file

const initialData = {
  Ring1: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Ring2: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Amulet: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Hat: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Body: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Gloves: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Belts: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Boots: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
  Offhand: { all: 0, fire: 0, cold: 0, light: 0, chaos: 0 },
};

export default function App() {
  const [data, setData] = useState(initialData);

  const handleChange = (e, item, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    setData((prev) => {
      const newData = { ...prev, [item]: { ...prev[item], [type]: value } };
      if (type === "all") {
        newData[item].fire = value;
        newData[item].cold = value;
        newData[item].light = value;
      }
      return newData;
    });
  };

  const totalResistance = Object.keys(initialData.Ring1).reduce((totals, type) => {
    totals[type] = Object.values(data).reduce((sum, item) => sum + item[type], 0);
    return totals;
  }, {});

  return (
    <div className="container">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Type of Equipment</th>
            <th>All Resistance</th>
            <th className="fire">Fire Resistance</th>
            <th className="cold">Cold Resistance</th>
            <th className="light">Lightning Resistance</th>
            <th className="chaos">Chaos Resistance</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((item) => (
            <tr key={item}>
              <td className="equipment-name">{item}</td>
              {Object.keys(data[item]).map((type) => (
                <td key={type} className={`resistance-cell ${type}`}>
                  <input
                    type="number"
                    value={data[item][type]}
                    onChange={(e) => handleChange(e, item, type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            {Object.keys(totalResistance).map((type) => (
              <td key={type} className={`total-cell ${type}`}>
                {totalResistance[type]}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
