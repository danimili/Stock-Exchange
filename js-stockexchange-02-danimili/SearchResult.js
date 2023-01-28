class SearchResult {
  constructor(element) {
    this.element = element;
  }

  renderResults(companies) {
    this.secondFetching(companies)
  }

  secondFetching(symbol) {
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const profile = data.profile;
        const perc = profile.changesPercentage;
        const roundPerc = (perc * 1).toFixed(2);
        const resultsList = document.createElement("a");
        const result = document.getElementById('results');
        resultsList.href = `/company.html?symbol=${symbol}`;
        let addPercClass = "";
        let op = "";
        if (roundPerc == 0) {
          addPercClass = 'zero-percentage';
        } else if (roundPerc < 0) {
          addPercClass = "negative-percentage";
        } else {
          addPercClass = "positive-percentage";
          op = "+"
        }
        resultsList.innerHTML = `<img src="${profile.image}" onerror= imgError(this)> ${profile.companyName} ( ${symbol} ) <div class=${addPercClass}>${op} ${roundPerc}</div>`;
        result.appendChild(resultsList);
      });
  }
}