import { Monitor, Wifi, Lock, AlertCircle } from "lucide-react";
import { LogEntry } from "@/data/missions";

interface VNCViewportProps {
  missionKey: string;
  logs: LogEntry[];
}

const VNCViewport = ({ missionKey, logs }: VNCViewportProps) => {
  const hasClipboardActivity = logs.some(log => 
    log.message.toLowerCase().includes("clipboard")
  );
  
  const hasExfilAttempt = logs.some(log => log.type === "exfil_attempt");

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          VNC Session Monitor
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-green-400 font-semibold">CONNECTED</span>
        </div>
      </div>

      {/* Mock VNC Viewport */}
      <div className="relative bg-secondary/30 rounded-lg border-2 border-border overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
          {/* Simulated Desktop Environment */}
          <div className="p-4 h-full flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4 bg-card/50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Wifi className="h-3 w-3 text-primary" />
                <span className="text-xs font-mono">10.0.0.10</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">VNC:5900</span>
              </div>
            </div>

            {/* Simulated Terminal/Activity */}
            <div className="flex-1 bg-black/40 rounded p-3 font-mono text-xs overflow-hidden">
              <div className="text-green-400 mb-2">$ user@server:~#</div>
              <div className="space-y-1 text-muted-foreground">
                <div>Session established...</div>
                {hasClipboardActivity && (
                  <div className="text-yellow-400 animate-pulse">
                    ⚠ Clipboard sync detected
                  </div>
                )}
                {hasExfilAttempt && (
                  <div className="text-red-400 animate-pulse">
                    ⚠ DATA EXFILTRATION ATTEMPT
                  </div>
                )}
                {logs.length > 0 && (
                  <div className="mt-2">
                    {logs.slice(-3).map((log, i) => (
                      <div key={i} className="text-xs truncate">
                        &gt; {log.message.slice(0, 40)}...
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-card/50 p-2 rounded text-center">
                <div className="text-xs text-muted-foreground">Events</div>
                <div className="text-lg font-bold text-primary">{logs.length}</div>
              </div>
              <div className="bg-card/50 p-2 rounded text-center">
                <div className="text-xs text-muted-foreground">Threats</div>
                <div className="text-lg font-bold text-red-400">
                  {logs.filter(l => l.type === "exfil_attempt").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Warning if clipboard detected */}
        {hasClipboardActivity && (
          <div className="absolute top-0 left-0 right-0 bg-yellow-500/20 border-b border-yellow-500/30 p-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 justify-center">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-semibold">
                CLIPBOARD SHARING ACTIVE
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-secondary/50 p-3 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Simulation Mode:</strong> This is a mock VNC viewport showing simulated activity. 
          In real-lab mode, this would display the actual VNC session.
        </p>
      </div>
    </div>
  );
};

export default VNCViewport;
