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
	var x='James' //x is redeclared.Allowed
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
	Hoisting: variable declared with let is hoisted but stay in a temporal dead zone.This means the variable can not be accessed before decleration.
	
	redeclare and reinitialize : variable using let can not be redeclared but it can be reintialized.
	
	Example:
	
	console.log(x) //ReferenceError 
	let x=30; 
	let x='James' //Here x is redeclared which is not valid. SyntaxError
	x=20; // x is reinitialized

    console.log(x)
	
iii.) const =>
	scope: const is block scoped.
	
	Hoisting: variable declared with const is hoisted. But stay in a temporal dead zone
	
	redeclare and reinitialize : variable using const can not be redeclared or reintialized.But for non premitive data type like array,object only the reference can't be changed.But you can modify the data inside the array,object
	
	Example:
	
	console.log(x) //ReferenceError 
	const x=30; 
	const x='James' //Here x is redeclared which is not valid. SyntaxError
	x=20; // x is reinitialized which is not allowed. TypeError
	console.log(x) 
	
	
2) What is the difference between map(), forEach(), and filter()? 

map,forEach,filter are some of the array methods.They don't modify the original array.The deferences are as following
i.) map()=>
	
	a) Transformation: map() is used to transform each element of an array. It is done by applying a callback function. a callback function is noting a function that is passed inside as a parameter.map transforms the data according to the callback function
	
	b) Return Value	: It returns a new array after compilation of the transformation.The number of array element in the new array equals that of the previous array.
	
	c)It is used when every element of a array need to go through a transformation.map() doesn't change the previous array.It internally copy the array do the transformation and returns it.
	
	Example:
	const arr=[1,2,3]
	const ar2=arr.map(x=>x*2)
	console.log(ar2) // [2,4,6]
	
ii.)forEach() =>

	a)It is used to loop over every element of a array with the help of a callback function.
	
	b) Return Value	: It returns undefined
	
	c)It is used only when there is no need for a return of an array and also for console.log every element or just apply a change.
	
	Example:
	
	const arr=[1,2,3]
	arr.forEach(x=>console.log(x*2))
	
iii.) filter() =>
	a)It is used when we want to split and bring out elements from an array based on a condition.filter() uses a callback function to achive it.
	b) It returns boolean and  a array containg the elements of the previous array that passed the conditional checks.
	c) it is used to generate a subset of the previous array 
	
	Example:
	const arr=[1,2,3]
	const ar2=arr.filter(x=>x%2)
	console.log(ar2) // [1,3]
	
	
 3) What are arrow functions in ES6?
 
 Ans: arrow function is a shorter way of declaring function. arrow function doesn't have arguments object like traditional function. when declaring arrow function we don't use function keyword.arrow function doesn't have its own "this" .It can be used to write shorthand callback function.arrow function are not hoisted.They are not intialized untill execution

=>
		basic syntax: parameter=>body

		multiline and multiparameter syntax: (param1,param2)=>{ return body}

		when arrow function has 1 parameter and 1 expression we can avoid the bracket and return as it automatically returns the body 

4) How does destructuring assignment work in ES6?

Ans: Destructuring is used to extract values from array and property from obje.It is used a shorthand for writing more clean and readable and concise code.

i.) Array Destructuring: 
	Example: const arr=[1,2,3]
	const [x,y,z]=arr
	console.log(x) //1
	console.log(y) //2
	console.log(z) //3
	
	In array distructuring values are destructured according to their position
	
	You can skip like this
	
	Example: const arr=[1,2,3]
	const [x,,z]=arr
	console.log(x) //1
	console.log(z) //3

ii.) Object Destructuring:

	const lb ={ firstName: "Labib", age: 28, married: true};
	
	const {firstName,age,married}=lb
	console.log(firstName,age,married) //'Labib' 28 true
	
	Note: variable name and the property key must match for destructuring
	
	You can also rename the variable like this :
	
	
	const lb ={ firstName: "Labib", age: 28, married: true};
	const {firstName:name,age,married}=lb
	console.log(name,age,married) // 'Labib' 28 true
	
	You can even skip like this
	
	const lb ={ firstName: "Labib", age: 28, married: true};
	const {firstName:name,married}=lb
	console.log(name,married) //'Labib' true
	
	what happened here is that if a variable matches the property key then the variable gets the value.Otherwise it skips it.
	

5) Explain template literals in ES6. How are they different from string concatenation?

Ans: template literals is a type of string literals denoted by backticks (``) which can be used to write multiline strings.We can't normally write multine line string with string concatanation.Without using '\n' multiline strings can be written with templete literals.And also we can directly write the variable inside the templete literal using dollar sign and brackets like this: `${variable name}` and can avoid unexpected type Coercion.