let mode = {
  start: [
    { regex: /"(?:[^\\]|\\.)*?"/, token: 'string' },
    { regex: /r\d/i, token: 'variable-2' },
    { regex: /0?x[a-f\d]+|#?[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: 'number' },
    { regex: /(?:brn?z?p?|add|ld(?:r|i)?|jsrr?|and|st(?:r|i)?|rti|not|jmp(?:rr)?|ret|lea|trap)(?:\s|$)/i, token: 'keyword' },
    { regex: /(?:out|in|halt|puts|getc)(?:\s|$)/i, token: 'builtin' },
    { regex: /\.(?:orig|end|stringz|fill|blkw)(?:\s|$)/i, token: 'string-2' },
    { regex: /;.*?$/i, token: 'comment' }
  ]
}

export default mode
