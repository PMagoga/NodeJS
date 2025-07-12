import chalk from "chalk";
import message from "prompt";

const qrCodePrompt = [
    {
        name: "link",
        description: chalk.yellow("Digite o tipo de QR Code que deseja gerar (1 - Normal ou 2 - Terminal"),
        pattern: /^[1-2]+$/,
        message: chalk.red.italic("Apenas números 1 ou 2"),
        required: true,
    }
];


export default qrCodePrompt;