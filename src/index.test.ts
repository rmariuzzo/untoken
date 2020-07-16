import { untoken } from '.'

describe('untoken', () => {
  it('should return the input when no tokens', () => {
    const input = 'test'
    expect(untoken(input)).toBe(input)
  })

  it.each([
    ['Hello {name}', { name: 'value' }, 'Hello value'],
    ['Hello {name}}', { name: 'value' }, 'Hello value}'],
    ['Hello {{name}', { name: 'value' }, 'Hello {value'],
    ['Hello {{name}}', { name: 'value' }, 'Hello {value}'],
    ['Hello { name }', { name: 'value' }, 'Hello value'],
  ])('should replace tokens in: "%s" and tokens: "%o" = %s', (input, tokens, expected) => {
    expect(untoken(input, tokens)).toBe(expected)
  })

  it.each([
    ['Hello \\{name\\}', { name: 'value' }, 'Hello {name}'],
  ])('should not replace escaped tokens in: "%s" and tokens: "%o" = %s', (input, tokens, expected) => {
    expect(untoken(input, tokens)).toBe(expected)
  })
})
