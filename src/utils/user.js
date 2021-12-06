function parseUser(user) {
    return JSON.parse(
      JSON.stringify(user),
    );
}
  
function omitPassword(user) {
    const { password, ...userWithoutPassword } = parseUser(user);
    return userWithoutPassword;
}

module.exports = {
    omitPassword,
}