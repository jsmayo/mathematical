function add(result,a) {
	return result + a;
}

function mult(result,a) {
	return result * a;
}

function divide(result,a) {
	if(a === 0) alert("Div by zero is not allowed");
	else {
		return result/a;
	}
}

function subtr(result,a) {
	return result - a;
}

function checkOperation(res,op,a_num){
	if(oper === "/") result = divide(res,a_num);
	else if(oper === "*") result = mult(res,a_num);
	else if(oper === "-") result = subtr(res,a_num);
	else if(oper === "+") result = add(res,a_num);
	$("#screen").text(result);
    // make a = result, to allow user to perform chained operations.
    // if not, issue occurs when else statement rewrites result to parseInt(0) .. since a was reset prior
    a = result;
}

var a = "";
var oper = "";
var sign = 1;
var result = 0;

$(".keypad").on("click", function() {
    //if a number => build string => display => parse it
    if ($(this).hasClass("col keypad num")) {
    	a += this.textContent;
    	$("#screen").text(a);
    } else if ($(this).hasClass("col keypad inverse")) {
        // inverse sign key is pressed after inputting number
        a *= -1;
        $("#screen").text(a);
    } else if ($(this).hasClass("col keypad equals")) {
    	a = parseInt(a);
    	checkOperation(result, oper, a);
    } else {
        // parse the first input
        result = parseInt(a)
        oper = this.innerText;
        //handle special cases for clear, del, and clear all
        if (oper === "CE") {
        	result = 0;
        	a = "";
        	$("#screen").text(a);
        } else if (oper === "DEL") {
            // if delete, modify result and assign back to A.
            //strip off last digit
            a = Math.floor(result / 10);
            $("#screen").text(a.toString());
        } else if (oper === "C") {
            //if C, undo the last operation and reset a.
            result += -1 * parseInt(a);
            a = "";
            $("#screen").text(a);
        } else {
            // else '/*-+' was input. Result was updated, just reset a to get another number.
            a = "";
        }
    }
});
