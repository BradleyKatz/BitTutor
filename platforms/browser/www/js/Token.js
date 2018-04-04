/*
	BitTutor Token.js
	-----------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
*/

const OPERAND = 0;
const OPERATOR = 1;

/*
	Implementation of a Token ADT, primarily stored within Stack objects and Tokenizer objects.
	Tokens can represent either operators or operands from an equation.
*/

var Token = function(inputString, type)
{
	var tokenString, tokenType;
	
	tokenString = inputString;
	tokenType = type;
	
	this.isOperand = function() // Returns whether or not the token is an operand.
	{
		return tokenType === OPERAND;
	};
	
	this.isOperator = function() // Returns whether or not the token is an operator.
	{
		return tokenType === OPERATOR;
	};
	
	this.toString = function() // Returns a string representation of the token.
	{
		return tokenString;
	};
};