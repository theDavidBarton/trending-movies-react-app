/*
 * ___________
 * MIT License
 *
 * Copyright (c) 2020 David Barton
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { MongoClient, ObjectID } = require('mongodb')

const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@movienight.jdl93.mongodb.net/MovieNight?retryWrites=true&w=majority`

const newObjectId = new ObjectID()

const sampleCreate = {
  _id: newObjectId,
  pollTitle: 'Movie Night: Halloween 2020',
  pollStarts: '2020-10-24', // Date.parse(this)
  pollEnds: '2020-10-24',
  collaborators: [
    { id: 0, name: 'David' },
    { id: 1, name: 'Marci' },
    { id: 2, name: 'Laci' },
    { id: 3, name: 'Tomi' }
  ],
  movies: [
    { id: 29052, pollVotes: 0, pollAddedBy: 0 },
    { id: 25623, pollVotes: 0, pollAddedBy: 0 },
    { id: 2291, pollVotes: 2, pollAddedBy: 0 },
    { id: 829, pollVotes: 1, pollAddedBy: 3 }
  ],
  lastEdit: 1603555523144,
  lastEditedBy: 0
}

const sampleUpdate = {
  pollId: 1603538825130, // Date.now()
  pollTitle: 'Movie Night: Halloween 2020',
  pollStarts: '2020-10-24', // Date.parse(this)
  pollEnds: '2020-10-24',
  collaborators: [
    { id: 0, name: 'David' },
    { id: 1, name: 'Marci' },
    { id: 2, name: 'Laci' },
    { id: 3, name: 'Tomi' }
  ],
  movies: [
    { id: 29052, pollVotes: 0, pollAddedBy: 0 },
    { id: 25623, pollVotes: 0, pollAddedBy: 0 },
    { id: 2291, pollVotes: 2, pollAddedBy: 0 },
    { id: 829, pollVotes: 4, pollAddedBy: 3 }
  ],
  lastEdit: 1603555548677,
  lastEditedBy: 2
}

const mongoDbCreate = async movienightItem => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('MovieNight').collection('MovieNight')
    await db.insertOne(movienightItem)
    client.close()
  } catch (e) {
    console.error(e)
  }
}

const mongoDbUpdate = async (pollIdArg, movienightItem) => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('MovieNight').collection('MovieNight')
    await db.replaceOne({ pollId: parseInt(pollIdArg) }, movienightItem)
    client.close()
  } catch (e) {
    console.error(e)
  }
}

const mongoDbSearch = async pollIdArg => {
  let res
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('MovieNight').collection('MovieNight')
    if (parseInt(pollIdArg)) {
      res = await db.findOne({ pollId: parseInt(pollIdArg) })
    } else {
      res = null
    }
    client.close()
  } catch (e) {
    console.error(e)
  }
  return res
}

mongoDbCreate(sampleCreate)
// mongoDbUpdate(1603538825130, sampleUpdate)

/*
!(async () => {
  const respect = await mongoDbSearch(1603538825130)
  console.log(respect)
  console.log(JSON.stringify(respect))
})()
*/

module.exports.mongoDbSearch = mongoDbSearch
module.exports.mongoDbUpdate = mongoDbUpdate
module.exports.mongoDbCreate = mongoDbCreate
