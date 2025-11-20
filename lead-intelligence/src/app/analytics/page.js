"use client";

import React from 'react';
import Link from 'next/link';
import { X, TrendingUp, TrendingDown, Users, CheckCircle, XCircle, Clock, Phone, BarChart3, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LeadAnalytics({ leads = [], leadStatuses = {}, onClose }) {
  // Safety checks
  if (!leads || !Array.isArray(leads) || leads.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl p-8 max-w-md border border-purple-500/30">
          <h3 className="text-xl font-bold text-white mb-4">No Data Available</h3>
          <p className="text-gray-400 mb-6">There are no leads to display analytics for yet.</p>
          <Link href = "/">
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
          >
            Close
          </button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate status metrics
  const statusMetrics = {
    pending: Object.values(leadStatuses || {}).filter(s => s === 'pending').length,
    contacting: Object.values(leadStatuses || {}).filter(s => s === 'contacting').length,
    closed: Object.values(leadStatuses || {}).filter(s => s === 'deal_closed').length,
    canceled: Object.values(leadStatuses || {}).filter(s => s === 'deal_canceled').length
  };

  // Calculate tier metrics
  const tierMetrics = {
    hot: leads.filter(l => l?.tier === 'hot').length,
    warm: leads.filter(l => l?.tier === 'warm').length,
    cold: leads.filter(l => l?.tier === 'cold').length
  };

  // Calculate source metrics
  const sourceData = {};
  leads.forEach(lead => {
    if (lead) {
      const source = lead.source || 'unknown';
      sourceData[source] = (sourceData[source] || 0) + 1;
    }
  });

  // Conversion rate
  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? ((statusMetrics.closed / totalLeads) * 100).toFixed(1) : 0;
  const cancelRate = totalLeads > 0 ? ((statusMetrics.canceled / totalLeads) * 100).toFixed(1) : 0;

  // Data for Status Pie Chart
  const statusChartData = [
    { name: 'Pending', value: statusMetrics.pending, color: '#8B5CF6' },
    { name: 'Contacting', value: statusMetrics.contacting, color: '#F59E0B' },
    { name: 'Closed', value: statusMetrics.closed, color: '#10B981' },
    { name: 'Canceled', value: statusMetrics.canceled, color: '#EF4444' }
  ].filter(item => item.value > 0);

  // Data for Tier Distribution Bar Chart
  const tierChartData = [
    { name: 'Hot 🔥', value: tierMetrics.hot, fill: '#EF4444' },
    { name: 'Warm 🟡', value: tierMetrics.warm, fill: '#F59E0B' },
    { name: 'Cold 🔵', value: tierMetrics.cold, fill: '#3B82F6' }
  ];

  // Data for Source Distribution
  const sourceChartData = Object.entries(sourceData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: name === 'google_form' ? '#4285F4' : name === 'webhook' ? '#8B5CF6' : '#64748B'
  }));

  // Score distribution data
  const scoreDistribution = Array.from({ length: 10 }, (_, i) => ({
    score: `${i + 1}`,
    count: leads.filter(l => Math.floor(l.score) === i + 1).length
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-purple-400">{payload[0].value} leads</p>
          <p className="text-gray-400 text-sm">
            {((payload[0].value / totalLeads) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-purple-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
              <Activity className="w-8 h-8 text-purple-400" />
              Lead Analytics Dashboard
            </h2>
            <p className="text-gray-400 mt-1">Comprehensive insights into your lead pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-400" />
              <p className="text-gray-400 text-sm">Total Leads</p>
            </div>
            <p className="text-4xl font-bold text-white">{totalLeads}</p>
            <p className="text-purple-400 text-sm mt-1">All time</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <p className="text-gray-400 text-sm">Deals Closed</p>
            </div>
            <p className="text-4xl font-bold text-white">{statusMetrics.closed}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">{conversionRate}% conversion</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-6 h-6 text-orange-400" />
              <p className="text-gray-400 text-sm">Contacting</p>
            </div>
            <p className="text-4xl font-bold text-white">{statusMetrics.contacting}</p>
            <p className="text-orange-400 text-sm mt-1">In progress</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-gray-400 text-sm">Canceled</p>
            </div>
            <p className="text-4xl font-bold text-white">{statusMetrics.canceled}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-sm">{cancelRate}% cancel rate</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution Pie Chart */}
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Status Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {statusChartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300 text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Distribution Bar Chart */}
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Lead Tier Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tierChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-400">{tierMetrics.hot}</p>
                <p className="text-gray-400 text-sm">Hot Leads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{tierMetrics.warm}</p>
                <p className="text-gray-400 text-sm">Warm Leads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">{tierMetrics.cold}</p>
                <p className="text-gray-400 text-sm">Cold Leads</p>
              </div>
            </div>
          </div>

          {/* Score Distribution Line Chart */}
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Score Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="score" stroke="#9CA3AF" label={{ value: 'Score', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }} />
                <YAxis stroke="#9CA3AF" label={{ value: 'Leads', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">Average Score: <span className="text-purple-400 font-semibold">{(leads.reduce((acc, l) => acc + l.score, 0) / totalLeads).toFixed(1)}/10</span></p>
            </div>
          </div>

          {/* Source Distribution */}
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Lead Sources</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sourceChartData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{source.name}</span>
                  <span className="text-purple-400 font-semibold">{source.value} leads ({((source.value / totalLeads) * 100).toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="p-6 border-t border-purple-500/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-1">Best Performing Source</p>
              <p className="text-white text-lg">{sourceChartData[0]?.name || 'N/A'}</p>
              <p className="text-gray-400 text-sm">{sourceChartData[0]?.value || 0} leads generated</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-1">Conversion Success</p>
              <p className="text-white text-lg">{conversionRate}%</p>
              <p className="text-gray-400 text-sm">{statusMetrics.closed} out of {totalLeads} leads</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-1">Active Pipeline</p>
              <p className="text-white text-lg">{statusMetrics.contacting + statusMetrics.pending}</p>
              <p className="text-gray-400 text-sm">Leads in progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}