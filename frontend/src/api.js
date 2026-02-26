const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchOperationsDashboard() {
    const res = await fetch(`${API_BASE}/operations/`);
    if (!res.ok) throw new Error('Failed to fetch operations data');
    return res.json();
}

export async function fetchSustainabilityDashboard() {
    const res = await fetch(`${API_BASE}/sustainability/`);
    if (!res.ok) throw new Error('Failed to fetch sustainability data');
    return res.json();
}
