![untoken: A token replacement tool for text.](.github/banner.svg)

### Motivation

I have been looking for a simple tool that replace tokens in a given text with given set of values. Yes, the ability to _un-token_ a text.

## Installation

```sh
npm i untoken
```

## Usage

```ts
import { untoken } from 'untoken'

untoken('Hello {name}!', { name: 'Rubens' })
// Hello Rubens!
```

### Development

1.  Clone this repo.
2.  Install dependencies: `npm i`
3.  Profit!

### Tests

```sh
npm t
```

### Publishment

Every semver tag pushed to this will be published [via GitHub Actions](.github/workflows/publish.yml).

<div align=center>
<br>
<br>
<br>

Crafted by [Rubens Mariuzzo](https://github.com/rmariuzzo).<br>
[MIT license](LICENSE)

</div>
