class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expression) {
  try {
    // Check for invalid characters
    if (/[^0-9+\-*/\s]/.test(expression)) {
      const invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
      throw new OutOfRangeError(invalidChar);
    }

    // Check for invalid operator combinations
    if (/[+\-*/]{2,}/.test(expression.replace(/\s+/g, ''))) {
      throw new InvalidExprError();
    }

    // Check for invalid starting operator
    if (/^[+\-*/]/.test(expression.trim())) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check for invalid ending operator
    if (/[+\-*/-]$/.test(expression.trim())) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Evaluate the expression
    return eval(expression);
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError || error instanceof SyntaxError) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred");
    }
  }
}

// Sample expressions to test the function
console.log(evalString("3 + 5 * 2")); // Should work and print 13
console.log(evalString("3 ++ 5 * 2")); // Should throw InvalidExprError
console.log(evalString("+3 + 5 * 2")); // Should throw SyntaxError for starting with an invalid operator
console.log(evalString("3 + 5 * 2 -")); // Should throw SyntaxError for ending with an invalid operator
console.log(evalString("3 + 5 * 2 a")); // Should throw OutOfRangeError for invalid character
