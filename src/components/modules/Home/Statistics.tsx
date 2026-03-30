import { BookOpen, Building2, GraduationCap, Users } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: "10,000+",
    label: "Students Enrolled",
  },
  {
    icon: Users,
    value: "500+",
    label: "Expert Teachers",
  },
  {
    icon: BookOpen,
    value: "1,200+",
    label: "Courses Available",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Partner Institutions",
  },
];

const Statistics = () => {
  return (
    <section id="statistics" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Institutions Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Numbers that speak for our commitment to quality education management.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 rounded-xl border bg-card p-8 text-center shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
