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

const { MongoClient } = require('mongodb')

const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@movienight.jdl93.mongodb.net/MovieNight?retryWrites=true&w=majority`

const sampleCreate = {
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
    {
      id: 29052,
      title: 'The Reptile',
      overview:
        "Harry and Valerie Spalding arrive in the remote Cornish village to an unwelcoming and suspicious population. Harry's brother dies suddenly, bitten by a lethal reptilian bite. They befriend a young woman Anna whose tyrannical father controls her life and, as they discover that others in the village have suffered a similar fate, their investigations lead to Anna. What they uncover is a victim of the most terrifying legacy... a destiny of mutilation and murder.",
      release_date: '1966-03-06',
      poster_path: '/fiVyr7TIkKcc5vDlzK692yUsCTL.jpg',
      pollVotes: 0,
      pollAddedBy: 0
    },
    {
      id: 25623,
      title: 'House',
      overview:
        'Hoping to find a sense of connection to her late mother, Gorgeous takes a trip to the country to visit her aunt at their ancestral house. She invites her six friends, Prof, Melody, Mac, Fantasy, Kung Fu, and Sweet, to join her. The girls soon discover that there is more to the old house than meets the eye.',
      release_date: '1977-08-26',
      poster_path: '/4bG7Md6Myt2YIYz2GXqGmEaAAhS.jpg',
      pollVotes: 0,
      pollAddedBy: 0
    },
    {
      id: 2291,
      title: "Jacob's Ladder",
      overview:
        "After returning home from the Vietnam War, veteran Jacob Singer struggles to maintain his sanity. Plagued by hallucinations and flashbacks, Singer rapidly falls apart as the world and people around him morph and twist into disturbing images. His girlfriend, Jezzie, and ex-wife, Sarah, try to help, but to little avail. Even Singer's chiropractor friend, Louis, fails to reach him as he descends into madness.",
      release_date: '1990-11-02',
      poster_path: '/wTHHuGAlSRNStTHEeObYT82qRsN.jpg',
      pollVotes: 2,
      pollAddedBy: 0
    },
    {
      id: 829,
      title: 'Chinatown',
      overview:
        "Private eye Jake Gittes lives off of the murky moral climate of sunbaked, pre-World War II Southern California. Hired by a beautiful socialite to investigate her husband's extra-marital affair, Gittes is swept into a maelstrom of double dealings and deadly deceits, uncovering a web of personal and political scandals that come crashing together.",
      release_date: '1974-06-20',
      poster_path: '/7ljxmU9L0ugUvyyg0GBkFaarjEq.jpg',
      pollVotes: 1,
      pollAddedBy: 3
    }
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
    {
      id: 29052,
      title: 'The Reptile',
      overview:
        "Harry and Valerie Spalding arrive in the remote Cornish village to an unwelcoming and suspicious population. Harry's brother dies suddenly, bitten by a lethal reptilian bite. They befriend a young woman Anna whose tyrannical father controls her life and, as they discover that others in the village have suffered a similar fate, their investigations lead to Anna. What they uncover is a victim of the most terrifying legacy... a destiny of mutilation and murder.",
      release_date: '1966-03-06',
      poster_path: '/fiVyr7TIkKcc5vDlzK692yUsCTL.jpg',
      pollVotes: 0,
      pollAddedBy: 0
    },
    {
      id: 25623,
      title: 'House',
      overview:
        'Hoping to find a sense of connection to her late mother, Gorgeous takes a trip to the country to visit her aunt at their ancestral house. She invites her six friends, Prof, Melody, Mac, Fantasy, Kung Fu, and Sweet, to join her. The girls soon discover that there is more to the old house than meets the eye.',
      release_date: '1977-08-26',
      poster_path: '/4bG7Md6Myt2YIYz2GXqGmEaAAhS.jpg',
      pollVotes: 0,
      pollAddedBy: 0
    },
    {
      id: 2291,
      title: "Jacob's Ladder",
      overview:
        "After returning home from the Vietnam War, veteran Jacob Singer struggles to maintain his sanity. Plagued by hallucinations and flashbacks, Singer rapidly falls apart as the world and people around him morph and twist into disturbing images. His girlfriend, Jezzie, and ex-wife, Sarah, try to help, but to little avail. Even Singer's chiropractor friend, Louis, fails to reach him as he descends into madness.",
      release_date: '1990-11-02',
      poster_path: '/wTHHuGAlSRNStTHEeObYT82qRsN.jpg',
      pollVotes: 2,
      pollAddedBy: 0
    },
    {
      id: 829,
      title: 'Chinatown',
      overview:
        "Private eye Jake Gittes lives off of the murky moral climate of sunbaked, pre-World War II Southern California. Hired by a beautiful socialite to investigate her husband's extra-marital affair, Gittes is swept into a maelstrom of double dealings and deadly deceits, uncovering a web of personal and political scandals that come crashing together.",
      release_date: '1974-06-20',
      poster_path: '/7ljxmU9L0ugUvyyg0GBkFaarjEq.jpg',
      pollVotes: 4,
      pollAddedBy: 3
    }
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
