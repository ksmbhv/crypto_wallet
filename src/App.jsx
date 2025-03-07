import { useState, useEffect } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';
import { Buffer } from 'buffer';

window.Buffer = Buffer;


function App() {
  const [mnemonic, setMnemonic] = useState("");
  
  // Debug - check if generateMnemonic is available
  useEffect(() => {
    console.log("generateMnemonic available:", typeof generateMnemonic === 'function');
  }, []);

  return (
    <>
      <input 
        type="text" 
        value={mnemonic} 
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <button onClick={() => {
        try {
          console.log("Generating mnemonic...");
          const mn = generateMnemonic();
          console.log("Generated:", mn);
          setMnemonic(mn);
        } catch (error) {
          console.error("Error generating mnemonic:", error);
          alert("Error generating mnemonic: " + error.message);
        }
      }}>
        Create Seed Phrase
      </button>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  )
}

export default App
