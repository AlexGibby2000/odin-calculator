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
    }));

    operators.forEach((op)=>op.addEventListener("click",function(e){
        if(operator===''){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent=currentValue;
        }
    }));

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent= currentValue;
        currentScreen.textContent= currentValue;
    });
    del.addEventListener("click",function(){
        if(currentValue.length>0){
            currentValue=currentValue.slice(0,-1);
        }
        currentScreen.textContent=currentValue;
    });

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
    });

    decimal.addEventListener("click",function(){
        addDecimal();
    });

    window.addEventListener("keydown",function(e){
        switch(e.key){
            case "0":
                handleNumber("0");
                currentScreen.textContent=currentValue;
                break;
            case "1":
                handleNumber("1");
                currentScreen.textContent=currentValue;
                break;
            case "2":
                handleNumber("2");
                currentScreen.textContent=currentValue;
                break;
            case "3":
                handleNumber("3");
                currentScreen.textContent=currentValue;
                break;    
            case "4":
                handleNumber("4");
                currentScreen.textContent=currentValue;
                break;
            case "5":
                handleNumber("5");
                currentScreen.textContent=currentValue;
                break;
            case "6":
                handleNumber("6");
                currentScreen.textContent=currentValue;
                break;
            case "7":
                handleNumber("7");
                currentScreen.textContent=currentValue;
                break;
            case "8":
                handleNumber("8");
                currentScreen.textContent=currentValue;
                break;
            case "9":
                handleNumber("9");
                currentScreen.textContent=currentValue;
                break;
            case "/":
                if(operator===''){
                    handleOperator('/');
                    previousScreen.textContent = previousValue + " " + operator;
                    currentScreen.textContent=currentValue;
                    }
                break;
            case "*":
            case "x":
                if(operator===''){
                    handleOperator('x');
                    previousScreen.textContent = previousValue + " " + operator;
                    currentScreen.textContent=currentValue;
                    }
                break;
            case "-":
                if(operator===''){
                    handleOperator('-');
                    previousScreen.textContent = previousValue + " " + operator;
                    currentScreen.textContent=currentValue;
                    }
                break;
            case "+":
                if(operator===''){
                    handleOperator('+');
                    previousScreen.textContent = previousValue + " " + operator;
                    currentScreen.textContent=currentValue;
                    }
                break;
            case ".":
                addDecimal();
                break;
            case "Enter":
            case "=":
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
                break;
            case "Backspace":
                if(currentValue.length>0){
                    currentValue=currentValue.slice(0,-1);
                }
                currentScreen.textContent=currentValue;
        }
    });
});

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
    if(operator==='/'&&currentValue===0){
        previousValue='Divide by Zero Error';
        currentValue=previousValue;
    }
    else{
        previousValue=previousValue.toString();
        currentValue = previousValue.toString();
    }
    operator='';
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue+=".";
    }
}