let produtos

window.onload = function() {
    var storedUser = localStorage.getItem("usuario")
    var user = JSON.parse(storedUser)
    var dataEntrada = new Date(user.dataEntrada)

    var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    })

    document.getElementById("user").textContent = user.name
    document.getElementById("perfil").textContent = dataFormatada
    document.getElementById("idPerfil").textContent = user.id
}

document.addEventListener("DOMContentLoaded", function (){
    fetch("../dados/data.json")
    .then((response) => response.json())
    .then((data) => {
        produtos = data
        
        const produtosContainer = document.getElementById("produtos-container");

        produtos.forEach((produto, index)=> {
            const card = document.createElement("div");

            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.desc}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.desc}</h5>
                        <p class="card-text">${produto.valor}</p>
                        <a href="#" class="btn btn-primary adicionar" data-indice="${index}">
                            Adicionar ao carrinho
                        </a>
                    </div>
                </div>`
            produtosContainer.appendChild(card);
        });
    }).catch((error) => console.log("Erro ao carregar dados", error))

    document.getElementById("produtos-container").addEventListener("click", function(event){
        const btn = event.target.closest(".adicionar")
        if(!btn) return

        const indexDoProduto = btn.dataset.indice
        const produtoSelecionado = produtos[indexDoProduto]
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
        carrinho.push(produtoSelecionado)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        alert("Produto adicionado com sucesso!!!")
    })
})

const lenis = new Lenis({
    duration: 1.2,          
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    orientation: 'vertical', 
    gestureOrientation: 'vertical',
    smoothWheel: true,
    autoRaf: true           
});

lenis.on('scroll', (e) => {
    const head = document.getElementById("header");
    if(e.scroll < 1000){
        const alpha = 1 - (e.scroll / 1000)
        head.style.backgroundColor = `rgba(58, 60, 82, ${alpha})`;
        head.style.boxShadow = `${(1 - alpha) * 4}px ${(1 - alpha) * 10}px 0px rgb(0,0,0)`;
        head.color = `$rgb(${alpha},${alpha},${alpha})`
    }
    else{
        head.style.backgroundColor = `rgba(7, 65, 14, 0.84)`;
        head.style.boxShadow = `4px 10px 0px rgb(0,0,0)`;
        head.color = `black`;
    }
});
