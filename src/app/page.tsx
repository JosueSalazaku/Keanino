import Link from "next/link";
import Image from "next/image";
const mockUrls = [ 
  "https://utfs.io/f/c78ebaa8-bbd2-4b03-97b4-5f7ab2829244-wop9s9.28.26.png",
  "https://utfs.io/f/51e1e845-c4dd-47b8-bf8f-04c34adb84ea-q6pc6a.29.25.png",
  "https://utfs.io/f/1697aec2-1d18-44ee-ada8-e777c3b197d3-sjkpc8.15.23.png",
  "https://utfs.io/f/20f7f870-7ae7-4ef2-8f85-95af4d21b9a5-7ihc95.04.14.png",
  "https://utfs.io/f/907d2028-eea9-4bfe-ac2a-3b98ebf480aa-7ihc95.04.23.png",
  "https://utfs.io/f/61a768f2-21f1-465a-b098-9babc634755f-v25179.00.48.png"
];
const mockImg = mockUrls.map((url, index) => ({
  id: index + 1,
    url,
}));

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-wrap gap-4">
        {mockImg.map((img) => (
          <div key={img.id} className="m-2">
      
            <img src={img.url} alt="mock image" className="w-48" /> {/* Ensure that 'Image' is a valid JSX element type */}
          </div>
        ))}
      </div>
      Blog In progress
    </main>
  );
}
