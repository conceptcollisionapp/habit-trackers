import React, { useState } from 'react'
import { useHabits } from '../hooks/useHabits'

export default function AddHabitModal() {
  const { addHabit, categories } = useHabits()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [catId, setCatId] = useState('')

  const submit = () => {
    if (!name.trim()) return
    addHabit(name.trim(), catId || null)
    setName(''); setCatId(''); setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-white text-black rounded">+ Add Habit</button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded w-80">
            <h3 className="font-semibold mb-4">New Habit</h3>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Habit name" className="w-full bg-zinc-800 p-2 rounded mb-3" />
            <select value={catId} onChange={e => setCatId(e.target.value)} className="w-full bg-zinc-800 p-2 rounded mb-4">
              <option value="">No category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 py-2 bg-zinc-700 rounded">Cancel</button>
              <button onClick={submit} className="flex-1 py-2 bg-white text-black rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
