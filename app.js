let ddSelect = document.querySelectorAll(".drop-down select");
let fromImg = document.querySelector("#fromImg");
let toImg = document.querySelector("#toImg");
let btn = document.querySelector("form button");
let fromSelect = document.querySelector(".from select");
let toSelect = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let exgImg = document.querySelector("#exgImg");

const apiURL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

for( let select of ddSelect) {
    for(currCode in countryList) {
        newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
    // console.log(select);
}

exgImg.addEventListener("click", () => {
    // console.log(fromSelect.value);
    // console.log(toSelect.value);
    let initialFromSelectValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = initialFromSelectValue;
    updateFlag(fromSelect);
    updateFlag(toSelect);
})

const updateFlag = (element) => {
    // console.log(element.value)
    let currCode = element.value;
    let counCode = countryList[currCode];
    let imgSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
    if(element.name === "from") {
        fromImg.src = imgSrc;
    } else {
        toImg.src = imgSrc;
    }
} 

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let inputElement = document.querySelector(".amount input");
    // console.log(inputElement);
    amount = inputElement.value;
    // console.log(amount);
    let fromCurr = fromSelect.value;
    let toCurr = toSelect.value;

    // console.log("From Curreny : ", fromCurr)
    // console.log("To Curreny : ", toCurr)
    
    let newApiURL = `${apiURL}/${fromCurr.toLowerCase()}.json`;
    let response = await fetch(newApiURL);
    let data = await response.json();
    let rate = data[`${fromCurr.toLowerCase()}`][`${toCurr.toLowerCase()}`];

    let finalAmount = amount*rate;
    msg.innerText = `${amount}${fromCurr} = ${finalAmount}${toCurr}`;
    // console.log(finalAmount);
}



window.addEventListener("load", () => {
    updateExchangeRate();
})
