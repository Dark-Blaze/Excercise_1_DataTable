var Data = {
  columns: ["Locn_Nrb", "online_ord_Id", "KSN_Id", "SKU_Pro_Type_Cd"],
  tableData: []
};

for (let i = 0; i < 100000; i++) {
  Data.tableData.push({
    "1": i,
    "21": 24234,
    "12": 24234,
    "31": 24234
  });
}

module.exports = Data;
