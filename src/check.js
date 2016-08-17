function getMessage(a, b) {
 var numberOfSteps = 0, distancePath = 0;

  if( typeof(a) === "boolean" ){
    return a === true ? ('Я попал в ' + b) : "Я никуда не попал";
  }

  if(typeof(a) == "number"){
    return 'Я прыгнул на ' + a*100 + ' сантиметров';
  }

  if(Array.isArray(a) === true && Array.isArray(b) === true){

    if(a.length <= b.length){
    d = a.length;
    }
    else{
      d = b.length;
    }

    for (i = 0; i<d; i++){
      distancePath += a[i]*b[i];
    }
    return 'Я прошёл ' + distancePath + ' метров';
  }

  if(Array.isArray(a) === true){

    for (var i = 0; i<a.length; i++) {
      numberOfSteps += a[i];
    }
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }
}
