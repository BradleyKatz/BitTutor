/*
	BitTutor Stack.js
	-----------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
*/

/*
	Basic implementation of a stack used to store and access data in a last-in-first-out manner.
*/

var Stack = function()
{
	var stackArray = [];
	
	this.push = function(nodeToPush) // Adds a new item to the top of the stack.
	{
		stackArray.push(nodeToPush);
	};
	
	this.pop = function() // Removes and returns the item at the top of the stack.
	{
		return stackArray.pop();
	};
	
	this.peek = function() // Returns the item at the top of the stack, but does not remove it.
	{
		return stackArray[stackArray.length - 1];
	};
	
	this.isEmpty = function() // Checks whether or not the stack is empty or not. Returns true if the stack is indeed empty. Otherwise, returns false.
	{
		return stackArray.length === 0;
	};
};