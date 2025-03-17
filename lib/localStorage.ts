import { config } from '@/app/config'

const STORAGE_KEYS = {
  GOALS: 'calendar_app_goals',
  TASKS: 'calendar_app_tasks',
  HABITS: 'calendar_app_habits',
}

// Initialize storage with default data if empty
export function initializeStorage() {
  if (typeof window === 'undefined') return

  // Initialize goals
  if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(config.defaults.goals))
  }

  // Initialize tasks
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(config.defaults.tasks))
  }

  // Initialize habits
  if (!localStorage.getItem(STORAGE_KEYS.HABITS)) {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(config.defaults.habits))
  }
}

// Generic CRUD operations
export function getItems<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  const items = localStorage.getItem(key)
  return items ? JSON.parse(items) : []
}

export function setItems<T>(key: string, items: T[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(items))
}

export function addItem<T extends { id: string }>(key: string, item: T) {
  const items = getItems<T>(key)
  items.push(item)
  setItems(key, items)
}

export function updateItem<T extends { id: string }>(key: string, item: T) {
  const items = getItems<T>(key)
  const index = items.findIndex(i => i.id === item.id)
  if (index !== -1) {
    items[index] = item
    setItems(key, items)
  }
}

export function deleteItem<T extends { id: string }>(key: string, id: string) {
  const items = getItems<T>(key)
  const filtered = items.filter(item => item.id !== id)
  setItems(key, filtered)
}

// Specific data operations
export const storage = {
  goals: {
    getAll: () => getItems<typeof config.defaults.goals[0]>(STORAGE_KEYS.GOALS),
    add: (goal: typeof config.defaults.goals[0]) => addItem(STORAGE_KEYS.GOALS, goal),
    update: (goal: typeof config.defaults.goals[0]) => updateItem(STORAGE_KEYS.GOALS, goal),
    delete: (id: string) => deleteItem(STORAGE_KEYS.GOALS, id),
  },
  tasks: {
    getAll: () => getItems<typeof config.defaults.tasks[0]>(STORAGE_KEYS.TASKS),
    add: (task: typeof config.defaults.tasks[0]) => addItem(STORAGE_KEYS.TASKS, task),
    update: (task: typeof config.defaults.tasks[0]) => updateItem(STORAGE_KEYS.TASKS, task),
    delete: (id: string) => deleteItem(STORAGE_KEYS.TASKS, id),
  },
  habits: {
    getAll: () => getItems<typeof config.defaults.habits[0]>(STORAGE_KEYS.HABITS),
    add: (habit: typeof config.defaults.habits[0]) => addItem(STORAGE_KEYS.HABITS, habit),
    update: (habit: typeof config.defaults.habits[0]) => updateItem(STORAGE_KEYS.HABITS, habit),
    delete: (id: string) => deleteItem(STORAGE_KEYS.HABITS, id),
  },
} 