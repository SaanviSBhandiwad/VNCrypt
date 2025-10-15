import { Button } from "@/components/ui/button";
import { missions } from "@/data/missions";
import { useStore } from "@/lib/store";
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, Shield, Target } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Briefing = () => {
  const { missionKey } = useParams();
  const navigate = useNavigate();
  const setCurrentMission = useStore((state) => state.setCurrentMission);
  
  const mission = missions.find((m) => m.key === missionKey);

  if (!mission) {
    navigate("/dashboard");
    return null;
  }

  const handleStartSimulation = () => {
    setCurrentMission(mission.key);
    navigate(`/simulation/${mission.key}`);
  };

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

      <div className="max-w-4xl mx-auto">
        {/* Mission Header */}
        <div className="glass-card p-8 rounded-2xl mb-6 animate-fade-in">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{mission.title}</h1>
                <p className="text-muted-foreground">{mission.description}</p>
              </div>
            </div>
            <div className="badge-orange text-sm">
              {mission.difficulty}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Attack Type</span>
              </div>
              <p className="text-sm text-muted-foreground">{mission.attackType}</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Target System</span>
              </div>
              <p className="text-sm text-muted-foreground">{mission.targetSystem}</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Detection Goal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ≤ {mission.successCriteria.detectionTimeSeconds}s
              </p>
            </div>
          </div>
        </div>

        {/* Threat Model & Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6 rounded-xl animate-slide-up">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Threat Model
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mission.threatModel}
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl animate-slide-up">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Scope
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mission.scope}
            </p>
          </div>
        </div>

        {/* Success Criteria */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Success Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-1">Detection Time</p>
              <p className="text-2xl font-bold text-primary">
                ≤ {mission.successCriteria.detectionTimeSeconds}s
              </p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-1">Max Data Loss</p>
              <p className="text-2xl font-bold text-primary">
                ≤ {(mission.successCriteria.maxDataLossFraction * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Available Tools */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4">Available Defense Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mission.allowedTools.map((tool) => (
              <div
                key={tool}
                className="bg-secondary/50 p-3 rounded-lg text-center text-sm font-medium"
              >
                {tool.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </div>
            ))}
          </div>
        </div>

        {/* Safety Warning */}
        <div className="glass-card p-6 rounded-xl border border-primary/20 mb-6">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Safety & Lab Isolation
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>⚠️ <strong>All real attack tests must run only in isolated VMs or air-gapped labs.</strong></p>
            <p>✓ This simulation uses mock data and is safe for web frontend demos.</p>
            <p>✓ Real-Lab mode requires proper authorization and isolated infrastructure.</p>
            <p>✓ All activities are logged for security and compliance purposes.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-accent font-bold py-6 text-lg hover-lift"
            onClick={handleStartSimulation}
          >
            Start Simulation
          </Button>
         
        </div>
      </div>
    </div>
  );
};

export default Briefing;
