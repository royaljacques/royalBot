const banModel = require('../../database/models/banModel');
module.exports = {
    name: "modal:ban",
    async executeModal(interaction, client) {
        // vérifier si il as la permission
        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({
            content: "Vous n'avez pas la permission de bannir des membres",
            ephemeral: true
        });
        // récupérer les données du modal
        const time = interaction.fields.getTextInputValue("time");
        const reason = interaction.fields.getTextInputValue("raison");
        // récupérer l'utilisateur id du modal
        const userId = interaction.fields.getTextInputValue("user");
        // récupérer l'utilisateur
        const user = await interaction.guild.members.fetch(userId);
        // vérifier si l'utilisateur existe
        if (!user) return interaction.reply({content: "L'utilisateur n'existe pas", ephemeral: true});
        // vérifier si l'utilisateur est bannable
        if (!user.bannable) return interaction.reply({content: "L'utilisateur n'est pas bannable", ephemeral: true});
        //vérifier si il a renseingner un temps

        if (!time) {
            console.log("pas de time")
            //bannir l'utilisateur
            await user.ban({reason: reason});
        } else {
            function deleteSpace(string) {
                return string.replace(/\s/g, '');
            }
            // vérifier si le temps est un nombre
            if (isNaN(deleteSpace(time))) return interaction.reply({
                content: "Le temps n'est pas un nombre",
                ephemeral: true
            });
            // vérifier si le temps est un nombre positif
            if (deleteSpace(time) < 0) return interaction.reply({
                content: "Le temps n'est pas un nombre positif",
                ephemeral: true
            });
            // vérifier si le temps est un nombre entier
            if (deleteSpace(time) % 1 !== 0) return interaction.reply({
                content: "Le temps n'est pas un nombre entier",
                ephemeral: true
            });
            //ajuster la date
            let date = new Date();
            date.setHours(date.getHours() + parseInt(time));

            //verifier si il existe déja
            let ban = await banModel.findOne({userId: userId});
            if (!ban) {
                ban = new banModel({
                    discordId: userId,
                    time: date,
                    reason: reason
                });
                console.log(ban)
                await ban.save();
                //bannir
                console.log("insertion db")
                await user.ban({reason: reason});
            } else {
                console.log("user deja la")

                await ban.save();
                await user.ban({reason: ban.reason});
            }

        }

    }
}