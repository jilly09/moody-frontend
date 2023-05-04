async function encrypt(recipient, message, passphrase) {
    let privateKeyArmored = "";
    let publicKeyArmored = "";

    await $.post("/getkey", {}).done((response) => {
        if (response.status != "error") {
            privateKeyArmored = response;
            console.log(privateKeyArmored, 1);
        } else {
            console.log(response);
            return response;
        }
    });
    await $.post("/getpublickey", {
        recipient: recipient,
    }).done((response) => {
        if (response.status != "error") {
            publicKeyArmored = response;
        } else {
            return "err";
        }
    });
    console.log(privateKeyArmored, publicKeyArmored, 3);

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({
            armoredKey: privateKeyArmored,
        }),
        passphrase,
    });

    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }), // input as Message object
        encryptionKeys: publicKey,
        signingKeys: privateKey, // optional
    });
    console.log(encrypted);
    return encrypted;
}
async function decrypt(sender, encryptedMessage, passphrase) {
    let privateKeyArmored = "";
    let publicKeyArmored = "";

    await $.post("/getkey", {}).done((response) => {
        if (response.status != "error") {
            privateKeyArmored = response;
            console.log(privateKeyArmored, 1);
        } else {
            console.log(response);
            return response;
        }
    });
    await $.post("/getpublickey", {
        recipient: sender,
    }).done((response) => {
        if (response.status != "error") {
            publicKeyArmored = response;
        } else {
            console.log(response);
            return response;
        }
    });

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({
            armoredKey: privateKeyArmored,
        }),
        passphrase,
    });

    const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage, // parse armored message
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        verificationKeys: publicKey, // optional
        decryptionKeys: privateKey,
    });
    console.log(decrypted); // 'Hello, World!'
    // check signature validity (signed messages only)
    try {
        await signatures[0].verified; // throws on invalid signature
        console.log("Signature is valid");
    } catch (e) {
        throw new Error("Signature could not be verified: " + e.message);
    }
    return decrypted;
}
async function generateKeys(passphrase) {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: "rsa", // Type of the key
        rsaBits: 4096, // RSA key size (defaults to 4096 bits)
        userIDs: [{ name: "name", email: "noway@noway.noway" }], // you can pass multiple user IDs
        passphrase: passphrase, // protects the private key,
        format: "armored",
    });
    console.log(privateKey);
    console.log(publicKey);

    return { privateKey: privateKey, publicKey: publicKey };
}
