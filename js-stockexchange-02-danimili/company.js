const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

const img = document.getElementById('company-img');
const compName = document.getElementById('company-name');
const role = document.getElementById('company-role');
const price = document.getElementById('price');
const percentage = document.getElementById('percentage');
const description = document.getElementById('company-description');

function companyFetch() {
  const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  fetch(companyUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      img.src = data.profile.image;
      compName.innerHTML = data.profile.companyName;
      compName.href = data.profile.website;
      role.innerHTML = data.profile.sector;
      price.innerHTML = data.profile.price;
      description.innerHTML = data.profile.description;
      const per = data.profile.changesPercentage;
      percentage.innerHTML = (per * 1).toFixed(2);
      if (data.profile.changesPercentage === 0) {
        percentage.style.color = 'black';
      } else if (data.profile.changesPercentage > 0) {
        percentage.style.color = 'green';
        const plus = "+";
        percentage.prepend(plus);
      } else {
        percentage.style.color = 'red';
      }
    })
}
companyFetch()

const datesArray = [];
const closeArray = [];

function getGraph() {
  const historyStockEx = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
  fetch(historyStockEx)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = data.historical.length - 1; i > 0; i--) {
        const dataItem = data.historical[i];
        datesArray.push(dataItem.date);
        closeArray.push(dataItem.close);
      }
      chartBuilder(datesArray, closeArray);
    })
}

function chartBuilder(datesArray, closeArray) {
  const charthtml = document.getElementById("chart");
  new Chart(charthtml, {
    type: "line",
    data: {
      labels: datesArray,
      datasets: [{
        label: 'Stock Price History',
        backgroundColor: 'RoyalBlue',
        borderColor: "rgba(0,0,0,0.1)",
        data: closeArray,
      }]
    },
  });
}

getGraph()