let treinos = [];

// elementos
const nomeInput = document.getElementById("nome");
const grupoInput = document.getElementById("grupo");
const dificuldadeInput = document.getElementById("dificuldade");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const filtro = document.getElementById("filtro");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnLimpar = document.getElementById("btnLimpar");

// eventos

btnAdicionar.addEventListener("click", function () {
  const nome = nomeInput.value;
  const grupo = grupoInput.value;
  const dificuldade = dificuldadeInput.value;

  if (!nome || !grupo || !dificuldade) {
    alert("Preencha tudo!");
    return;
  }

  treinos.push({
    nome,
    grupo,
    dificuldade,
    feito: false
  });

  nomeInput.value = "";
  grupoInput.value = "";
  dificuldadeInput.value = "";

  renderizar();
});

btnLimpar.addEventListener("click", function () {
  treinos = [];
  renderizar();
});

filtro.addEventListener("change", function () {
  renderizar();
});

// renderização
function renderizar() {
  lista.innerHTML = "";

  const filtrados = filtro.checked
    ? treinos.filter(t => t.feito)
    : treinos;

  filtrados.forEach((t, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${t.nome} (${t.grupo}) ⭐${t.dificuldade}`;

    if (t.feito) {
      texto.style.textDecoration = "line-through";
      texto.style.opacity = "0.6";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.feito;

    checkbox.addEventListener("change", function () {
      treinos[index].feito = !treinos[index].feito;
      renderizar();
    });

    li.appendChild(texto);
    li.appendChild(checkbox);
    lista.appendChild(li);
  });

  total.textContent = treinos.length;
}

// enter para adicionar
dificuldadeInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btnAdicionar.click();
  }
});