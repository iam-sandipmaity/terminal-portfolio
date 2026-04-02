import { useState, useCallback, useRef, useEffect } from 'react';
import { profile, projects, skills, themes, commands } from '../data/portfolio';

const useTerminal = (onThemeChange) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = useCallback((cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    const getOutput = () => {
      switch (command) {
        case 'help':
          return {
            type: 'help',
            content: Object.entries(commands).map(([key, val]) => ({
              cmd: key,
              desc: val.description,
              usage: val.usage
            }))
          };
        case 'who':
        case 'about':
          return { type: 'about', content: profile };
        case 'skills':
          return { type: 'skills', content: skills };
        case 'projects':
          return { type: 'projects', content: projects };
        case 'project':
          if (!args) return { type: 'error', content: 'Usage: project <name>' };
          const project = projects.find(p => p.id.toLowerCase() === args.toLowerCase() || p.name.toLowerCase().includes(args.toLowerCase()));
          if (project) return { type: 'project', content: project };
          return { type: 'error', content: `Project "${args}" not found` };
        case 'github':
          window.open(profile.github, '_blank');
          return { type: 'link', content: 'Opening GitHub...', url: profile.github };
        case 'linkedin':
          window.open(profile.linkedin, '_blank');
          return { type: 'link', content: 'Opening LinkedIn...', url: profile.linkedin };
        case 'twitter':
          window.open(profile.twitter, '_blank');
          return { type: 'link', content: 'Opening Twitter...', url: profile.twitter };
        case 'email':
          return { type: 'text', content: `Email: ${profile.email}` };
        case 'blog':
          window.open(profile.blog, '_blank');
          return { type: 'link', content: 'Opening Blog...', url: profile.blog };
        case 'contact':
          return { type: 'contact', content: profile };
        case 'clear':
          setHistory([]);
          return null;
        case 'date':
          return { type: 'text', content: new Date().toLocaleDateString() };
        case 'time':
          return { type: 'text', content: new Date().toLocaleTimeString() };
        case 'exit':
          return { type: 'error', content: 'Nothing to exit' };
        default:
          return { type: 'error', content: `Command not found: ${command}. Type "help"` };
      }
    };

    const output = getOutput();
    if (command) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }
    if (output) {
      setHistory(prev => [...prev, { command: cmd, output, timestamp: Date.now() }]);
    }
    return output;
  }, []);

  const handleSubmit = useCallback((value) => {
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    processCommand(value);
  }, [processCommand]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp' && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [commandHistory, historyIndex, suggestions]);

  const handleInputChange = useCallback((value) => {
    setInput(value);
    if (value.trim()) {
      const filtered = Object.keys(commands).filter(cmd => cmd.toLowerCase().startsWith(value.toLowerCase().split(' ')[0]));
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0 && filtered[0] !== value.toLowerCase().split(' ')[0]);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  return {
    history, input, setInput: handleInputChange, handleSubmit, handleKeyDown,
    suggestions, showSuggestions, terminalEndRef
  };
};

const Terminal = () => {
  const { history, input, setInput, handleSubmit, handleKeyDown, suggestions, showSuggestions, terminalEndRef } = useTerminal();

  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const ASCII_CAT = `
    /\\_/\\  
   ( o.o ) 
    > ^ <`;

  // Remove the terminal header, keep it minimal
  return (
    <div className="terminal">
      <div className="terminal-content">
        {history.length === 0 && (
          <div className="welcome-message">
            <pre className="ascii-art">{ASCII_CAT}</pre>
            <p className="welcome-text">Kuber Chaurasiya</p>
            <p className="welcome-subtext">Developer & Creator</p>
            <p className="welcome-hint">Type <span className="highlight">help</span> to get started</p>
          </div>
        )}
        {history.map((item, i) => <Output key={i} command={item.command} output={item.output} />)}
        <form onSubmit={e => { e.preventDefault(); if (input.trim()) handleSubmit(input); }} className="input-line">
          <span className="prompt"><span className="user">kuber</span><span>@</span><span className="host">profile</span><span>:~$</span></span>
          <div className="input-wrapper">
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} className="terminal-input" autoComplete="off" spellCheck="false" />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions">{suggestions.map((s, i) => <div key={i} className="suggestion" onClick={() => { setInput(s); inputRef.current?.focus(); }}>{s}</div>)}</div>
            )}
          </div>
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

const Output = ({ command, output }) => {
  const renderContent = () => {
    switch (output.type) {
      case 'text': return <p className="output-text">{output.content}</p>;
      case 'error': return <p className="output-error">{output.content}</p>;
      case 'link': return <p className="output-link">{output.content}</p>;
      case 'about': return <div className="output-about"><h2 className="name">{output.content.name}</h2><p className="role">{output.content.role}</p><p className="tagline">{output.content.tagline}</p><div className="about-details">{output.content.about.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div></div>;
      case 'skills': return <div className="output-skills"><h3>Technical Skills</h3><div className="skills-grid">{output.content.map((s, i) => <div key={i} className="skill-item"><span className="skill-name">{s.name}</span><div className="skill-bar"><div className="skill-fill" style={{width: `${s.level}%`}}></div></div><span className="skill-level">{s.level}%</span></div>)}</div></div>;
      case 'projects': return <div className="output-projects"><h3>Projects ({output.content.length})</h3><div className="projects-list">{output.content.map((p, i) => <div key={i} className="project-card"><h4 className="project-name">{p.name}</h4><p className="project-desc">{p.description}</p><div className="project-tech">{p.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}</div><div className="project-links">{p.url && <a href={p.url} target="_blank" rel="noopener">Live Demo</a>}{p.github && <a href={p.github} target="_blank" rel="noopener">GitHub</a>}</div></div>)}</div></div>;
      case 'project': return <div className="output-project-detail"><h3>{output.content.name}</h3><p>{output.content.description}</p><div className="detail-tech">{output.content.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div><div className="detail-links">{output.content.url && <a href={output.content.url} target="_blank" className="btn-link">Live Demo</a>}{output.content.github && <a href={output.content.github} target="_blank" className="btn-link">GitHub</a>}</div></div>;
      case 'contact': return <div className="output-contact"><h3>Contact</h3><div className="contact-list"><div className="contact-item"><span>Email:</span><a href={`mailto:${output.content.email}`}>{output.content.email}</a></div><div className="contact-item"><span>GitHub:</span><a href={output.content.github} target="_blank">{output.content.github.replace('https://', '')}</a></div><div className="contact-item"><span>LinkedIn:</span><a href={output.content.linkedin} target="_blank">{output.content.linkedin.replace('https://www.', '')}</a></div><div className="contact-item"><span>Twitter:</span><a href={output.content.twitter} target="_blank">{output.content.twitter.replace('https://', '')}</a></div></div></div>;
      case 'themes': return <div className="output-themes"><h3>Available Themes</h3><p>Usage: theme &lt;name&gt;</p><div className="themes-grid">{Object.entries(output.content).map(([k, v]) => <div key={k} className="theme-card" style={{borderColor: v.fg}}><div className="theme-preview" style={{backgroundColor: v.bg}}><span style={{color: v.fg}}>Aa</span></div><span className="theme-name">{v.name}</span><code>theme {k}</code></div>)}</div></div>;
      case 'help': return <div className="output-help"><h3>Commands</h3><div className="commands-grid">{output.content.map((c, i) => <div key={i} className="command-item"><code>{c.cmd}</code><span>{c.desc}</span></div>)}</div></div>;
      case 'calculator': case 'snake': return null;
      default: return <p>{JSON.stringify(output)}</p>;
    }
  };
  return <div className="output-block">{command && <div className="command-echo"><span className="prompt"><span className="user">kuber</span><span>@</span><span className="host">profile</span><span>:~$</span></span><span className="command-text">{command}</span></div>}<div className="output-content">{renderContent()}</div></div>;
};

function App() {
  return <div className="app"><Terminal /></div>;
}

export default App;
