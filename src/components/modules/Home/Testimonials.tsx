import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Principal, Greenfield Academy",
    content:
      "EduTrack has transformed how we manage our institution. From attendance tracking to grade management, everything is streamlined and efficient.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Head of IT, Westlake University",
    content:
      "The analytics dashboard gives us real-time insights into student performance. It has helped us identify at-risk students early and take action.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Administrator, Sunrise School",
    content:
      "The role-based access control is exactly what we needed. Teachers, students, and parents all have the right level of access and information.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Educators Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from administrators and educators who trust EduTrack.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative">
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
