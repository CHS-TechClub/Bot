module.exports.hasRole = (member, guild, roleName) => {
  let role = guild.roles.cache.find((r) => r.name.toLowerCase() == roleName.toLowerCase());
  if (!role) return false;
  if (!member.roles.cache.has(role.id)) return false;
  return true;
}
