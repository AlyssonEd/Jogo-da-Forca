let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;
let palavraAtual;
const palavras = [
    "compadecida",
    "ariano suassuna",
    "joão grilo",
    "chicó",
    "auto da compadecida",
    "são jorge",
    "ladrão",
    "canganceiro",
    "comédia",
    "camila",
];
const dicas = [
    "Nome da peça que mistura comédia e elementos da cultura popular nordestina.",
    "Autor da peça, famoso por sua obra que retrata a cultura nordestina do Brasil.",
    "Personagem principal que é um esperto e astuto nordestino.",
    "Companheiro de João Grilo, conhecido por suas mentiras e histórias exageradas.",
    "Título completo da peça que envolve aventuras e temas religiosos.",
    "Santo que aparece na peça e é conhecido por ser um guerreiro e protetor.",
    "Tipo de criminoso que é uma preocupação constante para os protagonistas.",
    "Tipo de bandido característico do sertão nordestino, presente na peça.",
    "Gênero ao qual a peça pertence, caracterizado pelo humor e sátira.",
    "Personagem feminina importante na história, relacionada a temas de amor e moralidade.",
];

function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;

    atualizarDisplayDoJogo();
}

function atualizarDisplayDoJogo() {
    let palavraExibida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = palavraAtual[i];
        if (letrasAdivinhadas.indexOf(letra) !== -1) {
            palavraExibida += letra;
        } else {
            palavraExibida += "_";
        }
    }

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;

    desenharBoneco(tentativasRestantes); // Atualiza o boneco
}

function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();
    if (letraAdivinhada.length === 1 && /^[a-záéíóuãöç\s]+$/.test(letraAdivinhada)) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            // Verifica se a letra está na palavra
            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (palavraAtual[i] === letraAdivinhada) {
                    letraNaoEncontrada = false;
                    break;
                }
            }

            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();

            let palavraCompleta = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(palavraAtual[i]) === -1) {
                    palavraCompleta = false;
                    break;
                }
            }

            if (palavraCompleta) {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
            }
        }
        entradaAdivinhacao.value = "";
    }
}

// Inicializa o jogo quando a página é carregada
document.addEventListener("DOMContentLoaded", iniciarJogo);