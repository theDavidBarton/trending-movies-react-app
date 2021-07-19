import React, { useState } from 'react'

export default function MovieNightAddNew({ lang }) {
  const [data] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [pollId] = useState(Date.now())
  const [pollTitle, setPollTitle] = useState('')
  const [pollStarts, setPollStarts] = useState('')
  const [pollEnds, setPollEnds] = useState('')
  const [numberOfCollaborators, setNumberOfCollaborators] = useState(1)
  const [collaborators, setCollaborators] = useState([])
  const [editorId] = useState(0)
  const nameExamples = ['Cindy', 'Stan "the Man"', 'Tommy', 'Jane', 'Paulie', 'Anne', 'April', 'Nelson', 'Rose']

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
      setIsSubmitted(true)
    } catch (e) {
      console.error(e)
    }
  }

  const createPoll = () => window.location.href + '?poll=' + Date.now()

  const log = () => {
    console.log(data)
  }

  return (
    <main className='container'>
      <div className='row'>
        {false ? createPoll() && log() : null}
        <h1 className='col'>Create new Movie Night poll</h1>
      </div>
      {!isSubmitted ? (
        <form className='row poll-form' onSubmit={createPollPost}>
          <ul className='list-unstyled col'>
            <li>
              <strong>Poll title:</strong>{' '}
              <input
                required
                type='text'
                placeholder='e.g. Halloween with friends'
                onChange={event => setPollTitle(event.target.value)}></input>
            </li>
            <li>
              <strong>Poll starts:</strong>{' '}
              <input required type='date' onChange={event => setPollStarts(event.target.value)}></input>
            </li>
            <li>
              <strong>Poll ends:</strong> <input required type='date' onChange={event => setPollEnds(event.target.value)}></input>
            </li>
            <li>
              <strong>Your name:</strong>{' '}
              <input
                required
                type='text'
                placeholder='e.g. Dave'
                onChange={event => setCollaborators([{ id: 0, name: event.target.value }])}></input>
            </li>
            <li>
              <strong>Number of collaborators:</strong>{' '}
              <input
                required
                type='number'
                name='collaborator-number'
                value={numberOfCollaborators}
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
                  required
                  type='text'
                  placeholder={`e.g. ${nameExamples[i]}`}
                  /* onChange={event => setCollaborators(arr => [...arr, { id: i + 1, name: event.target.value }])} */
                ></input>
              </li>
            ))}
            <li>
              <input type='submit' value='Create poll' className='btn btn-dark' />
            </li>
          </ul>
        </form>
      ) : pollTitle ? (
        <div className='alert alert-success'>
          You've just created a new poll: {pollTitle}. You will need to share this link with your collaborators to add new movies
          and also to vote on them in the poll's active period:{' '}
          <a
            href={`${window.location.origin}/${lang}/movieNight/${pollId}?poll=${pollId}`}>{`${window.location.origin}/${lang}/movieNight/${pollId}?poll=${pollId}`}</a>
        </div>
      ) : (
        <div className='alert alert-danger'>Something went wrong during your poll creation :( try it again!</div>
      )}
    </main>
  )
}
