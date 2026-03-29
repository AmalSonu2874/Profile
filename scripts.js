// ==========================================
// DYNAMIC DATA CONFIGURATION
// ==========================================
const portfolioData = {
    skills: [
        {
            title: "Core & Web",
            icon: "code-2",
            tags: [
                { name: "HTML5", iconClass: "devicon-html5-plain" },
                { name: "CSS3", iconClass: "devicon-css3-plain" },
                { name: "JavaScript", iconClass: "devicon-javascript-plain" },
                { name: "Java (OOP)", iconClass: "devicon-java-plain" },
                { name: "C Program", iconClass: "devicon-c-plain" }
            ]
        },
        {
            title: "Data Science",
            icon: "brain-circuit",
            tags: [
                { name: "Python", iconClass: "devicon-python-plain" },
                { name: "NumPy", iconClass: "devicon-numpy-plain" },
                { name: "OpenCV", iconClass: "devicon-opencv-plain" },
                { name: "SQL", iconClass: "devicon-mysql-plain" }
            ]
        },
        {
            title: "Soft Skills & Tools",
            icon: "users",
            tags: [
                { name: "Leadership", iconClass: "lucide-crown" },
                { name: "Management", iconClass: "lucide-briefcase" },
                { name: "Time Management", iconClass: "lucide-clock" },
                { name: "Git", iconClass: "devicon-git-plain" },
                { name: "GitHub", iconClass: "devicon-github-original" }
            ]
        }
    ],
    journey: [
        {
            type: "EDUCATION",
            title: "Bachelor of Computer Application (AI & DS)",
            institution: "Chinmaya Vishwa Vidhyapeeth",
            location: "ONAKKOOR, ERNAKULAM | 2024 - 2028",
            description: "Developing a hybrid expertise in Deep Learning architectures and robust software engineering."
        },
        {
            type: "EXPERIENCE",
            title: "Assistant Staff",
            institution: "Janshree Kendram",
            location: "ERNAKULAM, KERALA",
            description: "Enhanced community service delivery by managing government portals and streamlining customer interactions to improve operational efficiency."
        }
    ],
    projects: [
        {
            id: "01",
            title: "ARCADIA",
            subtitle: "ANCIENT RECOGNITION AND CLASSIFICATION FOR ART DISCOVERY USING INTELLIGENT AI",
            description: "A deep learning system preserving heritage by classifying traditional art forms using custom CNN architectures. Achieved 95% accuracy on custom datasets.",
            link: "https://amalsonu2874.github.io/Arcadia/research.html",
            linkText: "View Deployment",
            featured: true
        }
    ]
};

// ==========================================
// RENDER FUNCTIONS
// ==========================================
function renderContent() {
    // Render Skills
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
                </div>
            `).join('');

    // Render Journey
    const journeyContainer = document.getElementById('journey-container');
    journeyContainer.innerHTML = portfolioData.journey.map(item => `
                <div class="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-textAccent rounded-full blur-[70px] -mr-10 -mt-10 opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="px-3 py-1 border border-borderGray/50 text-textAccent text-[10px] tracking-widest font-bold bg-bgCard/30 rounded-full shadow-sm">${item.type}</span>
                        </div>
                        <h3 class="font-display font-bold text-2xl md:text-3xl text-textMain mb-2">${item.title}</h3>
                        <p class="text-textAccent font-bold text-lg mb-1">${item.institution}</p>
                        <p class="text-textMuted font-mono text-xs mb-6 tracking-wider">${item.location}</p>
                        <p class="text-textMain/70 text-sm md:text-base font-medium leading-relaxed">${item.description}</p>
                    </div>
                </div>
            `).join('');

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = portfolioData.projects.map(project => `
                <div class="glass-panel p-8 md:p-12 rounded-3xl project-card group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-40 bg-textAccent rounded-full blur-[100px] -mr-20 -mt-20 opacity-[0.03] transition-all duration-500 group-hover:opacity-10 pointer-events-none"></div>
                    <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                        <div class="md:col-span-4 flex items-center justify-start md:pr-12 border-b md:border-b-0 md:border-r border-borderGray/30 pb-8 md:pb-0">
                            <span class="font-display font-bold text-[7rem] md:text-[9rem] leading-none text-textMain/10 select-none group-hover:text-textAccent/30 transition-colors drop-shadow-sm">${project.id}</span>
                        </div>
                        <div class="md:col-span-8 flex flex-col justify-center py-4">
                            ${project.featured ? `
                            <div class="flex items-center gap-3 mb-5">
                                <span class="px-3 py-1 border border-borderGray/50 text-textAccent text-[10px] tracking-widest font-bold bg-bgCard/30 rounded-full shadow-sm">FEATURED</span>
                            </div>` : ''}
                            <h3 class="font-display font-bold text-3xl md:text-5xl text-textMain mb-3 group-hover:text-textAccent transition-colors">${project.title}</h3>
                            <p class="text-textMuted font-mono text-xs mb-6 tracking-wider font-bold">${project.subtitle}</p>
                            <p class="text-textMain/70 leading-relaxed text-sm md:text-base mb-8 font-medium max-w-2xl">${project.description}</p>
                            <div>
                                <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 text-textMain border-b-2 border-borderGray/50 hover:border-textAccent hover:text-textAccent pb-1 transition-all font-bold">
                                    ${project.linkText} <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

    // Initialize Icons after DOM is populated
    lucide.createIcons();

    // Bind new interactive features after content is loaded
    initInteractiveFeatures();
}

// ==========================================
// UI AND ANIMATION LOGIC
// ==========================================

// --- INTERACTIVE FEATURES (Tilt, Magnetic, Cursor Hover) ---
function initInteractiveFeatures() {
    // 1. 3D Tilt Effect for Glass Panels
    document.querySelectorAll('.glass-panel').forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            // Calculate rotation angles
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            panel.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        panel.addEventListener('mouseenter', () => {
            panel.style.transition = 'transform 0.1s ease'; // Fast transition while actively moving
        });
    });

    // 2. Magnetic Buttons
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

// --- TIME WIDGET ---
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

// --- MOBILE MENU ---
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

// --- SCROLL PROGRESS ---
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// --- THREE.JS DYNAMIC BACKGROUND ---
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

    // Updated particle color to match the Light Gray textAccent color
    const pMat = new THREE.PointsMaterial({ size: 0.08, color: 0xc5c4bf, transparent: true, opacity: 0.25 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    camera.position.z = 10;

    // Interactive Mouse Variables
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Add smooth mouse interaction to the particles
        particles.rotation.y += 0.001; // Constant rotation
        particles.rotation.y += (targetX * 0.05 - particles.rotation.y) * 0.05; // Mouse X influence
        particles.rotation.x += (targetY * 0.05 - particles.rotation.x) * 0.05; // Mouse Y influence

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- TYPEWRITER EFFECT ---
function typeWriterEffect(text, elementId, speed = 50) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// --- INITIALIZATION ON LOAD ---
window.onload = () => {
    renderContent();
    initThreeJS();

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
            // Trigger typewriter after loader hides
            typeWriterEffect("DATA SCIENTIST & CREATIVE", "hero-subtitle", 70);
        }, "-=0.2");

    setTimeout(() => {
        gsap.utils.toArray('.about-card, .skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card.parentElement, start: "top 85%" },
                y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
            });
        });

        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 90%" },
                y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
            });
        });
    }, 100);
};
