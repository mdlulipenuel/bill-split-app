import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Users, DollarSign, TrendingUp, History } from 'lucide-react';

export default function BillSplitApp() {
  const [view, setView] = useState('split');
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState([
    { id: 1, name: '', amount: 0, splitType: 'equal' }
  ]);
  const [history, setHistory] = useState([]);
  const [balances, setBalances] = useState({});

  const totalWithTip = billAmount ? (parseFloat(billAmount) * (1 + tipPercent / 100)).toFixed(2) : 0;
  const equalSplit = people.length > 0 ? (totalWithTip / people.length).toFixed(2) : 0;

  const addPerson = () => {
    setPeople([...people, { 
      id: Date.now(), 
      name: '', 
      amount: 0, 
      splitType: 'equal' 
    }]);
  };

  const removePerson = (id) => {
    if (people.length > 1) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  const updatePerson = (id, field, value) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const saveSplit = () => {
    const split = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: totalWithTip,
      tip: tipPercent,
      people: people.map(p => ({
        name: p.name || 'Guest',
        amount: p.splitType === 'equal' ? equalSplit : p.amount
      }))
    };
    
    const newHistory = [split, ...history];
    setHistory(newHistory);
    localStorage.setItem('billHistory', JSON.stringify(newHistory));

    split.people.forEach(person => {
      const name = person.name;
      setBalances(prev => ({
        ...prev,
        [name]: (prev[name] || 0) + parseFloat(person.amount)
      }));
    });

    alert('Split saved successfully!');
  };

  const clearHistory = () => {
    if (confirm('Clear all history?')) {
      setHistory([]);
      localStorage.removeItem('billHistory');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('billHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <DollarSign className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Bill Split & Track</h1>
          </div>
          <p className="text-gray-600">Split bills fairly, track balances easily</p>
        </header>

        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setView('split')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              view === 'split'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Split Bill
          </button>
          <button
            onClick={() => setView('history')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              view === 'history'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <History className="w-5 h-5 inline mr-2" />
            History
          </button>
          <button
            onClick={() => setView('balances')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              view === 'balances'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Balances
          </button>
        </div>

        {view === 'split' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tip: {tipPercent}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={tipPercent}
                onChange={(e) => setTipPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>

            {billAmount && (
              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total with Tip:</span>
                  <span className="text-3xl font-bold text-indigo-600">${totalWithTip}</span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">People</h3>
                <button
                  onClick={addPerson}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Person
                </button>
              </div>

              <div className="space-y-3">
                {people.map((person, index) => (
                  <div key={person.id} className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={person.name}
                        onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                        placeholder={`Person ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                      />
                      <select
                        value={person.splitType}
                        onChange={(e) => updatePerson(person.id, 'splitType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                      >
                        <option value="equal">Equal Split</option>
                        <option value="custom">Custom Amount</option>
                      </select>
                      {person.splitType === 'custom' && (
                        <input
                          type="number"
                          value={person.amount}
                          onChange={(e) => updatePerson(person.id, 'amount', e.target.value)}
                          placeholder="Amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        />
                      )}
                    </div>
                    <div className="text-center min-w-24">
                      <div className="text-xs text-gray-500 mb-1">Owes</div>
                      <div className="text-xl font-bold text-indigo-600">
                        ${person.splitType === 'equal' ? equalSplit : (person.amount || 0)}
                      </div>
                    </div>
                    {people.length > 1 && (
                      <button
                        onClick={() => removePerson(person.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveSplit}
              disabled={!billAmount || billAmount <= 0}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Save Split
            </button>
          </div>
        )}

        {view === 'history' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Split History</h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No splits saved yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((split) => (
                  <div key={split.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">${split.total}</div>
                        <div className="text-sm text-gray-500">{split.date}</div>
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        Tip: {split.tip}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      {split.people.map((person, idx) => (
                        <div key={idx} className="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="font-medium">{person.name}</span>
                          <span className="text-indigo-600 font-semibold">${person.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'balances' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Running Balances</h2>
            
            {Object.keys(balances).length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No balances tracked yet</p>
                <p className="text-sm text-gray-400 mt-2">Start splitting bills to see balances</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(balances).map(([name, amount]) => (
                  <div key={name} className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <span className="font-semibold text-gray-800">{name}</span>
                    <span className="text-2xl font-bold text-indigo-600">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>💡 Tip: Share this app with friends to split bills easily!</p>
        </footer>
      </div>
    </div>
  );
}