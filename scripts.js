/* --- GLOBAL STYLES --- */
body {
    background-color: #FAF7E6;
    color: #5B0E14;
    overflow-x: hidden;
    cursor: auto;
}

::selection {
    background: #5B0E14;
    color: #FAF7E6;
}

/* --- LOADER --- */
#loader {
    position: fixed;
    inset: 0;
    background: #FAF7E6;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* --- SCROLL PROGRESS --- */
#progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #8A252E, #5B0E14);
    width: 0%;
    z-index: 10000;
    border-radius: 0 2px 2px 0;
}

/* --- UI ELEMENTS --- */
.glass-panel {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 8px 32px rgba(91, 14, 20, 0.05);
}

.glass-panel:hover {
    border-color: rgba(91, 14, 20, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(91, 14, 20, 0.1);
}

/* --- NAV LINKS --- */
.nav-link {
    position: relative;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: rgba(91, 14, 20, 0.7);
    transition: color 0.3s;
}

.nav-link:hover {
    color: #5B0E14;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #5B0E14;
    transition: width 0.3s;
}

.nav-link:hover::after {
    width: 100%;
}

/* --- IMAGE CONTAINER --- */
.image-container {
    position: relative;
    overflow: hidden;
    background: #FDF7D5;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- SKILL TAGS --- */
.skill-tag {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    margin: 4px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(91, 14, 20, 0.15);
    border-radius: 6px;
    font-family: 'Manrope', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #5B0E14;
    transition: all 0.2s ease;
}

.skill-tag:hover {
    background: #5B0E14;
    color: #F1E194;
    border-color: #5B0E14;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(91, 14, 20, 0.2);
}

/* --- MOBILE MENU STYLES --- */
.stroke-text {
    -webkit-text-stroke: 1px rgba(91, 14, 20, 0.4);
    color: transparent;
    transition: all 0.3s ease;
}

.stroke-text:hover,
.stroke-text:active {
    -webkit-text-stroke: 0px;
    color: #5B0E14;
    transform: translateX(10px);
}

#webgl {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    pointer-events: none;
}

.tabular-nums {
    font-variant-numeric: tabular-nums;
}

.hero-text-visible {
    opacity: 1 !important;
    transform: none !important;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #FAF7E6;
}

::-webkit-scrollbar-thumb {
    background: rgba(91, 14, 20, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #5B0E14;
}
