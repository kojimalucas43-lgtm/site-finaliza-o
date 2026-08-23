function login(){
    var nome = $("#nome").val();
    var senha = $("#senha").val();

    if(nome && senha && nome === "admin" && senha === "12345"){
        const user = {
            name: nome,
            dataEntrada: new Date(),
            id: Math.floor(Math.random() * 100000)
        };
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "../loja";
    } else {
        document.getElementById("error-modal").style.display = "flex";
        document.getElementById("nome").style.borderBottom = "3px solid rgba(239, 108, 128, 0.832)";
        document.getElementById("senha").style.borderBottom = "3px solid rgba(239, 108, 128, 0.832)";
    }
}

function showPassword(){
    var inputSenha = document.querySelector('#senha');
    var img_eye = document.querySelector('#eye');

    if(inputSenha.getAttribute("type") === "password"){
        inputSenha.setAttribute("type", "text");
        img_eye.setAttribute("src", "../../public/smt/hidden.png");
    } else {
        inputSenha.setAttribute("type", "password");
        img_eye.setAttribute("src", "../../public/smt/eye.png");
    }
}

function fecharError(){
    document.getElementById("error-modal").style.display = "none";
    document.getElementById("nome").style.borderBottom = "2px solid #000";
    document.getElementById("senha").style.borderBottom = "2px solid #000";
}