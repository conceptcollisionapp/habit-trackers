import React from 'react'
import { useHabits, getToday } from '../hooks/useHabits'

export default function HabitCard({ habit, currentStreak }) {
  const { toggleToday, deleteHabit } = useHabits()
  const isDone = habit.completedDates.includes(getToday())
  const flameColor = currentStreak > 6 ? 'text-orange-500' : currentStreak > 2 ? 'text-yellow-500' : 'text-zinc-600'

  return (
    <div className="bg-zinc-900 p-4 rounded flex items-center justify-between">
      <div>
        <div className="font-medium">{habit.name}</div>
        <div className="text-sm text-zinc-400 flex gap-3 mt-1">
          <span>🔥 <span className={flameColor}>{currentStreak}</span> current</span>
          <span>🏆 {habit.longestStreak} longest</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => toggleToday(habit.id)} className={`px-4 py-2 rounded ${isDone ? 'bg-green-600' : 'bg-zinc-700'}`}>{isDone ? 'Done' : 'Mark done'}</button>
        <button onClick={() => deleteHabit(habit.id)} className="px-3 py-2 bg-zinc-800 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  )
}
