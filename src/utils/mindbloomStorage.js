// MindBloom Clinical & Therapy Telemetry Storage Service
// Handles local cross-page persistence for Questionnaire, Video Screening, and Therapy Games

const DEFAULT_THERAPY_SESSIONS = [
  {
    id: "session_101",
    game_name: "Memory Match",
    level: "5 Pairs (Animals/Objects)",
    correct_matches: 5,
    wrong_attempts: 2,
    total_attempts: 7,
    accuracy: 71.4,
    completion_time: 42,
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "session_102",
    game_name: "Response Challenge",
    level: "Animals Theme (10 Rounds)",
    correct_matches: 9,
    wrong_attempts: 3,
    total_attempts: 12,
    accuracy: 75.0,
    completion_time: 28,
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "session_103",
    game_name: "Focus Training",
    level: "Celestial Path (8 Rounds)",
    correct_matches: 7,
    wrong_attempts: 1,
    total_attempts: 8,
    accuracy: 87.5,
    completion_time: 35,
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
];

const DEFAULT_QUESTIONNAIRE = {
  completed: true,
  age: 4,
  childName: "Aarav M.",
  riskScore: 74,
  riskLevel: "Moderate Risk",
  domainScores: {
    socialCommunication: 78,
    developmentalMilestones: 65,
    behavioralSeverity: 70,
    medicalHistory: 60
  },
  summary: "Assessment indicates moderate indicators in joint attention and verbal turn-taking, consistent with early social communication differences.",
  timestamp: new Date(Date.now() - 86400000 * 4).toISOString()
};

const DEFAULT_VIDEO_SCREENING = {
  completed: true,
  eyeContactScore: 68,
  gazeDeviation: "14.2° (Moderate deviation)",
  jointAttentionLatency: 1.4,
  expressionStability: "Stable (Affective variability within expected range)",
  attentionConsistency: 72,
  videoName: "clinical_toddler_interaction_sample.mp4",
  timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
};

export const mindbloomStorage = {
  // Therapy Sessions
  getTherapySessions() {
    try {
      const data = localStorage.getItem("mindbloom_therapy_sessions");
      if (!data) {
        localStorage.setItem("mindbloom_therapy_sessions", JSON.stringify(DEFAULT_THERAPY_SESSIONS));
        return DEFAULT_THERAPY_SESSIONS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_THERAPY_SESSIONS;
    }
  },

  saveTherapySession(session) {
    try {
      const sessions = this.getTherapySessions();
      const newSession = {
        id: session.id || "session_" + Date.now(),
        timestamp: new Date().toISOString(),
        ...session
      };
      const updated = [newSession, ...sessions];
      localStorage.setItem("mindbloom_therapy_sessions", JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Error saving therapy session:", e);
      return [];
    }
  },

  // Questionnaire Assessment
  getQuestionnaire() {
    try {
      const data = localStorage.getItem("mindbloom_questionnaire");
      if (!data) {
        localStorage.setItem("mindbloom_questionnaire", JSON.stringify(DEFAULT_QUESTIONNAIRE));
        return DEFAULT_QUESTIONNAIRE;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_QUESTIONNAIRE;
    }
  },

  saveQuestionnaire(assessment) {
    try {
      const payload = {
        ...DEFAULT_QUESTIONNAIRE,
        ...assessment,
        completed: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("mindbloom_questionnaire", JSON.stringify(payload));
      return payload;
    } catch (e) {
      console.error("Error saving questionnaire:", e);
      return DEFAULT_QUESTIONNAIRE;
    }
  },

  // Video Screening CV Metrics
  getVideoScreening() {
    try {
      const data = localStorage.getItem("mindbloom_video_screening");
      if (!data) {
        localStorage.setItem("mindbloom_video_screening", JSON.stringify(DEFAULT_VIDEO_SCREENING));
        return DEFAULT_VIDEO_SCREENING;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_VIDEO_SCREENING;
    }
  },

  saveVideoScreening(metrics) {
    try {
      const payload = {
        ...DEFAULT_VIDEO_SCREENING,
        ...metrics,
        completed: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("mindbloom_video_screening", JSON.stringify(payload));
      return payload;
    } catch (e) {
      console.error("Error saving video screening:", e);
      return DEFAULT_VIDEO_SCREENING;
    }
  },

  // Multimodal Fusion Calculation
  // 40% Questionnaire + 35% Video CV Eye Gaze + 25% Therapy Activity Response Rate
  getMultimodalMetrics() {
    const q = this.getQuestionnaire();
    const v = this.getVideoScreening();
    const t = this.getTherapySessions();

    const avgTherapyAccuracy = t.length > 0 
      ? t.reduce((acc, curr) => acc + (curr.accuracy || 70), 0) / t.length 
      : 75;

    // Lower cognitive game accuracy correlates with higher screening indicator weighting
    const therapyRiskComponent = Math.max(30, Math.min(90, Math.round(100 - avgTherapyAccuracy + 30)));
    const videoRiskComponent = Math.max(30, Math.min(95, Math.round(100 - (v.eyeContactScore || 68) + 20)));
    const questionnaireRiskComponent = q.riskScore || 72;

    const weightedScore = Math.round(
      (questionnaireRiskComponent * 0.40) + 
      (videoRiskComponent * 0.35) + 
      (therapyRiskComponent * 0.25)
    );

    let riskBand = "Moderate Risk";
    if (weightedScore < 45) riskBand = "Low Risk / Typical Variation";
    else if (weightedScore > 75) riskBand = "High Risk / Clinical Support Indicated";

    return {
      fusionScore: weightedScore,
      riskBand,
      questionnaireRisk: questionnaireRiskComponent,
      videoRisk: videoRiskComponent,
      therapyScore: Math.round(avgTherapyAccuracy),
      totalTherapySessions: t.length,
      eyeContactScore: v.eyeContactScore || 68,
      childName: q.childName || "Aarav M.",
      childAge: q.age || 4,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
  }
};
