import React, { useState } from 'react'

function App() {
  const [bill, setBill] = useState('120')
  const [people, setPeople] = useState('4')
  const [tipPercent, setTipPercent] = useState(20)

  const tipOptions = [0, 10, 15, 20, 25]

  const billNum = Math.max(0, parseFloat(bill) || 0)
  const peopleNum = Math.max(1, parseInt(people) || 1)
  const tipAmount = billNum * (tipPercent / 100)
  const total = billNum + tipAmount

  // Correct rounding: distribute leftover cents exactly
  const totalCents = Math.round(total * 100)
  const baseCents = Math.floor(totalCents / peopleNum)
  const remainderCents = totalCents - baseCents * peopleNum
  const basePerPerson = baseCents / 100
  const extraPayers = remainderCents

  return (
    <div className="app">
      <h1>🌙 NightSplit</h1>

      <div className="input-group">
        <label htmlFor="bill">Bill Total ($)</label>
        <input
          id="bill"
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>

      <div className="input-group">
        <label htmlFor="people">Number of People</label>
        <input
          id="people"
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          min="1"
          step="1"
          inputMode="numeric"
          placeholder="1"
        />
      </div>

      <div className="input-group">
        <label>Tip Percentage</label>
        <div className="tip-buttons">
          {tipOptions.map((percent) => (
            <button
              key={percent}
              className={`tip-btn ${tipPercent === percent ? 'active' : ''}`}
              onClick={() => setTipPercent(percent)}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      <div className="result">
        <h2>Per-person split</h2>
        <div className="amount">${basePerPerson.toFixed(2)}</div>
        {extraPayers > 0 && (
          <p style={{ marginTop: '10px', opacity: 0.9 }}>
            {peopleNum - extraPayers} pay ${basePerPerson.toFixed(2)} • {extraPayers} pay ${(basePerPerson + 0.01).toFixed(2)}
          </p>
        )}
        <p style={{ marginTop: '15px', opacity: 0.8 }}>
          Total with tip: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default App
