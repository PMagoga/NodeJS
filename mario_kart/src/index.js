const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS:0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS:0,
};

// Função para sortear um número aleatório entre 1 e 6
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
        }
    return result;
}

async function logRoolResult(characterName, block, diceresult, attribute) {
    console.log(`${characterName} rolou um 🎲 de ${block} : ${diceresult} + ${attribute} = ${diceresult + attribute}`) ;
}

async function playRaceEngine(character1, character2) {
    
    
    for(let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round} 🏁`);

        // Simula o lançamento de dados para cada personagem
        let diceresult1 = await rollDice(); 
        let diceresult2 = await rollDice();
        
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        //teste de habilidade
        let testSkill1 = 0;
        let testSkill2 = 0;
    
        if(block === "RETA"){
            testSkill1 = diceresult1 + character1.VELOCIDADE;
            testSkill2 = diceresult2 + character2.VELOCIDADE;
    
            await logRoolResult(character1.NOME, "velocidade", diceresult1, character1.VELOCIDADE);
            await logRoolResult(character2.NOME, "velocidade", diceresult2, character2.VELOCIDADE);
        }
    
        if(block === "CURVA"){
            testSkill1 = diceresult1 + character1.MANOBRABILIDADE;
            testSkill2 = diceresult2 + character2.MANOBRABILIDADE;
    
            await logRoolResult(character1.NOME, "manobrabilidade", diceresult1, character1.MANOBRABILIDADE);
            await logRoolResult(character2.NOME, "manobrabilidade", diceresult2, character2.MANOBRABILIDADE);
        }
    
        if (block === "CONFRONTO"){
            let powerResult1 = diceresult1 + character1.PODER;
            let powerResult2 = diceresult2 + character2.PODER;

            testSkill1 = powerResult1;
            testSkill2 = powerResult2;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRoolResult(character1.NOME, "poder", diceresult1, character1.PODER);
            await logRoolResult(character2.NOME, "poder", diceresult2, character2.PODER);

            // Verifica se houve perda de pontos usando operadores ternários
            /* character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
            character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;            
            console.log(powerResult1 === powerResult2 ? "Empate no confronto! Nenhum ponto perdido." : ""); */

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto e o ${character2.NOME} perdeu um ponto!`);
                character2.PONTOS -= 1;
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto e o ${character1.NOME} perdeu um ponto!`);
                character1.PONTOS -= 1;
            }
            if (powerResult1 === powerResult2) {
                console.log("Empate no confronto! Nenhum ponto perdido.");
            }
        }

        //verifica quem ganhou a rodada

        if (testSkill1 > testSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS += 1;
        }else if (testSkill2 > testSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS += 1;
        } else {
            console.log("Empate! Ninguém marcou ponto.");
        }
        console.log("----------------------------------------");
    }


}

// Exibe o resultado final da corrida
async function declareWinner(character1, character2) {
    console.log(`\n🏆 Resultado Final 🏆`);
    console.log(`${character1.NOME} - Pontos: ${character1.PONTOS}`);
    console.log(`${character2.NOME} - Pontos: ${character2.PONTOS}`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🎉 ${character1.NOME} é o grande vencedor! 🎉`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🎉 ${character2.NOME} é o grande vencedor! 🎉`);
    } else {
        console.log("É um empate! Ambos os corredores são campeões!");
    }
    
}

//função auto invocada para iniciar o jogo
// Essa função é executada automaticamente quando o script é carregado
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
    console.log("🏁🚨 Corrida finalizada! 🚨🏁");
})();