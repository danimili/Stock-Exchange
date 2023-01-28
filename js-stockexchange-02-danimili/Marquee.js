class Marquee {
  constructor(domElement) {
    this.domElement = domElement;
  }

  load() {
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < data.length; (i += 100)) {
          const percentageChange = data[i].changesPercentage;
          const roundPercentage = percentageChange.toFixed(2);
          let percentageClass = "";
          let op = "";
          if (roundPercentage === 0) {
            percentageClass = "zero-percentage";
          } else if (roundPercentage > 0) {
            percentageClass = "positive-percentage";
            op = "+";
          } else {
            percentageClass = "negative-percentage";
          }
          this.domElement.innerHTML += `<li>${data[i].symbol} &nbsp <span class=${percentageClass}>${op}${roundPercentage}%</span></li>`;
        }
      })
  }
}