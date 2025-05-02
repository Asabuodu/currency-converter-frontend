"use client";
import { useState } from 'react';
import axios from 'axios';

interface ConversionResponse {
  result: number;
  rate: number;
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'SGD', 'CNY', 'CHF','BRL', 'RUB', 'ZAR', 'MXN', 'NZD', 'HKD', 'SEK', 'NOK', 'DKK', 'PLN', 'THB ','MYR', 'IDR', 'PHP', 'TRY', 'CZK', 'HUF', 'ILS', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR ', 'JOD', 'TWD', 'VND', 'PKR', 'CLP', 'COP', 'PEN', 'ARS', 'UYU', 'VEF', 'NIO', 'GTQ', 'CRC', 'DOP', 'HNL', 'SVC', 'PYG', 'BAM', 'MKD', 'ALL', 'MDL', 'UAH', 'BYN', 'KZT ', 'AZN', 'GEL', 'AMD', 'NOK', 'ISK', 'LTL', 'LVL', 'EUR', 'XOF', 'XAF', 'XPF', 'XDR', 'XAU', 'XAG ', 'XPT', 'XPD', 'BTC', 'ETH', 'LTC', 'XMR', 'DASH', 'ZEC', 'DOGE', 'BNB', 'SOL', 'ADA', 'DOT', 'TRX', 'MATIC', 'AVAX', 'LINK', 'XLM', 'ALGO', 'ATOM', 'VET', 'FIL', 'ICP ', 'MANA', 'SAND', 'AAVE', 'COMP', 'CRV', 'YFI', 'SNX', 'BAL', 'LDO', 'RUNE', 'KSM', 'DOT', 'FIL', 'ETC', 'ZIL', 'BAT', 'REN', '1INCH', 'SUSHI', 'HNT', 'MATIC ', 'SOL', 'FTM', 'AVAX', 'NEAR', 'LUNA', 'WAVES', 'KAVA', 'XEM', 'XVG', 'DGB', 'QTUM', 'ZRX', 'OMG', 'BAT', 'CVC', 'LOOM', 'MANA', 'SAND', 'ENJ', 'CHZ', 'HBAR  ', 'MATIC', 'SOL', 'FTM', 'AVAX', 'NEAR', 'LUNA', 'WAVES', 'KAVA', 'XEM', 'XVG', 'DGB', 'QTUM', 'ZRX', 'OMG', 'BAT', 'CVC', 'LOOM', 'MANA', 'SAND', 'ENJ', 'CHZ', 'HBAR', 'MATIC', 'SOL', 'FTM', 'AVAX', 'NEAR', 'LUNA', 'WAVES', 'KAVA', 'XEM', 'XVG', 'DGB', 'QTUM', 'ZRX', 'OMG', 'BAT', 'CVC', 'LOOM', 'MANA', 'SAND', 'ENJ', 'CHZ','HBAR', 'XEM', 'XVG', 'DGB', 'QTUM', 'ZRX', 'OMG', 'BAT', 'CVC', 'LOOM', 'MANA', 'SAND', 'ENJ', 'CHZ','HBAR', 'XEM', 'XVG', 'DGB', 'QTUM', 'ZRX', 'OMG', 'BAT', 'CVC', 'LOOM', 'MANA', 'SAND', 'ENJ', 'CHZ','HBAR', 'NGN', 'GHS', 'KES', 'TZS', 'UGX', 'RWF', 'ZMW', 'ZWL', 'MZN', 'SCR', 'SLL', 'SOS', 'TND', 'MAD', 'DZD', 'LYD', 'SDG', 'YER', 'LBP', 'JOD', 'KWD', 'BHD', 'OMR','QAR','AED','SAR','BAM','MKD','ALL','MDL','UAH','BYN','KZT','AZN','GEL','AMD', 'XOF', 'XAF', 'XPF', 'XDR', 'XAU', 'XAG', 'XPT', 'XPD','BTC','ETH','LTC','XMR','DASH','ZEC','DOGE','BNB','SOL','ADA','DOT','TRX','MATIC','AVAX','LINK','XLM','ALGO','ATOM','VET','FIL','ICP'];

  const convertCurrency = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.get<ConversionResponse>(
        'http://localhost:3001/api/convert',
        {
          params: {
            from: fromCurrency,
            to: toCurrency,
            amount: amount,
          },
        }
      );

      setResult(response.data.result);
      setRate(response.data.rate);
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Error converting currency');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
      <form onSubmit={convertCurrency} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {result !== null && rate !== null && (
        <div className="mt-6 p-4 bg-gray-500 rounded-md">
          <p className="text-lg font-semibold text-center">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
          <p className="text-sm text-center text-gray-60 mt-2">
            Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;