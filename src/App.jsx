import React from 'react'
import { HabitProvider, useHabits } from './hooks/useHabits'
import CategoryFilter from './components/CategoryFilter'
import HabitCard from './components/HabitCard'
import AddHabitModal from './components/AddHabitModal'
import DeleteCategoryModal from './components/DeleteCategoryModal'

function HabitList() {
  const { habits, selectedCategory, calculateCurrentStreak } = useHabits()
  
  const filtered = selectedCategory === 'all'
    ? habits
    : habits.filter(h => h.categoryId === selectedCategory)

  return (
    <div className="space-y-3 mt-6">
      {filtered.length === 0 && <div className="text-zinc-500 text-center py-8">No habits found.</div>}
      {filtered.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          currentStreak={calculateCurrentStreak(habit.completedDates)} 
        />
      ))}
    </div>
  )
}

export default function App() {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Habit Tracker</h1>
            <AddHabitModal />
          </div>
          <CategoryFilter />
          <HabitList />
          <DeleteCategoryModal />
        </div>
      </div>
    </HabitProvider>
  )
}
