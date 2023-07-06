$.getScript("./js/moment.js", function() {
        console.log("moment library loaded")
});

function check() {

    document.getElementById("messages").innerHTML = "";
    var pass = document.getElementById("password").value;
    var passconfirm = document.getElementById("passwordconfirm").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var edad = document.getElementById("edad").value;
    var valid_email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    var checkGenero = document.querySelector('input[name="genero"]:checked');
    var msg = [];

    if (pass != passconfirm) {
        msg.push("Las contraseñas no coinciden");
    }if (pass.length < 10 ) {
        msg.push("La contraseña debe tener al menos 10 caracteres");
    }if(checkGenero ==null){
        msg.push("Por favor seleccione su genero");
    }if (nombre.length < 6 || apellido.length < 6) {
        msg.push("Por favor ingrese al menos 6 caracteres en campo nombre y apellido");
    }else if(nombre.length > 15 || apellido.length > 15){
        msg.push("Por favor ingrese menos de 16 caracteres en el campo nombre y apellido");
    }if (edad < 18) {
        msg.push("Debes ser mayor de edad");
    }else if (edad > 50) {
        msg.push("Debes ser menor de 50 años");
    }if (!valid_email.test(email)) {
        msg.push("Debes ingresar un Email valido");
    }

    if (msg.length > 0) {
        msg.forEach(messagefunc) 
    } else {
        document.getElementById("messages").innerHTML = '<div class="alert alert-success" role="alert">Registro exitoso!</div>';
    }
}

function messagefunc(element, index, array) {
    document.getElementById("messages").innerHTML += '<div class="alert alert-danger" role="alert">Error '+element+'!</div>';
    console.log("a["+index+"] = " + element)
}


function alertconfirm(input,value,type,length) {
    let check = '';
    let msg = '';
    let checkFormat = moment(value, "YYYY/MM/DD", true).isValid()
    const onlyNumbers = /^\d+$/;
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value == '' || value == null) {
        check = check + 1
        msg = msg + `<span class="text-danger text-center">*${input} es requerido </span><br>`
        }if (type && type =='string') {
            if (length && value.length < 3) {
                check = check +  1
                msg = msg + `<span class="text-danger text-center">-${input} debe contener al menos 3 caracteres </span><br>`
            }else if (length && value.length > length) {
                check = check +  1
                msg = msg + `<span class="text-danger text-center">-${input} debe contener menos de ${length} caracteres </span><br>`
            }          
        } else if(type && type == 'int'){
            if (value <= length) {
                check = check + 1
                msg = msg + `<span class="text-danger text-center">-${input} debe ser mayor a ${length} </span><br>`
            }
            if(onlyNumbers.test(value)==false){
                check = check + 1
                msg = msg + `<span class="text-danger text-center">-${input} solo se permiten numeros </span><br>`                
            }
        }else if(type && type =='array'){
            if (value.length <= length) {
                check = check + 1
                msg = msg + `<span class="text-danger text-center">-${input} Debe tener seleccionada al menos una opcion </span><br>`                
            }
        }else if(type && type =='date'){
            if (checkFormat ===false) {
                check = check + 1
                msg = msg + `<span class="text-danger text-center">-${input}, Formato de fecha no valido, debe ser AÑO/MES/DIA </span><br>`
            }
        }else if(type && type=='email'){
            if (validEmail.test(value)===false) {
                check = check + 1
                msg = msg + `<span class="text-danger text-center">-${input}, Direccion de email invalida </span><br>`                
            }
        }
    
    if (check == '') {
        return check;
    } else {
        return msg;
    }
}