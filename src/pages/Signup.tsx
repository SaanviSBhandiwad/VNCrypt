import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!acceptedTerms) {
      toast.error("You must accept the safety terms");
      return;
    }

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      level: 1,
      xp: 0,
      totalScore: 0,
      completedMissions: [],
      badges: [],
    };

    setUser(user);
    toast.success(`Welcome, ${name}! Your defender account is ready.`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary animate-glow-pulse" />
              <Lock className="h-6 w-6 text-primary absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            VNCrypt
          </h1>
          <p className="text-muted-foreground">Gamified Data Exfiltration Defense Simulator</p>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">Create Defender Account</h2>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="defender@vncrypt.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-4 p-4 bg-secondary/50 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-primary">⚠️ Safety & Legal Agreement</p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• All attack simulations run in isolated environments only</li>
                <li>• Real attack tests require prior authorization</li>
                <li>• Production systems are strictly prohibited</li>
                <li>• All activities are logged for security and compliance</li>
              </ul>
              
              <div className="flex items-start space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-tight cursor-pointer"
                >
                  I have read and accept the safety terms. I understand that real attack tests must only be run in isolated VMs or air-gapped labs.
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold py-6 rounded-xl transition-all hover-lift"
            >
              Start Defending 🛡️
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            VNCrypt is a training & demo platform. Stay safe — and happy defending!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
