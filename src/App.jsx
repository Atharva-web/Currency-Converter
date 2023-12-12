import { useState } from "react";
import useCurrencyInfo from "../hooks/useCurrencyInfo";
import InputBox from "../components/InputBox";

function App() {
  // setup states
  const [fromCurrency, setFromCurrency] = useState("inr");
  const [toCurrency, setToCurrency] = useState("usd");

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(currencyInfo);

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  function convert() {
    setToAmount(fromAmount * Number(currencyInfo[toCurrency]));
  }

  function swap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }

  function liveChange(amount) {
    setFromAmount(amount)
    setToAmount(amount * Number(currencyInfo[toCurrency]))
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}
      >
        <div className="w-full mb-1">
          <InputBox
            className="mx-10"
            label="From"
            amount={fromAmount}
            onAmountChange={(amount) => liveChange(amount)}
            currencyOptions={options}
            selectCurrency={fromCurrency}
            onCurrencyChange={(currency) => setFromCurrency(currency)}
          />
        </div>

        <div className="relative w-full h-0.5 mt-5 mb-14">
          <button
            type="button" // so that it does not try to submit form
            className="border-white rounded-md bg-blue-600 text-white px-5 py-1.5 mt-1 absolute left-[165px] -translate-x-1/5 -translate-y-1/5 border-2"
            onClick={swap}
          >
            swap
          </button>
        </div>
        <div className="w-full mt-1 mb-4">
        <InputBox
          className="mx-10"
          label="To"
          amount={toAmount}
          selectCurrency={toCurrency}
          onCurrencyChange={(currency) => setToCurrency(currency)}
          currencyOptions={options} // from and to value might be same
          isAmountDisabled
        />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
        >
          Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
        </button>
      </form>
      </div>
    </div>
  );
}

export default App;
