import chalk from "chalk";

const mainPrompt = [
    {
        name: "select",
        description: chalk.yellow("Escolha a ferramenta (1 - Gerar QR Code ou 2 - PASSWORD)"),
        pattern: /^[1-2]+$/,
        message: chalk.red("Apenas números 1 ou 2"),
        required: true,
    },
];

export default mainPrompt;