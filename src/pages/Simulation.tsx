import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { missions, missionLogs } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Shield, Clock, Activity } from "lucide-react";
import LiveLogFeed from "@/components/LiveLogFeed";
import DefenseToolbox from "@/components/DefenseToolbox";
import VNCViewport from "@/components/VNCViewport";
import { useStore } from "@/lib/store";

const Simulation = () => {
  const { missionKey } = useParams();
  const navigate = useNavigate();
  const mission = missions.find((m) => m.key === missionKey);
  const currentMission = useStore((state) => state.currentMission);
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [activeDefenses, setActiveDefenses] = useState<string[]>([]);
  const [sessionId] = useState(crypto.randomUUID().slice(0, 8));
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mission || currentMission !== missionKey) {
      navigate("/dashboard");
    }
  }, [mission, currentMission, missionKey, navigate]);

  // Simulate live log streaming
  useEffect(() => {
    if (!isRunning || !mission) return;

    const missionLogData = missionLogs[mission.key] || [];
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        
        // Add logs that should appear at this timestamp
        const newLogs = missionLogData.filter(
          (log) => log.timestamp === newTime && !logs.find(l => l.timestamp === log.timestamp)
        );
        
        if (newLogs.length > 0) {
          setLogs((prevLogs) => [...prevLogs, ...newLogs]);
        }

        // Auto-end mission when all logs are shown
        if (newTime >= 60 || missionLogData.every(log => log.timestamp <= newTime)) {
          handleEndMission();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mission]);

  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleDefenseApplied = (defense: string) => {
    setActiveDefenses((prev) => [...prev, defense]);
    setLogs((prev) => [
      ...prev,
      {
        timestamp: currentTime,
        type: "defense_applied",
        message: `${defense} activated by defender`,
      },
    ]);
  };

  const handleEndMission = () => {
    setIsRunning(false);
    
    // Calculate detection time (when first defense was applied)
    const firstDefenseLog = logs.find(log => log.type === "defense_applied");
    const detectionTime = firstDefenseLog ? firstDefenseLog.timestamp : currentTime;
    
    // Navigate to report with results
    navigate(`/report/${missionKey}`, {
      state: {
        detectionTime,
        toolsUsed: activeDefenses,
        totalTime: currentTime,
      },
    });
  };

  if (!mission) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit Simulation
        </Button>

        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-mono font-bold">{formatTime(currentTime)}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm">Session: {sessionId}</span>
          </div>
        </div>
      </div>

      {/* Mission Title Bar */}
      <div className="glass-card p-4 rounded-xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">{mission.title}</h1>
            <p className="text-sm text-muted-foreground">{mission.description}</p>
          </div>
        </div>
        {!isRunning && logs.length === 0 && (
          <Button
            onClick={handleStart}
            className="bg-primary hover:bg-accent font-semibold px-8"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Attack
          </Button>
        )}
        {isRunning && (
          <Button
            onClick={handlePause}
            variant="outline"
            className="px-8"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        )}
        {!isRunning && logs.length > 0 && (
          <Button
            onClick={handleEndMission}
            className="bg-primary hover:bg-accent font-semibold px-8"
          >
            End Mission & View Report
          </Button>
        )}
      </div>

      {/* Main Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live Log Feed */}
        <div className="lg:col-span-1">
          <LiveLogFeed logs={logs} isRunning={isRunning} />
        </div>

        {/* Center: VNC Session Mock */}
        <div className="lg:col-span-1">
          <VNCViewport missionKey={mission.key} logs={logs} />
        </div>

        {/* Right: Defense Toolbox */}
        <div className="lg:col-span-1">
          <DefenseToolbox
            allowedTools={mission.allowedTools}
            activeDefenses={activeDefenses}
            onDefenseApplied={handleDefenseApplied}
            disabled={!isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
