import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [special, setSpecial] = useState(false)

  const passwordRef = useRef(null);

  const [password, setPassword] = useState('')


  const copytoClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = useCallback(() => {
    let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = "";
    if (number) s += "0123456789";
    if (special) s += "!@#$%^&*()_+";
    
    for (let i = 1; i <=length; i++) {
      let index = Math.floor(Math.random() * s.length + 1);
      pass += s.charAt(index);

    }
    setPassword(pass);
  }, [length, number, special, setPassword]);

  useEffect(() => {
    generatePassword();
   }, [length, number, special, setPassword]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white-800 bg-gray-400'>
        <h1 className='text-xl my-3 text-white text-center'>Password generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden md-4 my-3'>
          <input type='text' ref={passwordRef} value={password} className='outline-none w-full py-2 px-3 my-2 mx-2 rounded-lg ' placeholder='Password' readOnly />
          <button
            onClick={copytoClipboard}
            className='rounded-full bg-blue-500 text-white mx-2 px-4 my-2'>Copy</button> 
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1 my-2'>
            <input type='range' id='rangeInput' min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor='rangeInput'>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1 my-2'>
            <input type='checkbox' className=' mx-2 my-2 text-white-500' defaultChecked={number} id='numberInput' onChange={() => { setNumber((prev) => !prev) }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 my-2'>
            <input type='checkbox' className=' mx-2 my-2 text-white-500' defaultChecked={special} id='charInput' onChange={() => { setSpecial((prev) => !prev) }} />
            <label htmlFor='charInput'>Spcial</label>
            </div>
        </div>
      </div>
   </>
  )
}

export default App
 