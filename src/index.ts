type Tokens = Record<string, string>

type Options = {
  tokenStart: string
  tokenEnd: string
  escapeSequence: string
  trimTokenNames: boolean
}

const defaults: Options = {
  tokenStart: '{',
  tokenEnd: '}',
  escapeSequence: '\\',
  trimTokenNames: true,
}

interface Untoken {
  (source: string, tokens?: Tokens, options?: Partial<Options>) : string
}

export const untoken: Untoken = (source = '', tokens = {}, options = {}) => {
  if (Object.keys(tokens).length === 0) {
    return source
  }

  options = { ...options, ...defaults }

  const tokenStart = escapeRegex(options.tokenStart!)
  const tokenEnd = escapeRegex(options.tokenEnd!)
  const escapeSequence = escapeRegex(options.escapeSequence!)
  const trimTokenNames = options.trimTokenNames

  const tokenMatcher = `(?<start>(?<startEsc>${escapeSequence})?${tokenStart})(?<name>[^${tokenStart}${tokenEnd}${escapeSequence}]+)(?<end>(?<endEsc>${escapeSequence})?${tokenEnd})`

  return source.replace(new RegExp(tokenMatcher, 'g'), (token) => {
    const groups = token.match(new RegExp(tokenMatcher))?.groups
    const startEsc = groups?.startEsc
    const endEsc = groups?.endEsc
    const name = groups?.name

    if (startEsc || endEsc || !name) {
      return `${options.tokenStart}${name}${options.tokenEnd}`
    }

    return tokens[trimTokenNames ? name.trim() : name] || token
  })
}

const escapeRegex = (input: string) => {
  return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
