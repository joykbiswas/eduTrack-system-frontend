
import { BookOpen, CheckSquare, LayoutDashboard, School2 } from "lucide-react"

import { getAllAssessments, getAllWordStoryCards } from "@/services/teacher.services"
import { getAllClasses } from "@/services/admin.services"
import { getUserInfo } from "@/services/auth.services"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const StudentDashboard = async () => {
  const [userInfo, classesResponse, cardsResponse, assessmentsResponse] = await Promise.all([
    getUserInfo(),
    getAllClasses(),
    getAllWordStoryCards(),
    getAllAssessments(),
  ])

  const classes = classesResponse?.data ?? []
  const cards = cardsResponse?.data ?? []
  const assessments = assessmentsResponse ?? []

  const stats = [
    {
      title: "Classes",
      value: classes.length,
      description: "Available class groups",
      icon: School2,
      variant: "default",
    },
    {
      title: "Lessons",
      value: cards.length,
      description: "Learning cards available",
      icon: BookOpen,
      variant: "secondary",
    },
    {
      title: "Quizzes",
      value: assessments.length,
      description: "Assessments ready",
      icon: CheckSquare,
      variant: "outline",
    },
    {
      title: "Published",
      value: cards.filter((card) => card.status === "PUBLISHED").length,
      description: "Live lesson cards",
      icon: LayoutDashboard,
      variant: "ghost",
    },
  ]

  const recentClasses = classes.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase text-primary">Student dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back{userInfo?.name ? `, ${userInfo.name}` : ""}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Quickly see your class count, available lessons and active quizzes.
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
          <CardTitle>Your Classes</CardTitle>
          <CardDescription>Review the classes currently configured for the school.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Teacher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.sectionCode}</TableCell>
                  <TableCell>{cls.academicYear}</TableCell>
                  <TableCell>{cls.teacher?.name ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDashboard