const BASE_URL="https://api.frankfurter.dev/v2/rate";

const dropdowns=document.querySelectorAll(".dropdown select");
const from=document.querySelector(".from-container");
const to=document.querySelector(".to-container");
const btn=document.querySelector("#exbtn");
const msg=document.querySelector(".msg");

let fromCurr=document.querySelector("select");
let toCurr=document.querySelector(".to-container select");

for(let select of dropdowns){
for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    select.append(newOption);
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
    }else if (select.name==="to" && currCode==="BDT"){
        newOption.selected="selected";
    }
}
select.addEventListener("change",(event)=>{
 updateFlag(event.target)
});
}

const updateFlag=(element)=>{
 let currCode=element.value;
 let countryCode=countryList[currCode];
 let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png` ;
 let img=element.parentElement.querySelector("img");
 img.src=newSrc;
}

btn.addEventListener("click",async  (evt)=>{
    evt.preventDefault();
 let amount=document.querySelector("#inamount");
 let amVal=amount.value;
 if(amVal==="" || amVal<1){
    amVal=1;
    amount.value="1";
 }

let URL=`${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
let response= await fetch(URL);
let data= await response.json();
let rates=data.rate;

let fainalVal=amount.value*rates;
msg.innerText=`${amount.value} ${fromCurr.value} = ${fainalVal} ${toCurr.value}`;

})







// fetch("https://open.er-api.com/v6/latest/USD")
//   .then(response => response.json())
//   .then(data => {
//     let bdtRate = data.rates.BDT; 
//     console.log("USD to BDT Rate:", bdtRate);
//   });