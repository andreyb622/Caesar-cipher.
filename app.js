const program = require('commander')
const errorHandle = require('./src/errorHandle')
const { pipeline } = require('stream')
const { readable, writable, transformable } = require('./src/stream')

program
  .storeOptionsAsProperties(false)
  .requiredOption('-a --action <action>', 'action encode or decode')
  .requiredOption('-s --shift <shift>', 'shift', parseIneteger)
  .option('-i --input <file>', 'input file')
  .option('-o --output <file>', 'output file')
  .parse(process.argv)

function parseIneteger(value) {
  const integer = parseInt(value)
  if(isNaN(integer)) errorHandle(`error: '${ value }' is invalid`)
  return integer
}

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