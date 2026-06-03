export interface User {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  open_issues_count: number;
  color?: string;
}

export type IssueStatus = "open" | "closed" | "in_progress";

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  status: IssueStatus;
  labels: Label[];
  custom_labels: CustomLabel[];
  note?: string;
  assignee?: string;
  created_at: string;
  closed_at?: string;
  repo: string;
}

export interface CustomLabel {
  id: number;
  name: string;
  color: string;
}

export interface AnalyticsData {
  repo: string;
  open_count: number;
  closed_count: number;
  close_rate: number;
  avg_resolution_days: number;
  issues_by_label: { label: string; count: number }[];
  burndown: { day: number; ideal: number; actual: number }[];
  weekly_trend: { week: string; opened: number; closed: number }[];
}

export interface IssueFilters {
  status?: IssueStatus | "all";
  label?: string;
  search?: string;
}
