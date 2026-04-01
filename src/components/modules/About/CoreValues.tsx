const values = [
  { icon: "💡", title: "Innovation", desc: "Pushing boundaries in education technology" },
  { icon: "🤝", title: "Collaboration", desc: "Working together with educators" },
  { icon: "🔒", title: "Trust", desc: "Security and transparency first" },
  { icon: "🌱", title: "Growth", desc: "Helping students and institutions grow" },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div key={i} className="text-center group">
              <div className="mx-auto w-24 h-24 bg-white shadow-md rounded-3xl flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}