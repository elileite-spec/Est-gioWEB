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
  const nome = nomeInput.value.trim();
  const grupo = grupoInput.value;
  let dificuldade = Number(dificuldadeInput.value);

  if (!nome || !grupo || !dificuldade) {
    alert("Preencha tudo!");
    return;
  }

  // ⭐ limite de 1 a 5
  if (dificuldade > 5) dificuldade = 5;
  if (dificuldade < 1) dificuldade = 1;

  // 🚫 não permitir repetidos
  const existe = treinos.some(
    t => t.nome.toLowerCase() === nome.toLowerCase() && t.grupo === grupo
  );

  if (existe) {
    alert("Esse exercício já foi adicionado!");
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

 //botao de limpar
btnLimpar.addEventListener("click", function () {
    const confirmar = confirm("Tem certeza que deseja apagar todas as tarefas?")
    if(confirmar){
    treinos = [];
    renderizar();
  }
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