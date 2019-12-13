
iniciarSesion = () =>{
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(username, password);

    if(username=="" || password==""){
        alert("Es necesario llenar todos los campos");
    }else{
        $.ajax({ 
            type: 'POST',
            url: 'http://192.168.0.101:8000/',
            data: {username:username, password:password},
            success: function(data){
                if (data["Exito"]){
                    console.log("SI");
                    window.location.href = "index"
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                // console.log(XMLHttpRequest.responseJSON.Error)
                // // console.log(textStatus)
                // // console.log(errorThrown)
                // alert(XMLHttpRequest.responseJSON.Error);
            } 
        });
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

registrar = () =>{

    let first_name = document.getElementById("firstName").value;
    let last_name = document.getElementById("secondName").value;
    let email  = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;

    console.log(first_name, last_name, email, username, password, password2);

    if(first_name=="" || last_name=="" || email=="" || username=="" || password=="" || password2==""){
        alert("Favor de completar todos los campos");
    }else{

        if(validateEmail(email)){
            if(password==password2){
                $.ajax({ 
                    type: 'POST',
                    url: 'http://192.168.100.152:8000/registro',
                    data: {username:username, first_name:first_name, last_name:last_name, email:email, password:password},
                    success: function(data){
                        console.log(data);
            
                        if (data["Registrado"]){
                            console.log("SI");
                            alert("Registro correcto");
                        }else{
                            console.log(data);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // console.log(textStatus); 
                        // console.log(XMLHttpRequest)
                        // alert("Datos incorrectos. Verificalos nuevamente"); 
                        alert(XMLHttpRequest.responseJSON.Error);
                    } 
                });
            }
        }else{
            alert("Ingresa un correo válido");
        }
    }
}