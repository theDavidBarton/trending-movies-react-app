import React, { useState } from 'react'

export default function MovieNightAddNew({ lang }) {
  const [data] = useState(null)
  const [pollId, setPollId] = useState(null)
  const [pollTitle, setPollTitle] = useState(null)
  const [pollStarts, setPollStarts] = useState(null)
  const [pollEnds, setPollEnds] = useState(null)
  const [numberOfCollaborators, setNumberOfCollaborators] = useState(1)
  const [collaborators, setCollaborators] = useState([])
  const [editorId] = useState(0)

  // eslint-disable-next-line
  const optionsTemp = {
    _id: Date.now(),
    pollTitle: 'Movie Night: Halloween 2020',
    pollStarts: '2020-10-24', // _Date.parse(this)
    pollEnds: '2020-10-24',
    collaborators: [
      { id: 0, name: 'David' },
      { id: 1, name: 'Marci' },
      { id: 2, name: 'Laci' },
      { id: 3, name: 'Tomi' }
    ],
    movies: [],
    lastEdit: 1603555548677,
    lastEditedBy: 2
  }

  const options = {
    _id: pollId,
    pollTitle: pollTitle,
    pollStarts: pollStarts,
    pollEnds: pollEnds,
    collaborators: collaborators,
    movies: [],
    lastEdit: pollId,
    lastEditedBy: editorId
  }

  const createPollPost = async () => {
    try {
      await fetch(`/api/${lang}/movieNightAddNew`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      })
      console.log(options)
    } catch (e) {
      console.error(e)
    }
  }

  const createPoll = () => {
    window.location.href + '?poll=' + Date.now()
  }

  const log = () => {
    console.log(data)
  }

  return (
    <main className='container'>
      <div className='row'>
        {() => setPollId(Date.now())}
        {false ? createPoll() && log() : null}
        <h1 className='col'>Create new Movie Night poll</h1>
      </div>
      <section className='row'>
        <ul className='list-unstyled col'>
          <li>
            <strong>Poll title:</strong> <input type='text' onChange={event => setPollTitle(event.target.value)}></input>
          </li>
          <li>
            <strong>Poll starts:</strong> <input type='date' onChange={event => setPollStarts(event.target.value)}></input>
          </li>
          <li>
            <strong>Poll ends:</strong> <input type='date' onChange={event => setPollEnds(event.target.value)}></input>
          </li>
          <li>
            <strong>Your name:</strong>{' '}
            <input type='text' onChange={event => setCollaborators([{ id: 0, name: event.target.value }])}></input>
          </li>
          <li>
            <strong>Number of collaborators:</strong>{' '}
            <input
              type='number'
              name='collaborator-number'
              min='1'
              max='10'
              onChange={event => setNumberOfCollaborators(event.target.value)}></input>
          </li>
          <li>
            <strong>Collaborators:</strong>{' '}
          </li>
          {[...Array(parseInt(numberOfCollaborators))].map((el, i) => (
            <li key={Math.floor(Math.random() * 100000000)}>
              <input
                type='text'
                onChange={event => setCollaborators(arr => [...arr, { id: i + 1, name: event.target.value }])}></input>
            </li>
          ))}
        </ul>
      </section>
      <button onClick={createPollPost}>POST</button>
    </main>
  )
}
