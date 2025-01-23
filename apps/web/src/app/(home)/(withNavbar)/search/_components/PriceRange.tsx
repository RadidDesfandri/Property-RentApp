"use client";

import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 0;
const MAX = 5000000;

interface PriceProps{
  onChangePriceRange: (min: number, max:number) =>void
}

const PriceRange: React.FC<PriceProps> = ({onChangePriceRange}) => {
  const [values, setValues] = useState([0, 5000000]);

  const handleChanges = (values: number[]) =>{
    setValues(values)
    onChangePriceRange(values[0], values[1])
  }

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <Range
          values={values}
          step={10000}
          min={MIN}
          max={MAX}
          onChange={handleChanges}  
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded-lg bg-gray-300"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#000", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-4 w-4 rounded-full border bg-white shadow"
            />
          )}
        />
        <div className="mt-2 flex justify-between">
          <span>Rp {values[0].toLocaleString("id-ID")}</span>
          <span>Rp {values[1].toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
