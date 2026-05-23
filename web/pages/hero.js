export default function Hero() {
  return (
    <section
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <h1 className="text-6xl font-bold tracking-widest">HELLGATE RAVE</h1>
      <p className="mt-4 text-2xl">Warsaw • 20 September 2025</p>

      <div className="mt-6 flex gap-6">
        <a
          href="#tickets"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold"
        >
          Tickets
        </a>
        <a
          href="#lineup"
          className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-bold"
        >
          Lineup
        </a>
      </div>
    </section>
  );
}
