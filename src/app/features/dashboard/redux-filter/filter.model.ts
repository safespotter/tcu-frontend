
export interface IntervalDate {
  first: Date;
  last: Date;
}
export interface FilterState {
  currentDashboard: DashboardData;
  filteredDashboard: DashboardData;
  storedDashboards: DashboardData[];
}

export interface DashboardData {
 // data: DashboardCharts[];
  interval: IntervalDate;
  type: number;
}
export const FILTER_INITIAL_STATE: FilterState = {
  currentDashboard: null,
  filteredDashboard: null,
  storedDashboards: [],
};
