import { useEffect, useState } from "react";
import "./TerminalLine.css";

const SNIPPETS = [
  { text: "git commit -m 'feat: scalable microservices arch'", theme: "git" },
  { text: "mvn clean install", theme: "maven" },
  { text: "Optional.of(code).map(this::optimize)", theme: "java" },
  { text: "Stream.of(frontend, backend).forEach(this::master)", theme: "stream" },
];

export default function TerminalLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % SNIPPETS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-center">
      <div key={index} className={`terminal-line ${SNIPPETS[index].theme}`}>
        <span className="prompt">$</span>
        <span className="command">{SNIPPETS[index].text}</span>
        {/* <span className="cursor" /> */}
      </div>
    </div>
  );
}
