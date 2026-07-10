// app/page.tsx
import connectDB from "@/lib/db";
import Home from "@/app/api/models/Home";
import About from "@/app/api/models/About";

async function getData() {
  await connectDB();
  const home = await Home.findOne().lean();
  const about = await About.findOne().lean();
  return {
    home: JSON.parse(JSON.stringify(home)),
    about: JSON.parse(JSON.stringify(about)),
  };
}

export default async function HomePage() {
  const { home, about } = await getData();

  return (
    <main className="min-h-screen">
      {/* Home Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl font-bold">{home?.title || "Welcome"}</h1>
        <p className="mt-4 text-lg text-slate-600">{home?.subtitle}</p>
        {home?.heroImage && (
          <img
            src={home.heroImage}
            alt="Hero"
            className="mt-8 max-w-2xl rounded-lg"
          />
        )}
        <p className="mt-6 max-w-xl text-slate-500">{home?.description}</p>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-3xl font-bold">{about?.title}</h2>
        <p className="mt-2 text-lg text-slate-600">{about?.subtitle}</p>
        {about?.image && (
          <img src={about.image} alt="About" className="mt-6 rounded-lg" />
        )}
        <div className="mt-6 space-y-4">
          {about?.paragraphs?.map((p: string, i: number) => (
            <p key={i} className="text-slate-700">
              {p}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
