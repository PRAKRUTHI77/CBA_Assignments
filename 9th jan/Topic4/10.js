let prices = [20, 50, 10, 90, 5];
let cheapest = prices[0];

for (let price of prices) {
  if (price < cheapest) {
    cheapest = price;
  }
}

console.log("Lowest price is:", cheapest);