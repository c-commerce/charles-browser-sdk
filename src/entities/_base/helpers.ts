export function ndjsonStream (response: ReadableStream<Uint8Array>): ReadableStream {
  // For cancellation
  let isReader: ReadableStreamDefaultReader
  let cancellationRequest = false
  return new ReadableStream({
    start: function (controller) {
      var reader = response.getReader()
      isReader = reader
      var decoder = new TextDecoder()
      var dataBuf = ''

      reader.read().then(async function processResult (result): Promise<any> {
        if (result.done) {
          if (cancellationRequest) {
            // Immediately exit
            return
          }

          dataBuf = dataBuf.trim()
          if (dataBuf.length !== 0) {
            try {
              var dataL = JSON.parse(dataBuf)
              controller.enqueue(dataL)
            } catch (e) {
              controller.error(e)
              return
            }
          }
          controller.close()
          return
        }

        var data = decoder.decode(result.value, { stream: true })
        dataBuf += data
        var lines = dataBuf.split('\n')
        for (var i = 0; i < lines.length - 1; ++i) {
          var l = lines[i].trim()
          if (l.length > 0) {
            try {
              var dataLine = JSON.parse(l)
              controller.enqueue(dataLine)
            } catch (e) {
              controller.error(e)
              cancellationRequest = true
              reader.cancel().catch((err) => {
                throw err
              })
              return
            }
          }
        }
        dataBuf = lines[lines.length - 1]

        return await reader.read().then(processResult)
      }).catch((err) => {
        throw err
      })
    },
    cancel: function (reason): any {
      console.log('Cancel registered due to ', reason)
      cancellationRequest = true
      isReader.cancel().catch((err) => {
        throw err
      })
    }
  })
}
