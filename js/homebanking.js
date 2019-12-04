//Declaración de variables
var nombreUsuario = "Gonzalo";
var limiteExtraccion = 3000;
var saldoCuenta = 10000;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}




//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var inputLimite = prompt('Ingrese el limite de extraccion');
    var inputNumero = Number(inputLimite);

    if(validacion(inputLimite) && esMultiploDeCien(inputNumero)) {
        limiteExtraccion = inputNumero;
        actualizarLimiteEnPantalla();
        alert ('Su nuevo limite de extraccion es de $' + inputNumero);
    } else {
        alert('Ingrese un valor correcto.\nRecuerde no dejar el campo vacio e ingresar valores numericos mayores a 0 y multiplos de 100');
    }
}

function validacion(cantString){
    var numValidacion = Number(cantString);
    if (cantString === "" || cantString == null || isNaN(numValidacion) || numValidacion <= 0 ) {
        return false;
    } else {
        return true;
    }
}

function esMultiploDeCien(numero){
    var multiplo = numero % 100;

    if (multiplo === 0){
        return true;
    } else {
        return false;
    }
}

function extraerDinero() {
    var inputExtraccion = prompt('Ingrese valor de extraccion');
    var saldoAnterior = saldoCuenta;
    var numExtraccion = Number(inputExtraccion);
    if(validacion(inputExtraccion) && esMultiploDeCien(numExtraccion) && numExtraccion <= limiteExtraccion && haySaldoDisponible(numExtraccion,saldoCuenta)){
        saldoCuenta = saldoCuenta - numExtraccion;
        actualizarSaldoEnPantalla();
        alert('Has retirado: $' + numExtraccion + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta)
    } else {
        if (!validacion(inputExtraccion)){
            alert('Ingrese solo valores numericos mayores a 0.');
        } else if (!esMultiploDeCien(numExtraccion)){
            alert('Solo puedes extraer billetes de 100.\nIngrese un valor multiplo de 100.');
        } else if (numExtraccion > limiteExtraccion) {
            alert('La cantidad de dinero que deseas extraer es mayor a tu limite de extraccion.');
        } else if(!haySaldoDisponible(numExtraccion,saldoCuenta)) {
        alert ('No puede extraer un monto mayor a su saldo.');
        }
    }
}

function haySaldoDisponible(numExtraccion,saldoCuenta){
    if(numExtraccion <= saldoCuenta){
        return true;
    } else {
        return false;
    }
}

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var inputDeposito = prompt('Ingrese valor a depositar');
    var numDeposito = Number(inputDeposito);
    if(validacion(inputDeposito) && esMultiploDeCien(numDeposito)){
        saldoCuenta = saldoCuenta + numDeposito;
        actualizarSaldoEnPantalla();
        alert('Has depositado: $' + numDeposito + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual:$' + saldoCuenta);
    } else {
        alert('Utilice valores numericos multiplos de 100');
    }
}

function pagarServicio() {
    var servicio;
    var precioFactura;
    var precioAgua = 350;
    var precioTelefono = 425;
    var precioLuz = 210;
    var precioInternet = 570;
    var numServicio = prompt('Ingrese el numero que corresponda con el servicio que quieras pagar\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Telefono');

    if (!validacion(numServicio) || Number(numServicio) > 4 
    || Number(numServicio) <= 0){
        alert('Ingrese un valor numerico correcto');
    } else {
        switch (numServicio) {
            case "1":
            precioFactura = precioAgua;
            servicio = "Agua";
            break;
            case "2":
            precioFactura = precioLuz;
            servicio = "Luz";
            break;
            case "3":
            precioFactura = precioInternet;
            servicio = "Internet";
            break;
            case "4":
            precioFactura = precioTelefono;
            servicio = "Telefono";
            break;
        }

        if(haySaldoDisponible(precioFactura,saldoCuenta)){
            var saldoAnterior = saldoCuenta;
            saldoCuenta = saldoCuenta - precioFactura;
            alert('Has pagado el servicio de ' + servicio + '.\nSaldo anterior: $' + saldoAnterior + '\nDinero descontado: $' + precioFactura + '\nSaldo actual: $' + saldoCuenta);
            actualizarSaldoEnPantalla();
        } else {
            alert('No hay suficiente saldo en tu cuenta para pagar este servicio');
        }
    }
}

function transferirDinero() {
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;
    var inputTransferencia = prompt('Ingrese el monto que desea transferir');
    var numTransferencia = Number(inputTransferencia);

    if (validacion(inputTransferencia) && haySaldoDisponible(numTransferencia,saldoCuenta)) {
        var inputCuenta = prompt('Ingrese el numero de cuenta al que desea transferir el dinero');
        if (inputCuenta == cuentaAmiga1 || inputCuenta == cuentaAmiga2){
            saldoCuenta = saldoCuenta - numTransferencia;
            alert('Se han transferido $' + numTransferencia + '\nCuenta destino: ' + inputCuenta);
            actualizarSaldoEnPantalla();
        } else {
            alert('Solo puede transferirse dinero a una cuenta amiga');
        }
    } else {
        alert('No hay saldo suficiente para hacer esta transaccion');
    }
}

function iniciarSesion() {
    var claveSeguridad = 1234;
    var ingresoSesion = prompt('Ingrese el codigo de su cuenta');
    if(ingresoSesion == claveSeguridad){
        alert('Bienvenido/a ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones');
    } else {
        saldoCuenta = 0;
        alert('Codigo incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad');
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}