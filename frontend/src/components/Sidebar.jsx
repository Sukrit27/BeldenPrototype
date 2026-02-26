import { NavLink } from 'react-router-dom'

const navItems = [
    { path: '/operations', label: 'Operations', icon: '⚡' },
    { path: '/sustainability', label: 'Sustainability', icon: '🌱' },
    { path: '#', label: 'Asset Management', icon: '📦' },
    { path: '#', label: 'Alerts', icon: '🔔' },
    { path: '#', label: 'Reports', icon: '📊' },
]

const bottomItems = [
    { path: '#', label: 'Settings', icon: '⚙️' },
    { path: '#', label: 'Support', icon: '💬' },
]

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke="#1a1a1a" strokeWidth="2" />
                    <path d="M8 14 Q14 6 20 14 Q14 22 8 14Z" fill="#1a1a1a" />
                </svg>
                <span className="sidebar-logo-text">Belden</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-bottom">
                {bottomItems.map((item) => (
                    <a key={item.label} href={item.path} className="sidebar-link">
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </a>
                ))}
            </div>
        </aside>
    )
}
