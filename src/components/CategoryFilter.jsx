import React, { useState } from 'react'
import { useHabits } from '../hooks/useHabits'

export default function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory, openDeleteModal, addCategory } = useHabits()
  const [newCatName, setNewCatName] = useState('')

  const handleAddCategory = () => {
    if (!newCatName.trim()) return
    addCategory(newCatName.trim())
    setNewCatName('')
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button onClick={() => setSelectedCategory('all')} className={`px-4 py-1 rounded ${selectedCategory === 'all' ? 'bg-white text-black' : 'bg-zinc-800'}`}>All</button>
      {categories.map(cat => (
        <div key={cat.id} className="flex items-center">
          <button onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1 rounded-l ${selectedCategory === cat.id ? 'bg-white text-black' : 'bg-zinc-800'}`}>{cat.name}</button>
          <button onClick={() => openDeleteModal(cat)} className="px-2 py-1 bg-zinc-700 rounded-r hover:bg-red-600">×</button>
        </div>
      ))}
      <button onClick={() => setSelectedCategory(null)} className={`px-4 py-1 rounded ${selectedCategory === null ? 'bg-white text-black' : 'bg-zinc-800'}`}>Uncategorized</button>
      
      <div className="flex ml-2">
        <input 
          value={newCatName} 
          onChange={e => setNewCatName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
          placeholder="New category" 
          className="bg-zinc-800 px-3 py-1 rounded-l text-sm w-32" 
        />
        <button onClick={handleAddCategory} className="px-3 py-1 bg-zinc-700 rounded-r text-sm hover:bg-white hover:text-black">+</button>
      </div>
    </div>
  )
}
