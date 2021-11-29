import React from 'react'

/**
 *
 * @param param0 Label text and max character count (optional)
 * @returns Wrapped label text
 */
export const WrappedLabel = ({
  children,
  maxChars = 20,
}: {
  children: string
  maxChars?: number
}) => {
  return (
    <span>
      {getLinesOfCharCount(children, maxChars).map((text, i) => (
        <span key={`${i}-${text}}`}>
          {text}
          {i < text.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  )
}

/**
 * Converts provided text into number of lines that are no longer than the
 * specified char count.
 * @param text The input text
 * @param count Max line length in num chars
 * @returns The lines
 */
function getLinesOfCharCount(text: string, count: number = 20): string[] {
  const words: string[] = text.split(' ').reverse()
  const lines: string[] = []
  let line: string = ''
  while (words.length > 0) {
    const word: string | undefined = words.pop()
    if (word === undefined)
      throw new Error(
        'Unexpected state reached: While-loop is continuing even though no' +
          ' more words are available.'
      )

    if ((line + ' ' + word).length > count) {
      lines.push(line.trim())
      line = word
    } else {
      line += ' ' + word
    }
  }
  if (line.length > 0) lines.push(line.trim())
  return lines
}

export default WrappedLabel
