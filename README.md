1) What is the difference between var, let, and const?

Ans:

In Javascript var,let,const is used to declare variable.The have the following differences:

i.) var=>

	scope: var is function scoped.It means it can be accessed anywhere in the function.Even if it is inside other block of code that is in a function
	Example: function lb(){
				var labib="labib"
				if(true){
					var hasan="hasan"
					console.log(labib) // prints "labib"
				}
				console.log(hasan)//prints "hasan" 
			}
			lb()
	Even though hasan is declared inside the if block it can be accessed outside
	
	Hoisting: variable declared with var is hoisted. hoisting means javascript takes the variable on top of the program.For var after hoisting if accessed before intialization then it will be undefined.
	
	redeclare and reinitialize: variable using var can be redeclared and reintialized.
	
	Example:
	console.log(x) //undefined and hoisted
	var x=30; 
	var x='James' //x is redeclared
	x=20; // x is reinitialized

	console.log(x) // prints 20
	
ii.) let=>
	 
	 scope: let is block scoped. It means that it can be accessed only inside of curly braces that it resides in.
	 Example: 
			function lb(){
				let labib="labib"
				if(true){
					let hasan="hasan"
					console.log(labib)//prints labib. this will not show because the code has a reference error
				}
				console.log(hasan)//reference error
			}	
			lb()
	

2) What is the difference between map(), forEach(), and filter()? 

 3) What are arrow functions in ES6?

4) How does destructuring assignment work in ES6?

5) Explain template literals in ES6. How are they different from string concatenation?