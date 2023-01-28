class SearchForm {
  constructor(form) {
    this.form = form;
    this.HTMLElements();
    this.button();
  }

  onSearch(callback) {
    this.fetching = callback
  }

  HTMLElements() {
    const forms = document.getElementById('form');
    forms.innerHTML = `<input id="input-search" type="text" placeholder="Search.." name="search">
<button id="search-button" type="button"><i class="fa fa-search"></i></button>
<div class="spinner-border" role="status" id="spinner"></div>`;
  }

  button() {
    const btn = document.getElementById('search-button');
    const form = document.getElementById("form");
    btn.addEventListener("click", this.searchResult.bind(this));
    form.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        btn.click();
      }
    });
  }

  showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.classList.add('show');
  }

  hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('show');
  }

  async searchResult() {
    this.showSpinner()
    const input = document.getElementById('input-search');
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`
    let response = await fetch(url);
    let data = await response.json();
    const results = document.getElementById("results");
    results.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const resultItem = data[i];
      this.fetching(resultItem.symbol)
    }
    this.hideSpinner()
  }
}