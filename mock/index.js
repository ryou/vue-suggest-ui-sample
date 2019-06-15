const express = require('express')
const server = express()
const cors = require('cors')

server.use(cors())

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const items = require('./data/items')

server.get('/', (req, res) => {
  res.send('hello')
})

server.get('/api/item/list', async (req, res) => {
  const { keyword } = req.query
  const result = items.filter(item => item.item_name.includes(keyword))

  await sleep(1000)

  res.json(result)
})

server.get('/api/item/:id', async (req, res) => {
  const id = Number(req.params.id)
  const result = items.find(item => item.item_id === id)

  await sleep(1000)

  res.json(result)
})

server.listen(8880, () => {
  console.log('Lostening on port 8880')
})
