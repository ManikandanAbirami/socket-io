import { useState } from 'react'
import reactLogo from './assets/react.svg'
import ChatApp from './ChatApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ChatApp />
    </div>
  )
}

export default App
