const Discord = require("discord.js");

module.exports = function handleAbsences(bot, json, config) {
    const absencesEmbed = new Discord.EmbedBuilder()
        .setColor(json.background_color)
        .setTitle("🔔 Cours Annulé")
        .setThumbnail(config.absenceImageURL)
        .addFields(
            { name: "📝 Matière", value: json.subject.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "), inline: false },
            { name: "👨‍🏫 Professeur", value: json.teacher_name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "), inline: false },
            { name: "🏫 Salle", value: json.classroom, inline: false },
            { name: "🕒 Heure", value: `${new Date(json.start).toLocaleDateString(config.local, { year: "numeric", month: "long", day: "numeric" })} de ${new Date(json.start).toLocaleTimeString(config.local, { hour: "2-digit", minute: "2-digit" })} à ${new Date(json.end).toLocaleTimeString(config.local, { hour: "2-digit", minute: "2-digit" })}`, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: "PronoteBOT by okza", iconURL: bot.user.displayAvatarURL() });

    const absencesChannel = bot.channels.cache.get(config.absenceChannel);
    if (absencesChannel) {
        absencesChannel.send({ embeds: [absencesEmbed] })
            .then((message) => {
                const sentDate = message.createdAt.toLocaleString(config.local, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
                console.log(`Absence embed sent successfully with ID: ${json.id} at ${sentDate}`);
            })
            .catch(console.error);
    } else {
        console.error("Absence channel not found");
    }
};