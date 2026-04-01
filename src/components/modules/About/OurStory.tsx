export default function OurStory() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              OUR JOURNEY
            </div>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              The Story Behind EduTrack
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Founded in 2024 by a group of experienced educators and tech enthusiasts, 
                EduTrack was created to solve real problems faced by schools and universities 
                in managing student data, attendance, and academic performance.
              </p>
              <p>
                What started as a simple dashboard project quickly evolved into a comprehensive 
                education management platform trusted by institutions across the region.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-100 rounded-3xl aspect-video flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <div className="text-7xl mb-4">📖</div>
                <p className="text-gray-500 font-medium">Our Story Visual</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}