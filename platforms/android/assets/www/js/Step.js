/*
	BitTutor Step.js
	----------------
	Written By: Bradley Katz and Gabriel Ngai
	Date: 2015-12-05
*/

/*
	The following is a basic step class. 
	It is used to encapsulate markup for a single step of a solution.
	The class contains two methods, getMarkup and setMarkup. These methods are used to access and mutate the instance variable stepMarkup.
*/

var Step = function(inputString)
{
	var stepMarkup = inputString;
	
	this.getMarkup = function(){return stepMarkup;};
	this.setMarkup = function(newMarkup){stepMarkup = newMarkup};
};

/*
	This class is nearly identical to Step, with the only difference being what is stored in stepMarkup.
	The constructor takes two parameters this time, a header string and a content string.
	This is because CollapsibleStep is used to display a series of smaller steps in a collapsible widget. This is done to save space and make the solution more presentable.
*/

var CollapsibleStep = function(headerString, contentString)
{
	var stepMarkup = "<div data-role=\"collapsible\" data-inset=\"false\" data-mini=\"true\" class=\"collapsibleSteps\"><h6>" + headerString + "</h6><p>" + contentString + "</p></div>";
	
	this.getMarkup = function(){return stepMarkup;};
	this.setMarkup = function(newMarkup){stepMarkup = newMarkup};
};