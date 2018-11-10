var Names = ['白雨婷','鲍小海','周珣'];
var answer = Math.floor(Math.random()*Names.length);
// console.log(Names[answer]);
Names.splice(answer,1);
console.log(Names);
