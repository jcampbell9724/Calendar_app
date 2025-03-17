import { type NextRequest, NextResponse } from "next/server"

// This is a sample API route for events
// In a real app, this would connect to a database

interface Event {
  id: string
  title: string
  description: string
  date: string
}

// Sample data - in a real app, this would come from the database
const events: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync",
    date: new Date(2025, 2, 18, 10, 0).toISOString(),
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Submit final deliverables",
    date: new Date(2025, 2, 22, 17, 0).toISOString(),
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present quarterly results",
    date: new Date(2025, 2, 25, 14, 30).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  let filteredEvents = [...events]

  // Filter by date range if provided
  if (startDate && endDate) {
    filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
    })
  }

  return NextResponse.json(filteredEvents)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.date) {
      return NextResponse.json({ error: "Title and date are required" }, { status: 400 })
    }

    // Create new event
    const newEvent: Event = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title,
      description: body.description || "",
      date: new Date(body.date).toISOString(),
    }

    // In a real app, this would save to a database
    events.push(newEvent)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

