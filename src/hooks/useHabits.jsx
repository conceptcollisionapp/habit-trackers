import React, { createContext, useContext, useState, useEffect } from 'react'

const HabitContext = createContext()

export const getToday = () => new Date().toLocaleDateString('en-CA')

const calculateCurrentStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0
  const sorted = [...completedDates].sort().reverse()
  const today = getToday()
  let streak = 0
  let checkDate = today

  if (!sorted.includes(today)) {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    checkDate = d.toLocaleDateString('en-CA')
  }

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === checkDate) {
      streak++
      const [y, m, day] = checkDate.split('-').map(Number)
      const prev = new Date(y, m - 1, day)
      prev.setDate(prev.getDate() - 1)
      checkDate = prev.toLocaleDateString('en-CA')
    } else {
      break
    }
  }
  return streak
}

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('habits')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('categories')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [habits, categories])

  const addHabit = (name, categoryId) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      categoryId: categoryId || null,
      createdAt: new Date().toISOString(),
      completedDates: [],
      longestStreak: 0,
    }
    setHabits(prev => [...prev, newHabit])
  }

  const deleteHabit = (id) => setHabits(prev => prev.filter(h => h.id !== id))

  const addCategory = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const exists = categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())
    if (exists) return
    const newCat = { id: Date.now().toString(), name: trimmed }
    setCategories(prev => [...prev, newCat])
  }

  const deleteCategory = (id) => {
    setHabits(prev => prev.map(h => h.categoryId === id ? { ...h, categoryId: null } : h))
    setCategories(prev => prev.filter(c => c.id !== id))
    setShowDeleteModal(false)
    setCategoryToDelete(null)
    setSelectedCategory('all')
  }

  const toggleToday = (habitId) => {
    const today = getToday()
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== habitId) return habit
        const isCompleted = habit.completedDates.includes(today)
        const newDates = isCompleted
          ? habit.completedDates.filter(d => d !== today)
          : [...habit.completedDates, today].sort()
        const currentStreak = calculateCurrentStreak(newDates)
        return { ...habit, completedDates: newDates, longestStreak: Math.max(habit.longestStreak, currentStreak) }
      })
    )
  }

  const openDeleteModal = (category) => {
    setCategoryToDelete(category)
    setShowDeleteModal(true)
  }

  return (
    <HabitContext.Provider value={{
      habits, categories, selectedCategory, setSelectedCategory,
      addHabit, deleteHabit, addCategory, deleteCategory, toggleToday,
      showDeleteModal, setShowDeleteModal, categoryToDelete, openDeleteModal,
      calculateCurrentStreak,
    }}>
      {children}
    </HabitContext.Provider>
  )
}

export const useHabits = () => useContext(HabitContext)
