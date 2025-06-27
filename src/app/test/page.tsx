'use client'

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  const [items, setItems] = useState<string[]>([])

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input])
      setInput('')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      
      <div className="mb-4">
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter item"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Item
        </button>
      </div>

      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}