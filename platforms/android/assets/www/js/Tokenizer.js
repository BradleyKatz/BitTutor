/*
	BitTutor Tokenizer.js
	---------------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
*/

const OPERAND_EXPRESSION = new RegExp("^\\s*-?[0-9A-F]+");
const OPERATOR_EXPRESSION = new RegExp("^\\s*[+-/*&|~^()]");
const PATTERNS = [OPERATOR_EXPRESSION, OPERAND_EXPRESSION];
const PATTERN_IDS = [OPERATOR, OPERAND];
const FIRST_TOKEN = "";

/*
	Implementation of a Tokenizer ADT.
	Tokenizer objects use two regular expressions in order to split a given string into a series of tokens representing both operand and operators.
	The tokenizer class provides a clean interface for working with a string's tokens one token at a time.
*/

var Tokenizer = function(inputString)
{
	var tokenizerString = inputString;
	this.close = function(){tokenizerString = null;}; // Sets a tokenizer to its closed state, meaning that it can no longer be worked with.
	
	/*
		The hasNext method returns true if there are still tokens left to be extracted from the tokenizer's string.
		It otherwise returns false.
	*/
	
	this.hasNext = function()
	{
		if (tokenizerString === null)
		{
			throw new SyntaxError("ERROR: This tokenizer is closed!");
		}
		else
		{
			return tokenizerString.length > 0;
		}
	};
	
	/*
		The skip method takes a substring as input and removes it from the tokenizer's string.
		This method is primarily used to remove the token read and returned by next from the tokenizer's string.
	*/
	
	this.skip = function(stringToSkip)
	{
		if (tokenizerString === null)
		{
			throw new SyntaxError("ERROR: This tokenizer is closed!");
		}
		else if (stringToSkip.length === 0)
		{
			throw new SyntaxError("ERROR: This tokenizer's string is exhausted!");
		}
		else if (stringToSkip === FIRST_TOKEN)
		{
			var skipped = null;
			
			tokenizerString = tokenizerString.trim();
			
			if (tokenizerString.length > 0)
			{
				skipped = tokenizerString.substring(0, 1);
				tokenizerString = tokenizerString.substring(1, tokenizerString.length - 1);
			}
			else
			{
				skipped = "";
			}
			
			return skipped;
		}
		else if (tokenizerString.startsWith(stringToSkip))
		{
			tokenizerString = tokenizerString.substring(stringToSkip.length);
			return stringToSkip;
		}
		else
		{
			throw SyntaxError("ERROR: '" + stringToSkip + "' can't be found in '" + tokenizerString + "'");
		}
	};
	
	/*
		Returns the next token from the tokenizer's string if one exists, otherwise throws an error.
	*/
	
	this.next = function()
	{
		var token = null;
		
		if (tokenizerString === null)
		{
			throw new SyntaxError("ERROR: This tokenizer is closed!");
		}
		else if (tokenizerString.length === 0)
		{
			throw new SyntaxError("ERROR: This tokenizer's string is exhausted!");
		}
		else
		{
			var i = 0;
			
			while ((token === null) && (i < PATTERNS.length))
			{	
				if (PATTERNS[i].test(tokenizerString))
				{
					var data = PATTERNS[i].exec(tokenizerString);
					token = new Token(data[0].trim(), PATTERN_IDS[i]);
					this.skip(data[0]);
				}
				else
				{
					i += 1;
				}
			}
			
			if (token === null)
			{
				var skipped = this.skip(FIRST_TOKEN);
				
				throw new SyntaxError("ERROR: No valid token starting with: '" + skipped + "'");
			}
		}
		
		return token;
	};
	
	this.toString = function(){return tokenizerString;}; // Returns a string representation of a tokenizer object.
};