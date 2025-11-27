const telaInformacoes = document.getElementById("informacoes");

async function fetchEntrar() {
  const response = await fetch("http://localhost:3000/user/userInformation", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text);
    console.log("JSON:", data);
    const user = data.data

    if (!window.location.pathname.includes("informacoes.html")) {
      window.location.href = "http://127.0.0.1:5500/informacoes.html?";
    } else {
      if (telaInformacoes) {
  telaInformacoes.innerHTML = `
    <p><span class="label">ID:</span> ${user.id}</p>
    <p><span class="label">Nome:</span> ${user.name}</p>
    <p><span class="label">Email:</span> ${user.email}</p>
    `
      }
    }

  } catch {
    console.error("Resposta NÃO é JSON:");
    console.log(text);
  }
}


function fazGet() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "http://127.0.0.1:5500/index.html?";
    return;
  }

  fetchEntrar();
}


window.addEventListener("load", fazGet);
