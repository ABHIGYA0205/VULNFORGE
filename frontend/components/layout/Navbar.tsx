export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-8">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500" />

        <span className="text-sm">
          Scanner Offline
        </span>
      </div>

    </header>
  );
}