async function permittedCharacters() {

    let characters = [];

    if (process.env.UPPERCASE_LETTERS === "true") {
        characters.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (process.env.LOWERCASE_LETTERS === "true") {
        characters.push(..."abcdefghijklmnopqrstuvwxyz");
    }

    if (process.env.NUMBERS === "true") {
        characters.push(..."0123456789");
    }

    if (process.env.SPECIAL_CHARACTERS === "true") {
        characters.push(..."!@#$%^&*()_+[]{}|;:,.<>?`~");
    }
    return characters
}

async function handle() {
    let password = "";
    let characters = [];

    const passwordLength = process.env.PASSWORD_LENGTH
    characters = await permittedCharacters();

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

export default handle;