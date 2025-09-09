let searchInputElement = document.getElementById("searchInput");
let searchResultCon = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");



function createAndAppendSearchResult(result) {

    let {
        title,
        link,
        description
    } = result;
    //divconatinerfor resultitem
    let resultContainerEl = document.createElement("div");
    resultContainerEl.classList.add("result-item")
    searchResultCon.appendChild(resultContainerEl);
    //anchorelementfor result-title

    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("resultTitleEle");
    resultTitleEle.textContent = title;
    resultTitleEle.href = link;
    resultTitleEle.target = "_blank";
    searchResultCon.appendChild(resultTitleEle);

    //break-element
    let lineBreakEl = document.createElement("br");
    searchResultCon.appendChild(lineBreakEl);

    //url-element
    let UrlEl = document.createElement("a");
    UrlEl.classList.add("result-url");
    UrlEl.href = link;
    UrlEl.target = "_blank";
    UrlEl.textContent = link;
    searchResultCon.appendChild(UrlEl);
    //linebreak
    let lineBreak = document.createElement("br");
    searchResultCon.appendChild(lineBreak);

    //description

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    searchResultCon.appendChild(descriptionEl);








}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultCon.textContent = " ";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",


        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })

    }

}

searchInputElement.addEventListener("keydown", searchWikipedia);
