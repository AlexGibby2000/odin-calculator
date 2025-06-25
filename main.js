let operator = '';
let previousValue = '';
let currentValue = '';
document.addEventListener("DOMContentLoaded",function(){
    let clear = document.querySelector(".clear");
    let del = document.querySelector(".del");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous") ;
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number)=>number.addEventListener("click",function(e){
        handleNumber(e.target.textContent);
        currentScreen.textContent=currentValue;
    }))

    operators.forEach((op)=>op.addEventListener("click",function(e){
        if(operator===''){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent=currentValue;
        }
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent= currentValue;
        currentScreen.textContent= currentValue;
    })
    del.addEventListener("click",function(){
        if(currentValue.length>0){
            currentValue=currentValue.slice(0,-1);
        }
        currentScreen.textContent=currentValue;
    })

    equal.addEventListener("click",function(){
        if(currentValue !='' && previousValue !=''){
            calculate();
            previousScreen.textContent='';
            if(typeof previousValue==="string"){
                currentScreen.textContent=previousValue;
            }
            else{
                if(previousValue.length<=18){
                    currentScreen.textContent = previousValue;
                } else{
                    currentScreen.textContent =(Number(previousValue).toExponential(8)).toString();
                }
                }
        }
    })

    decimal.addEventListener("click",function(){
        addDecimal();
    })
})

function handleNumber(num){
    if(currentValue.length<=16){
    currentValue+=num;
    }
}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator ==='+'){
        previousValue+=currentValue;
    } else if(operator === '-'){
        previousValue-=currentValue;
    } else if(operator === 'x'){
        previousValue*=currentValue;
    }else{
        previousValue/=currentValue;
    }
    if(!Number.isInteger(previousValue)){
        previousValue = previousValue.toFixed(3);
    }
    console.log(operator);
    console.log(currentValue);
    if(operator==='/'&&currentValue===0){
        previousValue='Divide by Zero Error';
        currentValue=previousValue;
    }
    else{
        previousValue=previousValue.toString();
        currentValue = previousValue.toString();
    }
    console.log(currentValue);
    operator='';
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue+=".";
    }
}