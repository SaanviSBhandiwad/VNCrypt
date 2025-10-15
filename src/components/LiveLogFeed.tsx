import { useEffect, useRef } from "react";
import { Activity, AlertTriangle, Info, Shield, XCircle } from "lucide-react";
import { LogEntry } from "@/data/missions";

interface LiveLogFeedProps {
  logs: LogEntry[];
  isRunning: boolean;
}

const LiveLogFeed = ({ logs, isRunning }: LiveLogFeedProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "exfil_attempt":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "defense_applied":
        return <Shield className="h-4 w-4 text-green-400" />;
      case "mission_end":
        return <Activity className="h-4 w-4 text-primary" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLogBgColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500/10 border-blue-500/20";
      case "suspicious":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "exfil_attempt":
        return "bg-red-500/10 border-red-500/20";
      case "defense_applied":
        return "bg-green-500/10 border-green-500/20";
      case "mission_end":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-secondary/50";
    }
  };

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card p-4 rounded-xl h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live Event Log
        </h2>
        {isRunning && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs text-primary font-semibold">LIVE</span>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Waiting for events...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border animate-slide-up ${getLogBgColor(log.type)}`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getLogIcon(log.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      [{formatTimestamp(log.timestamp)}]
                    </span>
                    <span className={`badge-severity text-xs uppercase ${getLogBgColor(log.type)}`}>
                      {log.type.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm leading-tight break-words">{log.message}</p>
                  {log.details && (
                    <p className="text-xs text-muted-foreground mt-1 break-words">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveLogFeed;
