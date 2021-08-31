module.exports = {
	name: 'inviteCreate',
	async execute(invite, client) {
    client.invites.set(invite.guild.id, await invite.guild.fetchInvites());
  }
}