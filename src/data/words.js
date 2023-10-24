const wordsList = {
    carro: ["Motor", "Porta", "Capô", "Pneu", "Antena"],
    fruta: ["Banana", "Maçã", "Pêra", "Mamão", "Laranja"],
    corpo: ["Braço", "Perna", "Cérebro", "Pescoço", "Olhos"],
    computador: ["Mouse", "Teclado", "Monitor", "Gabinete"],
    programação: ["Linguagem", "Framework", "JavaScript", "React"],
    alimento: ["Arroz", "Feijão", "Carne", "Leite", "Ovo"],
};


const removeEspecialChar = (e) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
const changeElementList = (lista) => lista.map(removeEspecialChar)

const change = (obj) => {
    const obj2 = {}
    for (var [key, value] of Object.entries(obj)) {
        obj2[key] = changeElementList(value)
    }
    return obj2
}

export const wordsListFinal = change(wordsList)
