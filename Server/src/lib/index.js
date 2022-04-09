

export const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 9)}`
export const removeLastCharacter = str => str.slice(0, str.length - 1)
export const removeFirstCharacter = str => str.slice(1, str.length)