//Author: Nate Sims
//Version: 1.0

(function() { //encapsulate all logic into an anon IIFE to prevent root global variables
    let returnElement = function(element) { //function that returns the HTML element passed in
        return document.getElementsByClassName(element);
    }
    let getNumbers = returnElement("number"), //all variables used for the app
        getResult = returnElement("result"),
        getOperator = returnElement("operator"),
        getEquals = returnElement("equals"),
        getClear = returnElement("clear"),
        getnegPos = returnElement("negpos"),
        getPercent = returnElement("percent"),
        currentNum = "",
        previousNum = "",
        resultNum,
        operator;

    let insertNumber = function() { //runs when number buttons are clicked. appends each number clicked to the result container
        if (resultNum) { //if there is already a previous result then clear it and insert the current number clicked into the result container
            currentNum = this.innerHTML;
            getResult[0].innerHTML = currentNum;
            resultNum = "";
        } else { //otherwise continue to concatenate all numbers clicked
            currentNum += this.innerHTML;
            getResult[0].innerHTML = currentNum;
        }
    }
    let storeNum = function() { //runs when one of the operator buttons is clicked (i.e. multiply, subtract, etc)
            previousNum = currentNum; //save the previous input
            currentNum = ""; //the new input is now empty and ready for new values
            operator = this.innerHTML; //set the operator variable to the last operator clicked. this determines the result when the equal button is clicked.
        }
        //the below functions run (when equal button is clicked) according to which operator was last clicked
    let add = function(prev, cur) {
        return prev + cur;
    }
    let subtract = function(prev, cur) {
        return prev - cur;
    }
    let times = function(prev, cur) {
        return prev * cur;
    }
    let divide = function(prev, cur) {
        return prev / cur;
    }
    let displayResult = function() { //runs when equal button is clicked
        let parsePrev = parseFloat(previousNum); //previousNum and currentNum have been strings up until this point. convert them to numbers so we can perform math.
        let parseCurrent = parseFloat(currentNum);
        switch (operator) { //perform the operations on previous and current num based on the value of the operator last clicked.
            case "+":
                resultNum = add(parsePrev, parseCurrent);
                break;
            case "-":
                resultNum = subtract(parsePrev, parseCurrent);
                break;
            case "x":
                resultNum = times(parsePrev, parseCurrent);
                break;
            case "÷":
                resultNum = divide(parsePrev, parseCurrent);
                break;
            default:
                resultNum = currentNum;
        }
        getResult[0].innerHTML = resultNum; //whichever operation was performed on the inputs, set that result to the result container
        currentNum = resultNum; //the result is now the current number
    }
    let resetResult = function() { //runs when clear button is clicked. previous and current num are now empty strings. and the result container is set to 0.
        previousNum = "";
        currentNum = "";
        getResult[0].innerHTML = 0;
    }
    let invertResult = function() { //runs when +/- button is clicked. inverts the value of the current number in the result container
        currentNum *= -1;
        getResult[0].innerHTML = currentNum; //update the display

    }
    let convertToPercentage = function() { //runs when the % button is clicked. whichever number is in the result container is converted to a percentage by division of 100
            currentNum /= 100;
            getResult[0].innerHTML = currentNum; //update the display
        }
        //all of the event handlers for buttons clicked. elements are accessed at index 0 because they are part of an HTMLCollection
    for (let i = 0; i < getNumbers.length; i++) {
        getNumbers[i].onclick = insertNumber;
    }
    for (let i = 0; i < getOperator.length; i++) {
        getOperator[i].onclick = storeNum;
    }
    getEquals[0].onclick = displayResult;
    getClear[0].onclick = resetResult;
    getnegPos[0].onclick = invertResult;
    getPercent[0].onclick = convertToPercentage;
}());