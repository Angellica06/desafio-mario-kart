const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 0,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

rollDice = async () => {
    return Math.floor(Math.random() * 6) + 1;
}

getRandomBlock = async () => {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
    }
    return result;
}

logRollResult = async (characterName, block, diceResult, attribute) => {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

playRaceEngine = async (character1, character2) => {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidades
        let totaltestSkill1 = 0;
        let totaltestSkill2 = 0;

        if (block === "RETA") {
            totaltestSkill1 = diceResult1 + character1.VELOCIDADE;
            totaltestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
        } if (block === "CURVA") {
            totaltestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totaltestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        } if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }
            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido!" : "");
        }

        if (totaltestSkill1 > totaltestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totaltestSkill2 > totaltestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("---------------------------------------------");
    }
}

declareWinner = async (character1, character2) => {
    console.log("Resultado final: ");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s) \n`);

    if (character1.PONTOS > character2.PONTOS)
        console.log(`${character1} venceu a corrida! Parabéns! 🏆`);
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    else
        console.log("A corrida terminou em empate!");
}

(main = async () => {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();


