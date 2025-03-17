import { type NextRequest, NextResponse } from "next/server"

// This is a sample API route for goals
// In a real app, this would connect to a database

interface Goal {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: string | null
}

// Sample data - in a real app, this would come from the database
const goals: Goal[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send for review",
    completed: false,
    dueDate: new Date(2025, 2, 25).toISOString(),
  },
  {
    id: "2",
    title: "Learn Next.js",
    description: "Complete the tutorial and build a sample app",
    completed: true,
    dueDate: new Date(2025, 2, 15).toISOString(),
  },
  {
    id: "3",
    title: "Prepare quarterly report",
    description: "Gather data and create presentation",
    completed: false,
    dueDate: new Date(2025, 3, 5).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const completed = searchParams.get("completed")

  let filteredGoals = [...goals]

  // Filter by completion status if provided
  if (completed !== null) {
    const isCompleted = completed === "true"
    filteredGoals = goals.filter((goal) => goal.completed === isCompleted)
  }

  return NextResponse.json(filteredGoals)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Create new goal
    const newGoal: Goal = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title,
      description: body.description || "",
      completed: body.completed || false,
      dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : null,
    }

    // In a real app, this would save to a database
    goals.push(newGoal)

    return NextResponse.json(newGoal, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: "Goal ID is required" }, { status: 400 })
    }

    // Find the goal to update
    const goalIndex = goals.findIndex((goal) => goal.id === body.id)

    if (goalIndex === -1) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    // Update the goal
    goals[goalIndex] = {
      ...goals[goalIndex],
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : goals[goalIndex].dueDate,
    }

    return NextResponse.json(goals[goalIndex])
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

