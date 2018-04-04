/*
	BitTutor SolverLibrary.js
	--------------------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
	
	This file contains various methods that prove useful in evaluating equations. These methods are called by both PracticeControl and SolverControl objects.
*/

const LEVEL_ONE = 1;
const LEVEL_TWO = 2;
const LEVEL_THREE = 3;
const LEVEL_FOUR = 4;
const LEVEL_FIVE = 5;
const LEVEL_SIX = 6;
const LEVEL_SEVEN = 7;
const LEVEL_EIGHT = 8;

/*
	This method takes a character representing an operator as input and returns its precedence level.
*/

var getPrecedenceLevel = function(inputToken)
{
	switch(inputToken.toString())
	{
		case "(":
			return LEVEL_ONE;
		case "~":
			return LEVEL_EIGHT;
		case "*":
			return LEVEL_THREE;
		case "/":
			return LEVEL_THREE;
		case "+":
			return LEVEL_FOUR;
		case "-":
			return LEVEL_FOUR;
		case "&":
			return LEVEL_FIVE;
		case "^":
			return LEVEL_SIX;
		case "|":
			return LEVEL_SEVEN;
	};
};

/*
	Modifies a stack of operators depending on the precedence level of a given operator. Used in generating postfix equations.
	
	- If the operator is ")", every element from the stack is popped until a corresponding "(" is encountered.
	- Otherwise, operators are popped from the stack until the operator at the top of the stack has lower precedence than the given operator. Afterwards, the given operator is added to the stack.
*/

var determineOperatorPrecedence = function(currentToken, tokenStack)
{
	var poppedOperators = [];
	var operatorToAppend;
	
	if (currentToken.toString() === "(")
	{
		tokenStack.push(currentToken);
	}
	else if (currentToken.toString() === ")")
	{
		while (tokenStack.peek().toString() !== "(")
		{
			operatorToAppend = tokenStack.pop();
			poppedOperators.push(operatorToAppend.toString());
		}
		
		tokenStack.pop();
	}
	else
	{
		while ((!tokenStack.isEmpty()) && (getPrecedenceLevel(currentToken) < getPrecedenceLevel(tokenStack.peek())))
		{
			operatorToAppend = tokenStack.pop();
			poppedOperators.push(operatorToAppend.toString());
		}
		
		tokenStack.push(currentToken);
	}

	return poppedOperators;
};

/*
	Converts a given equation string to postfix notation.
*/

var toPostfix = function(equationString)
{
	var postfixEquation = "";
	var tokenizer = new Tokenizer(equationString);
	var operators = new Stack();
		
	while(tokenizer.hasNext())
	{
		var currentToken = tokenizer.next();
			
		if (currentToken.isOperand())
		{
			postfixEquation += (currentToken.toString() + " ");
		}
		else if (currentToken.isOperator())
		{
			var poppedOperators = determineOperatorPrecedence(currentToken, operators);
			var i;
				
			for(i = 0; i < poppedOperators.length; i++)
			{
				postfixEquation += (poppedOperators[i] + " ");
			}
		}
		else
		{
			throw "ERROR: Unexpected token type";
		}
	}
		
	tokenizer.close();
		
	while(!operators.isEmpty())
	{
		postfixEquation += operators.pop().toString() + " ";
	}
	
	postfixEquation.trim();
	
	return postfixEquation;
};

/*
	This method takes two parameters: A string representing a postfix equation, and a choice of number base.
	The equation is evaluated piece by piece, adding to the total result and storing the steps of each calculation at each step.
	Afterwards, an array containing both the final result of the evaluation and the cumalative steps towards that result is returned.
*/

var evaluate = function(equationString, numberBaseChoice)
{
	var equationComponents = equationString.split(" ");
	var i, j, total, numOne, numTwo;
	var operands = new Stack();
	var numOperators = (equationString.match(/[+-/*&|~^]/g)).length;
	var solutionSteps = [];
	var currentComputation;
	var currentSteps;
	
	if (equationComponents[equationComponents.length - 1] === "")
	{
		equationComponents.splice(equationComponents.length - 1, 1); // Remove trailing space character.
	}
	
	for (i = 0; i < equationComponents.length; i++)
	{
		switch(equationComponents[i])
		{
			case "+":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeSum(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " + " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "-":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeDifference(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " - " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};

				break;
			case "*":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeProduct(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " * " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "/":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeQuotient(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " / " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "~":
				numOne = operands.pop();
				currentComputation = numOne.computeComplement();
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep("~" + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "&":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeAnd(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " & " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "|":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeOr(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " | " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			case "^":
				numOne = operands.pop();
				numTwo = operands.pop();
				currentComputation = numTwo.computeExclusiveOr(numOne);
				
				if (numOperators > 1)
				{
					currentSteps = "";
					
					for (j = 0; j < currentComputation[1].length; j++)
					{
						currentSteps += (currentComputation[1][j]).getMarkup() + "<br />";
					}
					
					solutionSteps.push(new CollapsibleStep(numTwo.getValue() + " ^ " + numOne.getValue() + " = " + currentComputation[0], currentSteps));
				}
				else
				{
					solutionSteps = solutionSteps.concat(currentComputation[1]);
				}
				
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(currentComputation[0]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(currentComputation[0]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(currentComputation[0]));
						break;
					case "Octal":
						operands.push(new OctalOperand(currentComputation[0]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(currentComputation[0]));
						break;
				};
				
				break;
			default:
				switch(numberBaseChoice)
				{
					case "Decimal":
						operands.push(new DecimalOperand(equationComponents[i]));
						break;
					case "Binary":
						operands.push(new BinaryOperand(equationComponents[i]));
						break;
					case "Hexadecimal":
						operands.push(new HexadecimalOperand(equationComponents[i]));
						break;
					case "Octal":
						operands.push(new OctalOperand(equationComponents[i]));
						break;
					case "Binary Coded Decimal":
						operands.push(new BinaryCodedDecimalOperand(equationComponents[i]));
						break;
				};
				
				break;
		};
	}
	
	total = operands.pop();
	
	while (!operands.isEmpty())
	{
		switch(numberBaseChoice)
		{
			case "Decimal":
				total = new DecimalOperand((total.computeSum(operands.pop()))[0]);
				break;
			case "Binary":
				total = new BinaryOperand((total.computeSum(operands.pop()))[0]);
				break;
			case "Hexadecimal":
				total = new HexadecimalOperand((total.computeSum(operands.pop()))[0]);
				break;
			case "Octal":
				total = new OctalOperand((total.computeSum(operands.pop()))[0]);
				break;
			case "Binary Coded Decimal":
				total = new BinaryCodedDecimalOperand((total.computeSum(operands.pop()))[0]);
				break;
		};
	}
	
	return [total.getValue(), solutionSteps];
};