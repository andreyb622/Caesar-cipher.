const program = require('commander')
const errorHandle = require('./src/errorHandle')
const { pipeline } = require('stream')
const { readable, writable, transformable } = require('./src/stream')

console.log(process.argv)
program
  .storeOptionsAsProperties(false)
  .requiredOption('-a --action <action>', 'action encode or decode')
  .requiredOption('-s --shift <shift>', 'shift')
  .option('-i --input <file>', 'input file')
  .option('-o --output <file>', 'output file')
  .parse(process.argv)

const { action, shift, input, output } = program.opts()

pipeline(
  readable(input),
  transformable(shift, action),
  writable(output),
  err => {
    console.log(err)
    if(err) errorHandle('see err above')
  }
)