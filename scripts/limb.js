const limbs = ['Right Arm', 'Left Arm', 'Right Leg', 'Left Leg'];

const wheel = document.getElementById("limb-wheel");
const spinBtn = document.getElementById("limb-spin-btn");
const finalValue = document.getElementById("limb-final-value");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  //{minDegree: 0, maxDegree: 45, value: 'Left Arm'},
  {minDegree: 1, maxDegree: 90, value: 'Right Arm'},
  {minDegree: 91, maxDegree: 180, value: 'Left Leg'},
  {minDegree: 181, maxDegree: 270, value: 'Right Leg'},
  {minDegree: 271, maxDegree: 360, value: 'Left Arm'}
];

//Size of each piece
const data = [24, 24, 24, 24];
//background color for each piece
var pieColors = [
  '#ff0000',
  '#00ff00',
  '#ffff00',
  '#0000ff',
];

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: limbs,
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Limb: ${i.value}</p>`;
      console.log(angleValue + ': ' + i.value);
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
