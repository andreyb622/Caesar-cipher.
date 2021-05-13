# Caesar cipher CLI tool

## Installing NPM modules

```
npm install
```

## Application description

**Implement CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift - `required option`
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode - `required option`

Options description:
```bash
$ node task1 --help
```

**Usage example:**
Example:
```bash
node app --action decode --shift 2
node app --action decode --shift 2 --input input.txt --output output.txt
```

**Text inside input file:**
> input.txt
> `This is secret. Message about "_" symbol!`

**Text inside output file(after encode):**
> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

**Exit from application**
```bash
click: ctrl + c
```
