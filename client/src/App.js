import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { TOKEN_SWAP_ADDRESS, TOKEN_SWAP_ABI } from "./utils/constants";
import "./App.css";
import Footer from "./components/Footer"; // ✅ Path fixed

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [balanceA, setBalanceA] = useState("0");
  const [balanceB, setBalanceB] = useState("0");

  const tokenAAddress = "0x30c15916EbF133F943D8d8Cc5df5bb86ADad192F";
  const tokenBAddress = "0xD08361BB7A1F20c89C4A94c3964Dd399Cd08798D";

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await tempProvider.getSigner();

      const tempContract = new ethers.Contract(
        TOKEN_SWAP_ADDRESS,
        TOKEN_SWAP_ABI,
        signer
      );

      setProvider(tempProvider);
      setContract(tempContract);

      await fetchBalances(accounts[0], tempProvider);
    } else {
      alert("MetaMask not detected!");
    }
  };

  const fetchBalances = async (wallet, provider) => {
    const tokenA = new ethers.Contract(
      tokenAAddress,
      ["function balanceOf(address) view returns (uint)"],
      provider
    );
    const tokenB = new ethers.Contract(
      tokenBAddress,
      ["function balanceOf(address) view returns (uint)"],
      provider
    );

    const balA = await tokenA.balanceOf(wallet);
    const balB = await tokenB.balanceOf(wallet);

    setBalanceA(ethers.formatUnits(balA, 18));
    setBalanceB(ethers.formatUnits(balB, 18));
  };

  const handleSwap = async () => {
    if (!amount || isNaN(amount)) return alert("Enter valid amount");
    if (!provider || !contract) return alert("Wallet not connected");

    const signer = await provider.getSigner();
    const tokenA = new ethers.Contract(
      tokenAAddress,
      ["function approve(address, uint256) public returns (bool)"],
      signer
    );
    const parsed = ethers.parseUnits(amount, 18);

    try {
      const approveTx = await tokenA.approve(TOKEN_SWAP_ADDRESS, parsed);
      await approveTx.wait();

      const swapTx = await contract.swap(parsed); // Needs swap(uint)
      await swapTx.wait();

      alert("Swap successful ✅");
      await fetchBalances(account, provider);
    } catch (err) {
      console.error("Swap failed:", err);
      alert("Swap failed ❌");
    }
  };

  return (
  <>
    <div className="main-content">
      <div className="container">
        <h1>Token Swap DApp</h1>

        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <p><strong>Connected:</strong> {account}</p>
            <p>🅰️ TokenA Balance: {balanceA}</p>
            <p>🅱️ TokenB Balance: {balanceB}</p>

            <input
              type="number"
              placeholder="Amount of TokenA"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSwap}>Swap</button>
          </>
        )}
      </div>
    </div>

    <Footer />
  </>
);
}

export default App;
