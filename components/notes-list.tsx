"use client"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Sample data - in a real app, this would come from the database
const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes: Project Kickoff",
    content:
      "Discussed project timeline and resource allocation. Need to follow up with the design team about the new mockups.",
    createdAt: new Date(2025, 2, 10),
    updatedAt: new Date(2025, 2, 10),
  },
  {
    id: "2",
    title: "Ideas for New Features",
    content:
      "1. Improve onboarding process\n2. Launch new feature X\n3. Optimize database queries\n4. Conduct user research",
    createdAt: new Date(2025, 2, 12),
    updatedAt: new Date(2025, 2, 15),
  },
  {
    id: "3",
    title: "Client Feedback Summary",
    content:
      "- Positive response to the new UI\n- Concerns about loading speed\n- Requested additional reporting features",
    createdAt: new Date(2025, 2, 16),
    updatedAt: new Date(2025, 2, 16),
  },
]

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes)
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const now = new Date()

    // In a real app, this would call the server action and update the UI after success
    const newNoteWithId = {
      id: Math.random().toString(36).substring(2, 9),
      title: newNote.title,
      content: newNote.content,
      createdAt: now,
      updatedAt: now,
    }

    setNotes([newNoteWithId, ...notes])
    setNewNote({ title: "", content: "" })
    setIsDialogOpen(false)

    // This would be uncommented in a real app with a database
    // await createNote(newNote)
  }

  const handleDeleteNote = async (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)

    // This would be uncommented in a real app with a database
    // await deleteNote(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-zinc-900 text-white">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription className="text-zinc-400">Add a new note to your collection</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title"
                  className="border-white/10 bg-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Note content"
                  className="min-h-32 border-white/10 bg-zinc-800"
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
              <Button onClick={handleCreateNote}>Create Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="border-white/10 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{note.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm text-zinc-300">{note.content}</p>
            </CardContent>
            <CardFooter className="text-xs text-zinc-500">
              {note.updatedAt.toLocaleDateString() !== note.createdAt.toLocaleDateString()
                ? `Updated ${note.updatedAt.toLocaleDateString()}`
                : `Created ${note.createdAt.toLocaleDateString()}`}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

