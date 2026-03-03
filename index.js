const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create WhatsApp client
/*const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "my-session" // session folder name
    }),
    puppeteer: {
        headless: false, // set true if you don't want browser window
    }
});*/

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "my-session" }),
  puppeteer: {
    headless: true,                       // run headless
    args: [
      '--no-sandbox',                     // required in Render container
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080'
    ]
  }
});

// Show QR in terminal
client.on('qr', (qr) => {
    console.log('Scan this QR code:');
    qrcode.generate(qr, { small: true });
});

// When ready
client.on('ready', async () => {
    console.log('Client is ready!');

    try {
        const number = "917079154651"; // replace with real number (no +)
        const numberId = await client.getNumberId(number);

        if (!numberId) {
            console.log("Number not registered on WhatsApp");
            return;
        }

        await client.sendMessage(numberId._serialized, "Hello from my bot 🇮🇳");

        console.log("Message sent successfully!");

    } catch (err) {
        console.error("Error sending message:", err);
    }
});

// Start client
client.initialize();

