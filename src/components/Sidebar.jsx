import {
  Home,
  User,
  Folder,
  Layers,
  Briefcase,
  Trophy,
  FileText,
  Mail,
  Activity,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ activeSection, onNavigate }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "about",
      label: "About",
      icon: User,
    },
    {
      id: "projects",
      label: "Projects",
      icon: Folder,
    },
    {
      id: "activities",
      label: "Activities",
      icon: Activity,
    },
    {
      id: "skills",
      label: "Skills",
      icon: Layers,
    },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
    },
    {
      id: "blog",
      label: "Blog",
      icon: FileText,
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
    },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span>NS</span>
      </div>

      {/* Profile */}
      <div className="sidebar-profile">
        <h2>Nilesh Sahu</h2>
        <p>Developer • Learner • Builder</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={22} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider" />

        <blockquote>
          "Consistent progress builds extraordinary results."
        </blockquote>

        <p className="quote-author">— Nilesh Sahu</p>

        <p className="sidebar-copyright">
          © 2026 Nilesh Sahu
          <br />
          All rights reserved.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;