export async function validateFields(username, password) {
  let validRE = /[^_\-.0-9a-z]+/;
  return !(username.trim().length === 0 || password.trim().length === 0 ||
    username.match(validRE) === null || password.match(validRE) === null);

}
