let dropdown1 = document.getElementsByClassName("dropdown-button")[0];
dropdown1.onclick = () => {
    if (dropdown1.children[0].style.display === "flex") {
        //dropdown.children[0].style.display = "none";
        dropdown1.blur();
    } else {
        dropdown1.children[0].style.display = "flex";
    }
}
dropdown1.onblur = () => {
    dropdown1.children[0].style.display = "none";
}

dropdown1.children[0].onclick = (event) => {
    event.stopPropagation();
}

let dropdown2 = document.getElementsByClassName("dropdown-button")[1];
dropdown2.onclick = () => {
    if (dropdown2.children[0].style.display === "flex") {
        //dropdown.children[0].style.display = "none";
        dropdown2.blur();
    } else {
        dropdown2.children[0].style.display = "flex";
    }
}
dropdown2.onblur = () => {
    dropdown2.children[0].style.display = "none";
}

dropdown2.children[0].onclick = (event) => {
    event.stopPropagation();
}

let data = [];

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").then(
    (res) => {
        if (res.ok) {
            res.json().then(
                (json) => {
                    data = json;
                    data.sort((first, second) => {
                        return first.txt.localeCompare(second.txt, "uk");
                    });
                    let html = "";
                    data.forEach((el, i, arr) => {
                        if (el.cc.toLowerCase()[0] === "x") {
                            el.txt = el.txt + " (в грамах)"
                        }
                        if (el["r030"] != 960) {
                            html = html + `<div class="dropdown-item"><div>${el.txt}</div><div style="margin-left: auto;">${el.cc}</div></div>`
                        }
                    });
                    dropdown1.children[0].innerHTML = html;
                    dropdown2.children[0].innerHTML = html;
                }
            )
        }
    },
    (err) => {
        alert(err)
    }
);

function changeCurrency(){
    
}