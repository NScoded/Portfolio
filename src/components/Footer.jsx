import { useState } from "react";

export default function Footer() {

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    const subject = encodeURIComponent("Message from Portfolio");
    const body = encodeURIComponent(message);

    window.location.href = `mailto:nileshsahu2005@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-[#0b0f19] border-t border-white/10 py-6 px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-medium text-base">
            Nilesh Sahu
          </h3>
          <p className="text-gray-400 text-xs">
            Full Stack Developer • Raipur, India
          </p>
        </div>

        {/* Mini Contact Box */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">

          <input
            type="text"
            placeholder="Write a quick message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              bg-transparent
              text-white
              text-xs
              px-4 py-2
              outline-none
              w-48
              placeholder-gray-500
            "
          />

          <button
            onClick={handleSend}
            className="
              bg-cyan-500
              hover:bg-cyan-600
              text-black
              text-xs
              px-4 py-2
              transition
            "
          >
            Send
          </button>

        </div>

        {/* Address */}

        <div className="text-center md:text-right text-xs text-gray-400">
        <p className="text-white font-medium">Location</p>
        <p>Raipur, Chhattisgarh, India</p>
        </div>



      </div>

      {/* Bottom Line */}
      <div className="mt-4 text-center text-gray-500 text-[11px]">
        © {new Date().getFullYear()} Nilesh Sahu
      </div>

    </footer>
  );
}
