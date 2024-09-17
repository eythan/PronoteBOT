const Discord = require("discord.js");
const dgram = require("dgram");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const handleAbsences = require("./js_modules/absences");
const handleHomeworks = require("./js_modules/homeworks");

const bot = new Discord.Client({ intents: 3276799 });

const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

bot.login(config.token);

bot.on("ready", async () => {
    console.log(`${bot.user.tag} is online`);
    try {
        let child = spawn("python", ["api.py"]);
        console.log("Python script has started successfully");
    } catch (error) {
        console.warn(error);
    }
});

const server = dgram.createSocket("udp4");

server.on("message", (message, rinfo) => {
    try {
        const jsonArray = JSON.parse(message.toString());
        jsonArray.forEach(json => {
            if (json.type === "absences") {
                handleAbsences(bot, json, config);
            }

            if (json.type === "homeworks") {
                handleHomeworks(bot, json, config);
            }
        });

    } catch (error) {
        console.error("Failed to parse message:", error);
    }
});

server.bind(8000, () => {
    console.log("UDP server listening on port 8000");
});
