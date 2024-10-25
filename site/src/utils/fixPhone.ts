const fixPhone = (string: string) =>
  string.replace(/[^0-9+)]+/g, '')


export default fixPhone
