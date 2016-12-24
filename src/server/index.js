import express from 'express'

const app = express()

app.use('/', express.static('public'))
app.use('/build', express.static('build'))

const server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address
  host = (host === '::' ? 'localhost' : host)
  const port = server.address().port

  console.log(`listening at http://${host}:${port}`)
})
