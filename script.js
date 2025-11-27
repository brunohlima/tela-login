let card = document.querySelector(".card");
let loginButton = document.querySelector(".loginButton");
let cadastroButton = document.querySelector(".cadastroButton");

loginButton.onclick = () => {
    card.classList.remove("cadastroActive")
    card.classList.add("loginActive")
}

cadastroButton.onclick = () => {
    card.classList.remove("loginActive")
    card.classList.add("cadastroActive")
}


const botaoCadastrar = window.document.getElementById("cadastrar");

async function fetchCriacao(name, email, password) {
  const response = await fetch("http://localhost:3000/user/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text);
    if(data.jwt) {
        localStorage.setItem('token', data.jwt);
        window.location.href = "http://127.0.0.1:5500/informacoes.html?"
    } else {
        window.alert(data.error)
    }
  } catch {
    console.error("Resposta NÃO é JSON:");
    console.log(text);
  }
}

botaoCadastrar.addEventListener("click", function(event){
    event.preventDefault();
    const name = window.document.getElementById("name").value
    const email = window.document.getElementById("email").value
    const senha = window.document.getElementById("senha").value
    const confirmaSenha = window.document.getElementById("confirmaSenha").value

    if(senha===confirmaSenha) {
        fetchCriacao(name,email,senha)
    } else {
        window.alert("As senhas precisam ser iguais")
    }


    console.log(name, email, senha, confirmaSenha)
})

const botaoEntrar = window.document.getElementById("Entrar");

async function fetchEntrar(email, password) {
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text);
    console.log("JSON:", data);

    if(data.jwt) {
        localStorage.setItem('token', data.jwt);
        window.location.href = "http://127.0.0.1:5500/informacoes.html?"
    } else {
        window.alert(data.error)
    }

  } catch {
    console.error("Resposta NÃO é JSON:");
    console.log(text);
  }
}

botaoEntrar.addEventListener("click", function(event) {
    event.preventDefault();
    const email = window.document.getElementById("lg-email").value
    const password = window.document.getElementById("lg-password").value

    fetchEntrar(email,password)

})
