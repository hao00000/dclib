const http = require('http')
const fs = require('fs')
const port = '1111'

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By':'nodejs'
  })

  fs.readFile('./appConfig.json', function (err, content) {
    if (err) {
      console.log('ERROR OCCURED')
    }
    response.write(content)
    response.end()
  })
}).listen(port)

console.log('Listening on port ' + port)
