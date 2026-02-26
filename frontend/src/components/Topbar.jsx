export default function Topbar() {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="topbar-breadcrumb">
                    <span className="topbar-location-icon">📍</span>
                    <span className="topbar-location">Global Headquarters</span>
                    <span className="topbar-chevron">▾</span>
                </div>
                <div className="topbar-separator">|</div>
                <div className="topbar-date-range">
                    <span className="topbar-calendar-icon">📅</span>
                    <span>Last 30 Days</span>
                    <span className="topbar-chevron">▾</span>
                </div>
            </div>

            <div className="topbar-right">
                <div className="topbar-user">
                    <div className="topbar-avatar">
                        <span>AR</span>
                    </div>
                    <div className="topbar-user-info">
                        <span className="topbar-user-name">Alex Rivera</span>
                        <span className="topbar-user-role">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
