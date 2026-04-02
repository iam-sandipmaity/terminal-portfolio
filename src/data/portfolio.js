export const profile = {
  name: "Kuber Chaurasiya",
  role: "Developer & Creator",
  tagline: "Building elegant solutions from code",
  email: "kuber@example.com",
  github: "https://github.com/kuber",
  linkedin: "https://www.linkedin.com/in/kuber",
  twitter: "https://x.com/kuber_dev",
  blog: "https://kuber.dev/blog",
  location: "India",
  about: `Hi, I'm Kuber Chaurasiya.

I'm a passionate developer who loves building web applications and exploring new technologies.

Currently working on various projects and learning new skills. I believe in clean design, thoughtful engineering, and constantly pushing my boundaries as I grow.`
};

export const projects = [
  {
    id: "portfolio",
    name: "Terminal Portfolio",
    description: "A terminal-styled personal portfolio website with interactive commands.",
    tech: ["React", "JavaScript", "CSS"],
    url: null,
    github: "https://github.com/kuber/portfolio"
  },
  {
    id: "webapp",
    name: "Web Application",
    description: "A full-stack web application with modern features.",
    tech: ["React", "Node.js", "MongoDB"],
    url: "https://example.com",
    github: "https://github.com/kuber/webapp"
  },
  {
    id: "cli-tool",
    name: "CLI Tool",
    description: "Command line tool for automating tasks.",
    tech: ["Python", "CLI"],
    url: null,
    github: "https://github.com/kuber/cli-tool"
  }
];

export const skills = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "HTML/CSS", level: 90 },
  { name: "Python", level: 70 },
  { name: "Git", level: 80 },
  { name: "SQL", level: 65 }
];

export const themes = {
  snow: {
    name: "Snow",
    bg: "#0a0a0a",
    fg: "#f0f8ff",
    accent: "#b0c4de",
    dim: "#1a1a2a"
  }
};

export const commands = {
  help: {
    description: "Show all available commands",
    usage: "help"
  },
  who: {
    description: "Display user information",
    usage: "who"
  },
  about: {
    description: "About me",
    usage: "about"
  },
  skills: {
    description: "Show technical skills",
    usage: "skills"
  },
  projects: {
    description: "List all projects",
    usage: "projects"
  },
  project: {
    description: "Show project details",
    usage: "project <name>"
  },
  github: {
    description: "Open GitHub profile",
    usage: "github"
  },
  linkedin: {
    description: "Open LinkedIn profile",
    usage: "linkedin"
  },
  twitter: {
    description: "Open Twitter profile",
    usage: "twitter"
  },
  email: {
    description: "Show email address",
    usage: "email"
  },
  blog: {
    description: "Open blog",
    usage: "blog"
  },
  contact: {
    description: "Contact information",
    usage: "contact"
  },
  clear: {
    description: "Clear terminal",
    usage: "clear"
  },
  date: {
    description: "Show current date",
    usage: "date"
  },
  time: {
    description: "Show current time",
    usage: "time"
  }
};
