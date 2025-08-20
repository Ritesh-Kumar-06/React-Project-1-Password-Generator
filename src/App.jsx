import { useState, useCallback, useEffect } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let generatedPassword = ""
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) alphabet += "0123456789"
    if (charAllowed) alphabet += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length)
      generatedPassword += alphabet.charAt(randomIndex)
    }
    setPassword(generatedPassword)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyToClipboard = useCallback(() => {
    if (!password) return
    navigator.clipboard.writeText(password).catch(() => {})
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-white'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            readOnly
            className='outline-none w-full py-2 px-3 bg-gray-900 text-green-300 placeholder-gray-500'
            placeholder='Generated password'
          />
          <button
            onClick={copyToClipboard}
            className='shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-4'
            title='Copy to clipboard'
          >
            Copy
          </button>
        </div>

        <div className='flex items-center gap-3 mb-3'>
          <input
            type='range'
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className='w-full accent-blue-600'
          />
          <span className='text-sm text-gray-300 w-10 text-right'>{length}</span>
        </div>

        <div className='flex items-center justify-between gap-4'>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className='accent-blue-600'
            />
            Include numbers
          </label>

          <label className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className='accent-blue-600'
            />
            Include symbols
          </label>
        </div>
      </div>
    </>
  )
}

export default App
