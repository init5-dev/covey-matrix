export const uniqid = (length = 30) => {
  const source = '1234567890abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRST'
  let id = ''

  for (let i = 0; i < length; ++i) {
    id += source[Math.floor(Math.random() * (source.length - 1))]
  }

  return id
}