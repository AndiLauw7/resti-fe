// import React from "react";

// const StatCard = ({ title, value, color }) => {
//   // console.log(`${title} value: `, value);
//   return (
//     <div className={`p-4 bg-white shadow-md rounded-xl border-l-4 ${color} `}>
//       <h3 className="text-sm text-gray-500">{title}</h3>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// };

// export default StatCard;
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Category,
  Inventory,
  Payment,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const icons = {
  "Total Kategori": <Category className="text-yellow-500" fontSize="large" />,
  "Total Produk": <Inventory className="text-blue-500" fontSize="large" />,
  "Total Transaksi": <Payment className="text-green-500" fontSize="large" />,
  "Transaksi Sukses": (
    <CheckCircle className="text-green-600" fontSize="large" />
  ),
  "Transaksi Batal": <Cancel className="text-red-500" fontSize="large" />,
};

const StatCard = ({ title, value }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="flex items-center gap-4">
        <div>{icons[title]}</div>
        <div>
          <Typography variant="subtitle2" className="text-gray-500">
            {title}
          </Typography>
          <Typography variant="h6" className="font-bold">
            {value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
