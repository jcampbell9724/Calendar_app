"use client"

import { useState } from "react"
import { ArrowRight, CheckSquare, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  title: string
  description?: string
  progress: number
  color: string
  dueDate?: Date
}

interface GoalsSummaryProps {
  className?: string
  goals?: Goal[]
}

export function GoalsSummary({ className, goals: initialGoals }: GoalsSummaryProps) {
  const [goals, setGoals] = useState<Goal[]>(
    initialGoals || [
      {
        id: "1",
        title: "Complete project proposal",
        progress: 70,
        color: "bg-emerald-500",
        dueDate: new Date(2025, 2, 25),
      },
      { id: "2", title: "Research new technologies", progress: 45, color: "bg-blue-500" },
      { id: "3", title: "Improve presentation skills", progress: 30, color: "bg-orange-500" },
    ],
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: "", description: "", dueDate: "" })

  const handleCreateGoal = () => {
    if (!newGoal.title.trim()) return

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-pink-500"]

    const newGoalItem: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      dueDate: newGoal.dueDate ? new Date(newGoal.dueDate) : undefined,
    }

    setGoals([...goals, newGoalItem])
    setNewGoal({ title: "", description: "", dueDate: "" })
    setIsDialogOpen(false)
  }

  return (
    <Card className={cn("border-white/10 bg-zinc-900/50", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <CheckSquare className="h-5 w-5 text-primary" />
        <div>
          <CardTitle>Goals</CardTitle>
          <CardDescription className="text-zinc-400">Your active goals</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckSquare className="mb-2 h-8 w-8 text-zinc-500" />
            <p className="text-sm text-zinc-500">No goals yet</p>
            <Button variant="link" className="mt-2 text-primary" onClick={() => setIsDialogOpen(true)}>
              Create your first goal
            </Button>
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="line-clamp-1">{goal.title}</span>
                  {goal.dueDate && (
                    <span className="text-xs text-zinc-500">Due {goal.dueDate.toLocaleDateString()}</span>
                  )}
                </div>
                <span className="text-zinc-400">({goal.progress}%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <Plus className="mr-1 h-4 w-4" />
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
                <Label htmlFor="description">Description (Optional)</Label>
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
        <Link href="/goals" className="flex items-center gap-1 text-sm text-primary">
          View all goals
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

