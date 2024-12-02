export default function PagesPage() {
  return (
    <div className="min-h-screen bg-main flex flex-col items-center py-10 px-6">
      <h1 className="text-5xl font-bold text-primary mb-4 text-center">Pages</h1>
      <p className="text-xl text-primary mb-10 text-center max-w-3xl">
        Discover the books that have shaped Keanino&apos;s thoughts and creativity. Each review reflects personal takeaways and inspirations.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
          <div className="w-full h-32 bg-primary rounded-lg mb-4"></div>
          <h2 className="text-xl font-bold text-primary">No Entries Yet</h2>
          <p className="text-sm text-gray-600">Book reviews will appear here soon!</p>
        </div>
      </div>
    </div>
  );
}
