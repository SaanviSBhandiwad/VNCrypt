import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Zap, Target, Award, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { missions } from "@/data/missions";

const Profile = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const missionResults = useStore((state) => state.missionResults);

  if (!user) {
    navigate("/");
    return null;
  }

  const levelProgress = (user.xp % 200) / 200 * 100;
  const xpToNextLevel = (user.level * 200) - user.xp;

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "CyberGuardian", level: 15, missions: 8, score: 3200 },
    { rank: 2, name: "DefenseAce", level: 12, missions: 7, score: 2800 },
    { rank: 3, name: "SecurityPro", level: 10, missions: 6, score: 2400 },
    { rank: 4, name: user.name, level: user.level, missions: user.completedMissions.length, score: user.xp },
    { rank: 5, name: "NetDefender", level: 8, missions: 5, score: 1900 },
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
        <h1 className="text-3xl font-bold mb-8">Profile & Leaderboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{user.level}</p>
                  <div className="mt-2">
                    <Progress value={levelProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {xpToNextLevel} XP to next level
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total XP</span>
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-3xl font-bold">{user.xp}</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Missions Completed</span>
                    <Target className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{user.completedMissions.length}/{missions.length}</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Badges Earned</span>
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold">{user.badges.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Leaderboard */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Crown className="h-6 w-6 text-primary" />
                Global Leaderboard
              </h2>

              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      player.name === user.name
                        ? "bg-primary/20 border-2 border-primary"
                        : "bg-secondary/50 hover:bg-secondary/70"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      player.rank === 1 ? "bg-yellow-500/20 text-yellow-500" :
                      player.rank === 2 ? "bg-gray-400/20 text-gray-400" :
                      player.rank === 3 ? "bg-orange-500/20 text-orange-500" :
                      "bg-secondary"
                    }`}>
                      {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : `#${player.rank}`}
                    </div>

                    <div className="flex-1">
                      <p className="font-bold">{player.name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Level {player.level}</span>
                        <span>•</span>
                        <span>{player.missions} missions</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{player.score}</p>
                      <p className="text-xs text-muted-foreground">XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Missions */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Recent Missions</h2>
              {missionResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No missions completed yet</p>
              ) : (
                <div className="space-y-3">
                  {missionResults.slice(-5).reverse().map((result, index) => {
                    const mission = missions.find(m => m.key === result.missionKey);
                    return (
                      <div key={index} className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{mission?.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Detection: {result.detectionTime}s • Tools: {result.toolsUsed.length}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{result.score}</p>
                          <p className="text-xs text-muted-foreground">score</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
