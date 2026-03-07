import AlumniSpotlightSection from "../../sections/AlumniSpotlightSection";

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-24">
        <div className="text-center py-16">
          <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6">
            Our <span className="text-black">Alumni</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the achievements and journeys of our remarkable alumni community.
          </p>
        </div>
        <AlumniSpotlightSection />
      </div>
    </main>
  );
}