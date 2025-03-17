import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-1 pb-10">
        <div className="inline-flex items-center rounded-md bg-muted/50 px-3 py-1 text-sm font-medium">Settings</div>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-white/10 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription className="text-zinc-400">Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" className="border-white/10 bg-zinc-800" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" className="border-white/10 bg-zinc-800" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription className="text-zinc-400">Customize your experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-zinc-400">Receive email updates about your activity.</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-assistant">AI Assistant</Label>
                <p className="text-sm text-zinc-400">Enable AI suggestions and assistance.</p>
              </div>
              <Switch id="ai-assistant" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription className="text-zinc-400">Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Delete Account</h3>
              <p className="text-sm text-zinc-400">
                Permanently delete your account and all of your data. This action cannot be undone.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}

