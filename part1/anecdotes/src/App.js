import {useState} from 'react'

const DisplayAnecdote = ({anecdote, votes}) => (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdote}</p>
        <p>votes: {votes}</p>
    </div>
)

const DisplayMaxAnecdote = ({anecdote, max}) => {

    if (max === 0) return <h1>Anecdote with most votes</h1>
    return <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
    </div>
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const addMax = (copy, setMax, selected) => {
    const newMax = {
        votes: copy[selected],
        maxSelected: selected,
    }
    setMax(newMax)
}

const increaseValue = (copy, setMax, max, selected) => {
    copy[selected] += 1
    if (copy[selected] > max.votes) {
        addMax(copy, setMax, selected)
    }
    return copy
}

const randomAnecdote = () => Math.floor(Math.random() * 6)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(6).fill(0))
    const [max, setMax] = useState({
        votes: 0,
        maxSelected: 0
    })
    const copy = [...points]

    return (
        <div>
            <DisplayAnecdote anecdote={anecdotes[selected]} votes={copy[selected]}/>
            <Button handleClick={() => setPoints(increaseValue(copy, setMax, max, selected))} text={"Vote"}/>
            <Button handleClick={() => setSelected(randomAnecdote())} text={"Next anecdote"}/>
            <DisplayMaxAnecdote anecdote={anecdotes[max.maxSelected]} max={max.votes}/>
        </div>
    )
}

export default App