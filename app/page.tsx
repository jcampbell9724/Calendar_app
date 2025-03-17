"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { storage, initializeStorage } from "@/lib/localStorage"
import { config } from "@/app/config"

type Goal = typeof config.defaults.goals[0]
type Task = typeof config.defaults.tasks[0]
type Habit = typeof config.defaults.habits[0]

export default function HomePage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    // Initialize local storage with default data
    initializeStorage()

    // Load data from local storage
    setGoals(storage.goals.getAll())
    setTasks(storage.tasks.getAll())
    setHabits(storage.habits.getAll())
  }, [])

  return (
    <MainLayout>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="p-4 rounded-lg border border-white/10 bg-zinc-900/50"
              >
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{goal.description}</p>
                {goal.deadline && (
                  <p className="text-sm text-zinc-500 mt-2">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border border-white/10 bg-zinc-900/50"
              >
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                {task.dueDate && (
                  <p className="text-sm text-zinc-500 mt-2">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Habits</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 rounded-lg border border-white/10 bg-zinc-900/50"
              >
                <h3 className="font-semibold">{habit.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{habit.description}</p>
                <p className="text-sm text-zinc-500 mt-2">
                  Frequency: {habit.frequency}
                </p>
                <p className="text-sm text-emerald-500 mt-1">
                  Current streak: {habit.streak} days
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

