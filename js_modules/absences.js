const Discord = require("discord.js");

module.exports = function handleAbsences(bot, json, config) {
    const absencesEmbed = new Discord.EmbedBuilder()
        .setColor(json.background_color)
        .setTitle("Professeur Absent ou Cours annulé")
        .setThumbnail(config.absenceImageURL)
        .addFields(
            { name: "Professeur", value: json.teacher_name, inline: false },
            { name: "Salle", value: json.classroom, inline: false },
            { name: "Début", value: new Date(json.start).toLocaleDateString(config.locale, { year: "numeric", month: "long", day: "numeric" }) + " " + new Date(json.start).toLocaleTimeString(config.locale, { hour: "2-digit", minute: "2-digit" }), inline: false },
            { name: "Fin", value: new Date(json.end).toLocaleDateString(config.locale, { year: "numeric", month: "long", day: "numeric" }) + " " + new Date(json.end).toLocaleTimeString(config.locale, { hour: "2-digit", minute: "2-digit" }), inline: false }
        )
        .setTimestamp()
        .setFooter({ text: "PronoteBOT by okza", iconURL: config.iconURL });

    const absencesChannel = bot.channels.cache.get(config.absenceChannel);
    if (absencesChannel) {
        absencesChannel.send({ embeds: [absencesEmbed] })
            .then((message) => {
                const sentDate = message.createdAt.toLocaleString(config.locale, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
                console.log(`Absence embed sent successfully with ID: ${json.id} at ${sentDate}`);
            })
            .catch(console.error);
    } else {
        console.error("Absence channel not found");
    }
};
