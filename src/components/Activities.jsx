// Activities.jsx

import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  Trophy,
  Zap,
} from "lucide-react";

import "./Activities.css";

const LEETCODE_URL = "https://leetcode.com/u/nscoded/";
const LEETCODE_API_BASE = "https://leetinfo-api.vercel.app/api/user";
const LEETCODE_USERNAME = "nscoded";
const GITHUB_URL = "https://github.com/nscoded";
const GITHUB_USERNAME = "NScoded";
const CHESS_USERNAME = "nilesh0705";
const DUOLINGO_USERNAME = "nilesh070501";
const DUOLINGO_PROFILE_URL = `https://www.duolingo.com/profile/${DUOLINGO_USERNAME}`;

/* =========================================================
   LYFTA API

   The browser talks only to this Vercel Serverless Function:
   /api/lyfta/*

   The Lyfta API key stays on Vercel as LYFTA_API_KEY and is
   never exposed to the React/browser bundle.
========================================================= */
/* =========================================================
   LYFTA API
========================================================= */

const LYFTA_API_BASE_URL = "/api/lyfta";

async function fetchLyftaJson(path) {
  const response = await fetch(`${LYFTA_API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Lyfta API failed: ${response.status} ${text}`
    );
  }

  return response.json();
}

function formatLyftaDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatLyftaDuration(value) {
  if (!value) return "—";

  const text = String(value);
  const parts = text.split(":").map(Number);

  if (parts.length === 3 && parts.every(Number.isFinite)) {
    const [hours, minutes] = parts;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  return text;
}

function getLyftaWorkoutList(payload) {
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  if (Array.isArray(payload?.data?.workouts)) return payload.data.workouts;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function getLyftaExerciseList(workout) {
  return Array.isArray(workout?.exercises) ? workout.exercises : [];
}

function getLyftaTotalSets(workout) {
  return getLyftaExerciseList(workout).reduce((total, exercise) => {
    return (
      total +
      (Array.isArray(exercise?.sets) ? exercise.sets.length : 0)
    );
  }, 0);
}

function getLyftaUniqueExerciseCount(workout) {
  const names = getLyftaExerciseList(workout)
    .map(
      (exercise) =>
        exercise?.excercise_name ||
        exercise?.exercise_name ||
        exercise?.name ||
        ""
    )
    .map((name) => String(name).trim().toLowerCase())
    .filter(Boolean);

  return new Set(names).size;
}

function formatLyftaVolume(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 1,
  });
}

function getDuolingoLanguageDisplay(language) {
  const code = String(language || "").toLowerCase();

  if (code === "ja") {
    return { name: "Japanese", code: "ja" };
  }

  if (code === "en") {
    return { name: "English", code: "en" };
  }

  return { name: language || "—", code: "" };
}

function DuolingoLanguageFlag({ code }) {
  if (code === "ja") {
    return (
      <svg
        className="duolingo-language-flag"
        viewBox="0 0 36 24"
        aria-hidden="true"
      >
        <rect width="36" height="24" rx="2" fill="#ffffff" />
        <circle cx="18" cy="12" r="6.5" fill="#bc002d" />
      </svg>
    );
  }

  if (code === "en") {
    return (
      <svg
        className="duolingo-language-flag"
        viewBox="0 0 36 24"
        aria-hidden="true"
      >
        <rect width="36" height="24" rx="2" fill="#ffffff" />
        <rect x="15" y="0" width="6" height="24" fill="#cf142b" />
        <rect x="0" y="9" width="36" height="6" fill="#cf142b" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
   CUSTOM GITHUB ICON
========================================================= */

function GitHubIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* =========================================================
   DUMMY DATA
========================================================= */

const dummyData = {
  coding: {
    value: "3h 20m",
    subtitle: "Focus Time",
    change: "+12%",
  },

  problems: {
    value: 1,
    subtitle: "Today",
    change: "+1",
  },

  games: {
    value: 2,
    subtitle: "Today",
    change: "+1",
  },

  learning: {
    value: "2h 10m",
    subtitle: "Study Time",
    change: "+20%",
  },

  learning: [
    {
      title: "DAA - Graph Algorithms",
      time: "1h 20m",
      progress: 60,
    },
    {
      title: "System Design",
      time: "40m",
      progress: 30,
    },
    {
      title: "AI / NLP",
      time: "20m",
      progress: 20,
    },
  ],

};

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  change,
  iconClass,
}) {
  return (
    <div className="activity-stat-card">
      <div className={`activity-stat-icon ${iconClass}`}>
        {icon}
      </div>

      <div className="activity-stat-content">
        <p className="activity-stat-title">{title}</p>

        <h3 className="activity-stat-value">{value}</h3>

        <div className="activity-stat-bottom">
          <span>{subtitle}</span>

          <span className="activity-stat-change">
            <ArrowUpRight size={15} />
            {change}
          </span>
        </div>
      </div>

      <div className="activity-mini-bars">
        <span style={{ height: "35%" }} />
        <span style={{ height: "50%" }} />
        <span style={{ height: "42%" }} />
        <span style={{ height: "68%" }} />
        <span style={{ height: "58%" }} />
        <span style={{ height: "82%" }} />
        <span style={{ height: "72%" }} />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  title,
  action,
  href,
}) {
  return (
    <div className="activity-section-header">
      <div className="activity-section-title">
        <div className="activity-section-icon">
          {icon}
        </div>

        <h2>{title}</h2>
      </div>

      {action && (
        <a
          href={href || "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noreferrer" : undefined}
          className="activity-section-action"
        >
          {action}
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}

/* =========================================================
   GITHUB CONTRIBUTION GRID
========================================================= */

function GithubContributionGrid({ contributions = [] }) {
  const months = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contributionMap = new Map(
      contributions.map((item) => [item.date, item])
    );

    return [3, 2, 1, 0].map((monthsAgo) => {
      const monthDate = new Date(
        today.getFullYear(),
        today.getMonth() - monthsAgo,
        1
      );

      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstWeekday = monthDate.getDay();

      const cells = [];

      for (let i = 0; i < firstWeekday; i += 1) {
        cells.push(
          <span
            key={`empty-${year}-${month}-${i}`}
            className="github-cell level-0 github-empty-cell"
            aria-hidden="true"
          />
        );
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        const key = [
          year,
          String(month + 1).padStart(2, "0"),
          String(day).padStart(2, "0"),
        ].join("-");

        // Do not show future days from the current month.
        if (date > today) {
          cells.push(
            <span
              key={key}
              className="github-cell level-0 github-empty-cell"
              aria-hidden="true"
            />
          );
          continue;
        }

        const contribution = contributionMap.get(key);
        const level = Number(contribution?.level || 0);
        const count = Number(contribution?.count || 0);

        cells.push(
          <span
            key={key}
            className={`github-cell level-${Math.min(4, Math.max(0, level))}`}
            title={`${count} contribution${count === 1 ? "" : "s"} on ${key}`}
          />
        );
      }

      return {
        key: `${year}-${month}`,
        label: monthDate.toLocaleDateString("en-US", {
          month: "short",
        }),
        cells,
      };
    });
  }, [contributions]);

  return (
    <div className="github-grid-wrapper">
      <div className="github-live-calendar">
        {months.map((month) => (
          <div className="github-month" key={month.key}>
            <div className="github-month-grid">
              {month.cells}
            </div>

            <div className="github-month-label">
              {month.label}
            </div>
          </div>
        ))}
      </div>

      <div className="github-legend" aria-label="Contribution intensity">
        <span>Less</span>
        <i className="level-0" />
        <i className="level-1" />
        <i className="level-2" />
        <i className="level-3" />
        <i className="level-4" />
        <span>More</span>
      </div>
    </div>
  );
}

/* =========================================================
   LEETCODE ACTIVITY GRID
========================================================= */

function LeetCodeActivityGrid({ calendar = {} }) {
  const months = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [2, 1, 0].map((monthsAgo) => {
      const monthDate = new Date(
        today.getFullYear(),
        today.getMonth() - monthsAgo,
        1
      );

      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();

      const daysInMonth = new Date(
        year,
        month + 1,
        0
      ).getDate();

      // Sunday = 0
      // Monday = 1
      // ...
      // Saturday = 6
      const firstDay = new Date(
        year,
        month,
        1
      ).getDay();

      const days = [];

      for (let day = 1; day <= daysInMonth; day++) {
        // Current month ke future days mat dikhao
        if (
          year === today.getFullYear() &&
          month === today.getMonth() &&
          day > today.getDate()
        ) {
          break;
        }

        const date = new Date(
          year,
          month,
          day
        );

        const dayOfWeek = date.getDay();

        /*
          Week column calculate kar rahe hain.

          Example:
          Agar month Thursday se start hua:
          firstDay = 4

          Day 1 -> week 0
          Day 2 -> week 0
          ...
          Day 7 -> week 1
        */
        const week = Math.floor(
          (firstDay + day - 1) / 7
        );

        const key = [
          year,
          String(month + 1).padStart(2, "0"),
          String(day).padStart(2, "0"),
        ].join("-");

        days.push({
          key,
          day,
          count: Number(calendar[key] || 0),
          row: dayOfWeek + 1,
          column: week + 1,
        });
      }

      return {
        key: `${year}-${month + 1}`,
        label: monthDate.toLocaleDateString(
          "en-IN",
          {
            month: "short",
          }
        ),
        days,

        // Number of week columns needed
        weekCount: Math.ceil(
          (firstDay + daysInMonth) / 7
        ),
      };
    });
  }, [calendar]);

  return (
    <div className="leetcode-calendar">
      {months.map((month) => (
        <div
          className="leetcode-month"
          key={month.key}
        >
          <div
            className="leetcode-month-grid"
            style={{
              gridTemplateColumns: `repeat(${month.weekCount}, 1fr)`,
            }}
          >
            {month.days.map((day) => (
              <span
                key={day.key}
                className={`leetcode-day-cell ${
                  day.count > 0 ? "filled" : ""
                }`}
                style={{
                  gridColumn: day.column,
                  gridRow: day.row,

                  ...(day.count > 0
                    ? {
                        opacity: Math.min(
                          1,
                          0.38 +
                            day.count * 0.12
                        ),
                      }
                    : {}),
                }}
                title={`${day.key}: ${
                  day.count
                } submission${
                  day.count === 1
                    ? ""
                    : "s"
                }`}
              />
            ))}
          </div>

          <div className="leetcode-month-label">
            {month.label}
          </div>
        </div>
      ))}
    </div>
  );
}
/* =========================================================
   LEARNING PROGRESS
========================================================= */

function ActivityProgress({
  title,
  time,
  progress,
}) {
  return (
    <div className="learning-item">
      <div className="learning-item-top">
        <div>
          <p>{title}</p>
          <span>{time}</span>
        </div>

        <span>{progress}%</span>
      </div>

      <div className="learning-progress-track">
        <div
          className="learning-progress-bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   LEETCODE HELPERS
========================================================= */

function formatLeetCodeDate(timestamp) {
  if (!timestamp) return "—";

  const date = new Date(Number(timestamp) * 1000);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalizeCalendar(calendar) {
  let raw =
    calendar?.submissionCalendar ||
    calendar?.calendar ||
    calendar ||
    {};

  // alfa-leetcode-api returns submissionCalendar as a JSON string.
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = {};
    }
  }

  const result = {};

  Object.entries(raw).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000);

    if (Number.isNaN(date.getTime())) return;

    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    result[key] = Number(count) || 0;
  });

  return result;
}

function getCurrentStreak(calendar) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const toKey = (date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

  // If today has no submission, a current streak can still be alive
  // through yesterday. If neither today nor yesterday has activity,
  // the current streak is zero.
  if (!calendar[toKey(today)]) {
    today.setDate(today.getDate() - 1);

    if (!calendar[toKey(today)]) {
      return 0;
    }
  }

  let streak = 0;

  while (calendar[toKey(today)]) {
    streak += 1;
    today.setDate(today.getDate() - 1);
  }

  return streak;
}

function getThisMonthSubmissions(calendar) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return Object.entries(calendar).reduce(
    (total, [dateKey, count]) => {
      const [entryYear, entryMonth] = dateKey
        .split("-")
        .map(Number);

      if (entryYear === year && entryMonth === month) {
        return total + Number(count || 0);
      }

      return total;
    },
    0
  );
}

function formatGitHubDate(timestamp) {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Activities() {
  const [leetcode, setLeetcode] = useState({
    lastSolved: "Loading...",
    difficulty: "—",
    topic: "—",
    totalSolved: 0,
    thisMonth: 0,
    acceptance: "—",
    currentStreak: 0,
    lastSolvedDate: "Loading...",
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: null,
    calendar: {},
    loading: true,
  });

  const [github, setGithub] = useState({
    latestPush: null,
    pushes45Days: 0,
    totalContributions: 0,
    thisMonth: 0,
    streak: 0,
    contributions: [],
    loading: true,
    error: null,
  });

  /* =======================================================
     GITHUB API

     Uses public GitHub event data for the latest push and a
     public contribution-calendar endpoint for the real
     contribution graph. No token is exposed in the browser.
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const getDateKey = (date) =>
      [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

    const getCurrentStreak = (contributions) => {
      const contributionMap = new Map(
        contributions.map((item) => [
          item.date,
          Number(item.count || 0),
        ])
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!contributionMap.get(getDateKey(today))) {
        today.setDate(today.getDate() - 1);
        if (!contributionMap.get(getDateKey(today))) {
          return 0;
        }
      }

      let streak = 0;

      while (contributionMap.get(getDateKey(today))) {
        streak += 1;
        today.setDate(today.getDate() - 1);
      }

      return streak;
    };

    const getThisMonth = (contributions) => {
      const now = new Date();

      return contributions.reduce((sum, item) => {
        const date = new Date(`${item.date}T00:00:00`);

        if (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        ) {
          return sum + Number(item.count || 0);
        }

        return sum;
      }, 0);
    };

    const getLast45DaysContributions = (contributions) => {
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);
      cutoff.setDate(cutoff.getDate() - 44);

      return contributions.reduce((sum, item) => {
        const date = new Date(`${item.date}T00:00:00`);
        if (!Number.isNaN(date.getTime()) && date >= cutoff) {
          return sum + Number(item.count || 0);
        }
        return sum;
      }, 0);
    };

    const fetchGithubData = async () => {
      try {
        const calendarResponse = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
        );

        if (!calendarResponse.ok) {
          throw new Error(
            `GitHub contribution API request failed: ${calendarResponse.status}`
          );
        }

        const calendarData = await calendarResponse.json();

        const contributions = Array.isArray(
          calendarData?.contributions
        )
          ? calendarData.contributions.map((item) => ({
              date: item.date,
              count: Number(item.count || 0),
              level: Number(item.level ?? item.intensity ?? 0),
            }))
          : [];

        /*
          GitHub's public Events API is used for push activity.
          Important: the current public Events API does not reliably
          include the old `payload.size` / `payload.commits` fields.
          Therefore each PushEvent is counted as one push.
        */
        const cutoff = new Date();
        cutoff.setHours(0, 0, 0, 0);
        cutoff.setDate(cutoff.getDate() - 45);

        let events = [];
        let pushCount45Days = 0;

        for (let page = 1; page <= 10; page += 1) {
          const eventsResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
              },
            }
          );

          if (!eventsResponse.ok) {
            throw new Error(
              `GitHub events API request failed: ${eventsResponse.status}`
            );
          }

          const pageEvents = await eventsResponse.json();
          if (!Array.isArray(pageEvents) || pageEvents.length === 0) {
            break;
          }

          events.push(...pageEvents);

          const pageHasOlderEvent = pageEvents.some((event) => {
            const eventDate = new Date(event?.created_at);
            return !Number.isNaN(eventDate.getTime()) && eventDate < cutoff;
          });

          if (pageHasOlderEvent) break;
        }

        const pushEvents = events.filter(
          (event) => event?.type === "PushEvent"
        );

        pushEvents.forEach((event) => {
          const eventDate = new Date(event?.created_at);

          if (Number.isNaN(eventDate.getTime()) || eventDate < cutoff) {
            return;
          }

          // One PushEvent = one push.
          pushCount45Days += 1;
        });

        const latestPushEvent = pushEvents[0] || null;

        const commits = Array.isArray(
          latestPushEvent?.payload?.commits
        )
          ? latestPushEvent.payload.commits
          : [];

        const latestCommit = commits[commits.length - 1] || null;

        const latestPush = latestPushEvent
          ? {
              repo:
                latestPushEvent?.repo?.name ||
                "GitHub repository",
              repoUrl: latestPushEvent?.repo?.name
                ? `https://github.com/${latestPushEvent.repo.name}`
                : GITHUB_URL,
              message:
                latestCommit?.message ||
                "Pushed code to GitHub",
              date:
                latestPushEvent?.created_at || null,
              commitCount:
                Number(
                  latestPushEvent?.payload?.size ??
                    commits.length ??
                    0
                ) || 1,
            }
          : null;

        // Sum the contribution calendar instead of relying on
        // `total.lastYear`, whose response shape can vary by API version.
        const totalLast12Months = contributions.reduce(
          (sum, item) => sum + Number(item.count || 0),
          0
        );

        // Contribution calendar is the reliable public source for the
        // activity count shown in the 45-day summary. This is a contribution
        // count, not a strict PushEvent count.
        const contributions45Days = getLast45DaysContributions(contributions);

        if (cancelled) return;

        setGithub({
          latestPush,
          pushes45Days: contributions45Days,
          totalContributions: totalLast12Months,
          thisMonth: getThisMonth(contributions),
          streak: getCurrentStreak(contributions),
          contributions,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("GitHub activity fetch failed:", error);

        if (!cancelled) {
          setGithub((prev) => ({
            ...prev,
            loading: false,
            error: error?.message || "GitHub data unavailable",
          }));
        }
      }
    };

    fetchGithubData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     DUOLINGO API

     Public profile stats via a community read-only proxy.
     Duolingo does not publish an official third-party API.
  ======================================================= */

  const [duolingo, setDuolingo] = useState({
    username: DUOLINGO_USERNAME,
    streak: 0,
    longestStreak: null,
    totalXp: 0,
    weeklyXp: null,
    language: "—",
    courseXp: 0,
    courses: 0,
    courseList: [],
    league: null,
    plus: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchDuolingoData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          `https://duolingo-streak-tracker.vercel.app/api/stats/${encodeURIComponent(
            DUOLINGO_USERNAME
          )}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Duolingo API request failed: ${response.status}`);
        }

        const data = await response.json();

        // The proxy normalizes public profile data. Keep the parser tolerant
        // so a small response-shape change does not break the whole card.
        const courses = Array.isArray(data?.courses)
          ? data.courses
          : Array.isArray(data?.languages)
          ? data.languages
          : [];

        const activeCourse =
          courses.find(
            (course) =>
              course?.current === true ||
              course?.active === true ||
              course?.isCurrent === true
          ) || courses[0] || {};

        const courseList = courses
          .map((course) => ({
            language:
              course?.learningLanguage ||
              course?.learning_language ||
              course?.language ||
              course?.name ||
              "—",
            xp: Number(course?.xp ?? course?.totalXp ?? course?.totalXP ?? 0),
            crowns: Number(course?.crowns ?? 0),
            current: Boolean(
              course?.current || course?.active || course?.isCurrent
            ),
          }))
          .filter((course) => course.language !== "—");

        const language =
          activeCourse?.learningLanguage ||
          activeCourse?.learning_language ||
          activeCourse?.language ||
          activeCourse?.name ||
          data?.learningLanguage ||
          data?.learning_language ||
          data?.language ||
          "—";

        const totalXp = Number(
          data?.totalXp ??
            data?.totalXP ??
            data?.total_xp ??
            data?.xp ??
            0
        );

        const streak = Number(
          data?.streak ??
            data?.currentStreak ??
            data?.current_streak ??
            data?.streakData?.currentStreak?.length ??
            0
        );

        const courseXp = Number(
          activeCourse?.xp ??
            activeCourse?.totalXp ??
            activeCourse?.totalXP ??
            activeCourse?.courseXp ??
            0
        );

        const longestStreakRaw =
          data?.longestStreak ??
          data?.longest_streak ??
          data?.streakData?.longestStreak?.length ??
          data?.streakData?.longestStreak ??
          null;

        const weeklyXpRaw =
          data?.weeklyXp ??
          data?.weeklyXP ??
          data?.weekly_xp ??
          data?.xpThisWeek ??
          data?.xp_this_week ??
          null;

        const league =
          typeof data?.league === "string"
            ? data.league
            : data?.league?.name || data?.league?.title || null;

        if (cancelled) return;

        setDuolingo({
          username: data?.username || DUOLINGO_USERNAME,
          streak: Number.isFinite(streak) ? streak : 0,
          longestStreak:
            longestStreakRaw !== null && Number.isFinite(Number(longestStreakRaw))
              ? Number(longestStreakRaw)
              : null,
          totalXp: Number.isFinite(totalXp) ? totalXp : 0,
          weeklyXp:
            weeklyXpRaw !== null && Number.isFinite(Number(weeklyXpRaw))
              ? Number(weeklyXpRaw)
              : null,
          language,
          courseXp: Number.isFinite(courseXp) ? courseXp : 0,
          courses: courses.length,
          courseList,
          league,
          plus: Boolean(data?.plus || data?.isPlus || data?.hasPlus),
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Duolingo activity fetch failed:", error);

        if (!cancelled) {
          setDuolingo((prev) => ({
            ...prev,
            loading: false,
            error:
              error?.name === "AbortError"
                ? "Duolingo API timed out"
                : error?.message || "Duolingo data unavailable",
          }));
        }
      }
    };

    fetchDuolingoData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     CHESS API
  ======================================================= */

  const [chess, setChess] = useState({
    rating: null,
    ratingType: "",
    lastGame: "—",
    opponent: "—",
    lastGameDate: "—",
    lastGameType: "",
    ratingChange: null,
    gamesLast7Days: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    loading: true,
    error: null,
  });

  /* =======================================================
     LEETCODE API

     Uses one public request to leetinfo-api instead of making
     four parallel requests to alfa-leetcode-api.

     The old endpoint was returning HTTP 429, which left the
     dashboard stuck in Loading... .
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch(
          `${LEETCODE_API_BASE}?username=${encodeURIComponent(
            LEETCODE_USERNAME
          )}`
        );

        if (!response.ok) {
          throw new Error(
            `LeetCode API request failed: ${response.status}`
          );
        }

        const data = await response.json();
        const matchedUser = data?.matchedUser || {};
        const submitStats = matchedUser?.submitStats || {};

        const acceptedStats = Array.isArray(
          submitStats.acSubmissionNum
        )
          ? submitStats.acSubmissionNum
          : [];

        const totalStats = Array.isArray(
          submitStats.totalSubmissionNum
        )
          ? submitStats.totalSubmissionNum
          : [];

        const findDifficulty = (stats, difficulty) =>
          Number(
            stats.find(
              (item) => item?.difficulty === difficulty
            )?.count || 0
          );

        const solvedCount = findDifficulty(
          acceptedStats,
          "All"
        );

        const easySolved = findDifficulty(
          acceptedStats,
          "Easy"
        );

        const mediumSolved = findDifficulty(
          acceptedStats,
          "Medium"
        );

        const hardSolved = findDifficulty(
          acceptedStats,
          "Hard"
        );

        const totalSubmissions = totalStats.reduce(
          (sum, item) =>
            sum + Number(item?.submissions || 0),
          0
        );

        const totalAccepted = acceptedStats.reduce(
          (sum, item) =>
            sum + Number(item?.submissions || 0),
          0
        );

        const acceptance =
          totalSubmissions > 0
            ? `${(
                (totalAccepted / totalSubmissions) *
                100
              ).toFixed(1)}%`
            : "—";

        const calendar = normalizeCalendar(
          matchedUser?.submissionCalendar
        );

        const recentSubmissions = Array.isArray(
          data?.recentSubmissionList
        )
          ? data.recentSubmissionList
          : [];

        // Find the most recent ACCEPTED submission instead of
        // blindly taking the first recent submission.
        const latestSubmission =
          recentSubmissions.find(
            (submission) =>
              submission?.statusDisplay === "Accepted"
          ) || null;

        let difficulty = "—";
        let topic = "—";

        /*
          Fetch the latest problem's metadata directly from
          LeetCode GraphQL. This is only one additional request
          and is completely independent of the rate-limited
          alfa-leetcode-api service.
        */
        if (latestSubmission?.titleSlug) {
          try {
            const problemResponse = await fetch(
              "https://leetcode.com/graphql",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  operationName: "questionData",
                  variables: {
                    titleSlug:
                      latestSubmission.titleSlug,
                  },
                  query: `
                    query questionData($titleSlug: String!) {
                      question(titleSlug: $titleSlug) {
                        difficulty
                        topicTags {
                          name
                        }
                      }
                    }
                  `,
                }),
              }
            );

            if (problemResponse.ok) {
              const problemData =
                await problemResponse.json();

              const question =
                problemData?.data?.question;

              difficulty =
                question?.difficulty || "—";

              topic =
                question?.topicTags?.[0]?.name ||
                "—";
            }
          } catch (problemError) {
            console.warn(
              "Could not fetch latest LeetCode problem details:",
              problemError
            );
          }
        }

        const currentStreak = getCurrentStreak(calendar);

        if (cancelled) return;

        setLeetcode({
          lastSolved:
            latestSubmission?.title ||
            "No accepted submission found",
          difficulty,
          topic,
          totalSolved: solvedCount,
          thisMonth:
            getThisMonthSubmissions(calendar),
          acceptance,
          currentStreak,
          lastSolvedDate: formatLeetCodeDate(
            latestSubmission?.timestamp
          ),
          easySolved,
          mediumSolved,
          hardSolved,
          ranking:
            matchedUser?.profile?.ranking ||
            null,
          calendar,
          loading: false,
        });
      } catch (error) {
        console.error(
          "LeetCode activity fetch failed:",
          error
        );

        if (!cancelled) {
          setLeetcode((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      }
    };

    fetchLeetCodeData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     CHESS.COM PUBLIC API

     Uses Chess.com's official read-only PubAPI directly.
     Requests are intentionally sequential because Chess.com
     notes that parallel requests can trigger HTTP 429.
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const CHESS_API_BASE = "https://api.chess.com/pub/player";

    const fetchJson = async (url) => {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Chess.com API request failed: ${response.status}`);
      }

      return response.json();
    };

    const getPlayerResult = (game) => {
      const username = String(CHESS_USERNAME).toLowerCase();
      const whiteUsername = String(game?.white?.username || "").toLowerCase();

      if (whiteUsername === username) {
        return game?.white?.result || "unknown";
      }

      return game?.black?.result || "unknown";
    };

    const getOpponent = (game) => {
      const username = String(CHESS_USERNAME).toLowerCase();
      const whiteUsername = String(game?.white?.username || "").toLowerCase();

      if (whiteUsername === username) {
        return game?.black?.username || "Unknown opponent";
      }

      return game?.white?.username || "Unknown opponent";
    };

    const formatGameResult = (result) => {
      if (result === "win") return "Won";
      if (result === "checkmated" || result === "timeout" || result === "resigned") {
        return "Lost";
      }
      if (result === "agreed" || result === "stalemate" || result === "repetition" || result === "insufficient") {
        return "Draw";
      }
      if (result === "abandoned" || result === "kingofthehill" || result === "threecheck" || result === "bughouse") {
        return "Lost";
      }
      return result || "—";
    };

    const formatTimeClass = (timeClass) => {
      if (timeClass === "rapid") return "Rapid";
      if (timeClass === "blitz") return "Blitz";
      if (timeClass === "bullet") return "Bullet";
      if (timeClass === "daily") return "Daily";
      return "";
    };

    const formatDateTime = (timestamp) => {
      if (!timestamp) return "—";

      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(timestamp * 1000));
    };

    const getRatingData = (stats) => {
      const candidates = [
        ["Rapid", stats?.chess_rapid?.last?.rating],
        ["Blitz", stats?.chess_blitz?.last?.rating],
        ["Bullet", stats?.chess_bullet?.last?.rating],
        ["Daily", stats?.chess_daily?.last?.rating],
      ];

      return candidates.find(([, rating]) => Number.isFinite(Number(rating))) || ["", null];
    };

    const fetchChessData = async () => {
      try {
        // 1. Validate/load the public player profile.
        await fetchJson(`${CHESS_API_BASE}/${CHESS_USERNAME}`);

        // 2. Load current ratings and records.
        const stats = await fetchJson(
          `${CHESS_API_BASE}/${CHESS_USERNAME}/stats`
        );

        // 3. Get available monthly game archives.
        const archiveData = await fetchJson(
          `${CHESS_API_BASE}/${CHESS_USERNAME}/games/archives`
        );

        const archives = Array.isArray(archiveData?.archives)
          ? archiveData.archives
          : [];

        // Only the newest two months are needed for a 7-day window and
        // the latest game. Requests remain sequential to avoid 429s.
        const recentArchiveUrls = archives.slice(-2);
        const recentGames = [];

        for (const archiveUrl of recentArchiveUrls) {
          try {
            const archive = await fetchJson(archiveUrl);
            if (Array.isArray(archive?.games)) {
              recentGames.push(...archive.games);
            }
          } catch (archiveError) {
            console.warn("Chess.com archive request failed:", archiveError);
          }
        }

        recentGames.sort(
          (a, b) => Number(b?.end_time || 0) - Number(a?.end_time || 0)
        );

        const latestGame = recentGames[0] || null;
        const latestResult = latestGame
          ? getPlayerResult(latestGame)
          : "unknown";

        // Calculate the last-7-day record from actual games.
        const sevenDaysAgo = Date.now() / 1000 - 7 * 24 * 60 * 60;
        const gamesLast7Days = recentGames.filter(
          (game) => Number(game?.end_time || 0) >= sevenDaysAgo
        );

        const wins = gamesLast7Days.filter(
          (game) => getPlayerResult(game) === "win"
        ).length;

        const draws = gamesLast7Days.filter((game) =>
          [
            "agreed",
            "stalemate",
            "repetition",
            "insufficient",
          ].includes(getPlayerResult(game))
        ).length;

        const losses = gamesLast7Days.filter((game) => {
          const result = getPlayerResult(game);
          return ["checkmated", "timeout", "resigned", "abandoned"].includes(result);
        }).length;

        const [ratingType, currentRating] = getRatingData(stats);

        // Calculate rating movement from the two most recent games of the
        // selected time class when possible.
        let ratingChange = null;
        if (latestGame && ratingType) {
          const timeClass =
            ratingType === "Rapid"
              ? "rapid"
              : ratingType === "Blitz"
              ? "blitz"
              : ratingType === "Bullet"
              ? "bullet"
              : "daily";

          const sameClassGames = recentGames.filter(
            (game) => game?.time_class === timeClass
          );

          const username = String(CHESS_USERNAME).toLowerCase();
          const playerRatings = sameClassGames
            .map((game) => {
              const whiteUsername = String(
                game?.white?.username || ""
              ).toLowerCase();
              const player =
                whiteUsername === username ? game?.white : game?.black;

              return {
                timestamp: Number(game?.end_time || 0),
                rating: Number(player?.rating),
              };
            })
            .filter((item) => Number.isFinite(item.rating))
            .sort((a, b) => b.timestamp - a.timestamp);

          if (playerRatings.length >= 2) {
            ratingChange = playerRatings[0].rating - playerRatings[1].rating;
          }
        }

        if (cancelled) return;

        setChess({
          rating: currentRating,
          ratingType,
          lastGame: formatGameResult(latestResult),
          opponent: latestGame ? getOpponent(latestGame) : "No games found",
          lastGameDate: latestGame
            ? formatDateTime(latestGame.end_time)
            : "—",
          lastGameType: latestGame
            ? formatTimeClass(latestGame.time_class)
            : "",
          ratingChange,
          gamesLast7Days: gamesLast7Days.length,
          wins,
          draws,
          losses,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Chess.com activity fetch failed:", error);

        if (cancelled) return;

        setChess((prev) => ({
          ...prev,
          loading: false,
          error: error?.message || "Unable to load Chess.com data",
        }));
      }
    };

    fetchChessData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     LYFTA API
  ======================================================= */

  const [lyfta, setLyfta] = useState({
    workout: null,
    summary: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchLyftaData = async () => {
      try {
        // Workouts endpoint is the source of truth for the latest session.
        // Summary is optional so a summary failure cannot hide valid workout data.
        const workoutPayload = await fetchLyftaJson("/workouts");

        let summaryPayload = null;

        try {
          summaryPayload = await fetchLyftaJson("/workouts-summary");
        } catch (summaryError) {
          console.warn("Lyfta summary unavailable:", summaryError);
        }

        const workouts = getLyftaWorkoutList(workoutPayload);
        const summaries = getLyftaWorkoutList(summaryPayload);

        if (cancelled) return;

        setLyfta({
          workout: workouts[0] || null,
          summary: summaries[0] || null,
          loading: false,
          error: workouts.length
            ? null
            : "No Lyfta workouts were returned",
        });
      } catch (error) {
        console.error("Lyfta activity fetch failed:", error);

        if (!cancelled) {
          setLyfta({
            workout: null,
            summary: null,
            loading: false,
            error: error?.message || "Lyfta data unavailable",
          });
        }
      }
    };

    fetchLyftaData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="activities-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="activities-header">
        <div>
          <div className="activities-eyebrow">
            <Activity size={16} />
            PERSONAL ACTIVITY
          </div>

          <h1>Activities</h1>

          <p>
            Track your coding, gaming, learning
            and daily progress.
          </p>
        </div>

        <div className="activities-header-badge">
          <Zap size={17} />

          <span>
            {leetcode.loading
              ? "Syncing LeetCode"
              : `${leetcode.currentStreak} day streak`}
          </span>
        </div>
      </div>

      {/* ===================================================
          TOP STATS
      =================================================== */}

      <div className="activity-stats-grid">

        <StatCard
          icon={<Code2 size={24} />}
          title="Coding"
          value={dummyData.coding.value}
          subtitle={dummyData.coding.subtitle}
          change={dummyData.coding.change}
          iconClass="coding"
        />

        <StatCard
          icon={<Brain size={24} />}
          title="Problems Solved"
          value={
            leetcode.loading
              ? "..."
              : leetcode.totalSolved
          }
          subtitle="Total Solved"
          change={
            leetcode.loading
              ? "..."
              : `E ${leetcode.easySolved} · M ${leetcode.mediumSolved} · H ${leetcode.hardSolved}`
          }
          iconClass="problems"
        />

        <StatCard
          icon={<GitHubIcon size={24} />}
          title="GitHub Activity"
          value={github.loading ? "..." : github.pushes45Days}
          subtitle={github.loading ? "Syncing" : "Last 45 Days"}
          change={github.loading ? "..." : "Total push"}
          iconClass="github"
        />

        <StatCard
          icon={<BookOpen size={24} />}
          title="Learning"
          value={dummyData.learning.value}
          subtitle={dummyData.learning.subtitle}
          change={dummyData.learning.change}
          iconClass="learning"
        />

      </div>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <div className="activities-main-grid">

        {/* =================================================
            LEETCODE
        ================================================= */}

        <div className="activity-panel">

          <SectionHeader
            icon={<Code2 size={21} />}
            title="LeetCode"
            action="View Profile"
            href={LEETCODE_URL}
          />

          <div className="leetcode-highlight-grid">

            <div className="leetcode-last-solved">

              <span className="activity-label">
                Last Solved
              </span>

              <strong>
                {leetcode.lastSolved}
              </strong>

              <div className="leetcode-tags">

                <span className="tag easy">
                  {leetcode.difficulty}
                </span>

                <span className="tag">
                  {leetcode.topic}
                </span>

                <span>
                  {leetcode.lastSolvedDate}
                </span>

              </div>

            </div>

            <div className="streak-box">

              <span className="activity-label">
                Current Streak
              </span>

              <div className="streak-number">
                <span>🔥</span>

                <strong>
                  {leetcode.currentStreak}
                </strong>
              </div>

              <small>
                days
              </small>

            </div>

          </div>

          <LeetCodeActivityGrid calendar={leetcode.calendar} />

          <div className="three-metrics">

            <div>
              <strong>
                {leetcode.totalSolved}
              </strong>

              <span>
                Total Solved
              </span>
            </div>

            <div>
              <strong>
                {leetcode.thisMonth}
              </strong>

              <span>
                This Month
              </span>
            </div>

            <div>
              <strong>
                {leetcode.acceptance}
              </strong>

              <span>
                Acceptance Rate
              </span>
            </div>

          </div>

        </div>

        {/* =================================================
            GITHUB
        ================================================= */}

        <div className="activity-panel">

          <SectionHeader
            icon={<GitHubIcon size={21} />}
            title="GitHub"
            action="View Profile"
            href={GITHUB_URL}
          />

          <div className="github-latest-push">

            <span className="activity-label">
              Latest Push
            </span>

            {github.loading ? (
              <div className="github-loading">
                Loading GitHub activity...
              </div>
            ) : github.latestPush ? (
              <>
                <a
                  className="github-push-repo"
                  href={github.latestPush.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {github.latestPush.repo}
                  <ArrowUpRight size={15} />
                </a>

                <p className="github-push-message">
                  {github.latestPush.message}
                </p>

                <div className="github-push-meta">
                  <span>
                    {github.latestPush.commitCount} commit{github.latestPush.commitCount === 1 ? "" : "s"}
                  </span>

                  {github.latestPush.date && (
                    <span>
                      {formatGitHubDate(github.latestPush.date)}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="github-empty-state">
                No public push event found recently.
              </div>
            )}

            {github.error && (
              <p className="github-api-error">
                GitHub data could not be loaded.
              </p>
            )}

          </div>

          <GithubContributionGrid
            contributions={github.contributions}
          />

          <div className="three-metrics">

            <div>
              <strong>
                {github.loading ? "..." : github.totalContributions}
              </strong>

              <span>
                Last 12 Months
              </span>
            </div>

            <div>
              <strong>
                {github.loading ? "..." : github.thisMonth}
              </strong>

              <span>
                This Month
              </span>
            </div>

            <div>
              <strong>
                {github.loading ? "..." : github.streak}
              </strong>

              <span>
                Streak (days)
              </span>
            </div>

          </div>

        </div>

        {/* =================================================
            CHESS
        ================================================= */}

        <div className="activity-panel chess-activity-panel">

          <SectionHeader
            icon={
              <img
                className="chesscom-official-logo"
                src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpkXK09k.png"
                alt="Chess.com"
              />
            }
            title="Chess.com"
            action="View Profile"
            href={`https://www.chess.com/member/${CHESS_USERNAME}`}
          />

          <div className="chess-top-grid">

            <div className="chess-last-game">

              <span className="activity-label">
                Last Game
              </span>

              <strong
                className={`chess-result ${
                  chess.lastGame === "Won"
                    ? "is-win"
                    : chess.lastGame === "Lost"
                    ? "is-loss"
                    : "is-draw"
                }`}
              >
                {chess.loading
                  ? "Loading..."
                  : `${chess.lastGame}${chess.lastGameType ? ` · ${chess.lastGameType}` : ""}`}
              </strong>

              <p>
                vs {chess.opponent}
              </p>

              <small>
                {chess.lastGameDate}
              </small>

            </div>

            <div className="chess-rating">

              <span className="activity-label">
                Rating {chess.ratingType ? `(${chess.ratingType})` : ""}
              </span>

              <strong>
                {chess.loading ? "Loading..." : chess.rating ?? "—"}
              </strong>

              {!chess.loading && chess.ratingChange !== null && (
                <span className="rating-change">
                  {chess.ratingChange >= 0 ? (
                    <ArrowUpRight size={15} />
                  ) : (
                    <ArrowDownRight size={15} />
                  )}
                  {chess.ratingChange > 0 ? "+" : ""}
                  {chess.ratingChange}
                </span>
              )}

              <div className="rating-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

            </div>

          </div>

          <div className="chess-seven-days">

            <div className="chess-seven-days-header">

              <strong>
                {chess.gamesLast7Days}
              </strong>
              <span>
                Games (Last 7 days)
              </span>

            </div>

            <div className="games-bar">

              <div
                className="wins"
                style={{
                  width: `${
                    (chess.wins /
                      Math.max(
                        chess.gamesLast7Days,
                        1
                      )) *
                    100
                  }%`,
                }}
              />

              <div
                className="draws"
                style={{
                  width: `${
                    (chess.draws /
                      Math.max(
                        chess.gamesLast7Days,
                        1
                      )) *
                    100
                  }%`,
                }}
              />

              <div
                className="losses"
                style={{
                  width: `${
                    (chess.losses /
                      Math.max(
                        chess.gamesLast7Days,
                        1
                      )) *
                    100
                  }%`,
                }}
              />

            </div>

            <div className="games-result-row">

              <span className="win-text">
                {chess.wins} Wins
              </span>

              <span>
                {chess.draws} Draw
              </span>

              <span className="loss-text">
                {chess.losses} Loss
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            DUOLINGO
        ================================================= */}

        <div className="activity-panel duolingo-activity-panel">

          <SectionHeader
            icon={
              <img
                src="/duolingo.png"
                alt="Duolingo"
                className="duolingo-official-logo"
              />
            }
            title="Duolingo"
            action="View Profile"
            href={DUOLINGO_PROFILE_URL}
          />

          <div className="duolingo-hero">
            <div className="duolingo-hero-main">
              <div className="duolingo-flame">
                <Zap size={19} fill="currentColor" />
              </div>
              <div>
                <span className="activity-label">Current Streak</span>
                <div className="duolingo-streak-value">
                  {duolingo.loading ? "..." : duolingo.streak}
                  <span>days</span>
                </div>
                <div className="duolingo-streak-line">
                  <span />
                </div>
              </div>
            </div>

            <div className="duolingo-hero-badge">
              <span>Learning</span>
              <strong className="duolingo-language">
                {duolingo.loading ? (
                  "..."
                ) : (
                  (() => {
                    const language = getDuolingoLanguageDisplay(duolingo.language);
                    return (
                      <>
                        <DuolingoLanguageFlag code={language.code} />
                        {language.name}
                      </>
                    );
                  })()
                )}
              </strong>
            </div>
          </div>

          <div className="duolingo-metrics-grid">
            <div className="duolingo-metric-card">
              <span className="activity-label">Total XP</span>
              <strong>
                {duolingo.loading ? "..." : duolingo.totalXp.toLocaleString()}
              </strong>
              <small>Lifetime XP</small>
            </div>

            <div className="duolingo-metric-card">
              <span className="activity-label">Course XP</span>
              <strong>
                {duolingo.loading ? "..." : duolingo.courseXp.toLocaleString()}
              </strong>
              <small>{duolingo.courses} course{duolingo.courses === 1 ? "" : "s"}</small>
            </div>

            <div className="duolingo-metric-card">
              <span className="activity-label">Longest Streak</span>
              <strong>
                {duolingo.loading
                  ? "..."
                  : duolingo.longestStreak == null
                  ? "—"
                  : duolingo.longestStreak}
              </strong>
              <small>Personal best</small>
            </div>

            <div className="duolingo-metric-card">
              <span className="activity-label">Weekly XP</span>
              <strong>
                {duolingo.loading
                  ? "..."
                  : duolingo.weeklyXp == null
                  ? "—"
                  : duolingo.weeklyXp.toLocaleString()}
              </strong>
              <small>This week</small>
            </div>
          </div>

          <div className="duolingo-progress-card">
            <div className="duolingo-progress-head">
              <div>
                <span className="activity-label">Streak Progress</span>
                <strong>
                  {duolingo.streak >= 100
                    ? `${Math.floor(duolingo.streak / 100) * 100}+ day milestone`
                    : "Building the streak"}
                </strong>
              </div>
              <span className="duolingo-progress-number">
                {duolingo.loading ? "..." : `${duolingo.streak}d`}
              </span>
            </div>
            <div className="duolingo-progress-track">
              <span
                style={{
                  width: `${Math.min(100, ((duolingo.streak % 100) || 100))}%`,
                }}
              />
            </div>
            <div className="duolingo-progress-meta">
              <span>Daily consistency</span>
              <span>Keep it going</span>
            </div>
          </div>

          {duolingo.courseList.length > 0 && (
            <div className="duolingo-courses-card">
              <div className="duolingo-courses-header">
                <div>
                  <span className="activity-label">Courses</span>
                  <strong>Your learning activity</strong>
                </div>
                <span className="duolingo-course-count">
                  {duolingo.courseList.length}
                </span>
              </div>

              <div className="duolingo-course-list">
                {duolingo.courseList.slice(0, 3).map((course, index) => (
                  <div className="duolingo-course-row" key={`${course.language}-${index}`}>
                    <div className="duolingo-course-language">
                      <span className="duolingo-course-dot" />
                      {(() => {
                        const language = getDuolingoLanguageDisplay(course.language);
                        return (
                          <>
                            <DuolingoLanguageFlag code={language.code} />
                            <span className="duolingo-course-language-name">
                              {language.name}
                            </span>
                          </>
                        );
                      })()}
                      {course.current && <em>Active</em>}
                    </div>
                    <div className="duolingo-course-xp">
                      <strong>{course.xp.toLocaleString()}</strong>
                      <span>XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="duolingo-footer-row">
            <span>
              {duolingo.league ? `League: ${duolingo.league}` : "Public profile"}
            </span>
            <span className="duolingo-live-dot">
              <i /> Live data
            </span>
          </div>

          {duolingo.error && (
            <p className="duolingo-api-error">
              Duolingo data could not be loaded.
            </p>
          )}

        </div>

        {/* =================================================
            LYFTA / GYM
        ================================================= */}

        <div className="activity-panel lyfta-activity-panel">
          <SectionHeader
            icon={
              <span className="lyfta-icon">
                <img
                  src="https://play-lh.googleusercontent.com/AX-6eXLHm5zP_VdCnZR5l0JCKpfkA2SgUHHtiLKl-o4zzh5Z21mDbHrjeUYEasrSjDYGWBJDhcKK8e1WjKEM%3Dw240-h480"
                  alt="Lyfta"
                  className="lyfta-official-icon"
                />
              </span>
            }
            title="Lyfta"
            action="Open Lyfta"
            href="https://lyfta-pi.vercel.app/"
          />

          <div className="lyfta-stat-hero">
            <div className="lyfta-stat-hero-top">
              <div className="lyfta-session-copy">
                <span>Latest workout</span>
                <strong>
                  {lyfta.loading
                    ? "Loading..."
                    : lyfta.workout?.title || "No workout found"}
                </strong>
                <small>
                  {formatLyftaDate(
                    lyfta.summary?.workout_perform_date ??
                      lyfta.workout?.workout_perform_date
                  )}
                </small>
              </div>

              <div className="lyfta-live-pill">
                <i />
                Live
              </div>
            </div>

            <div className="lyfta-primary-stat">
              <div>
                <span>Total volume</span>
                <strong>
                  {(
                    lyfta.summary?.total_volume ??
                    lyfta.workout?.total_volume
                  ) != null
                    ? formatLyftaVolume(
                        lyfta.summary?.total_volume ??
                          lyfta.workout?.total_volume
                      )
                    : "—"}
                </strong>
              </div>
              <span className="lyfta-stat-unit">kg</span>
            </div>
          </div>

          <div className="lyfta-stat-grid">
            <div className="lyfta-stat-box">
              <span>Duration</span>
              <strong>
                {formatLyftaDuration(
                  lyfta.summary?.workout_duration ??
                    lyfta.workout?.workout_duration
                )}
              </strong>
              <small>Session time</small>
            </div>

            <div className="lyfta-stat-box">
              <span>Exercises</span>
              <strong>
                {getLyftaUniqueExerciseCount(lyfta.workout) || "—"}
              </strong>
              <small>Unique movements</small>
            </div>

            <div className="lyfta-stat-box">
              <span>Total sets</span>
              <strong>{getLyftaTotalSets(lyfta.workout) || "—"}</strong>
              <small>Logged sets</small>
            </div>

            <div className="lyfta-stat-box">
              <span>Avg / set</span>
              <strong>
                {(() => {
                  const volume = Number(
                    lyfta.summary?.total_volume ??
                      lyfta.workout?.total_volume
                  );
                  const sets = getLyftaTotalSets(lyfta.workout);

                  return Number.isFinite(volume) && sets
                    ? formatLyftaVolume(volume / sets)
                    : "—";
                })()}
              </strong>
              <small>Volume per set</small>
            </div>
          </div>

          {getLyftaExerciseList(lyfta.workout).length > 0 && (
            <div className="lyfta-breakdown">
              <div className="lyfta-breakdown-header">
                <span>Workout breakdown</span>
                <small>
                  {getLyftaExerciseList(lyfta.workout).length} movements logged
                </small>
              </div>

              <div className="lyfta-exercise-list">
                {getLyftaExerciseList(lyfta.workout)
                  .slice(0, 4)
                  .map((exercise, index) => {
                    const exerciseName =
                      exercise?.excercise_name ||
                      exercise?.exercise_name ||
                      exercise?.name ||
                      "Exercise";
                    const setCount = Array.isArray(exercise?.sets)
                      ? exercise.sets.length
                      : 0;

                    return (
                      <div
                        className="lyfta-exercise-row"
                        key={`${
                          exercise?.exercise_id || exercise?.id || index
                        }-${index}`}
                      >
                        <span className="lyfta-exercise-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="lyfta-exercise-name">
                          {exerciseName}
                        </span>

                        <span className="lyfta-exercise-sets">
                          {setCount ? `${setCount} sets` : "—"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="lyfta-footer-row">
            <span>Gym &amp; workout tracking</span>
            <span className="lyfta-live-dot">
              <i /> Live data
            </span>
          </div>

          {lyfta.error && (
            <p className="lyfta-api-error">
              Lyfta data could not be loaded. Check the Lyfta backend/API route.
            </p>
          )}
        </div>

      </div>

    </section>
  );
}

export default Activities;