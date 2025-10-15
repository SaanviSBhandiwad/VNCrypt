export interface Mission {
  key: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  attackType: string;
  targetSystem: string;
  allowedTools: string[];
  successCriteria: {
    detectionTimeSeconds: number;
    maxDataLossFraction: number;
  };
  threatModel: string;
  scope: string;
}

export const missions: Mission[] = [
  {
    key: "clipboard_hijack",
    title: "Mission 1 — Clipboard Hijack",
    difficulty: "Easy",
    description: "Detect & stop an insider copying data via VNC clipboard sync.",
    attackType: "Phishing",
    targetSystem: "Cloud Server",
    allowedTools: ["disable_clipboard", "block_ip", "start_snort", "packet_capture"],
    successCriteria: {
      detectionTimeSeconds: 15,
      maxDataLossFraction: 0.1,
    },
    threatModel: "Insider with valid credentials copying sensitive files via clipboard sharing enabled in VNC session.",
    scope: "VNC clipboard synchronization mechanism; does NOT cover social engineering or physical access attacks.",
  },
  {
    key: "scp_transfer",
    title: "Mission 2 — SCP File Transfer",
    difficulty: "Medium",
    description: "Identify and block unauthorized SCP file transfers during VNC session.",
    attackType: "DDoS",
    targetSystem: "Email Server",
    allowedTools: ["block_ip", "start_snort", "packet_capture", "enable_logging"],
    successCriteria: {
      detectionTimeSeconds: 30,
      maxDataLossFraction: 0.15,
    },
    threatModel: "External attacker with stolen credentials initiating SCP transfers to exfiltrate data.",
    scope: "Network-level SCP traffic detection; excludes encrypted tunnel attacks.",
  },
  {
    key: "dns_tunnel",
    title: "Mission 3 — DNS Tunneling",
    difficulty: "Hard",
    description: "Detect covert data exfiltration via DNS tunneling through VNC connection.",
    attackType: "Zero-Day Exploit",
    targetSystem: "Cloud Server",
    allowedTools: ["start_snort", "packet_capture", "enable_logging", "block_ip"],
    successCriteria: {
      detectionTimeSeconds: 45,
      maxDataLossFraction: 0.05,
    },
    threatModel: "Advanced attacker using DNS queries to tunnel data out through legitimate-looking traffic.",
    scope: "DNS query patterns and payload analysis; does NOT cover DNSSEC validation bypass.",
  },
  {
    key: "screenshot_exfil",
    title: "Mission 4 — Screenshot Exfiltration",
    difficulty: "Medium",
    description: "Stop automated screenshot capture and transmission via VNC.",
    attackType: "SQL Injection",
    targetSystem: "Email Server",
    allowedTools: ["disable_clipboard", "packet_capture", "enable_logging"],
    successCriteria: {
      detectionTimeSeconds: 20,
      maxDataLossFraction: 0.2,
    },
    threatModel: "Malicious script capturing screenshots at intervals and sending via network.",
    scope: "Screenshot capture detection and network transmission; excludes keylogger analysis.",
  },
  {
    key: "malware_download",
    title: "Mission 5 — Malware Download",
    difficulty: "Easy",
    description: "Detect and prevent malware download through compromised VNC session.",
    attackType: "Malware",
    targetSystem: "User Account",
    allowedTools: ["block_ip", "start_snort", "enable_logging"],
    successCriteria: {
      detectionTimeSeconds: 10,
      maxDataLossFraction: 0.0,
    },
    threatModel: "User account compromise leading to malware download attempts.",
    scope: "File download detection and signature matching; does NOT cover zero-day malware.",
  },
  {
    key: "ransomware_attack",
    title: "Mission 6 — Ransomware Deployment",
    difficulty: "Hard",
    description: "Identify and stop ransomware encryption before critical data loss.",
    attackType: "Ransomware",
    targetSystem: "Email Server",
    allowedTools: ["block_ip", "start_snort", "packet_capture", "enable_logging"],
    successCriteria: {
      detectionTimeSeconds: 30,
      maxDataLossFraction: 0.05,
    },
    threatModel: "Ransomware payload delivered via email, attempting mass file encryption.",
    scope: "Encryption behavior detection and network C2 communication; excludes social engineering.",
  },
  {
    key: "brute_force_iot",
    title: "Mission 7 — IoT Brute Force",
    difficulty: "Medium",
    description: "Stop brute force attacks targeting IoT devices on the network.",
    attackType: "Brute Force",
    targetSystem: "IoT Device",
    allowedTools: ["block_ip", "enable_logging", "start_snort"],
    successCriteria: {
      detectionTimeSeconds: 25,
      maxDataLossFraction: 0.1,
    },
    threatModel: "Automated brute force tool targeting weak IoT device credentials.",
    scope: "Login attempt rate detection; does NOT cover firmware vulnerabilities.",
  },
  {
    key: "cross_site_network",
    title: "Mission 8 — Cross-Site Network Attack",
    difficulty: "Medium",
    description: "Detect and mitigate cross-site scripting attempts via network layer.",
    attackType: "Cross-Site Scripting",
    targetSystem: "Network Systems",
    allowedTools: ["start_snort", "packet_capture", "enable_logging"],
    successCriteria: {
      detectionTimeSeconds: 20,
      maxDataLossFraction: 0.15,
    },
    threatModel: "Network-level XSS payloads attempting to compromise connected systems.",
    scope: "HTTP traffic analysis for XSS patterns; excludes DOM-based XSS.",
  },
];

export interface LogEntry {
  timestamp: number;
  type: "info" | "suspicious" | "exfil_attempt" | "defense_applied" | "mission_end";
  message: string;
  details?: string;
}

export const missionLogs: Record<string, LogEntry[]> = {
  clipboard_hijack: [
    { timestamp: 0, type: "info", message: "VNC session established: 10.0.0.5 -> 10.0.0.10" },
    { timestamp: 3, type: "info", message: "User authentication successful (Employee credentials)" },
    { timestamp: 5, type: "suspicious", message: "Clipboard sync started (size: 2.1KB)", details: "Base64-encoded pattern detected" },
    { timestamp: 8, type: "suspicious", message: "Large clipboard transfer detected (15.3KB total)", details: "Possible sensitive data: financial_report_Q4.xlsx" },
    { timestamp: 12, type: "exfil_attempt", message: "Simulated clipboard payload: [REDACTED - SENSITIVE DATA]", details: "Data contains keywords: confidential, revenue, forecast" },
    { timestamp: 18, type: "info", message: "Network traffic spike on port 5900 (VNC)" },
    { timestamp: 25, type: "suspicious", message: "Repeated clipboard operations detected (5 transfers in 20s)" },
    { timestamp: 30, type: "mission_end", message: "Simulation time limit reached" },
  ],
  scp_transfer: [
    { timestamp: 0, type: "info", message: "VNC session established: 187.180.15.34 -> 10.0.0.20" },
    { timestamp: 5, type: "info", message: "Admin user logged in via SSH tunnel" },
    { timestamp: 10, type: "suspicious", message: "SCP process initiated: large file transfer detected" },
    { timestamp: 15, type: "suspicious", message: "Outbound connection on port 22 to external IP 187.180.15.34" },
    { timestamp: 22, type: "exfil_attempt", message: "SCP transfer in progress: database_backup.tar.gz (65.05MB)", details: "Destination: external server Brazil region" },
    { timestamp: 30, type: "suspicious", message: "Encryption detected on outbound stream - possible data exfiltration" },
    { timestamp: 40, type: "exfil_attempt", message: "Transfer 45% complete - 29.3MB transmitted" },
    { timestamp: 55, type: "mission_end", message: "Simulation complete - assess your detection time" },
  ],
  dns_tunnel: [
    { timestamp: 0, type: "info", message: "VNC session active: 57.161.159.213 -> 10.0.0.15" },
    { timestamp: 8, type: "info", message: "External user connection established (Germany location)" },
    { timestamp: 15, type: "suspicious", message: "Unusual DNS query pattern detected" },
    { timestamp: 22, type: "suspicious", message: "High-frequency DNS requests to unusual domains" },
    { timestamp: 30, type: "exfil_attempt", message: "DNS tunneling detected: base64 data in subdomain queries", details: "Query: ZGF0YS5leGZpbC5leGFtcGxlLmNvbQ==" },
    { timestamp: 38, type: "suspicious", message: "120 DNS queries in 23 seconds - abnormal behavior" },
    { timestamp: 48, type: "exfil_attempt", message: "Estimated data exfiltration: 48.99KB via DNS tunnel" },
    { timestamp: 60, type: "mission_end", message: "DNS tunneling simulation ended" },
  ],
  screenshot_exfil: [
    { timestamp: 0, type: "info", message: "VNC session: 207.108.15.4 -> 10.0.0.8" },
    { timestamp: 5, type: "info", message: "Employee user active - Russia location" },
    { timestamp: 10, type: "suspicious", message: "Automated screenshot capture detected" },
    { timestamp: 16, type: "exfil_attempt", message: "Screenshot data transmission: image/png (16.29KB)", details: "Contains visible PII and credentials" },
    { timestamp: 25, type: "suspicious", message: "Second screenshot captured and transmitted" },
    { timestamp: 35, type: "exfil_attempt", message: "Multiple screenshots sent to external server (total: 87.66KB)" },
    { timestamp: 45, type: "mission_end", message: "Screenshot exfiltration test complete" },
  ],
  malware_download: [
    { timestamp: 0, type: "info", message: "VNC session: 205.34.80.163 -> 10.0.0.12" },
    { timestamp: 3, type: "info", message: "Contractor user logged in (France)" },
    { timestamp: 7, type: "suspicious", message: "HTTP download initiated from suspicious domain" },
    { timestamp: 10, type: "exfil_attempt", message: "Malware signature detected: trojan.generic.exe (78.29KB)", details: "Hash: a3f2c1b..." },
    { timestamp: 12, type: "suspicious", message: "Executable attempting to modify system registry" },
    { timestamp: 18, type: "mission_end", message: "Malware download simulation ended" },
  ],
  ransomware_attack: [
    { timestamp: 0, type: "info", message: "VNC session: 151.146.179.117 -> 10.0.0.18" },
    { timestamp: 5, type: "info", message: "External user authenticated (UK)" },
    { timestamp: 10, type: "suspicious", message: "Mass file access pattern detected" },
    { timestamp: 15, type: "exfil_attempt", message: "File encryption behavior detected - ransomware activity", details: "40.04KB encrypted" },
    { timestamp: 22, type: "suspicious", message: "C2 communication attempt to external server" },
    { timestamp: 30, type: "exfil_attempt", message: "Encryption spreading: 171 files affected" },
    { timestamp: 40, type: "mission_end", message: "Ransomware simulation complete" },
  ],
  brute_force_iot: [
    { timestamp: 0, type: "info", message: "VNC session monitoring IoT network segment" },
    { timestamp: 5, type: "suspicious", message: "Multiple failed login attempts detected on IoT device" },
    { timestamp: 10, type: "suspicious", message: "Brute force pattern: 85 login attempts in 5 seconds" },
    { timestamp: 15, type: "exfil_attempt", message: "IoT device credentials compromised - unauthorized access", details: "Device: 227.165.40.175" },
    { timestamp: 22, type: "suspicious", message: "Lateral movement detected from compromised IoT device" },
    { timestamp: 30, type: "mission_end", message: "IoT brute force simulation ended" },
  ],
  cross_site_network: [
    { timestamp: 0, type: "info", message: "VNC session: 158.152.184.3 -> 10.0.0.25" },
    { timestamp: 5, type: "info", message: "Contractor user - USA location" },
    { timestamp: 10, type: "suspicious", message: "XSS payload detected in HTTP traffic" },
    { timestamp: 15, type: "exfil_attempt", message: "Cross-site scripting attempt: malicious script injection", details: "Payload: <script>alert(document.cookie)</script>" },
    { timestamp: 22, type: "suspicious", message: "Multiple XSS attempts from same source" },
    { timestamp: 28, type: "mission_end", message: "Cross-site attack simulation complete" },
  ],
};
