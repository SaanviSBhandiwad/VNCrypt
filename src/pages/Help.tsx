import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, BookOpen, CheckCircle2, XCircle } from "lucide-react";

const Help = () => {
  const navigate = useNavigate();

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
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Help & Safety Guidelines</h1>
          <p className="text-muted-foreground">Essential information for safe and effective training</p>
        </div>

        {/* Threat Model & Scope */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Threat Model & Scope
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Attacker Capabilities Simulated:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Insider with legitimate credentials:</strong> Employee or contractor with valid access to VNC sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Remote attacker with stolen credentials:</strong> External threat actor who has compromised user accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Network-level attacker:</strong> Adversary with access to network traffic and ability to intercept/modify packets</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">NOT Simulated:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Social engineering attacks targeting users</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Physical access to servers or endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Zero-day vulnerabilities in VNC software</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety & Legal */}
        <div className="glass-card p-6 rounded-xl mb-6 border-2 border-primary/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
            <AlertTriangle className="h-6 w-6" />
            Safety & Legal Requirements
          </h2>

          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">⚠️ CRITICAL: Lab Isolation Mandatory</h3>
              <p className="text-sm text-muted-foreground">
                All real attack tests MUST run only in isolated VMs or air-gapped laboratory environments. 
                Production systems are STRICTLY PROHIBITED.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Authorization Required</p>
                  <p className="text-muted-foreground">
                    You must have explicit written authorization before running any attack simulations, even in test environments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Isolated Environments Only</p>
                  <p className="text-muted-foreground">
                    Use dedicated VMs, containers, or air-gapped networks. Never run tests on systems connected to production networks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Logging & Evidence Collection</p>
                  <p className="text-muted-foreground">
                    All test activities are logged. Maintain audit trails and evidence for compliance and learning purposes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-secondary/50 p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Data Retention Policy</p>
                  <p className="text-muted-foreground">
                    Logs and captured data should be retained according to your organization's security policy and securely deleted when no longer needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Criteria */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4">Success Criteria & Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Detection Time Thresholds</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Excellent: ≤10 seconds</li>
                <li>• Good: 10-30 seconds</li>
                <li>• Acceptable: 30-60 seconds</li>
                <li>• Needs Improvement: {'>'}60 seconds</li>
              </ul>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Acceptable Data Loss</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Optimal: 0% data loss</li>
                <li>• Good: ≤5% data loss</li>
                <li>• Acceptable: 5-15% data loss</li>
                <li>• Failed: {'>'} 15% data loss</li>
              </ul>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Defense Efficiency</h3>
              <p className="text-sm text-muted-foreground">
                Using fewer tools with precise timing earns higher efficiency bonuses. Quality over quantity.
              </p>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">False Positive Rate</h3>
              <p className="text-sm text-muted-foreground">
                Applying defenses to legitimate traffic reduces your score. Ensure proper threat identification.
              </p>
            </div>
          </div>
        </div>

        {/* Baseline Configurations */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Baseline Security Configurations</h2>

          <div className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">TigerVNC with TLS</h3>
              <code className="text-xs bg-black/50 p-2 rounded block overflow-x-auto">
                vncserver -SecurityTypes TLSVnc -PlainUsers=none
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Always use TLS encryption for VNC connections to prevent credential theft.
              </p>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Firewall Rules (iptables)</h3>
              <code className="text-xs bg-black/50 p-2 rounded block overflow-x-auto">
                iptables -A INPUT -p tcp --dport 5900 -s 10.0.0.0/8 -j ACCEPT<br/>
                iptables -A INPUT -p tcp --dport 5900 -j DROP
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Restrict VNC access to trusted IP ranges only.
              </p>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Snort VNC Detection Rules</h3>
              <code className="text-xs bg-black/50 p-2 rounded block overflow-x-auto">
                alert tcp any any -{'>'} any 5900 (msg:"VNC Connection Attempt"; sid:100001;)
                <br />
                alert tcp any 5900 -{'>'} any any (content:"RFB"; msg:"VNC Protocol"; sid:100002;)
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Custom Snort rules to detect VNC activity patterns.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            VNCrypt is a training & demo platform. All simulations use mock data by default. 
            Real attack scripts must only be run inside isolated lab VMs with prior authorization.
          </p>
          <p className="text-sm text-primary font-semibold mt-2">
            Stay safe — and happy defending! 🛡️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
