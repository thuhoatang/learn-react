import React from 'react';
import Accordion from './components/Accordion'
import Search from './components/Search'

const items = [
    {title: 'What is React', content: 'React is Javascript framwork...'},
    {title: "How do we show", content: "To show content ..."},
    {title: 'Why in React uesful', content: "Engineers like React..."}
]
const App = () => {
  return (
    <div>
        <Search/>
        {/* <Accordion itemsPropAcc={items}/> */}
    </div>
  )
}

export default App