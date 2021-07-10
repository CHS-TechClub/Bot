module.exports.hasRole = (msg, roleName) => {
  let role = msg.guild.roles.cache.find((r) => r.name.toLowerCase() == roleName.toLowerCase());
  if (!role) return false;
  if (!msg.member.roles.cache.has(role.id)) return false;
  return true;
}
