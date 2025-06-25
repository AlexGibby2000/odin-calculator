let operator = '';
let previousValue = '';
let currentValue = '';
document.addEventListener("DOMContentLoaded",function(){
    let clear = document.querySelector(".clear");
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
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent=currentValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent= currentValue;
        currentScreen.textContent= currentValue;
    })

    equal.addEventListener("click",function(){
        if(currentValue !='' && previousValue !=''){
            calculate();
            previousScreen.textContent='';
            console.log(previousValue.length);
            if(previousValue.length<=18){
                currentScreen.textContent = previousValue;
            } else{
                currentScreen.textContent =(Number(previousValue).toExponential(8)).toString();
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
    console.log(previousValue);
    console.log(currentValue);

    if(operator ==='+'){
        previousValue+=currentValue;
    } else if(operator === '-'){
        previousValue-=currentValue;
    } else if(operator === 'x'){
        previousValue*=currentValue;
    }else{
        previousValue/=currentValue;
    }
    previousValue = previousValue.toFixed(3);
    previousValue=previousValue.toString();
    currentValue = previousValue.toString();
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue+=".";
    }
}