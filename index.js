const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const prompt = require('prompt-sync')();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');

    // Coleta os números de telefone e a mensagem
    const numbers = prompt('Digite os números de telefone (separados por vírgulas): ');
    const message = prompt('Digite a mensagem a ser enviada: ');

    const numberArray = numbers.split(',').map(num => num.trim());

    numberArray.forEach(number => {
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, message).then(response => {
            if (response.id.fromMe) {
                console.log(`Mensagem enviada com sucesso para ${number}`);
            }
        }).catch(err => {
            console.error(`Falha ao enviar a mensagem para ${number}:`, err);
        });
    });
});

client.initialize();
