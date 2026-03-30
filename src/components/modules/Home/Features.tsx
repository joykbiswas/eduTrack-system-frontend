import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Easily manage student records, enrollments, attendance, and academic progress all in one place.",
  },
  {
    icon: UserCog,
    title: "Teacher Management",
    description:
      "Assign courses, track performance, and manage teacher schedules with an intuitive dashboard.",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description:
      "Create, update, and organize courses with curriculum planning, materials, and grading tools.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Gain actionable insights with real-time analytics, performance reports, and data visualization.",
  },
  {
    icon: CalendarCheck,
    title: "Scheduling",
    description:
      "Automate class schedules, exam timetables, and event planning with conflict-free scheduling.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Secure your platform with granular role-based permissions for admins, teachers, and students.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Modern Education
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to manage your educational institution efficiently.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
