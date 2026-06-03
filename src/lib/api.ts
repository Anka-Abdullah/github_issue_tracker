import type { Issue, Repository, AnalyticsData, CustomLabel, IssueFilters } from "./types";
import { mockGetIssues, mockGetAnalytics, mockRepos } from "./mockData";


export const authGitHub = () => {
  globalThis.location.href = "/dashboard";
};

export const logout = () => {
  return Promise.resolve();
};

export const getRepos = (): Promise<Repository[]> => {
  return Promise.resolve(mockRepos);
};

export const watchRepo = (owner: string, repo: string) => {
  return Promise.resolve({ data: { success: true } });
};

export const unwatchRepo = (id: number) => {
  return Promise.resolve({ data: { success: true } });
};

export const getIssues = (
  owner: string,
  repo: string,
  _filters?: IssueFilters
): Promise<Issue[]> => {
  return mockGetIssues(owner, repo);
};

export const getIssue = (
  owner: string,
  repo: string,
  number: number
): Promise<Issue> => {
  return mockGetIssues(owner, repo).then((issues) => {
    const issue = issues.find((i) => i.number === number);
    return issue || issues[0];
  });
};

export const addCustomLabel = (
  issueId: number,
  label: { name: string; color: string }
): Promise<CustomLabel> => {
  return Promise.resolve({ id: Date.now(), ...label });
};

export const saveNote = (_issueId: number, _note: string): Promise<void> => {
  return Promise.resolve();
};

export const getAnalytics = (
  owner: string,
  repo: string
): Promise<AnalyticsData> => {
  return mockGetAnalytics(owner, repo);
};

export const exportPDF = (owner: string, repo: string) => {
  mockGetAnalytics(owner, repo).then((data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    globalThis.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
};

export default { getRepos, getIssues, getAnalytics, authGitHub, logout };