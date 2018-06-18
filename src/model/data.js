var Data = [];

for (let i = 0; i < 1000000; i++) {
  Data.push({
    "0": i,
    "1": 12 * i,
    "21": i * 2 * 23,
    "12": i * 3 * 13,
    "31": i * 8 * 2
  });
}

module.exports = Data;
