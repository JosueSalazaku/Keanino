import CreatePost from "~/components/createPost";


export default async function HomePage() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-primary text-white">
      <section className="mt-10 gap-7">
      The 3 P
      </section>
      <section>
        <CreatePost/>
      </section>
      
    </main>
  );
}

