const Discord = require("discord.js");

module.exports = function handleHomeworks(bot, json, config) {
    const homeworksEmbed = new Discord.EmbedBuilder()
        .setColor(json.background_color)
        .setTitle("Devoir à rendre")
        .setThumbnail(config.homeworkImageURL)
        .addFields(
            { name: "Matière", value: json.subject, inline: false },
            { name: "Description du devoir", value: json.description, inline: false },
            { name: "Date limite", value: new Date(json.date).toLocaleDateString(config.locale, { year: "numeric", month: "long", day: "numeric" }), inline: false }
        )
        .setTimestamp()
        .setFooter({ text: "PronoteBOT by okza", iconURL: config.iconURL });

    const homeworksChannel = bot.channels.cache.get(config.homeworkChannel);
    if (homeworksChannel) {
        homeworksChannel.send({ embeds: [homeworksEmbed] })
            .then((message) => {
                const sentDate = message.createdAt.toLocaleString(config.locale, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
                console.log(`Homework embed sent successfully with ID: ${json.id} at ${sentDate}`);
            })
            .catch(console.error);
    } else {
        console.error("Homework channel not found");
    }
};