import React from "react";

const StatCard = ({ title, value, color }) => {
  // console.log(`${title} value: `, value);
  return (
    <div className={`p-4 bg-white shadow-md rounded-xl border-l-4 ${color} `}>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
