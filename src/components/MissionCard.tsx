import { Mission } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { Shield, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";

interface MissionCardProps {
  mission: Mission;
}

const MissionCard = ({ mission }: MissionCardProps) => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const isCompleted = user?.completedMissions.includes(mission.key);

  const difficultyColors = {
    Easy: "bg-green-500/20 text-green-500 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    Hard: "bg-red-500/20 text-red-500 border-red-500/30",
  };

  return (
    <div className="glass-card p-6 rounded-xl hover-lift group cursor-pointer" onClick={() => navigate(`/briefing/${mission.key}`)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className={`badge-severity border ${difficultyColors[mission.difficulty]}`}>
            {mission.difficulty}
          </span>
        </div>
        {isCompleted && (
          <div className="badge-orange">
            ✓ Completed
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
        {mission.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {mission.description}
      </p>

      <div className="space-y-2 mb-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Target className="h-3 w-3" />
          <span>Attack: {mission.attackType}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Target: {mission.targetSystem}</span>
        </div>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-accent font-semibold transition-all"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/briefing/${mission.key}`);
        }}
      >
        {isCompleted ? "Replay Mission" : "Start Mission"}
      </Button>
    </div>
  );
};

export default MissionCard;
