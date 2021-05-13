const { Writable, Transform } = require('stream')
const fs = require('fs')
const { caesarCipher } = require('./cipher')
const errorHandle = require('./errorHandle')

const readable = file => {
  if(!file) {
    console.log('write text (stop Ctrl+C): ')
    return process.stdin
  }

  const readfile = fs.createReadStream(file, 'utf8')
  readfile.on('err', () => errorHandle('error: reading error'))
  return readfile
}

const writable = file => {
  if(file === undefined) {
      class WritableStream extends Writable {
          _write(chunk, encoding, callback) {
              console.log(`output text: \n${ chunk.toString() }`)
              callback()
          }
      }

      return new WritableStream({ highWaterMark: 2 })
  }

  const writeStream = fs.createWriteStream(file, { flags: "a" })
  writeStream.on("error", () => errorHandle('error: writeing error'))
  return writeStream
}

const transformable = (shift, action) => {
  class TransformableStream extends Transform {
      _transform(chunk, encoding, callback) {
          try {
              const resultStr = caesarCipher(
                  chunk.toString('utf8'),
                  shift,
                  action
              )
              callback(null, resultStr)
          } catch (err) {
              callback(err)
          }
      }
  }
  return new TransformableStream({ highWaterMark: 2 })
}

module.exports = {
  readable,
  writable,
  transformable
}