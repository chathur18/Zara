import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl border-white/20 shadow-2xl">
        <p className="text-xs font-mono text-white/40 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const FinancialLineChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
      <XAxis 
        dataKey="month" 
        stroke="#ffffff40" 
        fontSize={10} 
        tickLine={false} 
        axisLine={false}
      />
      <YAxis 
        stroke="#ffffff40" 
        fontSize={10} 
        tickLine={false} 
        axisLine={false} 
        tickFormatter={(val) => `₹${val/1000}k`}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="income" 
        stroke="#3B82F6" 
        strokeWidth={3}
        fillOpacity={1} 
        fill="url(#incomeGradient)" 
        name="Income"
      />
      <Area 
        type="monotone" 
        dataKey="expenses" 
        stroke="#8B5CF6" 
        strokeWidth={3}
        fillOpacity={1} 
        fill="url(#expenseGradient)" 
        name="Expenses"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const ExpenseDonut = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
);

export const HealthRadar = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={250}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid stroke="#ffffff10" />
      <PolarAngleAxis dataKey="subject" stroke="#ffffff40" fontSize={10} />
      <PolarRadiusAxis angle={30} domain={[0, 150]} axisLine={false} tick={false} />
      <Radar
        name="Score"
        dataKey="A"
        stroke="#3B82F6"
        fill="#3B82F6"
        fillOpacity={0.4}
      />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);

export const GrowthAreaChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={200}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="stepAfter" 
        dataKey="value" 
        stroke="#10B981" 
        strokeWidth={2}
        fillOpacity={1} 
        fill="url(#growthGradient)" 
      />
    </AreaChart>
  </ResponsiveContainer>
);
