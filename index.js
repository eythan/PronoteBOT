const Discord = require("discord.js")
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const bot = new Discord.Client({intents: 3276799})
const dgram = require("dgram");

const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

bot.login(config.token)

bot.on("ready", async () => {
    console.log(`${bot.user.tag} is online`)

    const output = execSync("python api.py").toString();
    if (output.includes("request from pyton")) {
        console.log("The Python script has started");
    }
})

const server = dgram.createSocket("udp4");

server.on("message", (message, rinfo) => {
    try {
        const json = JSON.parse(message.toString());
        console.log(json);
    } catch (error) {
        console.error("Failed to parse message:", error);
    }
});

server.bind(8000, () => {
    console.log("UDP server listening on port 8000");
});