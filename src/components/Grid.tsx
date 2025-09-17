import { Pair } from "@/types";  // This now exists
import React from "react";

interface GridProps {
  data: Pair[];
}

const Grid: React.FC<GridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((p) => (
        <div key={p.symbol} className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
          <div className="font-semibold text-sm">{p.symbol}</div>
          <div className="flex justify-between mt-1 text-xs sm:text-sm">
            <span className="text-green-600">Bid: {p.bid}</span>
            <span className="text-red-600">Ask: {p.ask}</span>
          </div>
          <div className="mt-1 text-gray-500 text-[10px] sm:text-xs">Spread: {p.spread}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;

