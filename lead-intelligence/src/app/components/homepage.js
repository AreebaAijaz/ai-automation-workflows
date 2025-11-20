"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, TrendingUp, Users, Flame, AlertCircle, CheckCircle, Mail, Building, MessageSquare, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import LeadAnalytics from '../analytics/page';

// const API_URL = 'https://areeba-runner.app.n8n.cloud/webhook/get-leads';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LeadDashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0, today: 0 });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [expandedLead, setExpandedLead] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [leadStatuses, setLeadStatuses] = useState({});
  const [showAnalytics, setShowAnalytics] = useState(false);

  const loadStatusesFromStorage = () => {
    try {
      const saved = localStorage.getItem('lead-statuses');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.log('No saved statuses found');
      return {};
    }
  };

  const saveStatusesToStorage = (statuses) => {
    try {
      localStorage.setItem('lead-statuses', JSON.stringify(statuses));
    } catch (error) {
      console.error('Error saving statuses:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'GET'
      });
      const data = await response.json();

      setLeads(data.leads || []);
      setStats(data.stats || { total: 0, hot: 0, warm: 0, cold: 0, today: 0 });
      setLastUpdated(new Date());

      const savedStatuses = loadStatusesFromStorage();
      const statuses = {};
      (data.leads || []).forEach(lead => {
        statuses[lead.id] = savedStatuses[lead.id] || lead.status || 'pending';
      });
      setLeadStatuses(statuses);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    const updatedStatuses = {
      ...leadStatuses,
      [leadId]: newStatus
    };
    setLeadStatuses(updatedStatuses);
    saveStatusesToStorage(updatedStatuses);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: leadId,
          status: newStatus
        })
      });

      if (response.ok) {
        console.log('✅ Status updated in Google Sheets');
      }
    } catch (error) {
      console.error('❌ Error updating status:', error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = filterTier === 'all' || lead.tier === filterTier;

    return matchesSearch && matchesTier;
  });

  const enhancedStats = {
    ...stats,
    closed: Object.values(leadStatuses).filter(s => s === 'deal_closed').length,
    canceled: Object.values(leadStatuses).filter(s => s === 'deal_canceled').length,
    contacting: Object.values(leadStatuses).filter(s => s === 'contacting').length,
    pending: Object.values(leadStatuses).filter(s => s === 'pending').length
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'hot': return 'from-red-500 to-orange-500';
      case 'warm': return 'from-yellow-500 to-orange-400';
      case 'cold': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'hot': return '🔥';
      case 'warm': return '🟡';
      case 'cold': return '🔵';
      default: return '⚪';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎯 Lead Intelligence Dashboard
              </h1>
              <p className="text-gray-400 mt-1">AI-Powered Lead Analysis & Routing</p>
            </div>
            <div className='flex gap-x-4'>
              <button
                onClick={() => setShowAnalytics(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 shadow-lg shadow-green-500/30"
              >
                <BarChart3 className="w-4 h-4" />
                See Analytics
              </button>
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/30"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">✅ Closed</p>
                <p className="text-3xl font-bold text-white">{enhancedStats.closed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">🔥 Hot</p>
                <p className="text-3xl font-bold text-white">{stats.hot}</p>
              </div>
              <Flame className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">🟡 Warm</p>
                <p className="text-3xl font-bold text-white">{stats.warm}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">🔵 Cold</p>
                <p className="text-3xl font-bold text-white">{stats.cold}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Tiers</option>
              <option value="hot">🔥 Hot Only</option>
              <option value="warm">🟡 Warm Only</option>
              <option value="cold">🔵 Cold Only</option>
            </select>
          </div>
          {lastUpdated && (
            <p className="text-gray-400 text-sm mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          {filterTier !== 'all' && (
            <p className="text-purple-400 text-sm mt-2 font-medium">
              Showing {filteredLeads.length} of {leads.length} results
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No leads found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add some test leads</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className={`bg-gradient-to-r ${getTierColor(lead.tier)} p-[1px] rounded-xl transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="bg-slate-900/95 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{getTierIcon(lead.tier)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{lead.name}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Building className="w-4 h-4" />
                            <span>{lead.company || 'No company'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(lead.tier)} text-white font-bold text-sm mb-2`}>
                        Score: {lead.score}/10
                      </div>
                      <p className="text-gray-400 text-sm">{getTimeAgo(lead.timestamp)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <select
                        value={leadStatuses[lead.id] || 'pending'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-sm bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacting">Contacting</option>
                        <option value="deal_closed">Deal Closed</option>
                        <option value="deal_canceled">Deal Canceled</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm line-clamp-2">{lead.message}</p>
                    </div>
                  </div>

                  {lead.insights && lead.insights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-purple-400 text-sm font-semibold mb-2">💡 AI Insights:</h4>
                      <ul className="space-y-1">
                        {lead.insights.slice(0, expandedLead === lead.id ? undefined : 2).map((insight, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-all duration-200 text-sm"
                    >
                      {expandedLead === lead.id ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Full Details
                        </>
                      )}
                    </button>
                    {(leadStatuses[lead.id] === 'deal_closed' || leadStatuses[lead.id] === 'deal_canceled') && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all duration-200 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Mark Contacted
                      </button>
                    )}
                  </div>

                  {expandedLead === lead.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Full Message:</h4>
                        <p className="text-gray-300 text-sm flex gap-x-2 bg-black/30 rounded-lg p-3">
                          <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />

                          {lead.message}
                        </p>
                      </div>


                      {lead.suggested_action && (
                        <div>
                          <h4 className="text-green-400 font-semibold mb-2">📞 Suggested Action:</h4>
                          <p className="text-gray-300 text-sm bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                            {lead.suggested_action}
                          </p>
                        </div>
                      )}

                      {lead.red_flags && lead.red_flags.length > 0 && (
                        <div>
                          <h4 className="text-red-400 font-semibold mb-2">🚩 Red Flags:</h4>
                          <ul className="space-y-1">
                            {lead.red_flags.map((flag, idx) => (
                              <li key={idx} className="text-gray-300 text-sm flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-lg p-2">
                                <span className="text-red-400">⚠️</span>
                                <span>{flag}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-black/30 rounded-lg p-3">
                          <p className="text-gray-400">Source</p>
                          <p className="text-white font-medium capitalize">{lead.source}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showAnalytics && (
        <LeadAnalytics
          leads={leads}
          leadStatuses={leadStatuses}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}