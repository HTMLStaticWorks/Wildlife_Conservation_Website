import os
import glob
import re

files = glob.glob('pages/dash*.html') + ['pages/dashboard.html']
files = list(set(files))

# Dark mode CSS block to inject before </style>
DARK_CSS = """
        /* DASHBOARD DARK MODE */
        [data-theme="dark"] body {
            --dash-bg: #121212;
            --dash-card: #0c1d17;
            --dash-primary: #e8f5e9; /* Same light green as footer */
            color: #ffffff;
        }

        [data-theme="dark"] .sidebar {
            background-color: var(--dash-primary);
            color: #1b4332;
        }

        [data-theme="dark"] .side-nav-item {
            color: #1b4332;
        }

        [data-theme="dark"] .side-nav-item:hover, 
        [data-theme="dark"] .side-nav-item.active {
            background-color: rgba(27, 67, 50, 0.1);
            color: #1b4332;
            font-weight: 700;
        }

        [data-theme="dark"] .sidebar-brand-box {
            background-color: var(--dash-primary);
            border-bottom: 1px solid rgba(27, 67, 50, 0.1);
        }

        [data-theme="dark"] .top-bar {
            background-color: var(--dash-card);
            color: #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        [data-theme="dark"] .top-bar h2 {
            color: #ffffff;
        }

        [data-theme="dark"] .dash-card {
            background: var(--dash-card);
            border: 1px solid rgba(255,255,255,0.05);
            color: #ffffff;
        }

        [data-theme="dark"] .dash-card h3 {
            color: var(--secondary-color); /* Light green for headers */
        }

        [data-theme="dark"] .stat-item {
            background-color: #1a3227; /* Darker green box */
            color: #ffffff;
        }

        [data-theme="dark"] .stat-item p {
            color: #cccccc;
        }

        [data-theme="dark"] .donation-status,
        [data-theme="dark"] .dash-card > div[style*="background: #fffbe6"],
        [data-theme="dark"] .dash-card > div[style*="background: #f8faf9"] {
            background-color: #1a3227 !important;
            border-color: rgba(255,255,255,0.1) !important;
        }

        [data-theme="dark"] .patrol-item {
            border-bottom-color: rgba(255,255,255,0.1);
        }
        
        [data-theme="dark"] .patrol-text h4, 
        [data-theme="dark"] .patrol-text p,
        [data-theme="dark"] .dash-card strong,
        [data-theme="dark"] label,
        [data-theme="dark"] table th {
            color: #ffffff !important;
        }
        
        [data-theme="dark"] input {
            background-color: #1a3227;
            color: #ffffff;
            border-color: rgba(255,255,255,0.1) !important;
        }
        
        [data-theme="dark"] .hamburger-dash {
            color: #ffffff;
        }
"""

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Inject CSS
    if '/* DASHBOARD DARK MODE */' not in content:
        content = content.replace('</style>', DARK_CSS + '\n    </style>')
        
    # Inject theme toggle into top bar
    if 'id="themeToggle"' not in content:
        toggle_html = '''
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" style="margin-right: 15px; border:none; background:transparent; font-size:1.2rem; cursor:pointer; color:inherit;">
                    <i class="fas fa-moon"></i>
                </button>
                <div class="notifications"'''
        content = content.replace('<div class="notifications"', toggle_html)
        
    # Inject main.js script
    if '../assets/js/main.js' not in content:
        script_html = '''<script src="../assets/js/main.js"></script>\n</body>'''
        content = content.replace('</body>', script_html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(files)} files with dark mode support!")
