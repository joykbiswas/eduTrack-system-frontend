const reasons = [
  {
    number: "01",
    title: "Smart Automation",
    desc: "Reduce manual work with intelligent attendance, grading & reporting systems."
  },
  {
    number: "02",
    title: "Real-time Insights",
    desc: "Get powerful analytics and dashboards to make informed decisions instantly."
  },
  {
    number: "03",
    title: "User-Centric Design",
    desc: "Beautiful, intuitive interface loved by teachers, students, and administrators."
  },
  {
    number: "04",
    title: "Complete Security",
    desc: "Enterprise-grade security with data privacy at the core of our system."
  },
];

export default function WhyEduTrack() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Institutions Choose EduTrack
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with care. Designed for impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div 
              key={index}
              className="group p-8 bg-white border border-gray-100 rounded-3xl hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl font-bold text-indigo-200 group-hover:text-indigo-300 transition-colors mb-6">
                {item.number}
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}