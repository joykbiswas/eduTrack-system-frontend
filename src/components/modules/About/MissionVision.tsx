export default function MissionVision() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-indigo-100">
            <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-4xl mb-8">
              🎯
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-5">Our Mission</h3>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              To simplify education management and provide powerful insights that help 
              institutions focus on what matters most — student success and learning excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-indigo-100">
            <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center text-4xl mb-8">
              🌟
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-5">Our Vision</h3>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              To become the most trusted education technology partner, enabling every 
              institution to deliver personalized, data-driven, and future-ready education.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}