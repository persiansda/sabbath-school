interface Options {
  wordLimit?: number
  characterLimit?: number
}

export function wordSubstring(sentence: string, options: Options = { characterLimit: 155 }) {
  // TODO: fix wordlimit
  return `${sentence.slice(0, options.characterLimit)}...`
}
