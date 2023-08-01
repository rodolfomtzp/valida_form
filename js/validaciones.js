/*

const nacimiento = document.querySelector("#birth");

nacimiento.addEventListener("blur", (evento) => {
    console.log(evento.target);
    validarNacimiento(evento.target);
});

*/

export function valida( input ) {
    const tipoDeInput = input.dataset.tipo;
    
    if( validadores[tipoDeInput] ){
        validadores[tipoDeInput](input);
    }


    //console.log(input.parentElement);

    if( input.validity.valid ){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError( tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
];

const mensajesDeError = {
    nombre : {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email : {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password : {
        valueMissing: "El campo contaseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número, no incluir caracteres especiales.",
    },
    nacimiento : {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años",
    },
    telefono : {
        valueMissing: "El campo teléfono no puede estar vacío",
        patternMismatch : "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion : {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch : "La dirección debe tener entre 10 a 40 caracteres",
    },
    ciudad : {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch : "La ciudad debe tener entre 10 a 40 caracteres",
    },
    estado : {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch : "El estado debe tener entre 10 a 40 caracteres",
    }

}

const validadores = {
    nacimiento : (input) => validarNacimiento( input ),
}

function mostrarMensajeDeError( tipoDeInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach( error => {
        if( input.validity[error] ){
            console.log( error );
            console.log( input.validity[error] );
            console.log( mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}


function validarNacimiento( input ){
    //const fecha = input.value;
    const fechaCliente = new Date( input.value );
    //console.log(fechaCliente);
    //mayorDeEdad( fechaCliente );

    let mensaje = "";

    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años";

        console.log(mensaje);
    }

    //console.log(input);
    
    input.setCustomValidity(mensaje);
}

function mayorDeEdad( fecha ) {
    const fechaActual = new Date();

    const diferenciaFechas = new Date( 
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    //console.log( fecha, fechaActual )
    //console.log( diferenciaFechas <= fechaActual )

    return diferenciaFechas <= fechaActual;
}

//console.log("Validaciones");
