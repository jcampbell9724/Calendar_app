import { AiAssistant } from "@/components/ai-assistant"
import { GoalsSummary } from "@/components/goals-summary"
import { MainLayout } from "@/components/main-layout"
import { NotesSummary } from "@/components/notes-summary"
import { TodayView } from "@/components/today-view"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-1 pb-10">
        <div className="inline-flex items-center rounded-md bg-zinc-800 px-3 py-1 text-sm font-medium">Dashboard</div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-zinc-400">Manage your tasks, goals, and notes efficiently with AI assistance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AiAssistant />
        <TodayView />
        <GoalsSummary />
        <NotesSummary />
      </div>
    </MainLayout>
  )
}

