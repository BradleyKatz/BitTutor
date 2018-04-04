/*
	BitTutor Operand.js
	-------------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
*/

var isNumeric = function(number) // Returns whether or not a number is numeric.
{
    return !isNaN(parseFloat(number)) && isFinite(number);
};

var isDecimal = function(number) // Returns whether or not a given number meets the criteria for being a decimal number.
{
	var decimalRegExp = new RegExp("[^0-9]");
	
	return !isNaN(parseFloat(number)) && isFinite(number) && (!decimalRegExp.test(number));
};

var isBinary = function(number) // Returns whether or not a given number meets the criteria for being a binary number.
{
	var binaryRegExp = new RegExp("[^0-1]");
	
	return !isNaN(parseFloat(number)) && isFinite(parseFloat(number)) && (!binaryRegExp.test(number));
};

var isOctal = function(number) // Returns whether or not a given number meets the criteria for being an octal number.
{
	var octalRegExp = new RegExp("[^0-8]");
	
	return !isNaN(parseFloat(number)) && isFinite(parseFloat(number)) && (!octalRegExp.test(number));
};

var isHexadecimal = function(number) // Returns whether or not a given number meets the criteria for being a hexadecimal number.
{
	var hexadecimalRegExp = new RegExp("[^0-9A-F]");
	
	return !hexadecimalRegExp.test(number);
};

var isBinaryCodedDecimal = function(number) // Returns whether or not a given number meets the criteria for being a BCD number.
{
	var bcdRegExp = new RegExp("[^0-1]");
	
	var bcdChunks = number.match(/.{1,4}/g);
	var i, currentSet;
	
	for (i = 0; i < bcdChunks.length; i++)
	{
		currentSet = bcdChunks[i];
		
		if (parseInt(currentSet, 2) > 9)
		{
			return false; // No individual set of 4 bits can be greater than 9.
		}
	}
	
	return !isNaN(parseFloat(number)) && isFinite(parseFloat(number)) && (!bcdRegExp.test(number)) && ((number.length % 4) === 0);
};

var decimalToBinary = function(decimalNumber) // Quickly converts a decimal number to a binary string (without steps)
{
	return (decimalNumber >>> 0).toString(2);
};

/*
	DecimalOperand class
	--------------------
*/

var DecimalOperand = function(inputValue)
{
	var value = null;
	
	if (isDecimal(inputValue))
	{
		value = String(inputValue);
	}
	else
	{
		throw "ERROR: Decimal operands must be numeric values consisting of digits ranging from 0 to 9!";
	}
	
	this.getValue = function(){return value;};
	
	this.setValue = function(newValue)
	{
		if (isDecimal(inputValue))
		{
			value = String(inputValue);
		}
		else
		{
			throw "ERROR: Decimal operands must be numeric values consisting of digits ranging from 0 to 9!";
		}
	};
};

DecimalOperand.prototype.convertToBinary = function() // Converts a decimal number to binary and generates a list of steps to follow in order to reach the result of the conversion.
{
	var binaryRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "It is possible to convert decimal numbers to binary numbers through the use of the repreated division by 2 method.<br />Continuously divide the decimal number by 2 until the whole number quotient is 0.<br />The remainder of each division represents a bit in the binary number.";
	solutionSteps.push(new Step(currentStep));
	
	var quotient = parseInt(this.getValue());
	var remainder;
	
	while (quotient > 0)
	{
		remainder = quotient % 2;
		binaryRepresentation = String(remainder) + binaryRepresentation;
		
		currentStep = quotient + " / 2 = " + Math.floor(quotient / 2) + ", R = " + remainder;
		solutionSteps.push(new Step(currentStep));
		
		quotient = Math.floor(quotient / 2);
	}
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + binaryRepresentation + " in binary.";
	solutionSteps.push(new Step(currentStep));
	
	return [binaryRepresentation, solutionSteps];
};

DecimalOperand.prototype.convertToHexadecimal = function() // Converts a decimal number to hexadecimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var hexadecimalRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "It is possible to convert decimal numbers to hexadecimal numbers through the use of the repreated division by 16 method.<br />Continuously divide the decimal number by 16 until the whole number quotient is 0.<br />The remainder of each division represents a bit in the binary number.";
	solutionSteps.push(new Step(currentStep));
	
	var quotient = parseInt(this.getValue());
	var remainder;
	
	while (quotient > 0)
	{
		remainder = quotient % 16;
		hexadecimalRepresentation = (remainder.toString(16)).toUpperCase() + hexadecimalRepresentation;
		
		currentStep = quotient + " / 16 = " + Math.floor(quotient / 16) + ", R = " + quotient % 16;
		
		if ((quotient % 16) >= 10)
		{
			currentStep += " = " + (remainder.toString(16)).toUpperCase();
		}
		
		solutionSteps.push(new Step(currentStep));
		
		quotient = Math.floor(quotient / 16);
	}
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + hexadecimalRepresentation + " in hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation, solutionSteps];
};

DecimalOperand.prototype.convertToOctal = function() // Converts a decimal number to octal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var octalRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "It is possible to convert decimal numbers to octal numbers through the use of the repreated division by 8 method.<br />Continuously divide the decimal number by 8 until the whole number quotient is 0.<br />The remainder of each division represents a bit in the binary number.";
	solutionSteps.push(new Step(currentStep));
	
	var quotient = parseInt(this.getValue());
	var remainder;
	
	while (quotient > 0)
	{
		remainder = quotient % 8;
		octalRepresentation = String(remainder) + octalRepresentation;
		
		currentStep = quotient + " / 8 = " + Math.floor(quotient / 8) + ", R = " + remainder;
		solutionSteps.push(new Step(currentStep));
		
		quotient = Math.floor(quotient / 8);
	}
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + octalRepresentation + " in octal.";
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation, solutionSteps];
};

DecimalOperand.prototype.convertToBinaryCodedDecimal = function() // Converts a decimal number to BCD and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var bcdRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "Every decimal digit can be represented with a four digit binary number. To convert a decimal number to binary coded decimal, simply swap out each digit with its respective four digit binary counterpart.<br />For example, 8 is equivalent to 1000 in BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var currentDigit;
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		currentDigit = valueToConvert.charAt(i);
		
		switch (currentDigit)
		{
			case "0":
				bcdRepresentation += "0000";
				currentStep = currentDigit + " is equivalent to 0000.";
				break;
			case "1":
				bcdRepresentation += "0001";
				currentStep = currentDigit + " is equivalent to 0001.";
				break;
			case "2":
				bcdRepresentation += "0010";
				currentStep = currentDigit + " is equivalent to 0010.";
				break;
			case "3":
				bcdRepresentation += "0011";
				currentStep = currentDigit + " is equivalent to 0011.";
				break;
			case "4":
				bcdRepresentation += "0100";
				currentStep = currentDigit + " is equivalent to 0100.";
				break;
			case "5":
				bcdRepresentation += "0101";
				currentStep = currentDigit + " is equivalent to 0101.";
				break;
			case "6":
				bcdRepresentation += "0110";
				currentStep = currentDigit + " is equivalent to 0110.";
				break;
			case "7":
				bcdRepresentation += "0111";
				currentStep = currentDigit + " is equivalent to 0111.";
				break;
			case "8":
				bcdRepresentation += "1000";
				currentStep = currentDigit + " is equivalent to 1000.";
				break;
			case "9":
				bcdRepresentation += "1001";
				currentStep = currentDigit + " is equivalent to 1001.";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + bcdRepresentation + " in BCD.";
	solutionSteps.push(new Step(currentStep));
	
	return [bcdRepresentation, solutionSteps];
};

DecimalOperand.prototype.computeSum = function(rightHandSide) // Throws an error since decimal addition is unsupported.
{
	throw "ERROR: + is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeDifference = function(rightHandSide) // Throws an error since decimal subtraction is unsupported.
{
	throw "ERROR: - is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeProduct = function(rightHandSide) // Throws an error since decimal multiplication is unsupported
{
	throw "ERROR: * is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeQuotient = function(rightHandSide) // Throws an error since decimal division is unsupported.
{
	throw "ERROR: / is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeComplement = function(rightHandSide) // Throws an error since decimal complements are unsupported.
{
	throw "ERROR: ~ is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeAnd = function(rightHandSide) // Throws an error since decimal ands are unsupported.
{
	throw "ERROR: & is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeOr = function(rightHandSide) // Throws an error since decimal ors are unsupported.
{
	throw "ERROR: | is an unsupported operator for decimal numbers.";
};

DecimalOperand.prototype.computeExclusiveOr = function(rightHandSide) // Throws an error since decimal exclusive ors are unsupported.
{
	throw "ERROR: ^ is an unsupported operator for decimal numbers.";
};

/*
	---------------------------
	End of DecimalOperand class
	----------------------------
*/

/*
	BinaryOperand class
	-------------------
*/

var BinaryOperand = function(inputValue)
{
	var value = null;
	
	if (isBinary(inputValue))
	{
		value = String(inputValue);
	}
	else
	{
		throw "ERROR: Binary operands must be numeric values consisting of only 0s and 1s!";
	}
	
	this.getValue = function(){return value;};
	
	this.setValue = function(newValue)
	{
		if (isBinary(inputValue))
		{
			value = String(inputValue);
		}
		else
		{
			throw "ERROR: Binary operands must be numeric values consisting of only 0s and 1s!";
		}
	};
};

BinaryOperand.prototype.convertToDecimal = function() // Converts a binary number to decimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var decimalRepresentation = 0;
	var solutionSteps = [];
	
	var currentStep = "Converting binary numbers to decimal is as simple as summing every digit multiplied by 2 to the power of the digit's position number.<br />Positions start from zero on the rightmost side and increase towards the left.";
	solutionSteps.push(new Step(currentStep));
	
	var positionNumber = valueToConvert.length - 1;
	currentStep = "";
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		decimalRepresentation += parseInt(valueToConvert.charAt(i)) * Math.pow(2, positionNumber);
		currentStep += "(" + valueToConvert.charAt(i) + " * 2" + (String(positionNumber)).sup() + ") + ";
		positionNumber--;
	}
	
	currentStep = currentStep.substring(0, currentStep.length - 2); // Remove trailing +
	solutionSteps.push(new Step(currentStep));
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + decimalRepresentation + " in decimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [String(decimalRepresentation), solutionSteps];
};

BinaryOperand.prototype.convertToHexadecimal = function() // Converts a binary number to hexadecimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var hexadecimalRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "To convert a binary number into a hexadecimal number, first split the binary number into groups of four bits.<br />If the overall length of the binary number isn't evenly divisble by four, add zeros as necessary to even it out.";
	solutionSteps.push(new Step(currentStep));
	
	while ((valueToConvert.length % 4) !== 0)
	{
		valueToConvert = "0" + valueToConvert;
	}
	
	var binaryChunks = valueToConvert.match(/.{1,4}/g);
	
	for (i = 0; i < binaryChunks.length; i++)
	{
		switch(binaryChunks[i])
		{
			case "0000":
				currentStep = binaryChunks[i] + " is equivalent to 0 in hexadecimal.";
				hexadecimalRepresentation += "0";
				break;
			case "0001":
				currentStep = binaryChunks[i] + " is equivalent to 1 in hexadecimal.";
				hexadecimalRepresentation += "1";
				break;
			case "0010":
				currentStep = binaryChunks[i] + " is equivalent to 2 in hexadecimal.";
				hexadecimalRepresentation += "2";
				break;
			case "0011":
				currentStep = binaryChunks[i] + " is equivalent to 3 in hexadecimal.";
				hexadecimalRepresentation += "3";
				break;
			case "0100":
				currentStep = binaryChunks[i] + " is equivalent to 4 in hexadecimal.";
				hexadecimalRepresentation += "4";
				break;
			case "0101":
				currentStep = binaryChunks[i] + " is equivalent to 5 in hexadecimal.";
				hexadecimalRepresentation += "5";
				break;
			case "0110":
				currentStep = binaryChunks[i] + " is equivalent to 6 in hexadecimal.";
				hexadecimalRepresentation += "6";
				break;
			case "0111":
				currentStep = binaryChunks[i] + " is equivalent to 7 in hexadecimal.";
				hexadecimalRepresentation += "7";
				break;
			case "1000":
				currentStep = binaryChunks[i] + " is equivalent to 8 in hexadecimal.";
				hexadecimalRepresentation += "8";
				break;
			case "1001":
				currentStep = binaryChunks[i] + " is equivalent to 9 in hexadecimal.";
				hexadecimalRepresentation += "9";
				break;
			case "1010":
				currentStep = binaryChunks[i] + " is equivalent to A in hexadecimal.";
				hexadecimalRepresentation += "A";
				break;
			case "1011":
				currentStep = binaryChunks[i] + " is equivalent to B in hexadecimal.";
				hexadecimalRepresentation += "B";
				break;
			case "1100":
				currentStep = binaryChunks[i] + " is equivalent to C in hexadecimal.";
				hexadecimalRepresentation += "C";
				break;
			case "1101":
				currentStep = binaryChunks[i] + " is equivalent to D in hexadecimal.";
				hexadecimalRepresentation += "D";
				break;
			case "1110":
				currentStep = binaryChunks[i] + " is equivalent to E in hexadecimal.";
				hexadecimalRepresentation += "E";
				break;
			case "1111":
				currentStep = binaryChunks[i] + " is equivalent to F in hexadecimal.";
				hexadecimalRepresentation += "F";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + hexadecimalRepresentation + " in hexadecimal";
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation, solutionSteps];
};

BinaryOperand.prototype.convertToOctal = function() // Converts a binary number to octal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var octalRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "To convert a binary number into an octal number, first split the binary number into groups of three bits.<br />If the overall length of the binary number isn't evenly divisble by three, add zeros as necessary to even it out.";
	solutionSteps.push(new Step(currentStep));
	
	while ((valueToConvert.length % 3) !== 0)
	{
		valueToConvert = "0" + valueToConvert;
	}
	
	var binaryChunks = valueToConvert.match(/.{1,3}/g);
	
	for (i = 0; i < binaryChunks.length; i++)
	{
		switch(binaryChunks[i])
		{
			case "000":
				currentStep = binaryChunks[i] + " is equivalent to 0 in octal.";
				octalRepresentation += "0";
				break;
			case "001":
				currentStep = binaryChunks[i] + " is equivalent to 1 in octal.";
				octalRepresentation += "1";
				break;
			case "010":
				currentStep = binaryChunks[i] + " is equivalent to 2 in octal.";
				octalRepresentation += "2";
				break;
			case "011":
				currentStep = binaryChunks[i] + " is equivalent to 3 in octal.";
				octalRepresentation += "3";
				break;
			case "100":
				currentStep = binaryChunks[i] + " is equivalent to 4 in octal.";
				octalRepresentation += "4";
				break;
			case "101":
				currentStep = binaryChunks[i] + " is equivalent to 5 in octal.";
				octalRepresentation += "5";
				break;
			case "110":
				currentStep = binaryChunks[i] + " is equivalent to 6 in octal.";
				octalRepresentation += "6";
				break;
			case "111":
				currentStep = binaryChunks[i] + " is equivalent to 7 in octal.";
				octalRepresentation += "7";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + octalRepresentation + " in octal.";
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation, solutionSteps];
};

BinaryOperand.prototype.convertToBinaryCodedDecimal = function() // Converts a binary number to BCD and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "Converting a binary number to BCD requires first converting the binary number to decimal, and then converting that decimal number to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var bcdRepresentation = decimalRepresentation.convertToBinaryCodedDecimal();
	currentStep = "";
	
	for (i = 0; i < bcdRepresentation[1].length; i++)
	{
		currentStep += (bcdRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + bcdRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + bcdRepresentation[0] + " in BCD.";
	solutionSteps.push(new Step(currentStep))
	
	return [bcdRepresentation[0], solutionSteps];
};

BinaryOperand.prototype.computeSum = function(rightHandSide) // Computes the sum of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var sum = "";
	var carry = "0";
	var solutionSteps = [];
	
	var currentStep = "To compute the sum of two binary numbers, add each individual bit starting from the righthand side.<br />1 + 0 = 1, 0 + 1 = 1, 1 + 1 = 0 with carry = 1";
	solutionSteps.push(new Step(currentStep));
	
	if (i >= j)
	{
		while (j >= 0)
		{
			if ((leftHandString.charAt(i) === "1") && (rightHandString.charAt(j) === "1"))
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0 + carry = 1<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "1";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
			}
			else if (((leftHandString.charAt(i) === "0") && (rightHandString.charAt(j) === "1")) || ((leftHandString.charAt(i) === "1") && (rightHandString.charAt(j) === "0")))
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 1 + carry = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
			}
			else
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0 + carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "0";
				}
			}
			
			i--;
			j--;
		}
		
		while (i >= 0)
		{
			if (leftHandString.charAt(i) === "1")
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + 0 = 1 + carry = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + 0 = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
			}
			else
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + 0 = 0 + carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + 0 = 0";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "0";
				}
			}
				
			i--;
		}
	}
	else
	{
		while (i >= 0)
		{
			if ((leftHandString.charAt(i) === "1") && (rightHandString.charAt(j) === "1"))
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0 + carry = 1<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "1";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
			}
			else if (((leftHandString.charAt(i) === "0") && (rightHandString.charAt(j) === "1")) || ((leftHandString.charAt(i) === "1") && (rightHandString.charAt(j) === "0")))
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 1 + carry = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
			}
			else
			{
				if (carry === "1")
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0 + carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
				else
				{
					currentStep = leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = 0";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "0";
				}
			}
			
			i--;
			j--;
		}
		
		while (j >= 0)
		{
			if (rightHandString.charAt(j) === "1")
			{
				if (carry === "1")
				{
					currentStep = "0 + " + rightHandString.charAt(j) + " = 1 + carry = 0<br />carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "1";
				}
				else
				{
					currentStep = " 0 + " + rightHandString.charAt(j) + " = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
			}
			else
			{
				if (carry === "1")
				{
					currentStep = "0 + " + rightHandString.charAt(j) + " = 0 + carry = 1";
					solutionSteps.push(new Step(currentStep));
					sum = "1" + sum;
					carry = "0";
				}
				else
				{
					currentStep = "0 + " + rightHandString.charAt(j) + " = 0";
					solutionSteps.push(new Step(currentStep));
					sum = "0" + sum;
					carry = "0";
				}
			}
				
			j--;
		}
	}
	
	if (carry === "1")
	{
		sum = "1" + sum;
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " + " + rightHandString + " = " + sum;
	solutionSteps.push(new Step(currentStep));
	
	return [sum, solutionSteps];
};

BinaryOperand.prototype.computeDifference = function(rightHandSide) // Computes the difference between two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var k;
	var solutionSteps = [];
	var currentStep = "";
	
	if (i < j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + leftHandString + " is the shortest number here, so append " + (j - i) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < j - i; k++)
		{
			leftHandString = "0" + leftHandString;
		}
		
		this.setValue(leftHandString);
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}	
	else if (i > j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + rightHandString + " is the shortest number here, so append " + (i - j) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < i - j; k++)
		{
			rightHandString = "0" + rightHandString;
		}
		
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Take the two's complement of the second term by first computing its one's complement, and then adding 1 to it."
	solutionSteps.push(new Step(currentStep));
	
	var onesComplement = new BinaryOperand(rightHandString).computeComplement();
	currentStep = "";
	
	for (k = 0; k < onesComplement[1].length; k++)
	{
		currentStep += (onesComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep("~" + rightHandString + " = " + onesComplement[0], currentStep));
	
	onesComplement = new BinaryOperand(onesComplement[0]);
	var twosComplement = onesComplement.computeSum(new BinaryOperand("1"));
	currentStep = "";
	
	for (k = 0; k < twosComplement[1].length; k++)
	{
		currentStep += (twosComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(onesComplement.getValue() + " + 1 = " + twosComplement[0], currentStep));
	
	currentStep = "Lastly, compute the sum of " + leftHandString + " and " + twosComplement[0] + ".";
	solutionSteps.push(new Step(currentStep));
	
	var difference = this.computeSum(new BinaryOperand(twosComplement[0]));
	
	if ((parseInt(leftHandString, 2) - parseInt(rightHandString, 2)) >= 0)
	{
		difference[0] = difference[0].substring(1, difference[0].length);
	}
	
	currentStep = "";
	
	for (k = 0; k < difference[1].length; k++)
	{
		currentStep += (difference[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " + " + twosComplement[0] + " = " + difference[0], currentStep));
	
	currentStep = "Therefore, it follows that " + leftHandString + " - " + rightHandString + " = " + difference[0];
	solutionSteps.push(new Step(currentStep));
	
	return [difference[0], solutionSteps];
};

BinaryOperand.prototype.computeProduct = function(rightHandSide) // Computes the product of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var partialProducts = [];
	var i, j, k, l, m;
	var solutionSteps = [];
	
	currentStep = "Binary multiplication is performed in a similar manner to decimal multiplication.<br />To compute a x b where b consists of n digits, create n partial products, shifting each partial product left one place. Lastly, sum all partial products<br />0 x 0 = 0, 1 x 0 = 0, 0 x 1 = 0, 1 x 1 = 1";
	solutionSteps.push(new Step(currentStep));
	
	var shift = 0;
	currentStep = "";
	
	for (j = rightHandString.length - 1; j >= 0; j--)
	{
		var currentPartialProduct = "";
		
		for (m = 0; m < shift; m++)
		{
			currentPartialProduct += "0";
		}
		
		for (i = leftHandString.length - 1; i >= 0; i--)
		{
			if ((rightHandString.charAt(j) === "1") && (leftHandString.charAt(i) === "1"))
			{
				currentStep += leftHandString.charAt(i) + " * " + rightHandString.charAt(j) + " = 1<br />";
				currentPartialProduct = "1" + currentPartialProduct;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " * " + rightHandString.charAt(j) + " = 0<br />";
				currentPartialProduct = "0" + currentPartialProduct;
			}
		}
		
		solutionSteps.push(new CollapsibleStep("Partial Product: " + currentPartialProduct, currentStep));
		partialProducts.push(new BinaryOperand(currentPartialProduct));
		shift++;
		currentStep = "";
	}
	
	currentStep = "Next, compute the sum of all partial products.";
	solutionSteps.push(new Step(currentStep));
	
	var product = partialProducts.splice(0, 1);
	product = product[0];
	
	var sumReturn;
	
	for (k = 0; k < partialProducts.length; k++)
	{
		sumReturn = product.computeSum(partialProducts[k]);
		currentStep = "";
		
		for (l = 0; l < sumReturn[1].length; l++)
		{
			currentStep += (sumReturn[1][l]).getMarkup() + "<br />";
		}
		
		solutionSteps.push(new CollapsibleStep(product.getValue() + " + " + partialProducts[k].getValue() + " = " + sumReturn[0], currentStep));
		product = new BinaryOperand(sumReturn[0]);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " * " + rightHandString + " = " + product.getValue();
	solutionSteps.push(new Step(currentStep));
	
	return [product.getValue(), solutionSteps];
};

BinaryOperand.prototype.computeQuotient = function(rightHandSide) // Computes the quotient of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var quotient = 0;
	var i;
	var solutionSteps = [];
	
	var currentStep = "To compute the quotient of two binary numbers a and b, continuously subtract the divisor from the dividend, then the remainder, while keeping track of the number of times it can be done before the dividend is less than the divisor.";
	solutionSteps.push(new Step(currentStep));
	
	var remainder = this;
	
	while (!(parseInt(leftHandString, 2) < parseInt(rightHandString, 2)))
	{
		var subtractionResult = remainder.computeDifference(new BinaryOperand(rightHandString));
		currentStep = "";
		
		for (i = 0; i < subtractionResult[1].length; i++)
		{
			currentStep += (subtractionResult[1][i]).getMarkup() + "<br />";
		}
		
		remainder = new BinaryOperand(subtractionResult[0]);
		quotient++;
		
		solutionSteps.push(new CollapsibleStep(leftHandString + " - " + rightHandString + " = " + remainder.getValue() + "<br />" + quotient + " subtraction(s)", currentStep));
		
		leftHandString = subtractionResult[0];
	}
	
	quotient = decimalToBinary(quotient);
	
	currentStep = "Therefore, it follows that " + this.getValue() + " / " + rightHandString + " = " + quotient;
	solutionSteps.push(new Step(currentStep));
	
	return [quotient, solutionSteps];
};

BinaryOperand.prototype.computeComplement = function() // Computes the one's complement of a binary number and generates a list of the steps required to reach that result.
{
	var numToConvert = this.getValue();
	var complement = "";
	var i;
	var solutionSteps = [];
	var stepText = "To compute the one's complement of the binary number " + numToConvert + ", simply flip all of the bits to their opposite value.<br />";
	
	for (i = 0; i < numToConvert.length; i++)
	{
		if (numToConvert.charAt(i) === '1')
		{
			complement += "0";
		}
		else
		{
			complement += "1";
		}
	}
	
	stepText += "~" + numToConvert + " = " + complement;
	
	solutionSteps.push(new Step(stepText))
	
	return [complement, solutionSteps];
};

BinaryOperand.prototype.computeAnd = function(rightHandSide) // Computes the and of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var and = "";
	var solutionSteps = [];
	
	var currentStep = "Remember that a & b = 1 if and only if both a and b are equal to 1.<br />Test this property for every bit starting from the righthand side.";
	solutionSteps.push(new Step(currentStep));
	
	while (j >= 0)
	{
		if ((leftHandString.charAt(i) === "1") && (rightHandString.charAt(j) === "1"))
		{
			currentStep = leftHandString.charAt(i) + " & " + rightHandString.charAt(j) + " = 1";
			solutionSteps.push(new Step(currentStep));
			and = "1" + and;
		}
		else
		{
			currentStep = leftHandString.charAt(i) + " & " + rightHandString.charAt(j) + " = 0";
			solutionSteps.push(new Step(currentStep));
			and = "0" + and;
		}
		
		i--;
		j--;
	}
	
	i = 0;
	
	currentStep = "Therefore, it follows that " + leftHandString + " & " + rightHandString + " = " + and;
	solutionSteps.push(new Step(currentStep));
	
	return [and, solutionSteps];
};

BinaryOperand.prototype.computeOr = function(rightHandSide) // Computes the or of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var or = "";
	var solutionSteps = [];
	
	var currentStep = "Remember that a | b = 1 if either a or b is equal to 1.<br />Test this property for every bit starting from the righthand side.";
	solutionSteps.push(new Step(currentStep));
	
	if (i >= j)
	{
		while (j >= 0)
		{
			if ((leftHandString.charAt(i) === "1") || (rightHandString.charAt(j) === "1"))
			{
				currentStep = leftHandString.charAt(i) + " | " + rightHandString.charAt(j) + " = 1";
				solutionSteps.push(new Step(currentStep));
				or = "1" + or;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " | " + rightHandString.charAt(j) + " = 0";
				solutionSteps.push(new Step(currentStep));
				or = "0" + or;
			}
			
			i--;
			j--;
		}
		
		while (i >= 0)
		{
			if (leftHandString.charAt(1) === "1")
			{
				currentStep = leftHandString.charAt(i) + " | 0 = 1"; 
				solutionSteps.push(new Step(currentStep));
				or = "1" + or;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " | 0 = 0"; 
				solutionSteps.push(new Step(currentStep));
				or = "0" + or;
			}
			
			i--;
		}
	}
	else
	{
		while (i >= 0)
		{
			if ((leftHandString.charAt(i) === "1") || (rightHandString.charAt(j) === "1"))
			{
				currentStep = leftHandString.charAt(i) + " | " + rightHandString.charAt(j) + " = 1";
				solutionSteps.push(new Step(currentStep));
				or = "1" + or;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " | " + rightHandString.charAt(j) + " = 0";
				solutionSteps.push(new Step(currentStep));
				or = "0" + or;
			}
			
			i--;
			j--;
		}
		
		while (j >= 0)
		{
			if ((rightHandString.charAt(j) === "1"))
				{
					currentStep = "0 | " + rightHandString.charAt(j) + " = 1";
					solutionSteps.push(new Step(currentStep));
					or = "1" + or;
				}
				else
				{
					currentStep = "0 | " + rightHandString.charAt(j) + " = 0";
					solutionSteps.push(new Step(currentStep));
					or = "0" + or;
				}
			
			j--;
		}
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " | " + rightHandString + " = " + or;
	solutionSteps.push(new Step(currentStep));
	
	return [or, solutionSteps];
};

BinaryOperand.prototype.computeExclusiveOr = function(rightHandSide) // Computes the exclusive or of two binary numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var exclusiveOr = "";
	var solutionSteps = [];
	
	var currentStep = "Remember that a ^ b = 1 if either a or b is equal to 1 and both a and b are not equal to 1.<br />Test this property for every bit starting from the righthand side.";
	solutionSteps.push(new Step(currentStep));
	
	if (i >= j)
	{
		while (j >= 0)
		{
			if (((leftHandString.charAt(i) === "1") || (rightHandString.charAt(j) === "1")) && (!(leftHandString.charAt(i) === rightHandString.charAt(j))))
			{
				currentStep = leftHandString.charAt(i) + " ^ " + rightHandString.charAt(j) + " = 1";
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "1" + exclusiveOr;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " ^ " + rightHandString.charAt(j) + " = 0";
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "0" + exclusiveOr;
			}
			
			i--;
			j--;
		}
		
		while (i >= 0)
		{
			if (leftHandString.charAt(1) === "1")
			{
				currentStep = leftHandString.charAt(i) + " ^ 0 = 1"; 
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "1" + exclusiveOr;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " ^ 0 = 0"; 
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "0" + exclusiveOr;
			}
			
			i--;
		}
	}
	else
	{
		while (i >= 0)
		{
			if (((leftHandString.charAt(i) === "1") || (rightHandString.charAt(j) === "1")) && (!(leftHandString.charAt(i) === rightHandString.charAt(j))))
			{
				currentStep = leftHandString.charAt(i) + " ^ " + rightHandString.charAt(j) + " = 1";
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "1" + exclusiveOr;
			}
			else
			{
				currentStep = leftHandString.charAt(i) + " ^ " + rightHandString.charAt(j) + " = 0";
				solutionSteps.push(new Step(currentStep));
				exclusiveOr = "0" + exclusiveOr;
			}
			
			i--;
			j--;
		}
		
		while (j >= 0)
		{
			if ((rightHandString.charAt(j) === "1"))
				{
					currentStep = "0 ^ " + rightHandString.charAt(j) + " = 1";
					solutionSteps.push(new Step(currentStep));
					exclusiveOr = "1" + exclusiveOr;
				}
				else
				{
					currentStep = "0 ^ " + rightHandString.charAt(j) + " = 0";
					solutionSteps.push(new Step(currentStep));
					exclusiveOr = "0" + exclusiveOr;
				}
			
			j--;
		}
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " ^ " + rightHandString + " = " + exclusiveOr;
	solutionSteps.push(new Step(currentStep));
	
	return [exclusiveOr, solutionSteps];
};
/*
	--------------------------
	End of BinaryOperand class
	--------------------------
*/

/*
	HexadecimalOperand class
	------------------------
*/

var HexadecimalOperand = function(inputValue)
{
	var value = null;
	
	if (isHexadecimal(inputValue))
	{
		value = String(inputValue);
	}
	else
	{
		throw "ERROR: Hexadecimal operands must consist of only the following characters: 0-9, A-F";
	}
	
	this.getValue = function(){return value;};
	
	this.setValue = function(newValue)
	{
		if (isHexadecimal(inputValue))
		{
			value = String(inputValue);
		}
		else
		{
			throw "ERROR: Hexadecimal operands must consist of only the following characters: 0-9, A-F";
		}
	};
};

HexadecimalOperand.prototype.convertToDecimal = function() // Converts a hexadecimal number to decimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var i;
	var decimalRepresentation;
	var solutionSteps = [];
	
	var currentStep = "To convert a hexadecimal number to decimal, first convert to binary and then convert the resulting binary number to decimal.";
	solutionSteps.push(new Step(currentStep));
	
	var binaryRepresentation = this.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < binaryRepresentation[1].length; i++)
	{
		currentStep += (binaryRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + binaryRepresentation[0], currentStep));
	
	binaryRepresentation = new BinaryOperand(binaryRepresentation[0]);
	
	currentStep = "Finally, convert " + binaryRepresentation.getValue() + " to decimal.";
	solutionSteps.push(new Step(currentStep));
	
	decimalRepresentation = binaryRepresentation.convertToDecimal();
	
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(binaryRepresentation.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + decimalRepresentation[0] + " in decimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [decimalRepresentation[0], solutionSteps];
};

HexadecimalOperand.prototype.convertToBinary = function() // Converts a hexadecimal number to binary and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var binaryRepresentation = "";
	var solutionSteps = [];
	var i, currentDigit;
	
	var currentStep = "Converting a hexadecimal number to a binary number is as simple as looking at each individual digit, taking note of its equivalent decimal number, and writing the corresponding four digit binary number in its place.<br />For example, A is equivalent to 10 in decimal, which is also equivalent to 1010 in binary.";
	solutionSteps.push(new Step(currentStep));
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		currentDigit = valueToConvert.charAt(i);
		
		switch (currentDigit)
		{
			case "0":
				currentStep = currentDigit + " is equivalent to 0000 in binary.";
				binaryRepresentation += "0000";
				break;
			case "1":
				currentStep = currentDigit + " is equivalent to 0001 in binary.";
				binaryRepresentation += "0001";
				break;
			case "2":
				currentStep = currentDigit + " is equivalent to 0010 in binary.";
				binaryRepresentation += "0010";
				break;
			case "3":
				currentStep = currentDigit + " is equivalent to 0011 in binary.";
				binaryRepresentation += "0011";
				break;
			case "4":
				currentStep = currentDigit + " is equivalent to 0100 in binary.";
				binaryRepresentation += "0100";
				break;
			case "5":
				currentStep = currentDigit + " is equivalent to 0101 in binary.";
				binaryRepresentation += "0101";
				break;
			case "6":
				currentStep = currentDigit + " is equivalent to 0110 in binary.";
				binaryRepresentation += "0110";
				break;
			case "7":
				currentStep = currentDigit + " is equivalent to 0111 in binary.";
				binaryRepresentation += "0111";
				break;
			case "8":
				currentStep = currentDigit + " is equivalent to 1000 in binary.";
				binaryRepresentation += "1000";
				break;
			case "9":
				currentStep = currentDigit + " is equivalent to 1001 in binary.";
				binaryRepresentation += "1001";
				break;
			case "A":
				currentStep = currentDigit + " is equivalent to 1010 in binary.";
				binaryRepresentation += "1010";
				break;
			case "B":
				currentStep = currentDigit + " is equivalent to 1011 in binary.";
				binaryRepresentation += "1011";
				break;
			case "C":
				currentStep = currentDigit + " is equivalent to 1100 in binary.";
				binaryRepresentation += "1100";
				break;
			case "D":
				currentStep = currentDigit + " is equivalent to 1101 in binary.";
				binaryRepresentation += "1101";
				break;
			case "E":
				currentStep = currentDigit + " is equivalent to 1110 in binary.";
				binaryRepresentation += "1110";
				break;
			case "F":
				currentStep = currentDigit + " is equivalent to 1111 in binary.";
				binaryRepresentation += "1111";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + binaryRepresentation + " in binary.";
	solutionSteps.push(new Step(currentStep));
	
	return [binaryRepresentation, solutionSteps];
};

HexadecimalOperand.prototype.convertToOctal = function() // Converts a hexadecimal number to octal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var i;
	var solutionSteps = [];
	
	var currentStep = "To convert a hexadecimal number to an octal number, first convert the hexadecimal number to binary and then convert the resulting binary number to octal.";
	solutionSteps.push(new Step(currentStep));
	
	var binaryRepresentation = this.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < binaryRepresentation[1].length; i++)
	{
		currentStep += (binaryRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + binaryRepresentation[0], currentStep));
	
	currentStep = "Finally, convert " + binaryRepresentation[0] + " to octal."
	solutionSteps.push(new Step(currentStep));
	
	binaryRepresentation = new BinaryOperand(binaryRepresentation[0]);
	
	var octalRepresentation = binaryRepresentation.convertToOctal();
	
	currentStep = "";
	
	for (i = 0; i < octalRepresentation[1].length; i++)
	{
		currentStep += (octalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(binaryRepresentation.getValue() + " = " + octalRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + octalRepresentation[0] + " in octal.";
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation[0], solutionSteps];
};

HexadecimalOperand.prototype.convertToBinaryCodedDecimal = function() // Converts a hexadecimal number to BCD and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "Converting a hexadecimal number to BCD requires first converting the hexadecimal number to decimal, and then converting that decimal number to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	currentStep = "";
	var i;
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var bcdRepresentation = decimalRepresentation.convertToBinaryCodedDecimal();
	
	currentStep = "";
	
	for (i = 0; i < bcdRepresentation[1].length; i++)
	{
		currentStep += (bcdRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + bcdRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + bcdRepresentation[0] + " in BCD.";
	solutionSteps.push(new Step(currentStep));
	
	return [bcdRepresentation[0], solutionSteps];
};

HexadecimalOperand.prototype.computeSum = function(rightHandSide) // Computes the sum of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var sum = "";
	var solutionSteps = [];
	
	var currentStep = "Computing the sum of two hexadecimal numbers a and b follows a similar process to that of computing the sum of two decimal numbers.<br />The only difference lies in what is considered a carry.<br />A carry occurs when the sum of any two digits exceeds F (15 in decimal). Subtract 16 from that sum to obtain the proper value to place in the current column and generate a carry.<br />Remember that A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15.";
	solutionSteps.push(new Step(currentStep));
	
	var currentPartialSum;
	var carry = 0;
	
	if (i >= j)
	{
		while (j >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 16) + parseInt(rightHandString.charAt(j), 16);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum;
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
			}
			
			if (currentPartialSum > 15)
			{
				currentStep += "<br />" + currentPartialSum + " - 16 = " + (currentPartialSum -= 16);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = (currentPartialSum.toString(16)).toUpperCase() + sum;
			
			i--;
			j--;
		}
		
		while (i >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 16);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + 0 = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + 0 = " + currentPartialSum;
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
			}
			
			if (currentPartialSum > 15)
			{
				currentStep += "<br />" + currentPartialSum + " - 16 = " + (currentPartialSum -= 16);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = (currentPartialSum.toString(16)).toUpperCase() + sum;
			
			i--;
		}
	}
	else
	{
		while (i >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 16) + parseInt(rightHandString.charAt(j), 16);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum;
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
			}
			
			if (currentPartialSum > 15)
			{
				currentStep += "<br />" + currentPartialSum + " - 16 = " + (currentPartialSum -= 16);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = (currentPartialSum.toString(16)).toUpperCase() + sum;
			
			i--;
			j--;
		}
		
		while (j >= 0)
		{
			currentPartialSum = parseInt(rightHandString.charAt(j), 16);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += "0 + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				carry = 0;
			}
			else
			{
				currentStep += "0 + " + rightHandString.charAt(j) + " = " + currentPartialSum;
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
			}
			
			if (currentPartialSum > 15)
			{
				currentStep += "<br />" + currentPartialSum + " - 16 = " + (currentPartialSum -= 16);
				
				if ((currentPartialSum >= 10) && (currentPartialSum <= 15))
				{
					currentStep += " = " + (currentPartialSum.toString(16)).toUpperCase();
				}
				
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = (currentPartialSum.toString(16)).toUpperCase() + sum;
			
			j--;
		}
	}
	
	if (carry === 1)
	{
		sum = "1" + sum;
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " + " + rightHandString + " = " + sum;
	solutionSteps.push(new Step(currentStep));
	
	return [sum, solutionSteps];
};

HexadecimalOperand.prototype.computeDifference = function(rightHandSide) // Computes the difference of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var k;
	var difference;
	var solutionSteps = [];
	
	if (i < j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + leftHandString + " is the shortest number here, so append " + (j - i) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < j - i; k++)
		{
			leftHandString = "0" + leftHandString;
		}
		
		this.setValue(leftHandString);
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}	
	else if (i > j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + rightHandString + " is the shortest number here, so append " + (i - j) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < i - j; k++)
		{
			rightHandString = "0" + rightHandString;
		}
		
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Take the two's complement of the second term by first computing its one's complement, and then adding 1 to it."
	solutionSteps.push(new Step(currentStep));
	
	var onesComplement = new HexadecimalOperand(rightHandString).computeComplement();
	currentStep = "";
	
	for (k = 0; k < onesComplement[1].length; k++)
	{
		currentStep += (onesComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep("~" + rightHandString + " = " + onesComplement[0], currentStep));
	
	onesComplement = new HexadecimalOperand(onesComplement[0]);
	var twosComplement = onesComplement.computeSum(new HexadecimalOperand("1"));
	currentStep = "";
	
	for (k = 0; k < twosComplement[1].length; k++)
	{
		currentStep += (twosComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(onesComplement.getValue() + " + 1 = " + twosComplement[0], currentStep));
	
	currentStep = "Lastly, compute the sum of " + leftHandString + " and " + twosComplement[0] + ".";
	solutionSteps.push(new Step(currentStep));
	
	var difference = this.computeSum(new HexadecimalOperand(twosComplement[0]));
	
	if ((parseInt(leftHandString, 16) - parseInt(rightHandString, 16)) >= 0)
	{
		difference[0] = difference[0].substring(1, difference[0].length);
	}
	
	currentStep = "";
	
	for (k = 0; k < difference[1].length; k++)
	{
		currentStep += (difference[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " + " + twosComplement[0] + " = " + difference[0], currentStep));
	
	currentStep = "Therefore, it follows that " + leftHandString + " - " + rightHandString + " = " + difference[0];
	solutionSteps.push(new Step(currentStep));
	
	return [difference[0], solutionSteps];
};

HexadecimalOperand.prototype.computeProduct = function(rightHandSide) // Computes the product of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i, j, k, l;
	var partialProducts = [];
	var solutionSteps = [];
	
	var currentStep = "Hexadecimal multiplication is performed in a similar manner to decimal multiplication.<br />To compute a x b where b consists of n digits, create n partial products, shifting each partial product left one place. Lastly, sum all partial products";
	solutionSteps.push(new Step(currentStep));
	
	var currentPartialProduct = 0;
	var currentPartialString = "";
	var shift = 0;
	var carry = null;
	
	currentStep = "";
	
	for (j = rightHandString.length - 1; j >= 0; j--)
	{	
		for (i = leftHandString.length - 1; i >= 0; i--)
		{
			currentPartialProduct = parseInt(leftHandString.charAt(i), 16) * parseInt(rightHandString.charAt(j), 16);
			currentStep += leftHandString.charAt(i) + " * " + rightHandString.charAt(j) + " = " + currentPartialProduct;
			
			if (carry !== null)
			{
				currentPartialProduct += parseInt(carry, 16);
				currentStep += " + carry = " + currentPartialProduct;
				carry = null;
			}
			
			currentPartialProduct = (currentPartialProduct.toString(16)).toUpperCase();
			currentStep += " = " + currentPartialProduct;
			
			if (currentPartialProduct.length > 1)
			{
				carry = currentPartialProduct.charAt(0);
				currentPartialProduct = currentPartialProduct.charAt(1);
				currentPartialString = currentPartialProduct + currentPartialString;
				
				currentStep += "<br />Take " + currentPartialProduct + " as part of the partial product, and carry the " + carry;
			}
			else
			{
				currentPartialString = currentPartialProduct + currentPartialString;
				currentStep += "<br />Take " + currentPartialProduct + " as part of the partial product.";
			}
			
			currentStep += "<br />";
		}
		
		if (carry !== null)
		{
			currentPartialString = carry + currentPartialString;
			carry = null;
		}
		
		for (k = 0; k < shift; k++)
		{
			currentPartialString += "0";
		}
		
		solutionSteps.push(new CollapsibleStep("Partial Product: " + currentPartialString, currentStep));
		partialProducts.push(new HexadecimalOperand(currentPartialString));
		shift++;
		currentPartialString = "";
	}
	
	currentStep = "Next, compute the sum of all partial products.";
	solutionSteps.push(new Step(currentStep));
	
	var product = partialProducts.splice(0, 1);
	product = product[0];
	var sumReturn;
	
	for (k = 0; k < partialProducts.length; k++)
	{
		sumReturn = product.computeSum(partialProducts[k]);
		currentStep = "";
		
		for (l = 0; l < sumReturn[1].length; l++)
		{
			currentStep += (sumReturn[1][l]).getMarkup() + "<br />";
		}
		
		solutionSteps.push(new CollapsibleStep(product.getValue() + " + " + partialProducts[k].getValue() + " = " + sumReturn[0], currentStep));
		product = new HexadecimalOperand(sumReturn[0]);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " * " + rightHandString + " = " + product.getValue();
	solutionSteps.push(new Step(currentStep));
	
	return [product.getValue(), solutionSteps];
};

HexadecimalOperand.prototype.computeQuotient = function(rightHandSide) // Computes the quotient of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var quotient = 0;
	var i;
	var solutionSteps = [];
	
	var currentStep = "To compute the quotient of two hexadecimal numbers a and b, continuously subtract the divisor from the dividend, then the remainder, while keeping track of the number of times it can be done before the dividend is less than the divisor.";
	solutionSteps.push(new Step(currentStep));
	
	var remainder = this;
	
	currentStep = "";
	
	while (!(parseInt(leftHandString, 16) < parseInt(rightHandString, 16)))
	{
		var subtractionResult = remainder.computeDifference(new HexadecimalOperand(rightHandString));
		
		for (i = 0; i < subtractionResult[1].length; i++)
		{
			currentStep += (subtractionResult[1][i]).getMarkup() + "<br />";
		}
		
		remainder = new HexadecimalOperand(subtractionResult[0]);
		leftHandString = subtractionResult[0];
		quotient++;
		
		
		solutionSteps.push(new CollapsibleStep(leftHandString + " - " + rightHandString + " = " + remainder.getValue() + "<br />" + quotient + " subtraction(s)", currentStep));
	}
	
	quotient = (quotient.toString(16)).toUpperCase();
	
	currentStep = "Therefore, it follows that " + this.getValue() + " / " + rightHandString + " = " + quotient;
	solutionSteps.push(new Step(currentStep));
	
	return [quotient, solutionSteps];
};

HexadecimalOperand.prototype.computeComplement = function() // Computes the one's complement of a hexadecimal number and generates a list of the steps required to reach that result.
{
	var i;
	var complement = "";
	var solutionSteps = [];
	
	var currentStep = "Computing the one's complement of a hexadecimal number is as simple as subtracting each individual digit from F.";
	currentStep += "<br />For instance, the complement of 0 is F since F - 0 = F.";
	solutionSteps.push(new Step(currentStep));
	
	var currentDigit;
	
	for (i = 0; i < (this.getValue()).length; i++)
	{
		currentDigit = ((parseInt("F", 16) - parseInt((this.getValue()).charAt(i), 16)).toString(16)).toUpperCase();
		complement += currentDigit;
		
		currentStep = "F - " + (this.getValue()).charAt(i) + " = " + currentDigit;
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that ~" + this.getValue() + " = " + complement;
	solutionSteps.push(new Step(currentStep));
	
	return[complement, solutionSteps];
};

HexadecimalOperand.prototype.computeAnd = function(rightHandSide) // Computes the and of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var and;
	var solutionSteps = [];
	
	currentStep = "To compute an and between two hexadecimal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the and between two binary numbers.<br />Finally, convert the solution back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	and = leftHandBinary.computeAnd(rightHandBinary);
	
	for (i = 0; i < and[1].length; i++)
	{
		currentStep += (and[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " & " + rightHandBinary.getValue() + " = " + and[0], currentStep));
	
	currentStep = "Lastly, convert " + and[0] + " back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	and = new BinaryOperand(and[0]);
	
	var hexadecimalRepresentation = and.convertToHexadecimal();
	
	currentStep = "";
	
	for (i = 0; i < hexadecimalRepresentation[1].length; i++)
	{
		currentStep += (hexadecimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(and.getValue() + " = " + hexadecimalRepresentation[0], currentStep));
	
	hexadecimalRepresentation = hexadecimalRepresentation[0];
	
	while (hexadecimalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (hexadecimalRepresentation.length === 1)
		{
			break;
		}
		
		hexadecimalRepresentation = hexadecimalRepresentation.substring(1, hexadecimalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " & " + rightHandString + " = " + hexadecimalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation, solutionSteps];
};

HexadecimalOperand.prototype.computeOr = function(rightHandSide) // Computes the or of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var or;
	var solutionSteps = [];
	
	currentStep = "To compute an or between two hexadecimal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the or between two binary numbers.<br />Finally, convert the solution back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	or = leftHandBinary.computeOr(rightHandBinary);
	
	for (i = 0; i < or[1].length; i++)
	{
		currentStep += (or[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " | " + rightHandBinary.getValue() + " = " + or[0], currentStep));
	
	currentStep = "Lastly, convert " + or[0] + " back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	or = new BinaryOperand(or[0]);
	
	var hexadecimalRepresentation = or.convertToHexadecimal();
	
	currentStep = "";
	
	for (i = 0; i < hexadecimalRepresentation[1].length; i++)
	{
		currentStep += (hexadecimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(or.getValue() + " = " + hexadecimalRepresentation[0], currentStep));
	
	hexadecimalRepresentation = hexadecimalRepresentation[0];
	
	while (hexadecimalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (hexadecimalRepresentation.length === 1)
		{
			break;
		}
		
		hexadecimalRepresentation = hexadecimalRepresentation.substring(1, hexadecimalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " | " + rightHandString + " = " + hexadecimalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation, solutionSteps];
};

HexadecimalOperand.prototype.computeExclusiveOr = function(rightHandSide) // Computes the exclusive or of two hexadecimal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var exclusiveOr;
	var solutionSteps = [];
	
	currentStep = "To compute an exclusive or between two hexadecimal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the exclusive or between two binary numbers.<br />Finally, convert the solution back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	exclusiveOr = leftHandBinary.computeExclusiveOr(rightHandBinary);
	
	for (i = 0; i < exclusiveOr[1].length; i++)
	{
		currentStep += (exclusiveOr[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " ^ " + rightHandBinary.getValue() + " = " + exclusiveOr[0], currentStep));
	
	currentStep = "Lastly, convert " + exclusiveOr[0] + " back to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	exclusiveOr = new BinaryOperand(exclusiveOr[0]);
	
	var hexadecimalRepresentation = exclusiveOr.convertToHexadecimal();
	
	currentStep = "";
	
	for (i = 0; i < hexadecimalRepresentation[1].length; i++)
	{
		currentStep += (hexadecimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(exclusiveOr.getValue() + " = " + hexadecimalRepresentation[0], currentStep));
	
	hexadecimalRepresentation = hexadecimalRepresentation[0];
	
	while (hexadecimalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (hexadecimalRepresentation.length === 1)
		{
			break;
		}
		
		hexadecimalRepresentation = hexadecimalRepresentation.substring(1, hexadecimalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " ^ " + rightHandString + " = " + hexadecimalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation, solutionSteps];
};
/*
	--------------------------
	End of HexadecimalOperand class
	--------------------------
*/

/*
	OctalOperand class
	------------------
*/

var OctalOperand = function(inputValue) 
{
	var value = null;
	
	if (isOctal(inputValue))
	{
		value = String(inputValue);
	}
	else
	{
		throw "ERROR: Octal operands must be numeric values consisting of only digits ranging from 0 to 7!";
	}
	
	this.getValue = function(){return value;};
	
	this.setValue = function(newValue)
	{
		if (isOctal(inputValue))
		{
			value = String(inputValue);
		}
		else
		{
			throw "ERROR: Octal operands must be numeric values consisting of only digits ranging from 0 to 7!";
		}
	};
};

OctalOperand.prototype.convertToDecimal = function() // Converts an octal number to decimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var decimalRepresentation = 0;
	var solutionSteps = [];
	
	var currentStep = "Converting octal numbers to decimal is as simple as summing every digit multiplied by 8 to the power of the digit's position number.<br />Positions start from zero on the rightmost side and increase towards the left.";
	solutionSteps.push(new Step(currentStep));
	
	var positionNumber = valueToConvert.length - 1;
	currentStep = "";
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		decimalRepresentation += parseInt(valueToConvert.charAt(i)) * Math.pow(8, positionNumber);
		currentStep += "(" + valueToConvert.charAt(i) + " * 8" + (String(positionNumber)).sup() + ") + ";
		positionNumber--;
	}
	
	currentStep = currentStep.substring(0, currentStep.length - 2); // Remove trailing +
	solutionSteps.push(new Step(currentStep));
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + decimalRepresentation + " in decimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [String(decimalRepresentation), solutionSteps];
};

OctalOperand.prototype.convertToBinary = function() // Converts an octal number to binary and generates a list of steps to follow in order to reach the result of the conversion.
{
	var valueToConvert = this.getValue();
	var i;
	var binaryRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "Every octal digit is equivalent to a three bit binary number.<br />For instance, 0 is equivalent to 000, 1 is equivalent to 001, and so on.<br />To convert an octal number to binary, simply swap each digit with the equivalent binary number.";
	solutionSteps.push(new Step(currentStep));
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		switch(valueToConvert.charAt(i))
		{
			case "0":
				binaryRepresentation += "000";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 000";
				break;
			case "1":
				binaryRepresentation += "001";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 001";
				break;
			case "2":
				binaryRepresentation += "010";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 010";
				break;
			case "3":
				binaryRepresentation += "011";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 011";
				break;
			case "4":
				binaryRepresentation += "100";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 100";
				break;
			case "5":
				binaryRepresentation += "101";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 101";
				break;
			case "6":
				binaryRepresentation += "110";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 110";
				break;
			case "7":
				binaryRepresentation += "111";
				currentStep = valueToConvert.charAt(i) + " is equivalent to 111";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + valueToConvert + " is equivalent to " + binaryRepresentation + " in binary";
	solutionSteps.push(new Step(currentStep));
	
	return [binaryRepresentation, solutionSteps];
};

OctalOperand.prototype.convertToHexadecimal = function() // Converts an octal number to hexadecimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var i;
	var solutionSteps = [];
	
	var currentStep = "To convert an octal number to hexadecimal, first convert it to binary and then convert that resulting binary number to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	var binaryRepresentation = this.convertToBinary();
	currentStep = "";
	
	for (i = 0; i < binaryRepresentation[1].length; i++)
	{
		currentStep += (binaryRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + binaryRepresentation[0], currentStep));
	
	currentStep = "Now convert " + binaryRepresentation[0] + " to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	binaryRepresentation = new BinaryOperand(binaryRepresentation[0]);
	
	var hexadecimalRepresentation = binaryRepresentation.convertToHexadecimal();
	currentStep = "";
	
	for (i = 0; i < hexadecimalRepresentation[1].length; i++)
	{
		currentStep += (hexadecimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(binaryRepresentation.getValue() + " = " + hexadecimalRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + hexadecimalRepresentation[0] + " in hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation[0], solutionSteps];
};

OctalOperand.prototype.convertToBinaryCodedDecimal = function() // Converts an octal number to BCD and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "Converting an octal number to BCD requires first converting the octal number to decimal, and then converting that decimal number to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var bcdRepresentation = decimalRepresentation.convertToBinaryCodedDecimal();
	currentStep = "";
	
	for (i = 0; i < bcdRepresentation[1].length; i++)
	{
		currentStep += (bcdRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + bcdRepresentation[0], currentStep));

	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + bcdRepresentation[0] + " in BCD.";
	solutionSteps.push(new Step(currentStep));
	
	return [bcdRepresentation[0], solutionSteps];
};

OctalOperand.prototype.computeSum = function(rightHandSide) // Computes the sum of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var sum = "";
	var solutionSteps = [];
	
	var currentStep = "Computing the sum of two octal number a and b follows a similar process to that of computing the sum of two decimal numbers.<br />The only difference lies in what is considered a carry.<br />A carry occurs when the sum of any two digits exceeds 7. Subtract 8 from that sum to obtain the proper value to place in the current column and generate a carry.";
	solutionSteps.push(new Step(currentStep));
	
	var currentPartialSum;
	var carry = 0;
	
	if (i >= j)
	{
		while (j >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 8) + parseInt(rightHandString.charAt(j), 8);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum;
			}
			
			if (currentPartialSum > 7)
			{
				currentStep += "<br />" + currentPartialSum + " - 8 = " + (currentPartialSum -= 8);
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = currentPartialSum.toString(8) + sum;
			
			i--;
			j--;
		}
		
		while (i >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 8);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + 0 = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + 0 = " + currentPartialSum;
			}
			
			if (currentPartialSum > 7)
			{
				currentStep += "<br />" + currentPartialSum + " - 8 = " + (currentPartialSum -= 8);
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = currentPartialSum.toString(8) + sum;
			
			i--;
		}
	}
	else
	{
		while (i >= 0)
		{
			currentPartialSum = parseInt(leftHandString.charAt(i), 8) + parseInt(rightHandString.charAt(j), 8);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				carry = 0;
			}
			else
			{
				currentStep += leftHandString.charAt(i) + " + " + rightHandString.charAt(j) + " = " + currentPartialSum;
			}
			
			if (currentPartialSum > 7)
			{
				currentStep += "<br />" + currentPartialSum + " - 8 = " + (currentPartialSum -= 8);
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = currentPartialSum.toString(8) + sum;
			
			i--;
			j--;
		}
		
		while (j >= 0)
		{
			currentPartialSum = parseInt(rightHandString.charAt(j), 8);
			currentStep = "";
			
			if (carry === 1)
			{
				currentStep += "0 + " + rightHandString.charAt(j) + " = " + currentPartialSum + " + carry = " + String(++currentPartialSum);
				carry = 0;
			}
			else
			{
				currentStep += "0 + " + rightHandString.charAt(j) + " = " + currentPartialSum;
			}
			
			if (currentPartialSum > 7)
			{
				currentStep += "<br />" + currentPartialSum + " - 8 = " + (currentPartialSum -= 8);
				currentStep += "<br />carry = 1";
				carry = 1;
			}
			
			solutionSteps.push(new Step(currentStep += ""));
			sum = currentPartialSum.toString(8) + sum;
			
			j--;
		}
	}
	
	if (carry === 1)
	{
		sum = "1" + sum;
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " + " + rightHandString + " = " + sum;
	solutionSteps.push(new Step(currentStep));
	
	return [sum, solutionSteps];
};

OctalOperand.prototype.computeDifference = function(rightHandSide) // Computes the difference of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i = leftHandString.length - 1;
	var j = rightHandString.length - 1;
	var k;
	var difference;
	var solutionSteps = [];
	
	if (i < j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + leftHandString + " is the shortest number here, so append " + (j - i) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < j - i; k++)
		{
			leftHandString = "0" + leftHandString;
		}
		
		this.setValue(leftHandString);
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}	
	else if (i > j)
	{
		currentStep = "Append any leading zeros necessary in order to represent both numbers with the same number of digits.<br />" + rightHandString + " is the shortest number here, so append " + (i - j) + " leading zeros.";
		solutionSteps.push(new Step(currentStep));
		
		for (k = 0; k < i - j; k++)
		{
			rightHandString = "0" + rightHandString;
		}
		
		currentStep = "The question will now have become " + leftHandString + " - " + rightHandString + ".";
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Take the two's complement of the second term by first computing its one's complement, and then adding 1 to it."
	solutionSteps.push(new Step(currentStep));
	
	var onesComplement = new OctalOperand(rightHandString).computeComplement();
	currentStep = "";
	
	for (k = 0; k < onesComplement[1].length; k++)
	{
		currentStep += (onesComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep("~" + rightHandString + " = " + onesComplement[0], currentStep));
	
	onesComplement = new HexadecimalOperand(onesComplement[0]);
	var twosComplement = onesComplement.computeSum(new OctalOperand("1"));
	currentStep = "";
	
	for (k = 0; k < twosComplement[1].length; k++)
	{
		currentStep += (twosComplement[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(onesComplement.getValue() + " + 1 = " + twosComplement[0], currentStep));
	
	currentStep = "Lastly, compute the sum of " + leftHandString + " and " + twosComplement[0] + ".";
	solutionSteps.push(new Step(currentStep));
	
	var difference = this.computeSum(new OctalOperand(twosComplement[0]));
	
	if ((parseInt(leftHandString, 8) - parseInt(rightHandString, 8)) >= 0)
	{
		difference[0] = difference[0].substring(1, difference[0].length);
	}
	
	currentStep = "";
	
	for (k = 0; k < difference[1].length; k++)
	{
		currentStep += (difference[1][k]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " + " + twosComplement[0] + " = " + difference[0], currentStep));
	
	currentStep = "Therefore, it follows that " + leftHandString + " - " + rightHandString + " = " + difference[0];
	solutionSteps.push(new Step(currentStep));
	
	return [difference[0], solutionSteps];
};

OctalOperand.prototype.computeProduct = function(rightHandSide) // Computes the product of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i, j, k, l;
	var partialProducts = [];
	var solutionSteps = [];
	
	var currentStep = "Octal multiplication is performed in a similar manner to decimal multiplication.<br />To compute a x b where b consists of n digits, create n partial products, shifting each partial product left one place. Lastly, sum all partial products";
	solutionSteps.push(new Step(currentStep));
	
	var currentPartialProduct = 0;
	var currentPartialString = "";
	var shift = 0;
	var carry = null;
	
	currentStep = "";
	
	for (j = rightHandString.length - 1; j >= 0; j--)
	{	
		for (i = leftHandString.length - 1; i >= 0; i--)
		{
			currentPartialProduct = parseInt(leftHandString.charAt(i), 8) * parseInt(rightHandString.charAt(j), 8);
			currentStep += leftHandString.charAt(i) + " * " + rightHandString.charAt(j) + " = " + currentPartialProduct;
			
			if (carry !== null)
			{
				currentPartialProduct += parseInt(carry, 8);
				currentStep += " + carry = " + currentPartialProduct;
				carry = null;
			}
			
			currentPartialProduct = currentPartialProduct.toString(8);
			currentStep += " = " + currentPartialProduct;
			
			if (currentPartialProduct.length > 1)
			{
				carry = currentPartialProduct.charAt(0);
				currentPartialProduct = currentPartialProduct.charAt(1);
				currentPartialString = currentPartialProduct + currentPartialString;
				
				currentStep += "<br />Take " + currentPartialProduct + " as part of the partial product, and carry the " + carry;
			}
			else
			{
				currentPartialString = currentPartialProduct + currentPartialString;
				currentStep += "<br />Take " + currentPartialProduct + " as part of the partial product.";
			}
			
			currentStep += "<br />";
		}
		
		if (carry !== null)
		{
			currentPartialString = carry + currentPartialString;
			carry = null;
		}
		
		for (k = 0; k < shift; k++)
		{
			currentPartialString += "0";
		}
		
		solutionSteps.push(new CollapsibleStep("Partial Product: " + currentPartialString, currentStep));
		partialProducts.push(new OctalOperand(currentPartialString));
		shift++;
		currentPartialString = "";
	}
	
	currentStep = "Next, compute the sum of all partial products.";
	solutionSteps.push(new Step(currentStep));
	
	var product = partialProducts.splice(0, 1);
	product = product[0];
	var sumReturn;
	
	for (k = 0; k < partialProducts.length; k++)
	{
		sumReturn = product.computeSum(partialProducts[k]);
		currentStep = "";
		
		for (l = 0; l < sumReturn[1].length; l++)
		{
			currentStep += (sumReturn[1][l]).getMarkup() + "<br />";
		}
		
		solutionSteps.push(new CollapsibleStep(product.getValue() + " + " + partialProducts[k].getValue() + " = " + sumReturn[0], currentStep));
		product = new OctalOperand(sumReturn[0]);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " * " + rightHandString + " = " + product.getValue();
	solutionSteps.push(new Step(currentStep));
	
	return [product.getValue(), solutionSteps];
};

OctalOperand.prototype.computeQuotient = function(rightHandSide) // Computes the quotient of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var quotient = 0;
	var i;
	var solutionSteps = [];
	
	var currentStep = "To compute the quotient of two octal numbers a and b, continuously subtract the divisor from the dividend, then the remainder, while keeping track of the number of times it can be done before the dividend is less than the divisor.";
	solutionSteps.push(new Step(currentStep));
	
	var remainder = this;
	
	currentStep = "";
	
	while (!(parseInt(leftHandString, 8) < parseInt(rightHandString, 8)))
	{
		var subtractionResult = remainder.computeDifference(new OctalOperand(rightHandString));
		
		for (i = 0; i < subtractionResult[1].length; i++)
		{
			currentStep += (subtractionResult[1][i]).getMarkup() + "<br />";
		}
		
		remainder = new OctalOperand(subtractionResult[0]);
		leftHandString = subtractionResult[0];
		quotient++;
		
		
		solutionSteps.push(new CollapsibleStep(leftHandString + " - " + rightHandString + " = " + remainder.getValue() + "<br />" + quotient + " subtraction(s)", currentStep));
	}
	
	quotient = quotient.toString(8);
	
	currentStep = "Therefore, it follows that " + this.getValue() + " / " + rightHandString + " = " + quotient;
	solutionSteps.push(new Step(currentStep));
	
	return [quotient, solutionSteps];
};

OctalOperand.prototype.computeComplement = function() // Computes the one's complement of an octal number and generates a list of the steps required to reach that result.
{
	var valueToConvert = this.getValue();
	var i;
	var complement = "";
	var solutionSteps = [];
	
	var currentStep = "Computing the one's complement of an octal number is as simple as subtracting each digit from the maximum value for an octal digit 7.<br />For example, the complement of 5 is 7 - 5 = 2.";
	solutionSteps.push(new Step(currentStep));
	
	var currentDigit;
	
	for (i = 0; i < valueToConvert.length; i++)
	{
		currentDigit = 7 - Number(valueToConvert.charAt(i));
		complement += String(currentDigit);
		
		currentStep = "7 - " + valueToConvert.charAt(i) + " = " + currentDigit;
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that ~" + valueToConvert + " = " + complement;
	solutionSteps.push(new Step(currentStep));
	
	return [complement, solutionSteps];
};

OctalOperand.prototype.computeAnd = function(rightHandSide) // Computes the and of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var and;
	var solutionSteps = [];
	
	currentStep = "To compute an and between two octal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the and between two binary numbers.<br />Finally, convert the solution back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	and = leftHandBinary.computeAnd(rightHandBinary);
	
	for (i = 0; i < and[1].length; i++)
	{
		currentStep += (and[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " & " + rightHandBinary.getValue() + " = " + and[0], currentStep));
	
	currentStep = "Lastly, convert " + and[0] + " back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	and = new BinaryOperand(and[0]);
	
	var octalRepresentation = and.convertToOctal();
	
	currentStep = "";
	
	for (i = 0; i < octalRepresentation[1].length; i++)
	{
		currentStep += (octalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(and.getValue() + " = " + octalRepresentation[0], currentStep));
	
	octalRepresentation = octalRepresentation[0];
	
	while (octalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (octalRepresentation.length === 1)
		{
			break;
		}
		
		octalRepresentation = octalRepresentation.substring(1, octalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " & " + rightHandString + " = " + octalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation, solutionSteps];
};

OctalOperand.prototype.computeOr = function(rightHandSide) // Computes the or of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var or;
	var solutionSteps = [];
	
	currentStep = "To compute an or between two octal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the or between two binary numbers.<br />Finally, convert the solution back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	or = leftHandBinary.computeOr(rightHandBinary);
	
	for (i = 0; i < or[1].length; i++)
	{
		currentStep += (or[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " | " + rightHandBinary.getValue() + " = " + or[0], currentStep));
	
	currentStep = "Lastly, convert " + or[0] + " back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	or = new BinaryOperand(or[0]);
	
	var octalRepresentation = or.convertToOctal();
	
	currentStep = "";
	
	for (i = 0; i < octalRepresentation[1].length; i++)
	{
		currentStep += (octalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(or.getValue() + " = " + octalRepresentation[0], currentStep));
	
	octalRepresentation = octalRepresentation[0];
	
	while (octalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (octalRepresentation.length === 1)
		{
			break;
		}
		
		octalRepresentation = octalRepresentation.substring(1, octalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " | " + rightHandString + " = " + octalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation, solutionSteps];
};

OctalOperand.prototype.computeExclusiveOr = function(rightHandSide) // Computes the exclusive or of two octal numbers and generates a list of the steps required to reach that result.
{
	var leftHandString = this.getValue();
	var rightHandString = rightHandSide.getValue();
	var i;
	var exclusiveOr;
	var solutionSteps = [];
	
	currentStep = "To compute an exclusive or between two octal numbers a and b, first convert both of them to binary and subsequently follow the same procedure for computing the exclusive or between two binary numbers.<br />Finally, convert the solution back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandBinary = this.convertToBinary();
	var rightHandBinary = rightHandSide.convertToBinary();
	
	currentStep = "";
	
	for (i = 0; i < leftHandBinary[1].length; i++)
	{
		currentStep += (leftHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandString + " = " + leftHandBinary[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandBinary[1].length; i++)
	{
		currentStep += (rightHandBinary[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandString + " = " + rightHandBinary[0], currentStep));
	currentStep = "";
	
	leftHandBinary = new BinaryOperand(leftHandBinary[0]);
	rightHandBinary = new BinaryOperand(rightHandBinary[0]);
	
	exclusiveOr = leftHandBinary.computeExclusiveOr(rightHandBinary);
	
	for (i = 0; i < exclusiveOr[1].length; i++)
	{
		currentStep += (exclusiveOr[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(leftHandBinary.getValue() + " ^ " + rightHandBinary.getValue() + " = " + exclusiveOr[0], currentStep));
	
	currentStep = "Lastly, convert " + exclusiveOr[0] + " back to octal.";
	solutionSteps.push(new Step(currentStep));
	
	exclusiveOr = new BinaryOperand(exclusiveOr[0]);
	
	var octalRepresentation = exclusiveOr.convertToOctal();
	
	currentStep = "";
	
	for (i = 0; i < octalRepresentation[1].length; i++)
	{
		currentStep += (octalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(exclusiveOr.getValue() + " = " + octalRepresentation[0], currentStep));
	
	octalRepresentation = octalRepresentation[0];
	
	while (octalRepresentation.charAt(0) === "0") // Remove leading 0s.
	{
		if (octalRepresentation.length === 1)
		{
			break;
		}
		
		octalRepresentation = octalRepresentation.substring(1, octalRepresentation.length);
	}
	
	currentStep = "Therefore, it follows that " + leftHandString + " ^ " + rightHandString + " = " + octalRepresentation;
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation, solutionSteps];
};
/*
	--------------------------
	End of OctalOperand class
	--------------------------
*/

/*
	BinaryCodedDecimalOperand class
	-------------------------------
*/

var BinaryCodedDecimalOperand = function(inputValue)
{
	var value = null;
	
	if (isBinaryCodedDecimal(inputValue))
	{
		value = String(inputValue);
	}
	else
	{
		throw "ERROR: Binary Coded Decimal operands must be numeric values consisting of only digits ranging from 0 to 1! No group of four bits may exceed a value of 9. Lastly, BCD numbers must be at a length that is evenly divisible by 4.";
	}
	
	this.getValue = function(){return value;};
	
	this.setValue = function(newValue)
	{
		if (isBinaryCodedDecimal(inputValue))
		{
			value = String(inputValue);
		}
		else
		{
			throw "ERROR: Binary Coded Decimal operands must be numeric values consisting of only digits ranging from 0 to 1! No group of four bits may exceed a value of 9. Lastly, BCD numbers must be at a length that is evenly divisible by 4.";
		}
	};
};

BinaryCodedDecimalOperand.prototype.convertToDecimal = function() // Converts a BCD number to decimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var decimalRepresentation = "";
	var solutionSteps = [];
	
	var currentStep = "Converting a BCD number to decimal is as simple as breaking the BCD number into groups of four bits.<br />Afterwards, simply convert each group of four bits to their corresponding decimal numbers.<br />For example, a BCD number 10000111 has a group of four bits 1000, which is equivalent to 8 in decimal.";
	solutionSteps.push(new Step(currentStep));
	
	var bcdChunks = (this.getValue()).match(/.{1,4}/g);
	
	var i, currentGroup;
	
	for (i = 0; i < bcdChunks.length; i++)
	{
		currentGroup = bcdChunks[i];
		
		switch(currentGroup)
		{
			case "0000":
				decimalRepresentation += "0";
				currentStep = currentGroup + " is equivalent to 0 in decimal.";
				break;
			case "0001":
				decimalRepresentation += "1";
				currentStep = currentGroup + " is equivalent to 1 in decimal.";
				break;
			case "0010":
				decimalRepresentation += "2";
				currentStep = currentGroup + " is equivalent to 2 in decimal.";
				break;
			case "0011":
				decimalRepresentation += "3";
				currentStep = currentGroup + " is equivalent to 3 in decimal.";
				break;
			case "0100":
				decimalRepresentation += "4";
				currentStep = currentGroup + " is equivalent to 4 in decimal.";
				break;
			case "0101":
				decimalRepresentation += "5";
				currentStep = currentGroup + " is equivalent to 5 in decimal.";
				break;
			case "0110":
				decimalRepresentation += "6";
				currentStep = currentGroup + " is equivalent to 6 in decimal.";
				break;
			case "0111":
				decimalRepresentation += "7";
				currentStep = currentGroup + " is equivalent to 7 in decimal.";
				break;
			case "1000":
				decimalRepresentation += "8";
				currentStep = currentGroup + " is equivalent to 8 in decimal.";
				break;
			case "1001":
				decimalRepresentation += "9";
				currentStep = currentGroup + " is equivalent to 9 in decimal.";
				break;
		};
		
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + decimalRepresentation + " in decimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [decimalRepresentation, solutionSteps];
};

BinaryCodedDecimalOperand.prototype.convertToBinary = function() // Converts a BCD number to binary and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "To convert a BCD number to a binary number, first convert the BCD number to decimal. Afterwards, convert the resulting decimal number to binary.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	currentStep = "Finally, convert " + decimalRepresentation[0] + " to binary.";
	solutionSteps.push(new Step(currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var binaryRepresentation = decimalRepresentation.convertToBinary();
	currentStep = "";
	
	for (i = 0; i < binaryRepresentation[1].length; i++)
	{
		currentStep += (binaryRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + binaryRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + binaryRepresentation[0] + " in binary.";
	solutionSteps.push(new Step(currentStep));
	
	return [binaryRepresentation[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.convertToHexadecimal = function() // Converts a BCD number to hexadecimal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "To convert a BCD number to a hexadecimal number, first convert the BCD number to decimal. Afterwards, convert the resulting decimal number to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	currentStep = "Finally, convert " + decimalRepresentation[0] + " to hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var hexadecimalRepresentation = decimalRepresentation.convertToHexadecimal();
	currentStep = "";
	
	for (i = 0; i < hexadecimalRepresentation[1].length; i++)
	{
		currentStep += (hexadecimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + hexadecimalRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + hexadecimalRepresentation[0] + " in hexadecimal.";
	solutionSteps.push(new Step(currentStep));
	
	return [hexadecimalRepresentation[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.convertToOctal = function() // Converts a BCD number to octal and generates a list of steps to follow in order to reach the result of the conversion.
{
	var solutionSteps = [];
	
	var currentStep = "To convert a BCD number to an octal number, first convert the BCD number to decimal. Afterwards, convert the resulting decimal number to octal.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + decimalRepresentation[0], currentStep));
	
	currentStep = "Finally, convert " + decimalRepresentation[0] + " to octal.";
	solutionSteps.push(new Step(currentStep));
	
	decimalRepresentation = new DecimalOperand(decimalRepresentation[0]);
	
	var octalRepresentation = decimalRepresentation.convertToOctal();
	currentStep = "";
	
	for (i = 0; i < octalRepresentation[1].length; i++)
	{
		currentStep += (octalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalRepresentation.getValue() + " = " + octalRepresentation[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " is equivalent to " + octalRepresentation[0] + " in octal.";
	solutionSteps.push(new Step(currentStep));
	
	return [octalRepresentation[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeSum = function(rightHandSide) // Computes the sum of two BCD numbers and generates a list of the steps required to reach that result.
{
	var solutionSteps = [];
	
	var currentStep = "To compute the sum of two BCD numbers a and b, simply convert a and b to decimal, sum the two resulting decimal numbers, and finally convert the result back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandDecimal = this.convertToDecimal();
	var rightHandDecimal = rightHandSide.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < leftHandDecimal[1].length; i++)
	{
		currentStep += (leftHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + leftHandDecimal[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandDecimal[1].length; i++)
	{
		currentStep += (rightHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandSide.getValue() + " = " + rightHandDecimal[0], currentStep));
	
	leftHandDecimal = parseInt(leftHandDecimal[0]);
	rightHandDecimal = parseInt(rightHandDecimal[0]);
	
	var decimalSum = leftHandDecimal + rightHandDecimal;
	
	currentStep = leftHandDecimal + " + " + rightHandDecimal + " = " + decimalSum;
	solutionSteps.push(new Step(currentStep));
	
	var sum = new DecimalOperand(String(decimalSum));
	sum = sum.convertToBinaryCodedDecimal();
	
	currentStep = "";
	
	for (i = 0; i < sum[1].length; i++)
	{
		currentStep += (sum[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalSum + " = " + sum[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " + " + rightHandSide.getValue() + " = " + sum[0];
	solutionSteps.push(new Step(currentStep));
	
	return [sum[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeDifference = function(rightHandSide) // Computes the difference of two BCD numbers and generates a list of the steps required to reach that result.
{
	var solutionSteps = [];
	
	var currentStep = "To compute the difference between two BCD numbers a and b, simply convert a and b to decimal, subtract the two resulting decimal numbers, and finally convert the result back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandDecimal = this.convertToDecimal();
	var rightHandDecimal = rightHandSide.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < leftHandDecimal[1].length; i++)
	{
		currentStep += (leftHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + leftHandDecimal[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandDecimal[1].length; i++)
	{
		currentStep += (rightHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandSide.getValue() + " = " + rightHandDecimal[0], currentStep));
	
	leftHandDecimal = parseInt(leftHandDecimal[0]);
	rightHandDecimal = parseInt(rightHandDecimal[0]);
	
	var decimalDifference = leftHandDecimal - rightHandDecimal;
	
	currentStep = leftHandDecimal + " - " + rightHandDecimal + " = " + decimalDifference;
	solutionSteps.push(new Step(currentStep));
	
	var difference = new DecimalOperand(String(decimalDifference));
	difference = difference.convertToBinaryCodedDecimal();
	
	currentStep = "";
	
	for (i = 0; i < difference[1].length; i++)
	{
		currentStep += (difference[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalDifference + " = " + difference[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " - " + rightHandSide.getValue() + " = " + difference[0];
	solutionSteps.push(new Step(currentStep));
	
	return [difference[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeProduct = function(rightHandSide) // Computes the product of two BCD numbers and generates a list of the steps required to reach that result.
{
	var solutionSteps = [];
	
	var currentStep = "To compute the product of two BCD numbers a and b, simply convert a and b to decimal, multiply the two resulting decimal numbers, and finally convert the result back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandDecimal = this.convertToDecimal();
	var rightHandDecimal = rightHandSide.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < leftHandDecimal[1].length; i++)
	{
		currentStep += (leftHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + leftHandDecimal[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandDecimal[1].length; i++)
	{
		currentStep += (rightHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandSide.getValue() + " = " + rightHandDecimal[0], currentStep));
	
	leftHandDecimal = parseInt(leftHandDecimal[0]);
	rightHandDecimal = parseInt(rightHandDecimal[0]);
	
	var decimalProduct = leftHandDecimal * rightHandDecimal;
	
	currentStep = leftHandDecimal + " * " + rightHandDecimal + " = " + decimalProduct;
	solutionSteps.push(new Step(currentStep));
	
	var product = new DecimalOperand(String(decimalProduct));
	product = product.convertToBinaryCodedDecimal();
	
	currentStep = "";
	
	for (i = 0; i < product[1].length; i++)
	{
		currentStep += (product[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalProduct + " = " + product[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " * " + rightHandSide.getValue() + " = " + product[0];
	solutionSteps.push(new Step(currentStep));
	
	return [product[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeQuotient = function(rightHandSide) // Computes the quotient of two BCD numbers and generates a list of the steps required to reach that result.
{
	var solutionSteps = [];
	
	var currentStep = "To compute the quotient of two BCD numbers a and b, simply convert a and b to decimal, divide the two resulting decimal numbers, and finally convert the result back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var leftHandDecimal = this.convertToDecimal();
	var rightHandDecimal = rightHandSide.convertToDecimal();
	
	var i;
	currentStep = "";
	
	for (i = 0; i < leftHandDecimal[1].length; i++)
	{
		currentStep += (leftHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(this.getValue() + " = " + leftHandDecimal[0], currentStep));
	currentStep = "";
	
	for (i = 0; i < rightHandDecimal[1].length; i++)
	{
		currentStep += (rightHandDecimal[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(rightHandSide.getValue() + " = " + rightHandDecimal[0], currentStep));
	
	leftHandDecimal = parseInt(leftHandDecimal[0]);
	rightHandDecimal = parseInt(rightHandDecimal[0]);
	
	var decimalQuotient = Math.floor(leftHandDecimal / rightHandDecimal);
	
	currentStep = leftHandDecimal + " / " + rightHandDecimal + " = " + decimalQuotient;
	solutionSteps.push(new Step(currentStep));
	
	var quotient = new DecimalOperand(String(decimalQuotient));
	quotient = quotient.convertToBinaryCodedDecimal();
	
	currentStep = "";
	
	for (i = 0; i < quotient[1].length; i++)
	{
		currentStep += (quotient[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(decimalQuotient + " = " + quotient[0], currentStep));
	
	currentStep = "Therefore, it follows that " + this.getValue() + " / " + rightHandSide.getValue() + " = " + quotient[0];
	solutionSteps.push(new Step(currentStep));
	
	return [quotient[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeComplement = function() // Computes the nine's complement of a BCD number and generates a list of the steps required to reach that result.
{
	var numToConvert = this.getValue();
	var complement = "";
	var i;
	var solutionSteps = [];
	
	var currentStep = "To compute the nine's complement of the BCD number " + numToConvert + ", simply convert to decimal and flip every digit to their opposite value.<br />Finally, convert the resulting decimal number back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var decimalRepresentation = this.convertToDecimal();
	currentStep = "";
	
	for (i = 0; i < decimalRepresentation[1].length; i++)
	{
		currentStep += (decimalRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	solutionSteps.push(new CollapsibleStep(numToConvert + " = " + decimalRepresentation[0], currentStep));
	
	currentStep = "Next, invert every digit in " + decimalRepresentation[0] + ".";
	solutionSteps.push(new Step(currentStep));
	
	var currentDigit, flippedDigit;
	
	for (i = 0; i < decimalRepresentation[0].length; i++)
	{
		currentDigit = parseInt(decimalRepresentation[0].charAt(i));
		flippedDigit = 9 - currentDigit;
		
		complement += String(flippedDigit); 
		
		currentStep = "9 - " + currentDigit + " = " + flippedDigit;
		solutionSteps.push(new Step(currentStep));
	}
	
	currentStep = "Finally, convert " + complement + " back to BCD.";
	solutionSteps.push(new Step(currentStep));
	
	var bcdRepresentation = new DecimalOperand(complement);
	bcdRepresentation = bcdRepresentation.convertToBinaryCodedDecimal();
	
	for (i = 0; i < bcdRepresentation[1].length; i++)
	{
		currentStep += (bcdRepresentation[1][i]).getMarkup() + "<br />";
	}
	
	
	solutionSteps.push(new CollapsibleStep(complement + " = " + bcdRepresentation[0], currentStep));
	currentStep = "Therefore, it follows that ~" + numToConvert + " = " + bcdRepresentation[0];
	solutionSteps.push(new Step(currentStep));
	
	return [bcdRepresentation[0], solutionSteps];
};

BinaryCodedDecimalOperand.prototype.computeAnd = function(rightHandSide) // Throws an error since BCD ands are not supported.
{
	throw "ERROR: & is an unsupported operator for BCD numbers.";
};

BinaryCodedDecimalOperand.prototype.computeOr = function(rightHandSide) // Throws an error since BCD ors are not supported.
{
	throw "ERROR: | is an unsupported operator for BCD numbers.";
};

BinaryCodedDecimalOperand.prototype.computeExclusiveOr = function(rightHandSide) // Throws an error since BCD exclusive ors are not supported.
{
	throw "ERROR: ^ is an unsupported operator for BCD numbers.";
};
/*
	--------------------------
	End of BinaryCodedDecimalOperand class
	--------------------------
*/