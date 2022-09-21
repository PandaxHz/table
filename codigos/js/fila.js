var fila = []

function addNumeros() {
    dado = document.getElementById('valor').value
    fila.push(dado)
    console.log(fila)
    document.getElementById("box2").innerHTML = fila
    return false
  }

  function removeNumeros() {
    dado = document.getElementById('valor').value
    fila.shift(dado)
    console.log(fila)
    document.getElementById("box2").innerHTML = fila
    return false
  }
