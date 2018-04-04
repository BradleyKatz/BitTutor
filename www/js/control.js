/*
	BitTutor control.js
	-------------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
	
	This file contains the implementations of the PracticeControl and SolverControl classes.
	These classes are the driving force behind much of BitTutor's functionality.
	Objects of these classes are capable of:
		- Signalling for a user's problem to be solved by the system.
		- Signalling for the display of a single step or the entirety of a solution.
		- Signalling for a problem to be skipped.
		- Generating problems for the user to solve.
*/

const UPPER_RANDOM_BOUND = 1000; // Upper bound for randomly generated numbers.
const DECIMAL = 10;
const BINARY = 2;
const HEXADECIMAL = 16;
const OCTAL = 8;

/*
	Generates a random number in a given base.
*/

var getRandomNumber = function(base)
{
	var randomNumber = Math.floor((Math.random() * UPPER_RANDOM_BOUND) + 1);
	
	switch(base)
	{
		case "Decimal":
			randomNumber = randomNumber.toString(DECIMAL);
			break;
		case "Binary":
			randomNumber = randomNumber.toString(BINARY);
			break;
		case "Hexadecimal":
			randomNumber = (randomNumber.toString(HEXADECIMAL)).toUpperCase();
			break;
		case "Octal":
			randomNumber = randomNumber.toString(OCTAL);
			break;
		case "Binary Coded Decimal":
			randomNumber = new DecimalOperand(randomNumber);
			randomNumber = randomNumber.convertToBinaryCodedDecimal();
			randomNumber = randomNumber[0];
			break;
	};
	
	return randomNumber;
};

/*
	SolverControl class
	-------------------
*/

var SolverControl = function()
{
	var equation = "";
	var postfix = "";
	var solution = "";
	var solutionSteps;
	
	this.getEquation = function(){return equation;};
	this.getPostifx = function(){return postfix;};
	this.getSolution = function(){return solution;};
	this.getSteps = function(){return solutionSteps;};
	
	this.setEquation = function(newEquation){equation = newEquation;};
	this.setPostfix = function(newPostfix){postfix = newPostfix;};
	this.setSolution = function(newSolution){solution = newSolution;};
	this.setSteps = function(newSteps){solutionSteps = newSteps;};
};

/*
	This method attempts to solve user problems and display their solutions.
	If the user entered a legitamate problem that the system is capable of solving, the solution will be computed and its corresponding steps will be displayed.
	An error message explaining what went wrong is displayed otherwise.
*/

SolverControl.prototype.computeSolution = function()
{
	var equationInput = (document.getElementById("equationInput")).value;
	var operandTypeList = document.getElementById("operandType");
	var operandType = operandTypeList.options[operandTypeList.selectedIndex].value;
	
	this.setEquation(equationInput);
	
	try
	{
		this.setPostfix(toPostfix(equationInput));
		
		var evaluationResults = evaluate(this.getPostifx(), operandType);
		
		this.setSolution(evaluationResults[0]);
		this.setSteps(evaluationResults[1]);
		
		$("#SolverPage #solverStepsSection").show();
	}
	catch(err)
	{
		if (!(err instanceof TypeError) && !(err instanceof SyntaxError))
		{
			alert(err);
		}
		else
		{
			alert("ERROR: Please input a proper equation.");
		}
		
		$("#SolverPage #solverStepsSection").hide();
	}
};

/*
	This method attempts to solve user conversion problems and display their solutions.
	If the user entered a legitimate conversion problem that the system is capable of solving, the solution will be computed and its corresponding steps will be displayed.
	An error message explaining what went wrong is displayed otherwise.
*/

SolverControl.prototype.computeConversion = function()
{
	var fromTypeList = document.getElementById("fromType");
	var toTypeList = document.getElementById("toType");
	
	var fromType = fromTypeList.options[fromTypeList.selectedIndex].value;
	var toType = toTypeList.options[toTypeList.selectedIndex].value;
	
	var numToConvert = document.getElementById("numberInput").value;
	try
	{
		switch (fromType)
		{
			case "Decimal":
				numToConvert = new DecimalOperand(numToConvert);
				break;
			case "Binary":
				numToConvert = new BinaryOperand(numToConvert);
				break;
			case "Hexadecimal":
				numToConvert = new HexadecimalOperand(numToConvert);
				break;
			case "Octal":
				numToConvert = new OctalOperand(numToConvert);
				break;
			case "Binary Coded Decimal":
				numToConvert = new BinaryCodedDecimalOperand(numToConvert);
				break;
		};

		if (!(fromType === toType))
		{
			var conversionResults;
		
			switch (toType)
			{
				case "Decimal":
					conversionResults = numToConvert.convertToDecimal();
					break;
				case "Binary":
					conversionResults = numToConvert.convertToBinary();
					break;
				case "Hexadecimal":
					conversionResults = numToConvert.convertToHexadecimal();
					break;
				case "Octal":
					conversionResults = numToConvert.convertToOctal();
					break;
				case "Binary Coded Decimal":
					conversionResults = numToConvert.convertToBinaryCodedDecimal();
					break;
			};
		
			this.setSolution(conversionResults[0]);
			this.setSteps(conversionResults[1]);
		}
		
		$("#SolverPage #solverStepsSection").show();
	}
	catch (err)
	{
		alert(err);
		$("#SolverPage #solverStepsSection").hide();
	}
};

/*
	Displays each and every step in the current solution for the user.
*/

SolverControl.prototype.displaySolution = function()
{
	var solutionSteps = this.getSteps();
	var stepList = document.getElementById("solutionSteps");
	
	var i, itemToAppend;
	
	$(stepList).empty(); // Clear steps list
	
	itemToAppend = document.createElement("LI");
	itemToAppend.innerHTML = "<li>" + this.getEquation() + " = " + this.getSolution() + "</li>";
	stepList.appendChild(itemToAppend);
	
	itemToAppend = document.createElement("LI");
	itemToAppend.innerHTML = "<li><br /><h3>Steps</h3><br /></li>";
	stepList.appendChild(itemToAppend);
	
	for (i = 0; i < solutionSteps.length; i++)
	{
		itemToAppend = document.createElement("LI");
		itemToAppend.innerHTML = solutionSteps[i].getMarkup();
		$(itemToAppend).enhanceWithin();
		stepList.appendChild(itemToAppend);
	}
	
	$(stepList).listview("refresh");
};

/*
	Displays the arithmetic form and hides and conversion form.
*/

SolverControl.prototype.displayArithmeticForm = function()
{
	$("#SolverPage #arithmeticForm").show();
	$("#SolverPage #conversionForm").hide();
	initializeSolverPage();
};

/*
	Displays the conversion form and hides the arithmetic form.
*/

SolverControl.prototype.displayConversionForm = function()
{
	$("#SolverPage #arithmeticForm").hide();
	$("#SolverPage #conversionForm").show();
	initializeSolverPage();
};

/*
	--------------------------
	End of SolverControl class
	--------------------------
*/

/*
	PracticeControl class
	---------------------
*/

var PracticeControl = function()
{
	var equation = "";
	var problem = "";
	var postfix = "";
	var solution = "";
	var operandType = "";
	var solutionSteps;
	var topicChoice = "";
	var stepsRevealed = 0;
	var maxSteps = 0;
	
	this.getEquation = function(){return equation;};
	this.getPostfix = function(){return postfix;};
	this.getSolution = function(){return solution;};
	this.getSteps = function(){return solutionSteps;};
	this.getTopicChoice = function(){return topicChoice;};
	this.getStepsRevealed = function(){return stepsRevealed;};
	this.getProblem = function(){return problem;};
	this.getMaxSteps = function(){return maxSteps;};
	this.getOperandType = function(){return operandType;};
	
	this.setEquation = function(newEquation){equation = newEquation;};
	this.setPostfix = function(newPostfix){postfix = newPostfix;};
	this.setSolution = function(newSolution){solution = newSolution;};
	this.setSteps = function(newSteps){solutionSteps = newSteps;};
	this.setTopicChoice = function(newTopicChoice){topicChoice = newTopicChoice;};
	this.raiseStepsRevealed = function(){stepsRevealed++;};
	this.setProblem = function(newProblem){problem = newProblem;};
	this.setMaxSteps = function(newMaxSteps){maxSteps = newMaxSteps};
	this.setOperandType = function(newOperandType){operandType = newOperandType};
	this.resetStepsRevealed = function(){stepsRevealed = 0;};
};

/*
	Generates a practice problem depending on the user's choice of topic.
*/

PracticeControl.prototype.generateProblem = function()
{
	var equation = "", problem = "";
	var topicChoice = this.getTopicChoice();
	
	switch(topicChoice)
	{
		case "Decimal-to-Binary Conversion":
			equation = getRandomNumber("Decimal");
			problem = "Convert " + equation + " to binary";
			this.setOperandType("Decimal");
			break;
		case "Decimal-to-Hexadecimal Conversion":
			equation = getRandomNumber("Binary");
			problem = "Convert " + equation + " to hexadecimal";
			this.setOperandType("Decimal");
			break;
		case "Decimal-to-Octal Conversion":
			equation = getRandomNumber("Decimal");
			problem = "Convert " + equation + " to octal";
			this.setOperandType("Decimal");
			break;
		case "Decimal-to-BCD Conversion":
			equation = getRandomNumber("Decimal");
			problem = "Convert " + equation + " to BCD";
			this.setOperandType("Decimal");
			break;
		case "Binary-to-Decimal Conversion":
			equation = getRandomNumber("Binary");
			problem = "Convert " + equation + " to decimal";
			this.setOperandType("Binary");
			break;
		case "Binary-to-Hexadecimal Conversion":
			equation = getRandomNumber("Binary");
			problem = "Convert " + equation + " to hexadecimal";
			this.setOperandType("Binary");
			break;
		case "Binary-to-Octal Conversion":
			equation = getRandomNumber("Binary");
			problem = "Convert " + equation + " to octal";
			this.setOperandType("Binary");
			break;
		case "Binary-to-BCD Conversion":
			equation = getRandomNumber("Binary");
			problem = "Convert " + equation + " to BCD";
			this.setOperandType("Binary");
			break;
		case "Hexadecimal-to-Decimal Conversion":
			equation = getRandomNumber("Hexadecimal");
			problem = "Convert " + equation + " to decimal";
			this.setOperandType("Hexadecimal");
			break;
		case "Hexadecimal-to-Binary Conversion":
			equation = getRandomNumber("Hexadecimal");
			problem = "Convert " + equation + " to binary";
			this.setOperandType("Hexadecimal");
			break;
		case "Hexadecimal-to-Octal Conversion":
			equation = getRandomNumber("Hexadecimal");
			problem = "Convert " + equation + " to octal";
			this.setOperandType("Hexadecimal");
			break;
		case "Hexadecimal-to-BCD Conversion":
			equation = getRandomNumber("Hexadecimal");
			problem = "Convert " + equation + " to BCD";
			this.setOperandType("Hexadecimal");
			break;
		case "Octal-to-Decimal Conversion":
			equation = getRandomNumber("Octal");
			problem = "Convert " + equation + " to decimal";
			this.setOperandType("Octal");
			break;
		case "Octal-to-Binary Conversion":
			equation = getRandomNumber("Octal");
			problem = "Convert " + equation + " to binary";
			this.setOperandType("Octal");
			break;
		case "Octal-to-Hexadecimal Conversion":
			equation = getRandomNumber("Octal");
			problem = "Convert " + equation + " to hexadecimal";
			this.setOperandType("Octal");
			break;
		case "Octal-to-BCD Conversion":
			equation = getRandomNumber("Octal");
			problem = "Convert " + equation + " to BCD";
			this.setOperandType("Octal");
			break;
		case "BCD-to-Decimal Conversion":
			equation = getRandomNumber("Binary Coded Decimal");
			problem = "Convert " + equation + " to decimal";
			this.setOperandType("Binary Coded Decimal");
			break;
		case "BCD-to-Binary Conversion":
			equation = getRandomNumber("Binary Coded Decimal");
			problem = "Convert " + equation + " to binary";
			this.setOperandType("Binary Coded Decimal");
			break;
		case "BCD-to-Hexadecimal Conversion":
			equation = getRandomNumber("Binary Coded Decimal");
			problem = "Convert " + equation + " to hexadecimal";
			this.setOperandType("Binary Coded Decimal");
			break;
		case "BCD-to-Octal Conversion":
			equation = getRandomNumber("Binary Coded Decimal");
			problem = "Convert " + equation + " to octal";
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary Addition":
			equation = getRandomNumber("Binary") + " + " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Addition":
			equation = getRandomNumber("Hexadecimal") + " + " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Addition":
			equation = getRandomNumber("Octal") + " + " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "BCD Addition":
			equation = getRandomNumber("Binary Coded Decimal") + " + " + getRandomNumber("Binary Coded Decimal");
			problem = "Compute " + equation;
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary Subtraction":
			equation = getRandomNumber("Binary") + " - " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Subtraction":
			equation = getRandomNumber("Hexadecimal") + " - " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Subtraction":
			equation = getRandomNumber("Octal") + " - " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "BCD Subtraction":
			equation = getRandomNumber("Binary Coded Decimal") + " - " + getRandomNumber("Binary Coded Decimal");
			problem = "Compute " + equation;
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary Multiplication":
			equation = getRandomNumber("Binary") + " * " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Multiplication":
			equation = getRandomNumber("Hexadecimal") + " * " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Multiplication":
			equation = getRandomNumber("Octal") + " * " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "BCD Multiplication":
			equation = getRandomNumber("Binary Coded Decimal") + " * " + getRandomNumber("Binary Coded Decimal");
			problem = "Compute " + equation;
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary Division":
			equation = getRandomNumber("Binary") + " / " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Division":
			equation = getRandomNumber("Hexadecimal") + " / " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Division":
			equation = getRandomNumber("Octal") + " / " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "BCD Division":
			equation = getRandomNumber("Binary Coded Decimal") + " / " + getRandomNumber("Binary Coded Decimal");
			problem = "Compute " + equation;
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary Complement":
			equation = "~" + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Complement":
			equation = "~" + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Complement":
			equation = "~" + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "BCD Complement":
			equation = "~" + getRandomNumber("Binary Coded Decimal");
			problem = "Compute " + equation;
			this.setOperandType("Binary Coded Decimal");
			break;
		case "Binary And":
			equation = getRandomNumber("Binary") + " & " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal And":
			equation = getRandomNumber("Hexadecimal") + " & " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal And":
			equation = getRandomNumber("Octal") + " & " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "Binary Or":
			equation = getRandomNumber("Binary") + " | " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Or":
			equation = getRandomNumber("Hexadecimal") + " | " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Or":
			equation = getRandomNumber("Octal") + " | " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
		case "Binary Exclusive Or":
			equation = getRandomNumber("Binary") + " ^ " + getRandomNumber("Binary");
			problem = "Compute " + equation;
			this.setOperandType("Binary");
			break;
		case "Hexadecimal Exclusive Or":
			equation = getRandomNumber("Hexadecimal") + " ^ " + getRandomNumber("Hexadecimal");
			problem = "Compute " + equation;
			this.setOperandType("Hexadecimal");
			break;
		case "Octal Exclusive Or":
			equation = getRandomNumber("Octal") + " ^ " + getRandomNumber("Octal");
			problem = "Compute " + equation;
			this.setOperandType("Octal");
			break;
	};
	
	this.setEquation(equation);
	this.setPostfix(toPostfix(equation))
	this.setProblem(problem);
};

/*
	Computes the solution to the current problem and generates a list of steps required to reach that solution.
*/

PracticeControl.prototype.computeSolution = function()
{
	try
	{
		var evaluationResults;
		
		if (this.getTopicChoice().indexOf("Conversion") === -1)
		{
			evaluationResults = evaluate(this.getPostfix(), this.getOperandType());
		}
		else
		{
			var numToConvert = this.getEquation();
			
			switch (this.getOperandType())
			{
				case "Decimal":
					numToConvert = new DecimalOperand(numToConvert);
					break;
				case "Binary":
					numToConvert = new BinaryOperand(numToConvert);
					break;
				case "Hexadecimal":
					numToConvert = new HexadecimalOperand(numToConvert);
					break;
				case "Octal":
					numToConvert = new OctalOperand(numToConvert);
					break;
				case "Binary Coded Decimal":
					numToConvert = new BinaryCodedDecimalOperand(numToConvert);
				break;
			};
			
			var problem = this.getProblem();
			
			if (problem.indexOf("to binary") !== -1)
			{
				evaluationResults = numToConvert.convertToBinary();
			}
			else if (problem.indexOf("to decimal") !== -1)
			{
				evaluationResults = numToConvert.convertToDecimal();
			}
			else if (problem.indexOf("to hexadecimal") !== -1)
			{
				evaluationResults = numToConvert.convertToHexadecimal();
			}
			else if (problem.indexOf("to octal") !== -1)
			{
				evaluationResults = numToConvert.convertToOctal();
			}
			else if (problem.indexOf("to BCD") !== -1)
			{
				evaluationResults = numToConvert.convertToBinaryCodedDecimal();
			}
		}
		
		this.setSolution(evaluationResults[0]);
		$(document.getElementById("practiceSolutionSteps")).empty();
		this.setSteps(evaluationResults[1]);
		this.setMaxSteps(evaluationResults[1].length);
		
		var stepsRevealed = document.getElementById("stepsRevealed");
		stepsRevealed.value = "Steps Revealed: " + this.getStepsRevealed() + "/" + this.getMaxSteps();
	}
	catch(err)
	{
		alert(err);
	}
};

/*
	Reads in a user's solution and checks it against the system's solution.
	Displays a congratulatory message if the user was correct and generates a new problem under the same topic.
	The user is otherwise informed that their answer was incorrect.
*/

PracticeControl.prototype.validateUserSolution = function(userSolution)
{
	var base;
	
	switch(this.getOperandType())
	{
		case "Decimal":
			base = DECIMAL;
			break;
		case "Binary":
			base = BINARY;
			break;
		case "Hexadecimal":
			base = HEXADECIMAL;
			break;
		case "Octal":
			base = OCTAL;
			break;
		case "Binary Coded Decimal":
			base = BINARY;
			break;
	};
	
	var userSolution = parseInt(document.getElementById("answerInput").value, base);
	
	if (isNumeric(userSolution))
	{
		var isCorrect = ((parseInt(this.getSolution(), base)) === userSolution);
	
		if (isCorrect)
		{
			alert("Congratulations! Your answer was correct!");
			this.skipProblem();
		}
		else
		{
			alert("Unfortunately, your answer was incorrect.");
		}
	}
};

/*
	Skips the current problem and generates a new problem.
	This method also resets the input and output fields.
*/

PracticeControl.prototype.skipProblem = function()
{
	this.setSteps([]);
	this.resetStepsRevealed();
	this.generateProblem();
	this.computeSolution();
	document.getElementById("problem").innerHTML = this.getProblem();
	document.getElementById("answerInput").value = "";
	$(document.getElementById("practiceSolutionSteps")).empty();
};

/*
	Reveals the next step in the solution (if one exists).
*/

PracticeControl.prototype.revealStep = function()
{
	var stepList = document.getElementById("practiceSolutionSteps");
	var solutionSteps = this.getSteps();
	
	if (solutionSteps.length > 0)
	{
		var itemToAppend = document.createElement("LI");
		itemToAppend.innerHTML = solutionSteps[0].getMarkup();
		$(itemToAppend).enhanceWithin();
		stepList.appendChild(itemToAppend);
	
		solutionSteps.splice(0, 1);
	
		this.raiseStepsRevealed();
	
		var stepsRevealed = document.getElementById("stepsRevealed");
		stepsRevealed.value = "Steps Revealed: " + this.getStepsRevealed() + "/" + this.getMaxSteps();
		
		$(stepList).listview("refresh");
	}
};

/*
	----------------------------
	End of PracticeControl class
	----------------------------
*/