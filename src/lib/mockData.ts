import type { Issue, Repository, AnalyticsData } from "./types";

export const mockRepos: Repository[] = [
  { id: 1, name: "dazzle-support", full_name: "anka/dazzle-support", owner: "anka", open_issues_count: 12 },
  { id: 2, name: "waha-go-bot", full_name: "anka/waha-go-bot", owner: "anka", open_issues_count: 5 },
  { id: 3, name: "tg-expense-bot", full_name: "anka/tg-expense-bot", owner: "anka", open_issues_count: 3 },
  { id: 4, name: "tokobot-id", full_name: "anka/tokobot-id", owner: "anka", open_issues_count: 8 },
];

const commonLabels = [
  { id: 101, name: "bug", color: "d73a4a" },
  { id: 102, name: "enhancement", color: "a2eeef" },
  { id: 103, name: "documentation", color: "0075ca" },
  { id: 104, name: "question", color: "d876e3" },
];

export const mockIssues: Issue[] = [
  {
    id: 1001,
    number: 42,
    title: "Fix login redirect loop",
    status: "in_progress",
    labels: [commonLabels[0]],
    custom_labels: [],
    note: "Reproduced on Safari",
    assignee: "ank",
    created_at: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
    repo: "anka/dazzle-support",
  },
  {
    id: 1002,
    number: 43,
    title: "Add dark mode support",
    status: "open",
    labels: [commonLabels[1]],
    custom_labels: [],
    created_at: new Date(Date.now() - 1 * 24 * 3600000).toISOString(),
    repo: "anka/dazzle-support",
  },
  {
    id: 1003,
    number: 44,
    title: "Update README with setup guide",
    status: "closed",
    labels: [commonLabels[2]],
    custom_labels: [],
    closed_at: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 3600000).toISOString(),
    repo: "anka/dazzle-support",
  },
  {
    id: 1004,
    number: 10,
    title: "WhatsApp message template not rendering",
    status: "open",
    labels: [commonLabels[0]],
    custom_labels: [],
    created_at: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
    repo: "anka/waha-go-bot",
  },
  {
    id: 1005,
    number: 11,
    title: "Support multi-language responses",
    status: "in_progress",
    labels: [commonLabels[1]],
    custom_labels: [],
    created_at: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    repo: "anka/waha-go-bot",
  },
];

export function getMockIssues(owner: string, repo: string): Issue[] {
  return mockIssues.filter((issue) => issue.repo === `${owner}/${repo}`);
}

export function getMockAnalytics(owner: string, repo: string): AnalyticsData {
  const repoIssues = getMockIssues(owner, repo);
  const openCount = repoIssues.filter((i) => i.status !== "closed").length;
  const closedCount = repoIssues.filter((i) => i.status === "closed").length;
  const closeRate = openCount + closedCount === 0 ? 0 : closedCount / (openCount + closedCount);

  const avgResolutionDays = repoIssues
    .filter((i) => i.closed_at)
    .reduce((sum, i) => {
      const created = new Date(i.created_at);
      const closed = new Date(i.closed_at!);
      const days = (closed.getTime() - created.getTime()) / (1000 * 3600 * 24);
      return sum + days;
    }, 0) / (repoIssues.filter((i) => i.closed_at).length || 1);

  const labelMap = new Map<string, number>();
  repoIssues.forEach((issue) => {
    issue.labels.forEach((label) => {
      labelMap.set(label.name, (labelMap.get(label.name) || 0) + 1);
    });
  });
  const issuesByLabel = Array.from(labelMap.entries()).map(([label, count]) => ({ label, count }));
  if (issuesByLabel.length === 0) {
    issuesByLabel.push({ label: "bug", count: 1 }, { label: "enhancement", count: 2 });
  }

  const burndown = Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const ideal = Math.max(0, openCount - (openCount / 14) * day);
    let actual = openCount - Math.floor((openCount * day) / 14);
    if (day > 7) actual = Math.max(0, actual - Math.floor(day / 3));
    return { day, ideal, actual: Math.max(0, actual) };
  });

  const weeklyTrend = [
    { week: "W1", opened: 3, closed: 2 },
    { week: "W2", opened: 5, closed: 4 },
    { week: "W3", opened: 2, closed: 3 },
    { week: "W4", opened: 4, closed: 5 },
  ];

  return {
    repo: `${owner}/${repo}`,
    open_count: openCount,
    closed_count: closedCount,
    close_rate: closeRate,
    avg_resolution_days: avgResolutionDays,
    issues_by_label: issuesByLabel,
    burndown,
    weekly_trend: weeklyTrend,
  };
}

export const mockGetRepos = () => Promise.resolve(mockRepos);
export const mockGetIssues = (owner: string, repo: string) =>
  Promise.resolve(getMockIssues(owner, repo));
export const mockGetAnalytics = (owner: string, repo: string) =>
  Promise.resolve(getMockAnalytics(owner, repo));