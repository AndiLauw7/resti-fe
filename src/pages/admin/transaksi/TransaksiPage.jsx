/* eslint-disable no-unused-vars */
import React from "react";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { TransaksiTable } from "./TransaksiTable";
import { TransaksiContext } from "../../../context/TransaksiContext";
import { TransaksiDetailModal } from "./TransaksiDetailModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const TransaksiPage = () => {
  const {
    transaksiList,
    setTransaksiList,
    selectedTransaksi,
    setSelectedTransaksi,
    fetchTransaksiById,
    fetchTransaksiData,
    removeTransaksi,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(TransaksiContext);
  const [openDetail, setOpenDetail] = useState(false);

  const handleDetail = async (id) => {
    await fetchTransaksiById(id);
    setOpenDetail(true);
  };
  const handleDelete = async (id) => {
    await removeTransaksi(id);
  };

  const handleClose = () => {
    setOpenDetail(false);
    setSelectedTransaksi(null);
  };
  return (
    <div className="p-6" style={{ height: "90vh", overflow: "hidden" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Transaksi</h1>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Tanggal Awal"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            maxDate={new Date()}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "0.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  sx: { fontSize: "0.8rem" },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Tanggal Akhir"
            value={endDate}
            // maxDate={new Date()}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="success"
          onClick={() => fetchTransaksiData(startDate, endDate)}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!startDate || !endDate) {
              alert("Silakan pilih tanggal awal dan akhir");
              return;
            }

            const formatDate = (date) =>
              date ? new Date(date).toISOString().split("T")[0] : "";

            const sDate = formatDate(startDate);
            const eDate = formatDate(endDate);

            const url = `http://localhost:5000/api/v1/transaksi/cetak-laporan-transaksi?startDate=${sDate}&endDate=${eDate}`;
            window.open(url, "_blank");
          }}
        >
          Cetak Transaksi
        </Button>
      </div>
      <div style={{ height: "75vh", overflow: "auto" }}>
        <TransaksiTable
          transaksiList={transaksiList}
          handleDetail={handleDetail}
          handleDelete={handleDelete}
        />
      </div>
      {selectedTransaksi && (
        <TransaksiDetailModal
          open={openDetail}
          handleClose={handleClose}
          transaksi={selectedTransaksi}
        />
      )}
    </div>
  );
};
