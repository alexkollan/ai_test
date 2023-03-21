const brain = require("brain.js");

// const trainingData = [
//   { input: [0, 0], output: [0] },
//   { input: [0, 1], output: [1] },
//   { input: [1, 0], output: [1] },
//   { input: [1, 1], output: [0] },
// ];

const restaurants = {
  Brilliant: "Monday",
  Penny: "Tuesday",
  Right: "Wednesday",
  "The Delusion": "Thursday",
  "Fun Day": "Friday",
  JOHP: "Saturday",
  Owls: "Sunday",
};

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1 },
    output: { [restaurantName]: 1 },
  });
}

// provide optional config object (or undefined). Defaults shown.
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train(trainingData, {
  log: (error) => console.log(error),
});

// const output = net.run({ Monday: 1 }); // [0.987]

// console.log(output);

function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  console.log(result);
  var rating = Math.max(...Object.values(result));
  let highestRestaurantName = Object.keys(result)
    .filter((key) => result[key] == rating)
    .toString();
  return highestRestaurantName;
}

console.log(restaurantForDay("Wednesday"));
