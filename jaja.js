const metodtandasPageso = (num, size) => {
    let arr = [];
    let i = 1;
    while (num > 0) {
      arr.push(Array.from({ length: size }, () => i++).slice(0, num > size ? size : num));
      num -= size;
    }
    return arr;
  }


  console.log("**************************************");
  console.log(metodtandasPageso(17, 4))
  console.log("**************************************");




//   (
//     crea una funcion flecha que reciba 2 parametros, te muestro un ejemplo de lo que debe hacer el metodo:

//     metodo(32, 5), este metodo debe devolver un array con el siguiente formato:

//     [
//         [1,2,3,4,5],
//         [6,7,8,9,10],
//         [11,12,13,14,15],
//         [16,17,18,19,20],
//         [21,22,23,24,25],
//         [26,27,28,29,30],
//         [31,32]
//     ]

//   )


