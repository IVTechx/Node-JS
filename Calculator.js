process.stdin.setEncoding("utf8");

console.log("Calculator: enter calcualtion (e.g. 2 + 3)");
console.log(`If you want to stop, type "exit"`);

process.stdin.on("data", (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === "exit") {
    console.log("Goodbye");
    process.exit(0);
  }
  const values = trimmedInput.split(" ");

  if (values.length !== 3) {
    console.log("Invalid number of arguments");
    return;
  }

  const num1 = Number(values[0]);
  const operator = values[1];
  const num2 = Number(values[2]);

  if (isNaN(num1) || isNaN(num2)) {
    console.log("Please enter valid numbers");
    return;
  }

  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        console.log("Can't divide by 0");
        return;
      }
      result = num1 / num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    default: {
      console.log("Unknown operator. Please try +,-,/ or *");
      return;
    }
  }
  console.log(`Result: ${result}`);
});
