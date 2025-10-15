import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { missions } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Shield, TrendingUp, ArrowLeft, Target, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";
import RadarChart from "@/components/RadarChart";

const Report = () => {
  const { missionKey } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { detectionTime, toolsUsed, totalTime } = location.state || {};
  
  const mission = missions.find((m) => m.key === missionKey);
  const updateUserProgress = useStore((state) => state.updateUserProgress);
  const addMissionResult = useStore((state) => state.addMissionResult);

  useEffect(() => {
    if (!mission || !detectionTime) {
      navigate("/dashboard");
      return;
    }

    // Calculate score
    const detectionBonus = Math.max(0, 30 - (detectionTime / mission.successCriteria.detectionTimeSeconds) * 30);
    const efficiencyBonus = Math.max(0, 10 - (toolsUsed?.length || 0) * 2);
    const baseScore = 50;
    const totalScore = Math.min(100, Math.floor(baseScore + detectionBonus + efficiencyBonus));
    
    const xpEarned = Math.floor(totalScore * 2);

    // Save results
    addMissionResult({
      missionKey: mission.key,
      score: totalScore,
      detectionTime,
      dataLoss: 0,
      toolsUsed: toolsUsed || [],
      timestamp: Date.now(),
    });

    updateUserProgress(xpEarned, mission.key);
  }, [mission, detectionTime]);

  if (!mission || !detectionTime) {
    return null;
  }

  const detectionBonus = Math.max(0, 30 - (detectionTime / mission.successCriteria.detectionTimeSeconds) * 30);
  const efficiencyBonus = Math.max(0, 10 - (toolsUsed?.length || 0) * 2);
  const baseScore = 50;
  const totalScore = Math.min(100, Math.floor(baseScore + detectionBonus + efficiencyBonus));
  const xpEarned = Math.floor(totalScore * 2);

  const passed = detectionTime <= mission.successCriteria.detectionTimeSeconds;

  const recommendations = [
    "Disable clipboard sharing for untrusted VNC sessions by default",
    "Implement IP allowlisting for VNC server connections",
    "Enable Snort IDS with custom VNC detection rules",
    "Configure automated alerts for suspicious clipboard activity",
    "Review and audit VNC session logs regularly",
  ];

  return (
    <div className="min-h-screen p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-6xl mx-auto">
        {/* Score Header */}
        <div className="glass-card p-8 rounded-2xl mb-6 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent mb-4 animate-glow-pulse">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Mission {passed ? "Complete" : "Results"}</h1>
          <p className="text-muted-foreground mb-6">{mission.title}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Total Score</p>
              <p className="text-4xl font-bold text-primary">{totalScore}</p>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
              <p className="text-4xl font-bold text-accent">+{xpEarned}</p>
              <p className="text-xs text-muted-foreground">experience points</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className={`text-2xl font-bold ${passed ? "text-green-400" : "text-yellow-400"}`}>
                {passed ? "✓ PASSED" : "⚠ REVIEW"}
              </p>
              <p className="text-xs text-muted-foreground">{passed ? "Excellent work" : "Room for improvement"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Performance Metrics */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Breakdown
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Base Score</span>
                  <span className="font-semibold">{baseScore} pts</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Detection Speed Bonus</span>
                  <span className="font-semibold">+{Math.floor(detectionBonus)} pts</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Detected in {detectionTime}s (goal: ≤{mission.successCriteria.detectionTimeSeconds}s)
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Efficiency Bonus</span>
                  <span className="font-semibold">+{Math.floor(efficiencyBonus)} pts</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Used {toolsUsed?.length || 0} defense tool{(toolsUsed?.length || 0) !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-bold">Total Score</span>
                  <span className="font-bold text-primary text-xl">{totalScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Skill Assessment
            </h2>
            <RadarChart
              detectionTime={detectionTime}
              maxDetectionTime={mission.successCriteria.detectionTimeSeconds}
              toolsUsed={toolsUsed?.length || 0}
            />
          </div>
        </div>

        {/* Mission Summary */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Mission Summary
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Detection Time</p>
              <p className="text-2xl font-bold">{detectionTime}s</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Data Loss</p>
              <p className="text-2xl font-bold text-green-400">0%</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Tools Used</p>
              <p className="text-2xl font-bold">{toolsUsed?.length || 0}</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Total Time</p>
              <p className="text-2xl font-bold">{totalTime}s</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Best Practice Recommendations
          </h2>
          
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-accent font-semibold py-6"
          >
            Continue Training
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/simulation/${missionKey}`)}
            className="py-6"
          >
            Replay Mission
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const report = {
                mission: mission.title,
                score: totalScore,
                xp: xpEarned,
                detectionTime,
                passed,
              };
              const dataStr = JSON.stringify(report, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `vncrypt-report-${missionKey}.json`;
              link.click();
            }}
            className="py-6"
          >
            Export Report (JSON)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
