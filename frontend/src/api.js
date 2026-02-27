const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Embedded mock data — used when API is unavailable
const MOCK_OPERATIONS = {
    health: {
        overall_health: 96.0,
        active_critical_faults: 5,
        assets_at_risk: 18,
        downtime_risk_avoided: 1200000.0,
        health_change: 2,
    },
    faults: [
        { id: 1, asset_id: 'CBL-0451', location: 'Rack 2, Port 7', issue_type: 'Impedance Drift', risk_level: 'critical', action: 'Replace Cable' },
        { id: 2, asset_id: 'SW-008B', location: 'Floor 3, IDF', issue_type: 'High Temperature', risk_level: 'warning', action: 'Inspect HVAC' },
        { id: 3, asset_id: 'PTC-9210', location: 'Data Center Aisle 5', issue_type: 'Signal Loss', risk_level: 'warning', action: 'Monitor' },
        { id: 4, asset_id: 'CBL-0452', location: 'Rack 2, Port 8', issue_type: 'Minor Degradation', risk_level: 'low', action: 'Watchlist' },
    ],
    recent_actions: [
        { id: 1, message: 'Port auto-disabled on SW-007A to prevent cascading failure.', timestamp: '2025-12-15T17:20:11Z' },
        { id: 2, message: 'Maintenance ticket #8812 created for CBL-0451.', timestamp: '2025-12-15T12:05:33Z' },
    ],
    contextual_insight: {
        root_cause_summary: 'Impedance drift detected. Failure probability increasing.',
        health_trend_label: 'Health Trend (Last 7 Days)',
    },
};

const MOCK_SUSTAINABILITY = {
    metrics: {
        carbon_emissions_avoided: 620.0,
        asset_life_extended: 32.0,
        energy_efficiency_gain: 14.0,
        compliance_status: 100.0,
        preventive_replacements_count: 4,
        cables_avoided_replacement: 64,
        carbon_saved_kg: 620.0,
        last_report_generated: '2025-12-01T14:32:00Z',
    },
    lifecycle_insight: 'Preventive maintenance on 64 cables avoided early replacement, saving 620.0 kg of embodied carbon.',
};

export async function fetchOperationsDashboard() {
    try {
        const res = await fetch(`${API_BASE}/operations/`);
        if (!res.ok) throw new Error('API error');
        return res.json();
    } catch {
        // Fallback to embedded data when API is unavailable
        return MOCK_OPERATIONS;
    }
}

export async function fetchSustainabilityDashboard() {
    try {
        const res = await fetch(`${API_BASE}/sustainability/`);
        if (!res.ok) throw new Error('API error');
        return res.json();
    } catch {
        // Fallback to embedded data when API is unavailable
        return MOCK_SUSTAINABILITY;
    }
}
