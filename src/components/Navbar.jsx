import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full px-4 sm:px-6 md:px-10 py-4 md:py-6 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/10 z-50">

      {/* Logo */}
      <h1 className="text-lg sm:text-xl font-bold">
        Nilesh<span className="text-cyan-400">.</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-sm">
        <a href="#about" className="hover:text-cyan-400 transition">About</a>
        <a href="#education" className="hover:text-cyan-400 transition">Education</a>
        <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
        <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
        <a href="#certifications" className="hover:text-cyan-400 transition">Certifications</a>
        <a href="#currently-learning" className="hover:text-cyan-400 transition">Exploring</a>
        <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden">
        {open ? (
          <X size={24} onClick={() => setOpen(false)} className="cursor-pointer" />
        ) : (
          <Menu size={24} onClick={() => setOpen(true)} className="cursor-pointer" />
        )}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-6 space-y-6 md:hidden text-sm">
          <a href="#about" onClick={() => setOpen(false)} className="hover:text-cyan-400">About</a>
          <a href="#education" onClick={() => setOpen(false)} className="hover:text-cyan-400">Education</a>
          <a href="#skills" onClick={() => setOpen(false)} className="hover:text-cyan-400">Skills</a>
          <a href="#projects" onClick={() => setOpen(false)} className="hover:text-cyan-400">Projects</a>
          <a href="#certifications" onClick={() => setOpen(false)} className="hover:text-cyan-400">Certifications</a>
          <a href="#currently-learning" onClick={() => setOpen(false)} className="hover:text-cyan-400">Exploring</a>
          <a href="#contact" onClick={() => setOpen(false)} className="hover:text-cyan-400">Contact</a>
        </div>
      )}

    </nav>
  );
}
