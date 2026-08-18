// scripts.js
// ==========================================
// RENDERING & INTERACTIVE LOGIC
// ==========================================

function renderContent() {
    // 1. Render Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = portfolioData.skills.map(skill => `
    <div class="glass-panel p-8 rounded-2xl skill-card relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-textAccent rounded-full blur-[60px] -mr-10 -mt-10 opacity-10 pointer-events-none"></div>
        <div class="flex items-center gap-4 mb-8 text-textMain relative z-10">
            <div class="p-3 bg-bgCard/50 rounded-xl shadow-lg border border-borderGray/30">
                <i data-lucide="${skill.icon}" class="w-6 h-6 text-textAccent"></i>
            </div>
            <h3 class="font-display font-bold text-2xl">${skill.title}</h3>
        </div>
        <div class="flex flex-wrap content-start relative z-10">
            ${skill.tags.map(tag => {
        let iconHtml = tag.iconClass.startsWith('lucide-')
            ? `<i data-lucide="${tag.iconClass.replace('lucide-', '')}" class="w-4 h-4 mr-2"></i>`
            : `<i class="${tag.iconClass} text-lg mr-2"></i>`;
        return `<span class="skill-tag">${iconHtml} ${tag.name}</span>`;
    }).join('')}
        </div>
    </div>`).join('');

    // 2. Render Journey
    const journeyContainer = document.getElementById('journey-container');
    journeyContainer.innerHTML = portfolioData.journey.map(item => `
    <div class="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group ${item.link ? 'clickable-card' : ''}" ${item.link ? `onclick="window.open('${item.link}', '_blank')"` : ''}>
        <div class="absolute top-0 right-0 w-40 h-40 bg-textAccent rounded-full blur-[70px] -mr-10 -mt-10 opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
        <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
                <span class="px-3 py-1 border border-borderGray/50 text-textAccent text-[10px] tracking-widest font-bold bg-bgCard/30 rounded-full shadow-sm">${item.type}</span>
                ${item.link ? `<i data-lucide="external-link" class="w-4 h-4 text-textMuted opacity-0 external-icon"></i>` : ''}
            </div>
            <h3 class="font-display font-bold text-2xl md:text-3xl text-textMain mb-2">${item.title}</h3>
            <p class="text-textAccent font-bold text-lg mb-1">${item.institution}</p>
            <p class="text-textMuted font-mono text-xs mb-6 tracking-wider">${item.location}</p>
            <p class="text-textMain/70 text-sm md:text-base font-medium leading-relaxed">${item.description}</p>
        </div>
    </div>`).join('');

    // 3. Render Certifications
    const certsContainer = document.getElementById('certificates-container');
    certsContainer.innerHTML = portfolioData.certificates.map(cert => `
    <div class="glass-panel p-8 rounded-2xl relative overflow-hidden group clickable-card" onclick="window.open('${cert.link}', '_blank')">
        <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
                <div class="p-2 bg-bgCard/50 rounded-lg border border-borderGray/30"><i data-lucide="award" class="w-5 h-5 text-textAccent"></i></div>
                <i data-lucide="external-link" class="w-4 h-4 text-textMuted opacity-0 external-icon"></i>
            </div>
            <h3 class="font-display font-bold text-xl text-textMain mb-1">${cert.title}</h3>
            <p class="text-textAccent font-mono text-xs mb-3 font-bold">${cert.issuer}</p>
            <p class="text-textMain/70 text-sm font-medium">${cert.description}</p>
        </div>
    </div>`).join('');

    // 4. Render Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = portfolioData.projects.map(project => `
    <div class="glass-panel p-8 md:p-12 rounded-3xl project-card group relative overflow-hidden clickable-card" onclick="window.open('${project.link}', '_blank')">
        <div class="absolute top-0 right-0 p-40 bg-textAccent rounded-full blur-[100px] -mr-20 -mt-20 opacity-[0.03] transition-all duration-500 group-hover:opacity-10 pointer-events-none"></div>
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div class="md:col-span-4 flex items-center justify-start md:pr-12 border-b md:border-b-0 md:border-r border-borderGray/30 pb-8 md:pb-0">
                <span class="font-display font-bold text-[7rem] md:text-[9rem] leading-none text-textMain/10 select-none group-hover:text-textAccent/30 transition-colors drop-shadow-sm">${project.id}</span>
            </div>
            <div class="md:col-span-8 flex flex-col justify-center py-4">
                ${project.featured ? `<div class="flex items-center gap-3 mb-5"><span class="px-3 py-1 border border-borderGray/50 text-textAccent text-[10px] tracking-widest font-bold bg-bgCard/30 rounded-full shadow-sm">FEATURED</span></div>` : ''}
                <h3 class="font-display font-bold text-3xl md:text-5xl text-textMain mb-3 group-hover:text-textAccent transition-colors">${project.title}</h3>
                <p class="text-textMuted font-mono text-xs mb-6 tracking-wider font-bold">${project.subtitle}</p>
                <p class="text-textMain/70 leading-relaxed text-sm md:text-base mb-8 font-medium max-w-2xl">${project.description}</p>
                <div>
                    <span class="inline-flex items-center gap-2 text-textMain border-b-2 border-borderGray/50 group-hover:border-textAccent group-hover:text-textAccent pb-1 transition-all font-bold">
                        ${project.linkText} <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>`).join('');

    lucide.createIcons();
    initInteractiveFeatures();
}

// ==========================================
// RESUME PDF GENERATION (ATS Friendly & Aesthetic)
// ==========================================
// Design goals:
//  - Real, selectable text only (no images/canvas) so ATS parsers can read every field.
//  - Single-column, linear reading order (no multi-column tables) — ATS parsers read
//    left-to-right/top-to-bottom and multi-column layouts scramble that order.
//  - Justified body paragraphs for a clean, professional look.
//  - Clickable links on Experience / Certificates / Projects / header, without
//    injecting non-standard characters into the text an ATS would extract.
//  - Automatic page-break handling so nothing overlaps or gets cut off across pages.
let currentResumeDoc = null;
let currentResumeBlobUrl = null;

// Renders the resume content. Called twice:
//  1) draw:false — a "dry run" against a scratch doc that walks the exact
//     same logic but skips every actual text/line draw, just accumulating
//     how tall the content naturally is with no page-break limit.
//  2) draw:true — the real render, with every spacing gap multiplied by
//     gapScale (computed from pass 1) so the content ends flush with the
//     bottom margin: no overflow onto page 2, no dead space at the bottom.
// Font sizes and line-height stay fixed in both passes — only the
// whitespace between blocks stretches or compresses, so text never looks
// distorted or unreadable.
function generateResumeLayout(doc, { draw, gapScale }) {
    const margin = 12;
    const pageWidth = 210;
    const pageHeight = 297;
    const bottomLimit = pageHeight - 12;
    const contentWidth = pageWidth - (margin * 2);
    const lh = 1.28;

    const fontMain = "helvetica";
    const colorPrimary = "#000000";
    const colorSecondary = "#444444";
    const colorLink = "#000000";

    const startY = 14;
    let y = startY;

    const g = (v) => v * gapScale;

    // A plain ASCII hyphen instead of the unicode "•" glyph — some stricter
    // ATS parsers drop or mis-handle non-ASCII bullet glyphs depending on
    // font/encoding, which is what caused the inconsistent bullet behavior.
    // A hyphen is universally safe and always extracts as plain text.
    const BULLET = "-";

    // Page breaks are only a safety net on the real draw pass. The dry run
    // never breaks — we want its true, unclamped height.
    function ensureSpace(neededHeight) {
        if (!draw) return;
        if (y + neededHeight > bottomLimit) {
            doc.addPage();
            y = startY;
        }
    }

    function put(text, x, yPos, opts) {
        if (draw) doc.text(text, x, yPos, opts);
    }

    function putLine(x1, y1, x2, y2) {
        if (draw) doc.line(x1, y1, x2, y2);
    }

    // Clickable link; falls back to plain text if no url. Text extracted by
    // an ATS parser is identical either way — the link is just an annotation.
    function putLink(text, x, yPos, url) {
        if (!draw) return;
        if (url) {
            doc.setTextColor(colorLink);
            doc.textWithLink(text, x, yPos, { url });
            doc.setTextColor(colorPrimary);
        } else {
            doc.text(text, x, yPos);
        }
    }

    function addSectionTitle(title) {
        ensureSpace(11);
        y += g(2.5);
        doc.setFont(fontMain, "bold");
        doc.setFontSize(11);
        doc.setTextColor(colorPrimary);
        doc.setCharSpace(0.4); // subtle tracking for a more designed look — text content is unaffected
        put(title.toUpperCase(), margin, y);
        doc.setCharSpace(0);
        y += g(1.5);
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.3);
        putLine(margin, y, pageWidth - margin, y);
        y += g(4.5);
    }

    // --- 1. HEADER ---
    // Name is the visual anchor of the page — sized up for presence while
    // staying plain bold text (no image/curve), so ATS parsers still read
    // it as a normal string. Slight letter-spacing gives it a designed feel.
    doc.setFont(fontMain, "bold");
    doc.setFontSize(27);
    doc.setTextColor(colorPrimary);
    doc.setCharSpace(0.6);
    put(portfolioData.basics.name.toUpperCase(), pageWidth / 2, y, { align: "center" });
    doc.setCharSpace(0);
    y += g(6.5);

    // Role subtitle — reinforces the target role for ATS keyword matching
    // and gives the header a clear visual hierarchy (name > role > contact).
    if (portfolioData.basics.role) {
        doc.setFont(fontMain, "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(colorSecondary);
        doc.setCharSpace(0.5);
        put(portfolioData.basics.role.toUpperCase(), pageWidth / 2, y, { align: "center" });
        doc.setCharSpace(0);
        y += g(5.5);
    }

    doc.setFont(fontMain, "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(colorSecondary);
    const contactInfo = `${portfolioData.basics.location}   -   ${portfolioData.basics.phone}   -   ${portfolioData.basics.email}`;
    put(contactInfo, pageWidth / 2, y, { align: "center" });
    y += g(5);

    // Show the actual link URLs (not generic labels), stripped of the
    // protocol/www for a cleaner read — each one still points to the full
    // original URL. Font size shrinks a touch if needed so all three links
    // always fit on one line within the margins, never running off the page.
    const stripProtocol = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    const linkParts = [
        { text: stripProtocol(portfolioData.basics.linkedin), url: portfolioData.basics.linkedin },
        { text: stripProtocol(portfolioData.basics.github), url: portfolioData.basics.github },
        { text: stripProtocol(portfolioData.basics.portfolio), url: portfolioData.basics.portfolio }
    ].filter(p => p.url);
    const sep = "   -   ";

    let linkFontSize = 9.5;
    let sepWidth, partWidths, totalLinkWidth;
    do {
        doc.setFontSize(linkFontSize);
        sepWidth = doc.getTextWidth(sep);
        partWidths = linkParts.map(p => doc.getTextWidth(p.text));
        totalLinkWidth = partWidths.reduce((a, b) => a + b, 0) + sepWidth * (linkParts.length - 1);
        if (totalLinkWidth <= contentWidth || linkFontSize <= 7) break;
        linkFontSize -= 0.5;
    } while (true);
    let curX = pageWidth / 2 - totalLinkWidth / 2;
    linkParts.forEach((p, i) => {
        putLink(p.text, curX, y, p.url);
        curX += partWidths[i];
        if (i < linkParts.length - 1) {
            doc.setTextColor(colorSecondary);
            put(sep, curX, y);
            doc.setTextColor(colorPrimary);
            curX += sepWidth;
        }
    });
    y += g(4);

    // Bold divider under the whole header block — a clean visual break
    // before the body sections start. Pure vector line, invisible to ATS text extraction.
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.7);
    putLine(margin, y, pageWidth - margin, y);
    y += g(4);

    // --- 2. SUMMARY ---
    addSectionTitle("Professional Summary");
    y += g(1.5); // a little extra breathing room before the paragraph starts
    doc.setFont(fontMain, "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(colorPrimary);
    const summaryDims = doc.getTextDimensions(portfolioData.resume.summary, { maxWidth: contentWidth, lineHeightFactor: lh });
    ensureSpace(summaryDims.h);
    if (draw) doc.text(portfolioData.resume.summary, margin, y, { maxWidth: contentWidth, align: "justify", lineHeightFactor: lh });
    y += summaryDims.h + g(3);

    // --- 3. EDUCATION ---
    addSectionTitle("Education");
    const edu = portfolioData.journey.find(j => j.type === "EDUCATION");
    if (edu) {
        ensureSpace(10);
        doc.setFont(fontMain, "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(colorPrimary);
        put(edu.title, margin, y);
        doc.setFont(fontMain, "normal");
        doc.setTextColor(colorSecondary);
        put(edu.location.split(" | ")[1], pageWidth - margin, y, { align: "right" });
        y += g(4.5);
        doc.setFont(fontMain, "italic");
        put(`${edu.institution}, ${edu.location.split(" | ")[0]}`, margin, y);
        doc.setTextColor(colorPrimary);
        y += g(6);
    }

    // --- 4. EXPERIENCE ---
    addSectionTitle("Experience");
    doc.setFontSize(9.5);
    portfolioData.journey.filter(j => j.type === "EXPERIENCE").forEach(exp => {
        const descDims = doc.getTextDimensions(`${BULLET}  ${exp.description}`, { maxWidth: contentWidth - 2, lineHeightFactor: lh });
        ensureSpace(9 + descDims.h);

        doc.setFont(fontMain, "bold");
        doc.setTextColor(colorPrimary);
        putLink(exp.title, margin, y, exp.link);

        doc.setFont(fontMain, "normal");
        doc.setTextColor(colorSecondary);
        put(exp.location.split(" | ")[1] || "", pageWidth - margin, y, { align: "right" });
        y += g(4.5);

        doc.setFont(fontMain, "italic");
        put(`${exp.institution} - ${exp.location.split(" | ")[0]}`, margin, y);
        y += g(5);

        doc.setFont(fontMain, "normal");
        doc.setTextColor(colorPrimary);
        const expText = `${BULLET}  ${exp.description}`;
        if (draw) doc.text(expText, margin + 2, y, { maxWidth: contentWidth - 2, align: "justify", lineHeightFactor: lh });
        y += descDims.h + g(3.5);
    });

    // --- 5. PROJECTS ---
    addSectionTitle("Projects");
    doc.setFontSize(9.5);
    portfolioData.projects.forEach(proj => {
        let blockHeight = 5;
        const bulletDims = proj.bullets.map(b => doc.getTextDimensions(`${BULLET}  ${b}`, { maxWidth: contentWidth - 2, lineHeightFactor: lh }));
        bulletDims.forEach(d => blockHeight += d.h + 1.5);
        ensureSpace(blockHeight);

        doc.setFont(fontMain, "bold");
        doc.setTextColor(colorPrimary);
        putLink(proj.title, margin, y, proj.link);
        y += g(5);

        doc.setFont(fontMain, "normal");
        proj.bullets.forEach((bullet, i) => {
            const bText = `${BULLET}  ${bullet}`;
            if (draw) doc.text(bText, margin + 2, y, { maxWidth: contentWidth - 2, align: "justify", lineHeightFactor: lh });
            y += bulletDims[i].h + g(1.5);
        });
        y += g(2);
    });

    // --- 6. SKILLS ---
    // Label on its own line, value indented below — long category names
    // (e.g. "Web Development & Tools:") can never run into the value column.
    addSectionTitle("Technical Skills");
    portfolioData.skills.forEach(skill => {
        const skillIndent = 4;
        const sDims = doc.getTextDimensions(skill.resumeText, { maxWidth: contentWidth - skillIndent, lineHeightFactor: lh });
        ensureSpace(4.5 + sDims.h + 1.5);

        doc.setFont(fontMain, "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(colorPrimary);
        put(`${skill.title}:`, margin, y);
        y += g(4.5);

        doc.setFont(fontMain, "normal");
        if (draw) doc.text(skill.resumeText, margin + skillIndent, y, { maxWidth: contentWidth - skillIndent, lineHeightFactor: lh });
        y += sDims.h + g(1.5);
    });
    y += g(1);

    // --- 7. CERTIFICATIONS ---
    addSectionTitle("Certifications");
    doc.setFontSize(9.5);
    portfolioData.certificates.forEach(cert => {
        const cText = `${BULLET}  ${cert.issuer} - ${cert.title}`;
        const cDims = doc.getTextDimensions(cText, { maxWidth: contentWidth });
        ensureSpace(cDims.h + 1);

        doc.setFont(fontMain, "normal");
        doc.setTextColor(colorPrimary);
        putLink(cText, margin, y, cert.link);
        y += cDims.h + g(1);
    });
    y += g(1);

    // --- 8. LANGUAGES ---
    if (portfolioData.languages && portfolioData.languages.length) {
        addSectionTitle("Languages");
        doc.setFontSize(9.5);
        const langText = portfolioData.languages.map(l => `${l.name} (${l.level})`).join("   -   ");
        const lDims = doc.getTextDimensions(langText, { maxWidth: contentWidth });
        ensureSpace(lDims.h + 1);
        doc.setFont(fontMain, "normal");
        doc.setTextColor(colorPrimary);
        put(langText, margin, y, { maxWidth: contentWidth });
        y += lDims.h + g(1);
    }

    return { finalY: y, bottomLimit, startY };
}

function buildResumeDoc() {
    const { jsPDF } = window.jspdf;

    // Pass 1 — measure only. Walks the full layout on a scratch document
    // with drawing disabled and page-breaking disabled, so finalY tells us
    // exactly how tall this content wants to be at gapScale = 1.
    const measureDoc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const measurement = generateResumeLayout(measureDoc, { draw: false, gapScale: 1 });
    const naturalHeight = measurement.finalY - measurement.startY;
    const availableHeight = measurement.bottomLimit - measurement.startY;

    // Stretch or compress the gaps between blocks so the content ends
    // exactly at the bottom margin — fills the page without overflowing it.
    // Clamped so spacing never balloons or collapses into something ugly.
    let gapScale = availableHeight / naturalHeight;
    gapScale = Math.max(0.75, Math.min(gapScale, 2.2));

    // Pass 2 — real render at the computed gapScale.
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    generateResumeLayout(doc, { draw: true, gapScale });

    return doc;
}

// ==========================================
// RESUME PREVIEW MODAL
// ==========================================
// Flow: button click -> build PDF in memory -> show it in an iframe inside a
// modal with a fixed, always-visible header bar -> user only downloads when
// they explicitly click the DOWNLOAD button in that header.
function previewResume() {
    currentResumeDoc = buildResumeDoc();

    // Clean up any previous blob before creating a new one
    if (currentResumeBlobUrl) {
        URL.revokeObjectURL(currentResumeBlobUrl);
    }
    currentResumeBlobUrl = currentResumeDoc.output('bloburl');

    const modal = document.getElementById('resume-modal');
    const frame = document.getElementById('resume-preview-frame');
    const fallbackLink = document.getElementById('resume-fallback-link');

    frame.src = currentResumeBlobUrl;
    if (fallbackLink) fallbackLink.href = currentResumeBlobUrl;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeResumePreview() {
    const modal = document.getElementById('resume-modal');
    const frame = document.getElementById('resume-preview-frame');

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';

    frame.src = 'about:blank';
    if (currentResumeBlobUrl) {
        URL.revokeObjectURL(currentResumeBlobUrl);
        currentResumeBlobUrl = null;
    }
    currentResumeDoc = null;
}

function confirmResumeDownload() {
    if (!currentResumeDoc) return;
    currentResumeDoc.save("AMAL_SONU_Resume.pdf");
}

function initResumeModal() {
    const downloadBtn = document.getElementById('resume-download-btn');
    const closeBtn = document.getElementById('resume-close-btn');
    const modal = document.getElementById('resume-modal');

    if (downloadBtn) downloadBtn.addEventListener('click', confirmResumeDownload);
    if (closeBtn) closeBtn.addEventListener('click', closeResumePreview);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeResumePreview(); // click outside the panel closes it
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeResumePreview();
    });
}

// ==========================================
// UI AND ANIMATION LOGIC
// ==========================================
function initInteractiveFeatures() {
    document.querySelectorAll('.glass-panel').forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        panel.addEventListener('mouseleave', () => {
            panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            panel.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        panel.addEventListener('mouseenter', () => {
            panel.style.transition = 'transform 0.1s ease';
        });
    });

    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

function updateTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const timeString = now.toLocaleString('en-IN', options);
    document.getElementById('live-time').innerText = timeString;
    const mobileTimeEl = document.getElementById('mobile-live-time');
    if (mobileTimeEl) mobileTimeEl.innerText = timeString;
}
setInterval(updateTime, 1000);
updateTime();

const mobileBtn = document.getElementById('mobile-btn');
const closeMobile = document.getElementById('close-mobile');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    gsap.fromTo(mobileMenu, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power4.inOut" });
    gsap.fromTo(".mobile-link", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power3.out" });
}

function closeMenu() {
    gsap.to(mobileMenu, {
        clipPath: "circle(0% at 100% 0%)", duration: 0.6, ease: "power4.inOut", onComplete: () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    });
}

mobileBtn.addEventListener('click', openMenu);
closeMobile.addEventListener('click', closeMenu);
document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const container = document.getElementById('webgl');
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const pGeo = new THREE.BufferGeometry();
    const pCount = 800;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 40;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({ size: 0.08, color: 0xc5c4bf, transparent: true, opacity: 0.25 });
    const particles = new THREE.Points(pGeo, pMat); scene.add(particles); camera.position.z = 10;

    let targetX = 0; let targetY = 0;
    document.addEventListener('mousemove', (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        particles.rotation.y += (targetX * 0.05 - particles.rotation.y) * 0.05;
        particles.rotation.x += (targetY * 0.05 - particles.rotation.x) * 0.05;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function typeWriterEffect(text, elementId, speed = 50) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, speed); }
    }
    type();
}

window.onload = () => {
    renderContent();
    initThreeJS();
    initResumeModal();

    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    const fullText = document.getElementById('loader-full');
    const shortText = document.getElementById('loader-short');
    const navLogo = document.getElementById('nav-logo');

    tl.to(fullText, { opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.inOut" })
        .to(shortText, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" }, "<")
        .add(() => {
            const rect = navLogo.getBoundingClientRect();
            const startRect = shortText.getBoundingClientRect();
            const targetX = rect.width ? rect.left : 24;
            const targetY = rect.width ? rect.top : 24;

            gsap.to(shortText, {
                x: targetX - startRect.left,
                y: targetY - startRect.top,
                scale: 0.4,
                duration: 0.6,
                ease: "power4.inOut",
                onComplete: () => {
                    shortText.style.opacity = 0;
                    navLogo.style.opacity = 1;
                }
            });
        })
        .to("#loader", { height: 0, duration: 0.8, ease: "power4.inOut" }, "-=0.3")
        .add(() => {
            typeWriterEffect(portfolioData.basics.role.toUpperCase(), "hero-subtitle", 70);
        }, "-=0.2");

    setTimeout(() => {
        gsap.utils.toArray('.about-card, .skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card.parentElement, start: "top 85%" },
                y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
            });
        });

        gsap.utils.toArray('.project-card, .clickable-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 90%" },
                y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
            });
        });
    }, 100);
};