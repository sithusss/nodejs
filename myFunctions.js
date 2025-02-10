const math = (number1, number2, number3, number4) => {
    let a = number1 + number2 *2;
    //console.log(a);

    if(number3){
        a+= number3 - 5;
        //console.log(a);
    }

    
    if(number4){
        
        a*= number4;
        
    }
    
    return a;
} ;

export default math;