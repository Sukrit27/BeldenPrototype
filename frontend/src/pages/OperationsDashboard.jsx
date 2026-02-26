import { useState, useEffect } from 'react'
import { fetchOperationsDashboard } from '../api'

export default function OperationsDashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOperationsDashboard()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>
    if (!data) return <div className="error-state">Failed to load dashboard data</div>

    const { health, faults, recent_actions, contextual_insight } = data

    const riskBadge = (level) => {
        const labels = { critical: 'Critical', warning: 'Warning', low: 'Low' }
        return <span className={`badge badge-${level}`}>{labels[level]}</span>
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Operations Dashboard</h1>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">🛡️</span>
                        <span className="kpi-label">Overall Infrastructure Health</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value kpi-value-large">{health.overall_health}%</span>
                        <span className="badge badge-healthy">Healthy</span>
                    </div>
                    <div className="kpi-progress">
                        <div className="kpi-progress-bar" style={{ width: `${health.overall_health}%` }}></div>
                    </div>
                    <p className="kpi-change positive">↑+{health.health_change} from yesterday</p>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">⚠️</span>
                        <span className="kpi-label">Active Critical Faults</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value">{health.active_critical_faults}</span>
                        <span className="badge badge-critical">Critical</span>
                    </div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">📡</span>
                        <span className="kpi-label">Assets at Risk (Next 30 Days)</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value">{health.assets_at_risk}</span>
                        <span className="badge badge-warning">Warning</span>
                    </div>
                    <p className="kpi-subtitle">Cables &amp; Ports</p>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">💰</span>
                        <span className="kpi-label">Downtime Risk Avoided (YTD)</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value">${(health.downtime_risk_avoided / 1000000).toFixed(1)}M</span>
                    </div>
                    <p className="kpi-subtitle">Based on predictive analytics</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">
                {/* Fault Table */}
                <div className="card card-wide">
                    <div className="card-header">
                        <h2 className="card-title">Fault &amp; Degradation List</h2>
                        <div className="card-actions">
                            <button className="btn-text">Filter</button>
                            <button className="btn-text">Sort</button>
                        </div>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ASSET ID</th>
                                <th>LOCATION</th>
                                <th>ISSUE TYPE</th>
                                <th>RISK LEVEL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faults.map((fault) => (
                                <tr key={fault.id}>
                                    <td className="td-id">{fault.asset_id}</td>
                                    <td>{fault.location}</td>
                                    <td>{fault.issue_type}</td>
                                    <td>{riskBadge(fault.risk_level)}</td>
                                    <td>{fault.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Contextual Insight */}
                <div className="card card-side">
                    <h2 className="card-title">Contextual Insight: SW-008B</h2>

                    <div className="insight-chart-placeholder">
                        <div className="placeholder-icon">📈</div>
                        <p>Mini Insight & Metrics</p>
                    </div>

                    <div className="insight-section">
                        <h3 className="insight-subtitle">{contextual_insight.health_trend_label}</h3>
                        <div className="insight-chart-placeholder small">
                            <div className="placeholder-icon">📊</div>
                            <p>Chart showing health trend</p>
                        </div>
                    </div>

                    <div className="insight-section">
                        <h3 className="insight-subtitle">Root Cause Summary</h3>
                        <p className="insight-text">"{contextual_insight.root_cause_summary}"</p>
                    </div>

                    <div className="insight-section">
                        <h3 className="insight-subtitle">Primary Actions</h3>
                        <button className="btn-primary">Review Recommended Actions</button>
                    </div>
                </div>
            </div>

            {/* Recent Actions */}
            <div className="card">
                <h2 className="card-title">Recent Actions &amp; Automation</h2>
                <div className="actions-list">
                    {recent_actions.map((action) => (
                        <div key={action.id} className="action-item">
                            <div className="action-dot"></div>
                            <div className="action-content">
                                <p className="action-message">{action.message}</p>
                                <span className="action-time">{new Date(action.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
