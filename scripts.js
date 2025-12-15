tailwind.config = {
    theme: {
        extend: {
            colors: {
                sage: '#b9c095',
                periwinkle: '#748db9',
                dark: '#0e0e0e',
                card: '#141414',
                light: '#e0e0e0',
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Manrope', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 15s linear infinite',
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')"
            }
        }
    }
}

// --- SETUP ---
lucide.createIcons();

// --- TIME WIDGET ---
function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
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

    // Curtain Reveal
    gsap.fromTo(mobileMenu,
        { clipPath: "circle(0% at 100% 0%)" },
        { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power4.inOut" }
    );

    gsap.fromTo(".mobile-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power3.out" }
    );
}

function closeMenu() {
    gsap.to(mobileMenu, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    });
}

mobileBtn.addEventListener('click', openMenu);
closeMobile.addEventListener('click', closeMenu);
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- SCROLL PROGRESS ---
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// --- ANIMATIONS ---
window.onload = () => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    // 1. Initial State
    const fullText = document.getElementById('loader-full');
    const shortText = document.getElementById('loader-short');
    const navLogo = document.getElementById('nav-logo');

    // 2. Merge Animation
    tl.to(fullText, { opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.inOut" })
        .to(shortText, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" }, "<")

        // 3. Move to Corner
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

        // 4. Reveal Site & Hero Content
        .to("#loader", { height: 0, duration: 0.8, ease: "power4.inOut" }, "-=0.3")
        // Explicitly reveal hero content here to ensure visibility
        .to([".hero-content", ".hero-img"], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5");

    // Scroll Triggers
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: "#skills", start: "top 85%" },
            y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
        });
    });

    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%" },
            y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
        });
    });
};

// --- THREE.JS BACKGROUND ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const container = document.getElementById('webgl');
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(4, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xb9c095, wireframe: true, transparent: true, opacity: 0.08 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const pGeo = new THREE.BufferGeometry();
const pCount = 600;
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 40;
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0x748db9, transparent: true, opacity: 0.4 });
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

camera.position.z = 10;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    sphere.rotation.x += 0.001;
    sphere.rotation.y += mouseX * 0.02;
    sphere.rotation.x += mouseY * 0.02;
    particles.rotation.y = -Date.now() * 0.0001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});