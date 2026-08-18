const portfolioData = {
    // --- GENERAL INFO ---
    basics: {
        name: "AMAL SONU",
        location: "Ernakulam, Kerala, India",
        email: "amalsonuoff@gmail.com",
        phone: "+91 8921746693",
        linkedin: "https://www.linkedin.com/in/amal-sonu-09298a320",
        github: "https://github.com/amalsonu",
        portfolio: "https://amalsonu2874.github.io/Profile/"
    },

    // --- RESUME SPECIFIC TEXT ---
    resume: {
        summary: "Passionate BCA student specializing in AI and Data Science with a strong foundation in Python, Java, and deep learning architectures. Dedicated to tackling real-world challenges by bridging the gap between intelligent backend models and responsive web experiences. Eager to leverage technical skills in machine learning, exploratory data analysis, and software engineering to drive AI innovation and deliver user-centric digital solutions."
    },

    // --- SKILLS ---
    skills: [
        {
            title: "Programming Languages",
            icon: "code-2",
            resumeText: "Python, Java (OOP), C, SQL, JavaScript", // For PDF
            tags: [
                { name: "Python", iconClass: "devicon-python-plain" },
                { name: "Java (OOP)", iconClass: "devicon-java-plain" },
                { name: "C Program", iconClass: "devicon-c-plain" },
                { name: "JavaScript", iconClass: "devicon-javascript-plain" },
                { name: "SQL", iconClass: "devicon-mysql-plain" }
            ]
        },
        {
            title: "Data Science & AI",
            icon: "brain-circuit",
            resumeText: "Deep Learning, Machine Learning, EDA, NumPy, scikit-learn, OpenCV, CNNs", // For PDF
            tags: [
                { name: "Deep Learning", iconClass: "lucide-brain" },
                { name: "Machine Learning", iconClass: "lucide-cpu" },
                { name: "EDA", iconClass: "lucide-bar-chart-2" },
                { name: "NumPy", iconClass: "devicon-numpy-plain" },
                { name: "Scikit-Learn", iconClass: "lucide-code" }
            ]
        },
        {
            title: "Web Development & Tools",
            icon: "layout",
            resumeText: "HTML5, CSS3, Responsive Design, Git, GitHub", // For PDF
            tags: [
                { name: "HTML5", iconClass: "devicon-html5-plain" },
                { name: "CSS3", iconClass: "devicon-css3-plain" },
                { name: "Web Designing", iconClass: "lucide-layout" },
                { name: "Git", iconClass: "devicon-git-plain" },
                { name: "GitHub", iconClass: "devicon-github-original" }
            ]
        }
    ],

    // --- LANGUAGES (used in PDF resume) ---
    languages: [
        { name: "Malayalam", level: "Native" },
        { name: "English", level: "Fluent" }
    ],

    // --- JOURNEY (EDUCATION & EXPERIENCE) ---
    journey: [
        {
            type: "EDUCATION",
            title: "Bachelor of Computer Applications (AI & DS)",
            institution: "Chinmaya Vishwa Vidhyapeeth",
            location: "Onakkoor, Ernakulam, Kerala | Aug 2024 - Aug 2028",
            description: "Developing a hybrid expertise in Data Science, Deep Learning architectures and robust software engineering.",
            link: ""
        },
        {
            type: "EXPERIENCE",
            title: "Data Science Intern",
            institution: "Sinro Robotics Pvt. Ltd",
            location: "Vyttila, Ernakulam, Kerala | May 2026 - Jun 2026",
            description: "Analyzed real-world datasets and optimized deep learning workflows using Python and scikit-learn, collaborating with technical teams to build predictive machine learning models.",
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_completed-an-ai-data-science-internship-activity-7479789120119222272-dOWj"
        },
        {
            type: "EXPERIENCE",
            title: "IT Support Assistant",
            institution: "Janshree E Kendram",
            location: "Elanji, Ernakulam, Kerala | Jun 2025",
            description: "Streamlined digital documentation and managed technical operations, assisting users with government portals to improve overall service delivery.",
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_completed-my-1-month-data-entry-assistant-activity-7353841900317016065-1G6j"
        }
    ],

    // --- CERTIFICATIONS ---
    certificates: [
        {
            title: "Galactic Problem Solver",
            issuer: "NASA International Space Apps Challenge 2024",
            description: "Recognized for innovative problem solving at the international hackathon.",
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_issued-by-nasa-international-space-apps-activity-7351640921995677696-Nm3W"
        },
        {
            title: "Introduction to Python Course",
            issuer: "Analytics Vidhya",
            description: "Completed comprehensive certification course in Python programming.",
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_issued-by-analytics-vidhya-date-july-13-activity-7351641498230132736-WxCt"
        },
        {
            title: "Core Technical Team Member",
            issuer: "International Inter-University Fest",
            description: "Served on the core technical team managing event systems and operations.",
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_achievement-technicalteam-chinmayavishwavidyapeeth-activity-7479817482464227328-inIb"
        }
    ],

    // --- PROJECTS ---
    projects: [
        {
            id: "01",
            title: "ARCADIA",
            subtitle: "ANCIENT RECOGNITION AND CLASSIFICATION FOR ART DISCOVERY",
            description: "Developed a deep learning system dedicated to preserving heritage by classifying traditional art forms. Engineered and trained custom CNN architectures on tailored datasets to achieve high-accuracy image recognition.",
            bullets: [
                "Developed a deep learning system dedicated to preserving heritage by classifying traditional art forms.",
                "Engineered and trained custom CNN architectures on tailored datasets to achieve high-accuracy image recognition."
            ], // Bullets for the PDF
            link: "https://www.linkedin.com/posts/amal-sonu-09298a320_deeplearning-computervision-machinelearning-activity-7484899775192915969-I-dc",
            linkText: "View on LinkedIn",
            featured: true
        }
    ]
};