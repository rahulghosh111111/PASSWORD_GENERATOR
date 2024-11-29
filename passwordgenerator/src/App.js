import { useState, useCallback, useEffect, useRef } from 'react';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  //useref hook
  const passwordRef = useRef(null)

  // password generator function
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*"
    }
    //creating random password
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)  // generating random number
      pass += str.charAt(char)  // getting character from random number
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  // copy password
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!"); // Replace with a toast for better UX
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='bg-black w-full h-screen flex justify-center items-center'>
        <div className=' w-full max-w-lg mx-auto shadow-md rounded-lg px-8 py-6 my-10 text-orange-500 bg-gray-700'>
          <h1 className='text-white text-center my-3 text-2xl'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-600 py-1.5 px-3 text-center text-white shrink-0 hover:bg-blue-700 cursor-pointer"
            >Copy</button>

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type='range'
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => setLength(e.target.value)}  // updating length
              />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                checked={numberAllowed}      // checkbox for character
                id='numberInput'
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                defaultchecked={charAllowed}      // checkbox for character
                id='numberInput'
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor='characterInput'>Character</label>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
