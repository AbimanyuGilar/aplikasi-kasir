import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className='max-w-60 border-r border-black h-screen rounded-r-xl shadow-xl p-2'>
        <h1 className='text-2xl font-bold'>Kasir App</h1>
      </nav>
    </div>
  )
}

export default App
