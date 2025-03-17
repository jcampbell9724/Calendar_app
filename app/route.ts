import { type NextRequest, NextResponse } from "next/server"

// This is a sample API route for notes
// In a real app, this would connect to a database

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// Sample data - in a real app, this would come from the database
const notes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    content:
      "Discussed project timeline and resource allocation. Need to follow up with the design team about the new mockups.",
    createdAt: new Date(2025, 2, 10).toISOString(),
    updatedAt: new Date(2025, 2, 10).toISOString(),
  },
  {
    id: "2",
    title: "Ideas for Q2",
    content:
      "1. Improve onboarding process\n2. Launch new feature X\n3. Optimize database queries\n4. Conduct user research",
    createdAt: new Date(2025, 2, 12).toISOString(),
    updatedAt: new Date(2025, 2, 15).toISOString(),
  },
  {
    id: "3",
    title: "Book Recommendations",
    content: "- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- The Psychology of Money by Morgan Housel",
    createdAt: new Date(2025, 2, 16).toISOString(),
    updatedAt: new Date(2025, 2, 16).toISOString(),
  },
]

export async function GET() {
  // Sort notes by updatedAt in descending order (newest first)
  const sortedNotes = [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return NextResponse.json(sortedNotes)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const now = new Date().toISOString()

    // Create new note
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title,
      content: body.content,
      createdAt: now,
      updatedAt: now,
    }

    // In a real app, this would save to a database
    notes.push(newNote)

    return NextResponse.json(newNote, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 })
  }

  // Remove the note
  notes.splice(noteIndex, 1)

  return NextResponse.json({ success: true })
}

