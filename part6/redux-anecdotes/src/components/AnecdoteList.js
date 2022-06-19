import  { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.setNotification(`you just voted '${anecdote.content}'`,5000)
    return  props.voteAnecdote(anecdote)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
                        has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const sortFunction = (a, b) => {
    return b.votes - a.votes
  }
  return {
    anecdotes: [...state.anecdotes].filter(anecdote => anecdote.content.toLowerCase().match(state.filter.toLowerCase())).sort(sortFunction),
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  voteAnecdote,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
