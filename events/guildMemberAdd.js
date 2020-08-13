// guildMemberAdd.js
module.exports = (client, member) => {
  // Add Student role to new member.
  let role = member.guild.roles.cache.find(r => r.name === "Student");
  
  let roleManager = member.roles;
  roleManager.add(role).then(response => console.log(`${member.user} was given role ${role.name}`)).catch(console.error);
}
