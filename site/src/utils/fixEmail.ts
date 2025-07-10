const fixEmail = (string: string) =>
  string.replace(/[^(A-Z|a-z|0-9.-_@)]+/g, '')


export default fixEmail
