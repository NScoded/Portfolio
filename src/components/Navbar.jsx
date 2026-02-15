export default function Navbar() {
  return (
    <nav className="fixed w-full px-10 py-6 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/10 z-50">
      <h1 className="text-xl font-bold">
        Nilesh<span className="text-cyan-400">.</span>
      </h1>

      <div className="space-x-8 hidden md:block text-sm">
        <a href="#about" className="hover:text-cyan-400">About</a>
        <a href="#education" className="hover:text-cyan-400">Education</a>
        <a href="#skills" className="hover:text-cyan-400">Skills</a>
        <a href="#projects" className="hover:text-cyan-400">Projects</a>
        <a href="#contact" className="hover:text-cyan-400">Contact</a>
      </div>
    </nav>
  );
}
