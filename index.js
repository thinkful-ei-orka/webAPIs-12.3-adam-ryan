const express = require('express');
const morgan = require('morgan');

const app = express();


app.get('/sum',(req,res)=>{
  const a = req.query.a;
  const b = req.query.b;
  if(typeof Number(a)!=='number'||typeof Number(b)!=='number'||(!a&&!b)){
    return res.status(400).send('Please provide two numerical values');
  }
  res.send(`<h1>The sum of ${a} and ${b} is ${Number(a)+Number(b)}</h1>`);
});

app.get('/cipher',(req,res)=>{
  const text = req.query.text;
  const shift = Number(req.query.shift);

  const text2=text
    //makes all the text upper cased and separates the string into an array of characters
    .toUpperCase().split('')
    //gets the character code for each then shifts it up by the shifter amount
    //also tests and maintains spaces (40)
    .map(x=>x.charCodeAt(0)!==32?x.charCodeAt(0)+shift:32)
    //if the new charcode is greater than the code for 'Z' (90) then add the required amount to pass it to it's lowercase equivalent
    .map(x=>x>90?x+6:x)
    //changes the array of charcodes to their string equivalents
    .map(x=>String.fromCharCode(x))
    //joins the array of new characters together
    .join('');

  //sends the html for the headers and both original text, and the lowercase'd new string
  res.send(`<h1>Original Message:</h1><p>${text}</p></n><h1>Result:</h1><p>${text2.toLowerCase()}</p>`);
})

app.get('/lotto',(req,res)=>{
  const numbers = req.query.numbers.map(x=>Number(x));
  let pool = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  let house = [];
  for(let i=0;i<6;i++){
    house.push(pool.splice(Math.floor((pool.length-1)*Math.random())+1,1));
  }
  //res.send(`<p>${house.join('')}</p>`)
  let check = house.map(x=>numbers.some(y=>y===x?1:0)).reduce((a,b)=>a+b);

  res.send(`<h1>Your Numbers:</h1><p>${numbers.join(', ')}</p><h1>Lotto Numbers:</h1><p>${house.join(', ')}</p><h3>${check>4?check<6?check===4?'Congratulations, you win a free ticket':'Congratulations! You winn $100!':'Wow! Unbelievable! You could have won the mega millions!':'Sorry, you lose.'}</h3>`);



})

app.get('/',(req,res)=>{
  res.send('Testing init');
})

app.listen(8080,()=>{
  console.log('placeholder')
})