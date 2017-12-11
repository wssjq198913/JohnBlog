To do: function的提升  var的提升

var c = 2;
 
 function c(){
 
　　c = 22;
 
　　console.log("c="+c);
 
 }
 
 c();