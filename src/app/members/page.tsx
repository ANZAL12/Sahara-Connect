export default function MembersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto text-center py-16">
          <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6">
            Our <span className="text-black">Members</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Meet the amazing community of Saharians from all walks of life.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for member cards */}
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Member {i + 1}</h3>
                <p className="text-gray-600">Batch 20{i % 5 + 15}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}