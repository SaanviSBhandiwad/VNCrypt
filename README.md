# 🎮🛡️ VNCrypt: Gamified Data Exfiltration Defense Simulator

A gamified cybersecurity lab where users simulate real-world data exfiltration attacks on VNC systems, apply defense mechanisms, and receive performance feedback. Built with React, this MVP focuses on immersive user experience and modular mission flow.

---

## 🧩 Overview

This MVP allows users to:
- Choose and launch cybersecurity missions
- View simulated attack logs (mocked for MVP)
- Apply defense mechanisms via interactive UI
- Receive a performance report with scores and recommendations

---

## 🚀 Features

- 🎯 Mission-based gameplay (e.g., Clipboard Hijack, DNS Tunneling)
- 📊 Live attack log viewer (mocked via JSON)
- 🛡️ Defense toolbox (Disable Clipboard, Block IP, Start Logging)
- 🧠 Scoring and recommendation engine (mocked)
- 🏆 Progress tracking and mission unlocks

---

## 🛠️ Tech Stack

| Layer       | Technology         | Role                                  |
|------------|--------------------|---------------------------------------|
| Frontend    | React + Tailwind   | UI, gamification, user actions        |
| Backend     | (Planned) Flask    | API, logic, script execution          |
| Data        | JSON (mocked)      | Missions, logs, scores, user history  |

---

## 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/vnc-fortress.git
cd vnc-fortress

# Install dependencies
npm install

# Start the development server
npm start

📦 Future Enhancements
🔌 Flask backend integration for real-time attack/defense simulation

🧠 Real scoring and recommendation engine

🧰 VM orchestration for live VNC scenarios

🧑‍💻 User authentication and leaderboard
