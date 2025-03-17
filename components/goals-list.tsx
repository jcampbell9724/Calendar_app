"use client"

import { useState } from "react"
import { Check, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Goal {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date | null
  progress: number
  color: string
}

// Sample data - in a real app, this would come from the database
const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send for review",
    completed: false,
    dueDate: new Date(2025, 2, 25),
    progress: 70,
    color: "bg-emerald-500",
  },
  {
    id: "2",
    title: "Research new technologies",
    description: "Complete the tutorial and build a sample app",
    completed: false,
    dueDate: new Date(2025, 2, 15),
    progress: 45,
    color: "bg-blue-500",
  },
  {
    id: "3",
    title: "Improve presentation skills",
    description: "Gather data and create presentation",
    completed: false,
    dueDate: new Date(2025, 3, 5),
    progress: 30,
    color: "bg-orange-500",
  },
]

export function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals)
  const [newGoal, setNewGoal] = useState({ title: "", description: "", dueDate: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateGoal = async () => {
    if (!newGoal.title.trim()) return

    // In a real app, this would call the server action and update the UI after success
    const newGoalWithId = {
      id: Math.random().toString(36).substring(2, 9),
      title: newGoal.title,
      description: newGoal.description,
      completed: false,
      dueDate: newGoal.dueDate ? new Date(newGoal.dueDate) : null,
      progress: 0,
      color: "bg-emerald-500", // Default color
    }

    setGoals([...goals, newGoalWithId])
    setNewGoal({ title: "", description: "", dueDate: "" })
    setIsDialogOpen(false)

    // This would be uncommented in a real app with a database
    // await createGoal(newGoal)
  }

  const handleToggleGoal = async (id: string) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed, progress: goal.completed ? goal.progress : 100 } : goal,
    )

    setGoals(updatedGoals)

    // This would be uncommented in a real app with a database
    // const goalToUpdate = updatedGoals.find(g => g.id === id)
    // if (goalToUpdate) await updateGoal(goalToUpdate)
  }

  const handleDeleteGoal = async (id: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id)
    setGoals(updatedGoals)

    // This would be uncommented in a real app with a database
    // await deleteGoal(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Goals</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-zinc-900 text-white">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription className="text-zinc-400">Add a new goal to track your progress</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Goal title"
                  className="border-white/10 bg-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Goal description"
                  className="border-white/10 bg-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  className="border-white/10 bg-zinc-800"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-white/10 bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`border-white/10 bg-zinc-900/50 ${goal.completed ? "border-green-900/50" : ""}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Checkbox
                      id={`goal-${goal.id}`}
                      checked={goal.completed}
                      onCheckedChange={() => handleToggleGoal(goal.id)}
                      className="border-white/20"
                    />
                    <span className={goal.completed ? "line-through text-zinc-400" : ""}>{goal.title}</span>
                  </CardTitle>
                  {goal.dueDate && (
                    <CardDescription className="text-zinc-400">
                      Due: {goal.dueDate.toLocaleDateString()}
                    </CardDescription>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className={`text-sm ${goal.completed ? "text-zinc-400 line-through" : ""}`}>{goal.description}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-zinc-400">({goal.progress}%)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-800">
                    <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
            {goal.completed && (
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-emerald-500">
                  <Check className="mr-1 h-3 w-3" />
                  Completed
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

