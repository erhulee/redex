import { once } from "lodash-es";
import { useEffect, useRef } from "react";
import "xterm/css/xterm.css";
function XTerminal() {
  const terminalRef = useRef();
  const initTerminal = once(async () => {
    const { Terminal } = await import("xterm");
    const { FitAddon } = await import("xterm-addon-fit");
    const prefix = "admin $ ";
    const fitAddon = new FitAddon();
    const terminal: any = new Terminal({ cursorBlink: true });
    const terminalDOM = terminalRef.current;
    terminal.open(terminalDOM);
    // terminal 的尺寸与父元素匹配
    terminal.loadAddon(fitAddon);
    fitAddon.fit();
    terminal.writeln("\x1b[1;1;32mwellcom to web terminal!\x1b[0m");
    terminal.write(prefix);
  });

  useEffect(() => {
    initTerminal();
  }, []);
  return (
    <div
      id="terminal"
      ref={terminalRef}
      style={{ width: "1200px" }}
      className=" h-full overflow-hidden"
    ></div>
  );
}

export default XTerminal;
