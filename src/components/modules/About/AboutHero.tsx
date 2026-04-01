export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff20_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-28 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6">
            <span className="text-sm font-medium tracking-widest">SINCE 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Transforming Education<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-200">
              Through Intelligent Tracking
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-900 max-w-2xl mx-auto leading-relaxed">
            EduTrack is more than just software — it is a complete ecosystem 
            designed to empower educators, students, and institutions.
          </p>
        </div>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[60px]"></div>
    </section>
  );
}