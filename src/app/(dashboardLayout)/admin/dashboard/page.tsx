
import { ArrowUpRight, Building2, LayoutDashboard, ShieldCheck, Users } from "lucide-react"

import { getAllAdmins, getAllClasses, getAllOrganizations, getAllStudents, getAllTeachers } from "@/services/admin.services"
import { getUserInfo } from "@/services/auth.services"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const AdminDashboardPage = async () => {
  const [userInfo, adminsResponse, teachersResponse, studentsResponse, organizationsResponse, classesResponse] = await Promise.all([
    getUserInfo(),
    getAllAdmins(),
    getAllTeachers(),
    getAllStudents(),
    getAllOrganizations(),
    getAllClasses(),
  ])

  const admins = adminsResponse?.data ?? []
  const teachers = teachersResponse?.data?.teachers ?? []
  const students = studentsResponse?.data ?? []
  const organizations = organizationsResponse?.data ?? []
  const classes = classesResponse?.data ?? []
  const stats = [
    {
      title: "Admins",
      value: admins.length,
      description: "Active admin accounts",
      icon: ShieldCheck,
      variant: "default",
    },
    {
      title: "Teachers",
      value: teachers.length,
      description: "Registered teachers",
      icon: Users,
      variant: "secondary",
    },
    {
      title: "Students",
      value: students?.length,
      description: "Enrolled students",
      icon: LayoutDashboard,
      variant: "outline",
    },
    {
      title: "Organizations",
      value: organizations.length,
      description: "Schools and campuses",
      icon: Building2,
      variant: "ghost",
    },
    {
      title: "Classes",
      value: classes.length,
      description: "Available class groups",
      icon: ArrowUpRight,
      variant: "destructive",
    },
  ]

  const latestTeachers = teachers.slice(0, 5)
  const latestClasses = classes.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase text-primary">Admin dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back{userInfo?.name ? `, ${userInfo.name}` : ""}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor platform activity, review recent teacher and class records, and keep administration metrics within reach.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Teachers</CardTitle>
            <CardDescription>Latest teacher records from the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.user.status === "ACTIVE" ? "default" : "outline"}>
                        {teacher.user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Classes</CardTitle>
            <CardDescription>New class groups configured in the system.</CardDescription>
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
                {latestClasses.map((cls) => (
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
    </div>
  )
}

export default AdminDashboardPage