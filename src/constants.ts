export const MOCK_DATA = {
  cashFlow: [
    { month: 'Jan', income: 4500, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3500 },
    { month: 'Mar', income: 4800, expenses: 4100 },
    { month: 'Apr', income: 6100, expenses: 3800 },
    { month: 'May', income: 5500, expenses: 3200 },
    { month: 'Jun', income: 7200, expenses: 4500 },
  ],
  expensesByCategory: [
    { name: 'Housing', value: 1500, color: '#3B82F6' },
    { name: 'Food', value: 800, color: '#10B981' },
    { name: 'Transport', value: 400, color: '#F59E0B' },
    { name: 'Investments', value: 1200, color: '#8B5CF6' },
    { name: 'Security', value: 300, color: '#EC4899' },
    { name: 'Misc', value: 300, color: '#6B7280' },
  ],
  netWorth: [
    { time: '2023 Q1', value: 45000 },
    { time: '2023 Q2', value: 52000 },
    { time: '2023 Q3', value: 58000 },
    { time: '2023 Q4', value: 65000 },
    { time: '2024 Q1', value: 78000 },
    { time: '2024 Q2', value: 92000 },
  ],
  healthScore: [
    { subject: 'Savings', A: 120, fullMark: 150 },
    { subject: 'Spending', A: 98, fullMark: 150 },
    { subject: 'Debt', A: 86, fullMark: 150 },
    { subject: 'Risk', A: 140, fullMark: 150 },
    { subject: 'Investments', A: 110, fullMark: 150 },
  ],
  riskScore: {
    current: 88,
    label: 'Secure',
    color: 'emerald',
  },
  auditLogs: [
    { id: 1, event: 'MFA Verified', device: 'iPhone 15 Pro', time: '2 mins ago', status: 'trusted' },
    { id: 2, event: 'New Login', device: 'MacOS - San Francisco', time: '1 hour ago', status: 'trusted' },
    { id: 3, event: 'Policy Update', device: 'System Engine', time: '3 hours ago', status: 'neutral' },
    { id: 4, event: 'Suspicious Attempt', device: 'Unknown Proxy', time: '5 hours ago', status: 'blocked' },
  ],
  networkNodes: [
    { id: 'User', label: 'Authorized Identity', type: 'user', status: 'online' },
    { id: 'Vault', label: 'Encrypted Vault', type: 'resource', status: 'secure' },
    { id: 'Bank', label: 'Primary Bank API', type: 'external', status: 'connected' },
    { id: 'Risk', label: 'Risk Engine', type: 'process', status: 'active' },
  ]
};
