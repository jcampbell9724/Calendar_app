"use client"

import { useState } from "react"
import { ArrowRight, NotebookPen, Plus } from "lucide-react"
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

interface Note {
  id: string
  title: string
  description: string
  content?: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

interface NotesSummaryProps {
  className?: string
  notes?: Note[]
}

export function NotesSummary({ className, notes: initialNotes }: NotesSummaryProps) {
  const [notes, setNotes] = useState<Note[]>(
    initialNotes || [
      {
        id: "1",
        title: "Meeting Notes: Project Kickoff",
        description: "Discussed project timeline and deliverables...",
        content:
          "# Project Kickoff Meeting\n\n- Team introductions\n- Project scope review\n- Timeline discussion\n- Next steps and action items",
        createdAt: new Date(2025, 2, 10),
        updatedAt: new Date(2025, 2, 10),
        tags: ["meeting", "project"],
      },
      {
        id: "2",
        title: "Ideas for New Features",
        description: "Integration with third-party services...",
        content:
          "## Feature Ideas\n\n1. OAuth integration\n2. Export to PDF\n3. Mobile notifications\n4. Dark mode improvements",
        createdAt: new Date(2025, 2, 12),
        updatedAt: new Date(2025, 2, 15),
        tags: ["ideas", "features"],
      },
      {
        id: "3",
        title: "Client Feedback Summary",
        description: "Key points from the client...",
        content:
          "### Client Feedback\n\n- Positive response to the new UI\n- Concerns about loading speed\n- Requested additional reporting features\n- Would like better mobile support",
        createdAt: new Date(2025, 2, 16),
        updatedAt: new Date(2025, 2, 16),
        tags: ["client", "feedback"],
      },
    ],
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const now = new Date()
    const tags = newNote.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    const newNoteItem: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      description: newNote.content.substring(0, 60) + (newNote.content.length > 60 ? "..." : ""),
      content: newNote.content,
      createdAt: now,
      updatedAt: now,
      tags: tags.length > 0 ? tags : undefined,
    }

    setNotes([newNoteItem, ...notes])
    setNewNote({ title: "", content: "", tags: "" })
    setIsDialogOpen(false)
  }

  return (
    <Card className={cn("border-white/10 bg-zinc-900/50", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <NotebookPen className="h-5 w-5 text-primary" />
        <div>
          <CardTitle>Recent Notes</CardTitle>
          <CardDescription className="text-zinc-400">Your latest notes</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <NotebookPen className="mb-2 h-8 w-8 text-zinc-500" />
            <p className="text-sm text-zinc-500">No notes yet</p>
            <Button variant="link" className="mt-2 text-primary" onClick={() => setIsDialogOpen(true)}>
              Create your first note
            </Button>
          </div>
        ) : (
          notes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              className="space-y-1 rounded-md p-2 hover:bg-zinc-800/50 cursor-pointer transition-colors"
              onClick={() => setSelectedNote(note)}
            >
              <h3 className="text-sm font-medium">{note.title}</h3>
              <p className="text-xs text-zinc-400">{note.description}</p>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {note.tags.map((tag, i) => (
                    <span key={i} className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <Plus className="mr-1 h-4 w-4" />
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
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  placeholder="meeting, ideas, todo"
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
              <Button onClick={handleCreateNote}>Create Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href="/notes" className="flex items-center gap-1 text-sm text-primary">
          View all notes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>

      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="border-white/10 bg-zinc-900 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedNote?.title}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedNote?.updatedAt.toLocaleDateString() !== selectedNote?.createdAt.toLocaleDateString()
                ? `Updated ${selectedNote?.updatedAt.toLocaleDateString()}`
                : `Created ${selectedNote?.createdAt.toLocaleDateString()}`}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-auto">
            <div className="rounded-md bg-zinc-800 p-4">
              <pre className="whitespace-pre-wrap text-sm font-sans">{selectedNote?.content}</pre>
            </div>
            {selectedNote?.tags && selectedNote.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1">
                {selectedNote.tags.map((tag, i) => (
                  <span key={i} className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 bg-zinc-800 hover:bg-zinc-700">
              Edit
            </Button>
            <Button>Open in Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

