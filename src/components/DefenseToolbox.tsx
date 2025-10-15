import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Ban, Network, Eye, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface DefenseToolboxProps {
  allowedTools: string[];
  activeDefenses: string[];
  onDefenseApplied: (defense: string) => void;
  disabled: boolean;
}

const toolConfig = {
  disable_clipboard: {
    label: "Disable Clipboard",
    icon: Ban,
    description: "Block clipboard sharing",
    color: "text-red-400",
  },
  block_ip: {
    label: "Block IP",
    icon: Shield,
    description: "Temporary IP ban",
    color: "text-orange-400",
  },
  start_snort: {
    label: "Start Snort",
    icon: Network,
    description: "IDS detection",
    color: "text-blue-400",
  },
  packet_capture: {
    label: "Packet Capture",
    icon: Eye,
    description: "Network monitoring",
    color: "text-purple-400",
  },
  enable_logging: {
    label: "Enable Logging",
    icon: FileText,
    description: "Enhanced audit logs",
    color: "text-green-400",
  },
};

const DefenseToolbox = ({ allowedTools, activeDefenses, onDefenseApplied, disabled }: DefenseToolboxProps) => {
  const handleDefense = (tool: string) => {
    if (activeDefenses.includes(tool)) {
      toast.info("Defense already active");
      return;
    }
    
    onDefenseApplied(tool);
    const config = toolConfig[tool as keyof typeof toolConfig];
    toast.success(`${config.label} activated successfully!`);
  };

  return (
    <div className="glass-card p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Defense Toolbox
      </h2>

      <div className="space-y-3 mb-6">
        {allowedTools.map((tool) => {
          const config = toolConfig[tool as keyof typeof toolConfig];
          const Icon = config.icon;
          const isActive = activeDefenses.includes(tool);

          return (
            <Button
              key={tool}
              onClick={() => handleDefense(tool)}
              disabled={disabled || isActive}
              className={`w-full justify-start ${
                isActive
                  ? "bg-green-500/20 border-green-500/30 hover:bg-green-500/20"
                  : "bg-secondary hover:bg-secondary/80"
              } border transition-all hover-lift`}
              variant="outline"
            >
              <Icon className={`h-4 w-4 mr-3 ${isActive ? "text-green-400" : config.color}`} />
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm">{config.label}</div>
                <div className="text-xs text-muted-foreground">{config.description}</div>
              </div>
              {isActive && <CheckCircle2 className="h-4 w-4 text-green-400" />}
            </Button>
          );
        })}
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-semibold mb-2">Active Defenses</h3>
        {activeDefenses.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">No defenses active yet</p>
        ) : (
          <div className="space-y-1">
            {activeDefenses.map((defense, index) => {
              const config = toolConfig[defense as keyof typeof toolConfig];
              return (
                <div
                  key={index}
                  className="text-xs flex items-center gap-2 bg-green-500/10 p-2 rounded border border-green-500/20"
                >
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  <span>{config.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefenseToolbox;
