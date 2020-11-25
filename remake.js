let dropdown1 = document.getElementsByClassName("dropdown-button")[0];
dropdown1.onclick = () => {
    if (dropdown1.children[1].style.display === "flex") {
        //dropdown.children[0].style.display = "none";
        dropdown1.blur();
    } else {
        dropdown1.children[1].style.display = "flex";
    }
}
dropdown1.onblur = () => {
    dropdown1.children[1].style.display = "none";
}

dropdown1.children[1].onclick = (event) => {
    event.stopPropagation();
}

let dropdown2 = document.getElementsByClassName("dropdown-button")[1];
dropdown2.onclick = () => {
    if (dropdown2.children[1].style.display === "flex") {
        //dropdown.children[0].style.display = "none";
        dropdown2.blur();
    } else {
        dropdown2.children[1].style.display = "flex";
    }
}
dropdown2.onblur = () => {
    dropdown2.children[1].style.display = "none";
}

dropdown2.children[1].onclick = (event) => {
    event.stopPropagation();
}

let data = [];
function getByCC(query){
    for(currency of data){
        if(currency.cc === query){
            return currency;
        }
    }
    return null;
}

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").then(
    (res) => {
        if (res.ok) {
            res.json().then(
                (json) => {
                    data = json;
                    data.push({
                        cc: "UAH",
                        exchangedate: `${new Date().getDate()}.${new Date().getMonth() + 1}}.${new Date().getFullYear()}`,
                        r030: -1,
                        rate: 1,
                        txt: "Українська гривня"
                    });
                    data.sort((first, second) => {
                        return first.txt.localeCompare(second.txt, "uk");
                    });
                    let html = "";
                    data.forEach((el, i, arr) => {
                        if (el.cc.toLowerCase()[0] === "x") {
                            el.txt = el.txt + " (в грамах)"
                        }
                        if (el["r030"] != 960) {
                            html = html + `<div class="dropdown-item" data-this-currency="${el.cc}" onclick="changeCurrency(this)"><div>${el.txt}</div><div style="margin-left: auto;">${el.cc}</div></div>`
                        }
                    });
                    dropdown1.children[1].innerHTML = html;
                    dropdown2.children[1].innerHTML = html;
                }
            )
        }
    },
    (err) => {
        alert(err)
    }
);

function changeCurrency(elem){
    let parent;
    if(elem.closest(".first")){
        parent = dropdown1;
    }else if(elem.closest(".second")){
        parent = dropdown2;
    }
    parent.blur();
    let currency = getByCC(elem.dataset.thisCurrency);
    parent.dataset.currentCurrency = currency.cc;
    parent.children[0].innerText = `${currency.txt} - ${currency.cc}`;
    countCurrency(parent.parentNode.children[1])
}

function countCurrency(firstInput){
    let secondInput;
    let fromCurrency;
    let toCurrency;

    if(firstInput.closest(".first")){
        secondInput = document.querySelector(".second .money-input");
        fromCurrency = getByCC(dropdown1.dataset.currentCurrency).rate;
        toCurrency = getByCC(dropdown2.dataset.currentCurrency).rate;
    }else if(firstInput.closest(".second")){
        secondInput = document.querySelector(".first .money-input");
        fromCurrency = getByCC(dropdown2.dataset.currentCurrency).rate;
        toCurrency = getByCC(dropdown1.dataset.currentCurrency).rate;
    }

    if(firstInput.value === ""){
        secondInput.value = "";
    }else{
        secondInput.value = Math.round((firstInput.value / toCurrency * fromCurrency) * 100)/100
    }
}