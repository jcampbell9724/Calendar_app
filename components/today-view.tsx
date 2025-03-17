"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  time: string
  location?: string
  description?: string
  priority?: "high" | "medium" | "low"
}

interface TodayViewProps {
  className?: string
  events?: Event[]
}

export function TodayView({ className, events: initialEvents }: TodayViewProps) {
  const [today] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>(
    initialEvents || [
      { id: "1", title: "Team Standup", time: "09:00 AM", location: "Conference Room A", priority: "medium" },
      {
        id: "2",
        title: "Project Review",
        time: "11:30 AM",
        description: "Review Q2 milestones and deliverables",
        priority: "high",
      },
      {
        id: "3",
        title: "Client Meeting",
        time: "02:00 PM",
        location: "Virtual - Zoom",
        description: "Discuss new requirements",
        priority: "high",
      },
    ],
  )

  const formattedDate = format(today, "EEE, MMM d")

  const getPriorityColor = (priority?: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-emerald-500"
      default:
        return "bg-zinc-500"
    }
  }

  return (
    <Card className={cn("border-white/10 bg-zinc-900/50", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <Calendar className="h-5 w-5 text-primary" />
        <div>
          <CardTitle>Today</CardTitle>
          <CardDescription className="text-zinc-400">{formattedDate}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 py-4">No events scheduled for today</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-zinc-800/50 cursor-pointer transition-colors"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="w-20 text-xs text-zinc-400">{event.time}</div>
              <div className={cn("h-2 w-2 rounded-full", getPriorityColor(event.priority))} />
              <div className="flex-1 text-sm font-medium">{event.title}</div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Link href="/calendar" className="flex items-center gap-1 text-sm text-primary">
          View calendar
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="border-white/10 bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription className="text-zinc-400">{formattedDate}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span>{selectedEvent?.time}</span>
            </div>
            {selectedEvent?.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>{selectedEvent.location}</span>
              </div>
            )}
            {selectedEvent?.description && (
              <div className="rounded-md bg-zinc-800 p-3 text-sm">
                <p>{selectedEvent.description}</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="text-sm text-zinc-400">Priority:</div>
              <div className="flex items-center gap-1.5">
                <div className={cn("h-2.5 w-2.5 rounded-full", getPriorityColor(selectedEvent?.priority))} />
                <span className="text-sm capitalize">{selectedEvent?.priority || "None"}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 bg-zinc-800 hover:bg-zinc-700">
              Edit
            </Button>
            <Button>Join Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

