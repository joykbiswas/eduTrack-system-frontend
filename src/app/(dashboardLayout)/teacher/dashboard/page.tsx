
import { Apple, BookOpen, ClipboardList, Users } from "lucide-react"

import { getAllAssessments, getAllWordStoryCards } from "@/services/teacher.services"
import { getAllClasses } from "@/services/admin.services"
import { getUserInfo } from "@/services/auth.services"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const TeachersDashboard = async () => {
  const [userInfo, cardsResponse, assessmentsResponse, classesResponse] = await Promise.all([
    getUserInfo(),
    getAllWordStoryCards(),
    getAllAssessments(),
    getAllClasses(),
  ])

  const cards = cardsResponse?.data ?? []
  const assessments = assessmentsResponse ?? []
  const classes = classesResponse?.data ?? []
  const stats = [
    {
      title: "Story Cards",
      value: cards.length,
      description: "Total learning cards available",
      icon: BookOpen,
      variant: "default",
    },
    {
      title: "Assessments",
      value: assessments.length,
      description: "Created assessments",
      icon: ClipboardList,
      variant: "secondary",
    },
    {
      title: "Classes",
      value: classes.length,
      description: "Classes assigned to the school",
      icon: Users,
      variant: "outline",
    },
    {
      title: "Active Lessons",
      value: cards.filter((item) => item.status === "PUBLISHED").length,
      description: "Published lesson cards",
      icon: Apple,
      variant: "ghost",
    },
  ]

  const latestCards = cards.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase text-primary">Teacher dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight">Hello{userInfo?.name ? `, ${userInfo.name}` : ""}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Access lesson metrics, card activity and assessment totals in one view.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="group overflow-hidden">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle>{stat.title}</CardTitle>
                  </div>
                  <Badge variant={stat.variant as BadgeVariant}>{stat.value}</Badge>
                </div>
                <CardDescription>{stat.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2" />
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest Story Cards</CardTitle>
          <CardDescription>Review the newest learning cards with status and keywords.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.keywords}</TableCell>
                  <TableCell>
                    <Badge variant={card.status === "PUBLISHED" ? "default" : "outline"}>
                      {card.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(card.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeachersDashboard
