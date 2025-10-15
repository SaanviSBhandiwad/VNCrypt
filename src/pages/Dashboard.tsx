import { Shield, Trophy, Zap, Target } from "lucide-react";
import { useStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { missions } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MissionCard from "@/components/MissionCard";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const xpToNextLevel = (user.level * 200) - user.xp;
  const levelProgress = (user.xp % 200) / 200 * 100;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">VNCrypt</h1>
              <p className="text-sm text-muted-foreground">Defense Command Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/profile")}
              className="mr-2"
            >
              Leaderboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/help")}
              className="mr-2"
            >
              Help
            </Button>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Defender</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div 
              className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg cursor-pointer hover-lift"
              onClick={() => navigate("/profile")}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl hover-lift">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold">{user.level}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl hover-lift">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="text-lg font-bold">{user.xp} XP</p>
                <Progress value={levelProgress} className="h-1 mt-1" />
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl hover-lift">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Missions</p>
                <p className="text-2xl font-bold">{user.completedMissions.length}/{missions.length}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl hover-lift">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges</p>
                <p className="text-2xl font-bold">{user.badges.length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions List */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Available Missions</h2>
            <p className="text-muted-foreground">Select a mission to begin your defense training</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((mission) => (
              <MissionCard key={mission.key} mission={mission} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Your Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Level {user.level}</span>
                  <span className="text-sm text-muted-foreground">{xpToNextLevel} XP to next</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Recent Activity</p>
                {user.completedMissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No missions completed yet</p>
                ) : (
                  <div className="space-y-2">
                    {user.completedMissions.slice(-3).reverse().map((missionKey) => {
                      const mission = missions.find(m => m.key === missionKey);
                      return (
                        <div key={missionKey} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Completed: {mission?.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="glass-card p-6 rounded-xl border border-primary/20">
            <h3 className="font-bold mb-2 text-primary">⚠️ Safety Notice</h3>
            <p className="text-xs text-muted-foreground">
              All tests must run in isolated VMs. Do not run on production systems. Real attack tests require prior authorization.
            </p>
            <Button 
              variant="outline" 
              className="w-full mt-4 text-sm"
              onClick={() => navigate("/help")}
            >
              View Safety Guidelines
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
