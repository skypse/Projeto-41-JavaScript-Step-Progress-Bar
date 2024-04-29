// Selecionando elementos do html
const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");
const progressEl = document.querySelector(".progress-bar-front");
const stepsEl = document.querySelectorAll(".step");

// variável de controle do nível
let currentChecked = 1;

// Evento para o botão 'Próximo'
nextEl.addEventListener("click", () => {
  currentChecked++;
  // verificando se o numero do passo atual, ultrapassou o total de passos disponiveis
  if (currentChecked > stepsEl.length) {
    currentChecked = stepsEl.length;
  }
  // atualiza a barra de progresso e os passos visualizados
  updateStepProgress();
});

// Evento para o botão 'Anterior'
prevEl.addEventListener("click", () => {
  currentChecked--;
  // verifica se o numero de passos atual é menor que 1
  if (currentChecked < 1) {
    currentChecked = 1;
  }
  // atualiza a barra de progresso e os passos visualizados
  updateStepProgress();
});

// Função para atualizar o progresso dos passos
function updateStepProgress() {
  // renova sobre os passos
  stepsEl.forEach((stepEl, idx) => {
    // verifica se o índice do passo é menor que o passo atual
    if (idx < currentChecked) {
      // adiciona a classe 'checked' para indicar que o passo foi concluído
      stepEl.classList.add("checked");
      // atualiza o conteúdo do passo com um ícone de checkmark e um texto
      stepEl.innerHTML = `
      <i class="fas fa-check"></i>
      <small>${
        idx === 0
          ? "Início"
          : idx === stepsEl.length - 1
          ? "Final"
          : "Passo " + idx
      }</small>
      `;
    } else {
      // remove a classe 'checked' para indicar que o passo não foi concluído
      stepEl.classList.remove("checked");
      // atualiza o conteúdo do passo com um ícone de 'x'
      stepEl.innerHTML = `
      <i class="fas fa-times"></i>
      `;
    }
  });

  // seleciona todos os passos que foram concluídos
  const checkedNumber = document.querySelectorAll(".checked");

  // calcula largura da barra com base no número de passos concluídos
  progressEl.style.width =
    ((checkedNumber.length - 1) / (stepsEl.length - 1)) * 100 + "%";

  // desabilita os botoes 'anterior' e 'proximo' quando precisar
  if (currentChecked === 1) {
    prevEl.disabled = true;
  } else if (currentChecked === stepsEl.length) {
    nextEl.disabled = true;
  } else {
    prevEl.disabled = false;
    nextEl.disabled = false;
  }
}
