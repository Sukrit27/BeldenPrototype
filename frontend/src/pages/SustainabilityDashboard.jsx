import { useState, useEffect } from 'react'
import { fetchSustainabilityDashboard } from '../api'

export default function SustainabilityDashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSustainabilityDashboard()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>
    if (!data) return <div className="error-state">Failed to load sustainability data</div>

    const { metrics, lifecycle_insight } = data

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Sustainability &amp; Compliance Dashboard</h1>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">🌿</span>
                        <span className="kpi-label">Carbon Emissions Avoided</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value kpi-value-large">{metrics.carbon_emissions_avoided} kg</span>
                    </div>
                    <p className="kpi-subtitle">CO₂ Equivalent</p>
                    <p className="kpi-change neutral">↑ From {metrics.preventive_replacements_count} preventive replacements</p>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">🔄</span>
                        <span className="kpi-label">Asset Life Extended</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value kpi-value-large">+{metrics.asset_life_extended}%</span>
                    </div>
                    <p className="kpi-subtitle">Average Increase</p>
                    <p className="kpi-change neutral">Compared to reactive replacement</p>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">⚡</span>
                        <span className="kpi-label">Energy Efficiency Gain</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value kpi-value-large">+{metrics.energy_efficiency_gain}%</span>
                    </div>
                    <p className="kpi-subtitle">Overall Improvement</p>
                    <p className="kpi-change neutral">Derived from optimized usage</p>
                </div>

                <div className="kpi-card">
                    <div className="kpi-header">
                        <span className="kpi-icon">✅</span>
                        <span className="kpi-label">Compliance Status</span>
                    </div>
                    <div className="kpi-value-row">
                        <span className="kpi-value kpi-value-large">{metrics.compliance_status}%</span>
                    </div>
                    <p className="kpi-subtitle">Audit-Ready</p>
                    <p className="kpi-change positive">✔ All standards met</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-grid">
                {/* Lifecycle Impact Timeline */}
                <div className="card card-wide">
                    <div className="card-header">
                        <div>
                            <h2 className="card-title">Lifecycle Impact Timeline (YTD 2025)</h2>
                            <p className="card-subtitle">Asset health vs. Replacement avoided vs. Carbon impact</p>
                        </div>
                    </div>
                    <div className="timeline-chart-placeholder">
                        <div className="placeholder-icon large">📊</div>
                        <p className="placeholder-label">Timeline Chart: Asset Health × Replacement Avoided × Carbon Impact</p>
                    </div>
                    <div className="timeline-insight">
                        <span className="insight-bullet">💡</span>
                        <p>"{lifecycle_insight}"</p>
                    </div>
                </div>

                {/* Export Reports */}
                <div className="card card-side">
                    <h2 className="card-title">Export Reports</h2>

                    <div className="export-actions">
                        <button className="btn-export btn-export-primary" id="generate-esg-report">
                            <span className="btn-icon">📄</span>
                            Generate ESG Report
                        </button>
                        <button className="btn-export btn-export-secondary" id="export-compliance-summary">
                            <span className="btn-icon">📋</span>
                            Export Compliance Summary
                        </button>
                    </div>

                    <div className="last-report-info">
                        <p className="report-label">Last Report Generated:</p>
                        <p className="report-date">
                            {metrics.last_report_generated
                                ? new Date(metrics.last_report_generated).toLocaleString()
                                : 'No reports generated'}
                        </p>
                        <a href="#" className="link-text">View Archive</a>
                    </div>
                </div>
            </div>

            {/* Compliance Audit Trail */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Compliance &amp; Audit Trail</h2>
                    <div className="card-actions">
                        <button className="btn-text">Filter</button>
                        <button className="btn-text">Export</button>
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>STANDARD</th>
                            <th>STATUS</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-11-28</td>
                            <td>ISO 14001</td>
                            <td><span className="badge badge-healthy">Passed</span></td>
                            <td>Annual environmental audit completed</td>
                        </tr>
                        <tr>
                            <td>2025-10-15</td>
                            <td>ISO 50001</td>
                            <td><span className="badge badge-healthy">Passed</span></td>
                            <td>Energy management review</td>
                        </tr>
                        <tr>
                            <td>2025-09-02</td>
                            <td>RoHS Compliance</td>
                            <td><span className="badge badge-healthy">Passed</span></td>
                            <td>Material composition verification</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
