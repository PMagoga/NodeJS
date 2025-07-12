import prompt from 'prompt';
import qrCodePrompt from '../../prompts/prompt-qrcode.js'; // Adjust the path as necessary
import handle from './handle.js'; // Assuming handle.js is the file that processes the QR code generation

async function createQRCode() {
    prompt.get(qrCodePrompt, handle);

    prompt.start();
}

export default createQRCode;