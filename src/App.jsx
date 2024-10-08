import { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [password, setPassword] = useState("");
  const [textLength, setTextLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  //ref hook
  const  passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let string= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbers) string += "0123456789";
    if(characters) string += "!@#$%^&*-_+={}[]~`";

    for(let i=0; i < textLength; i++){
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setPassword(pass);

  }, [textLength, numbers, characters, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(generatePassword,[textLength, numbers, characters, generatePassword])

  return (
    <>
      <div className="mt-32 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-8">Password Generator</h1>
        <div>
          <input
            className="py-3 px-3 bg-white text-start mr-3 rounded-lg w-[500px]"
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="text-white bg-blue-600 px-6 py-3 rounded-lg" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="range"
              max={45}
              name="textLength"
              id="textLength"
              value={textLength}
              onChange={(e) => setTextLength(e.target.value)}
            />
            <label className="text-white text-lg" htmlFor="textLength">
              Length ({textLength})
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="number"
              id="number"
              checked={numbers}
              onChange={(e) => setNumbers(!numbers)}
            />
            <label className="text-white text-lg" htmlFor="number">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="character"
              id="character"
              checked={characters}
              onChange={(e) => setCharacters(!characters)}
            />
            <label className="text-white text-lg" htmlFor="character">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
