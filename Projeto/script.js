let treinos = [];

//elementos
const nomeInput = document.getElementById("nome");
const grupoInput = document.getElementById("grupo");
const dificuldadeInput = document.getElementById("dificuldade");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const filtro = document.getElementById("filtro");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnLimpar = document.getElementById("btnLimpar");

//eventos

btnAdicionar.addEventListener("click", function () {
  const nome = nomeInput.value.trim();
  const grupo = grupoInput.value;
  const dificuldade = Number(dificuldadeInput.value);

  if (!nome || !grupo || dificuldadeInput.value === "") {
    alert("Preencha tudo!");
    return;
  }

  //bloqueia fora do intervalo (sem arredondar)
  if (dificuldade < 0 || dificuldade > 5) {
    alert("A dificuldade deve estar entre 0 e 5!");
    return;
  }

  //não permitir repetidos
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

//botão de limpar
btnLimpar.addEventListener("click", function () {
  const confirmar = confirm("Tem certeza que deseja apagar todas as tarefas?");
  if (confirmar) {
    treinos = [];
    renderizar();
  }
});

filtro.addEventListener("change", function () {
  renderizar();
});

//renderização
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
      texto.classList.add("concluido");
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

//enter para adicionar
dificuldadeInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btnAdicionar.click();
  }
});