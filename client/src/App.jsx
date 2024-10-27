import { useState, useCallback, useRef } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialSymbolAllowed, setSpecialSymbolAllowed] = useState(false);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const notify = () => toast("Copied to clipboard!");

  const generatePassword = useCallback(() => {
    let temp = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialSymbolAllowed) str += "!@#$%^&*(),.:;/";
    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      temp += str.charAt(index);
    }
    setPassword(temp);
  }, [length, numberAllowed, specialSymbolAllowed, uppercaseAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
    notify();
  }, [password]);

  const handleSliderChange = (event, newValue) => setLength(newValue);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

        {/* Header with Title and Tagline */}
        <div className="text-center mb-10">
          <h1 className=" text-5xl font-bold  text-purple-400">Password Generator</h1>
          <p className="text-xl font-thin mt-2 text-gray-400 font-[Times_New_Roman]">
            "Secure, unique passwords at the click of a button!"
          </p>
        </div>

        <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg p-6 bg-gray-900 text-white">

          {/* Password Display and Copy Button */}
          <div className="flex items-center bg-gray-800 rounded-lg p-3 mb-4">
            <input
              type="text"
              value={password}
              className="bg-transparent text-xl w-full outline-none text-purple-400"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <FaCopy
              onClick={copyPasswordToClipboard}
              className="text-purple-400 ml-2 cursor-pointer"
            />
          </div>

          {/* Character Length Slider */}
          <h2 className="text-lg font-semibold mb-4">Character Length: {length}</h2>
          <Box sx={{ width: '100%' }}>
            <Slider
              value={length}
              onChange={handleSliderChange}
              min={8}
              max={32}
              valueLabelDisplay="auto"
              sx={{
                color: 'purple',
                '& .MuiSlider-thumb': {
                  width: 20,
                  height: 20,
                  boxShadow: '0px 0px 8px 0px rgba(128,0,128,0.7)'
                }
              }}
            />
          </Box>

          {/* Settings Toggles */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Password Options</h2>

          <div className=" bg-gray-800 rounded-lg p-3 mb-4">
            <div className="space-y-3">
              {/*Numbers Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold mb-4">Include numbers</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={numberAllowed}
                    onChange={() => setNumberAllowed(!numberAllowed)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className=" bg-gray-800 rounded-lg p-3 mb-4">
            <div className="space-y-3">
              {/*Special characters Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold mb-4">Include special symbols</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specialSymbolAllowed}
                    onChange={() => setSpecialSymbolAllowed(!specialSymbolAllowed)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <div className="space-y-3">
              {/*Uppercase characters Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold mb-4">Include uppercase </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uppercaseAllowed}
                    onChange={() => setUpperCaseAllowed(!uppercaseAllowed)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Generate Password Button */}
          <button
            onClick={generatePassword}
            className="text-lg font-semibold mt-6 w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-lg shadow-lg transition-all duration-200"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
