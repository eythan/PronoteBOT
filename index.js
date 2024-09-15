const Discord = require("discord.js");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const bot = new Discord.Client({ intents: 3276799 });
const dgram = require("dgram");

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
            const embed = new Discord.EmbedBuilder()
                .setColor(json.background_color)
                .setTitle("Professeur Absent ou Cours annulé")
                .setThumbnail(config.imageurl)
                .addFields(
                    { name: "Professeur", value: json.teacher_name, inline: true },
                    { name: "Salle", value: json.classroom, inline: true },
                    { name: "\u200B", value: "\u200B", inline: true },
                    { name: "Début", value: new Date(json.start).toLocaleDateString(config.locale, { year: "numeric", month: "long", day: "numeric" }) + " " + new Date(json.start).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), inline: true },
                    { name: "Fin", value: new Date(json.end).toLocaleDateString(config.locale, { year: "numeric", month: "long", day: "numeric" }) + " " + new Date(json.end).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: "PronoteBOT by okza", iconURL: config.iconurl });

            const channel = bot.channels.cache.get(config.absentchannel);
            if (channel) {
                channel.send({ embeds: [embed] })
                    .then((message) => {
                        const sentDate = message.createdAt.toLocaleString(config.locale, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
                        console.log(`Embed sent successfully with ID: ${json.id} at ${sentDate}`);
                    })
                    .catch(console.error);
            } else {
                console.error("Channel not found");
            }
        });

    } catch (error) {
        console.error("Failed to parse message:", error);
    }
});

server.bind(8000, () => {
    console.log("UDP server listening on port 8000");
});