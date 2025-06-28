let input = document.getElementById("input");
let mode = 'deg';
let previousans = "";

function toRadians(deg) {
    return deg * (Math.PI / 180);
}
function log10(x) {
    return Math.log(x) / Math.LN10;
}

function ClearAll() {
    input.value = "";
}
function display(y) {
    input.value += y;
}
function previous() {
    input.value += previousans;
}
function setmode(SelectedMode) {
    mode = SelectedMode;
    document.getElementById('degbtn').classList.toggle("active", mode === "deg");
    document.getElementById('radbtn').classList.toggle("active", mode === "rad");
}

function calculate() {
    let expression = input.value; 
    if (mode === 'deg') {
        expression = expression.replace(/sin\(/g, "sinDeg(");
        expression = expression.replace(/cos\(/g, "cosDeg(");
        expression = expression.replace(/tan\(/g, "tanDeg(");
    } else {
        expression = expression.replace(/sin\(/g, "Math.sin(");
        expression = expression.replace(/cos\(/g, "Math.cos(");
        expression = expression.replace(/tan\(/g, "Math.tan(");
    }

    expression = expression.replace(/ln\(/g, "Math.log(");
    expression = expression.replace(/log\(/g, "log10("); 
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
    expression = expression.replace(/exp\(/g, "Math.exp(");
    expression = expression.replace(/\bPI\b/g, "Math.PI");
    expression = expression.replace(/\be\b/g, "Math.E");
    expression = expression.replace(/(\d+)%/g, "($1/100)");

    try {
    
        const sinDeg = x => Math.sin(toRadians(x));
        const cosDeg = x => Math.cos(toRadians(x));
        const tanDeg = x => Math.tan(toRadians(x));

        let result = eval(expression);
        if (result === undefined || isNaN(result)) throw "Invalid";
        previousans = result;
        input.value = result;
    } catch (err) {
        input.value = "Error";
    }
}

