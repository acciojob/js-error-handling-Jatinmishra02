//your code here
// Define custom error classes
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of operators');
    this.name = this.constructor.name;
  }
}

// Function to evaluate input string
function evalString(expression) {
  // Check for invalid operators
  if (/[\+\-\*\/]{2,}/.test(expression)) {
    throw new InvalidExprError();
  }

  // Check for invalid starting and ending operators
  if (/^[\+\*\/]/.test(expression)) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }

  if (/[\+\*\/\-]$/.test(expression)) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }

  // Check for invalid characters
  if (!/^[\d\s\+\-\*\/]+$/.test(expression)) {
    throw new OutOfRangeError(expression);
  }

  // Evaluate expression
  return eval(expression);
}

// Test the function with try-catch block
try {
  const result = evalString("10 + 5");
  console.log(result);
} catch (error) {
  console.error(error.name + ':', error.message);
}
