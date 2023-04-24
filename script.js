let bmiHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
let labels = JSON.parse(localStorage.getItem("labels")) || [];
let chart;

function calculateBMI() {
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let bmi = weight / ((height / 100) ** 2);
  document.getElementById("bmi").value = bmi.toFixed(2);
  let category = "";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }
  document.getElementById("category").value = category;

  bmiHistory.push(bmi.toFixed(2));
  let currentDate = new Date().toLocaleDateString();
  labels.push(currentDate);
  localStorage.setItem("bmiHistory", JSON.stringify(bmiHistory));
  localStorage.setItem("labels", JSON.stringify(labels));

  if (chart) {
    chart.destroy();
  }

  let canvas = document.getElementById("bmi-chart");
  let ctx = canvas.getContext("2d");
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'BMI',
        data: bmiHistory,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.addEventListener("load", function() {
  if (bmiHistory.length > 0 && labels.length > 0) {
    let canvas = document.getElementById("bmi-chart");
    let ctx = canvas.getContext("2d");
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'BMI',
          data: bmiHistory,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});