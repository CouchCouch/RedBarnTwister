const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White', 'Pink', 'Brown'];

const colorWheel = document.getElementById("color-wheel");
const colorSpinBtn = document.getElementById("color-spin-btn");
const colorFinalValue = document.getElementById("color-final-value");

//Object that stores values of minimum and maximum angle for a value
const colorRotationValues = [
  {minDegree: 0, maxDegree: 18, value: 'Yellow'},
  {minDegree: 19, maxDegree: 54, value: 'Orange'},
  {minDegree: 55, maxDegree: 90, value: 'Red'},
  {minDegree: 91, maxDegree: 126, value: 'Brown'},
  {minDegree: 127, maxDegree: 162, value: 'Pink'},
  {minDegree: 163, maxDegree: 198, value: 'White'},
  {minDegree: 199, maxDegree: 234, value: 'Black'},
  {minDegree: 235, maxDegree: 270, value: 'Purple'},
  {minDegree: 271, maxDegree: 306, value: 'Blue'},
  {minDegree: 307, maxDegree: 342, value: 'Green'},
  {minDegree: 343, maxDegree: 360, value: 'Yellow'}
];

//Size of each piece
const colorRotationData = [24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
//background color for each piece
var colorPieColors = [
  '#ff0000',
  '#ff8000',
  '#ffff00',
  '#00ff00',
  '#0000ff',
  '#6600cc',
  '#000000',
  '#ffffff',
  '#ff33cc',
  '#996633',
];

//Create chart
let colorChart = new Chart(colorWheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: colors,
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: colorPieColors,
        data: colorRotationData,
      },
    ],
  },
  options: {
    //Responsive chart
    //responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#00000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});

//display value based on the randomAngle
const colorValueGenerator = (angleValue) => {
  for (let i of colorRotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      colorFinalValue.innerHTML = `<p>Color: ${i.value}</p>`;
      console.log(angleValue + ': ' + i.value);
      colorSpinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let colorCount = 0;
//100 rotations for animation and last rotation for result
let colorResultValue = 101;
//Start spinning
colorSpinBtn.addEventListener("click", () => {
  colorSpinBtn.disabled = true;
  //Empty final value
  colorFinalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set colorResultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every colorCount. Eventually on last rotation we rotate by 1 degree at a time.
    */
    colorChart.options.rotation = colorChart.options.rotation + colorResultValue;
    //Update chart with new value;
    colorChart.update();
    //If rotation>360 reset it back to 0
    if (colorChart.options.rotation >= 360) {
      colorCount += 1;
      colorResultValue -= 5;
      colorChart.options.rotation = 0;
    } else if (colorCount > 15 && colorChart.options.rotation == randomDegree) {
      colorValueGenerator(randomDegree);
      clearInterval(rotationInterval);
      colorCount = 0;
      colorResultValue = 101;
    }
  }, 10);
});
