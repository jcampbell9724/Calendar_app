"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, format, getDay, getDaysInMonth, isSameDay, startOfMonth, subMonths } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Event {
  id: string
  title: string
  description: string
  date: Date
}

// Sample data - in a real app, this would come from the database
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync",
    date: new Date(2025, 2, 18, 10, 0),
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Submit final deliverables",
    date: new Date(2025, 2, 22, 17, 0),
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present quarterly results",
    date: new Date(2025, 2, 25, 14, 30),
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: new Date() })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const daysInMonth = getDaysInMonth(currentDate)
  const startDay = getDay(monthStart)

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setNewEvent((prev) => ({ ...prev, date }))
    setIsDialogOpen(true)
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title.trim()) return

    // In a real app, this would call the server action and update the UI after success
    const newEventWithId = {
      ...newEvent,
      id: Math.random().toString(36).substring(2, 9),
    }

    setEvents([...events, newEventWithId])
    setNewEvent({ title: "", description: "", date: new Date() })
    setIsDialogOpen(false)

    // This would be uncommented in a real app with a database
    // await createEvent(newEvent)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-white/10 bg-zinc-900/50 p-1" />)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayEvents = getEventsForDate(date)

    calendarDays.push(
      <div
        key={day}
        className="h-24 border border-white/10 p-1 hover:bg-zinc-800/50 cursor-pointer transition-colors"
        onClick={() => handleDateClick(date)}
      >
        <div className="flex justify-between">
          <span className="text-sm font-medium">{day}</span>
          {dayEvents.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {dayEvents.length}
            </span>
          )}
        </div>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 2).map((event) => (
            <div key={event.id} className="truncate rounded bg-primary/10 px-1 py-0.5 text-xs">
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && <div className="text-xs text-zinc-400">+{dayEvents.length - 2} more</div>}
        </div>
      </div>,
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="border-white/10 bg-zinc-900 hover:bg-zinc-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-24 text-center font-medium">{format(currentDate, "MMMM yyyy")}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="border-white/10 bg-zinc-900 hover:bg-zinc-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border-white/10 bg-zinc-900/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-zinc-400">
                {day}
              </div>
            ))}
            {calendarDays}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-white/10 bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedDate && `Create a new event for ${format(selectedDate, "MMMM d, yyyy")}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
                className="border-white/10 bg-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
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
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

