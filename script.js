// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(r => {
        const top = r.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            r.classList.add('active');
        }
    });
});

// ===== 3D TILT EFFECT =====
document.querySelectorAll('.tilt').forEach(card => {

    card.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let w = card.clientWidth;
        let h = card.clientHeight;

        let rotateY = (x / w - 0.5) * 20;
        let rotateX = (y / h - 0.5) * -20;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0) rotateY(0)`;
    });
});

const projectData = {
  1: {
    title: "Visa Issuance Dashboard",
    desc: "Developed an interactive dashboard to analyze visas issued to Indian citizens by different countries during January 2014, highlighting country-wise approvals and the distribution of visa types such as Tourist, Diplomatic, Student, Employment, and Business. The dashboard enables easy comparison of travel purposes and approval trends across countries.",
    tools: "Power BI, Excel"
  },
  2: {
    title: "Covid-19 Dashboard",
    desc: "Created an interactive dashboard to analyze the global spread of COVID-19 during 2020, showcasing country and continent-wise data on confirmed, active, recovered, and death cases. The dashboard highlights monthly growth trends and allows users to explore how the impact of the virus varied across different regions. ",
    tools: "Power BI, Excel"
  },
  3: {
    title: "Real Estate Price Prediction",
    desc: "Developed a full-stack web application that predicts property prices based on user-provided real estate details using a trained predictive model. The system allows users to securely register, log in, and submit property information to receive instant price estimates, while an admin module manages users and system activity. It features interactive forms, real-time prediction results, and structured user and admin pages, demonstrating end-to-end deployment of a data-driven prediction system through a web-based interface.",
    tools: "Django, Python, HTML, CSS, JS"
  },
  4: {
    title: "Disaster and Resource Assessment System",
    desc: "Developed a web-based portal to support disaster management by allowing users to report emergencies, request resources, and volunteer to help affected communities. The system securely collects and stores disaster-related data, sends alert notifications when incidents are reported, and guides users with immediate action steps and emergency contact information. It also displays nearby shelter locations for temporary stay, helping people access safety and support quickly, while strengthening disaster preparedness, response, and recovery efforts through timely communication and community participation.",
    tools: "Java Spring Boot, HTML, CSS, JS, Email Services"
  },
  5: {
    title: "Financial Performance Dashboard",
    desc: "Developed an interactive financial performance dashboard to compare budgeted versus actual spending across departments and expense categories for 2024-2025, highlighting overall financial trends, department-wise budget utilization, and category-wise contribution to total expenses. The dashboard helps identify overspending areas, track monthly performance patterns, and support better budgeting and cost control decisions through clear and intuitive visual insights.",
    tools: "Excel, Pivot Tables, Charts"
  },
  6: {
    title: "Customer Sales Analysis",
    desc: "Analyzing customer sales data using SQL to uncover meaningful business insights related to revenue, customer behavior, and product performance. This analysis demonstrates how structured data stored in relational tables can be transformed into actionable insights through effective querying.",
    tools: "MySQL, MySQL Workbench"
  },
  7: {
    title: "Supply Chain & Delivery Dashboard",
    desc: "Developed an interactive dashboard to analyze delivery efficiency and sales performance across regions, shipping methods, and product categories by tracking key metrics such as average delivery time, late order percentage, and revenue trends, enabling identification of delay-prone regions, comparison of service levels across shipping modes, and drill-down analysis from regional to product-level insights to support data-driven logistics and business decisions.",
    tools: "Tableau, Excel"
  },
    8: {
    title: "Credit Risk & Loan Default Analysis",
    desc: "Analysis on historical Lending Club loan data to evaluate credit risk and default patterns. Cleaned and processed raw financial data, calculated default rates, and analyzed risk segmentation by loan grade, purpose, and income groups to derive actionable insights for lending decisions.",
    tools: "Python, MySQL"
  }
};


function openModal(id){
    const data = projectData[id];
    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalDesc").innerText = data.desc;
    document.getElementById("modalTools").innerText = data.tools;

    document.getElementById("projectModal").classList.add("show");
}

function closeModal(){
    document.getElementById("projectModal").classList.remove("show");
}


// ===== HOME PAGE MOUSE WEB BACKGROUND =====
const home = document.getElementById("home");
const canvas = document.getElementById("webCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = home.offsetWidth;
    canvas.height = home.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// web points
let points = [];
for(let i=0;i<80;i++){
    points.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx:(Math.random()-0.5)*0.3,
        vy:(Math.random()-0.5)*0.3
    });
}

let mouse = { x:null, y:null };

home.addEventListener("mousemove",(e)=>{
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

home.addEventListener("mouseleave",()=>{
    mouse.x = null;
    mouse.y = null;
});

function animateWeb(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let p of points){
        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;

        for(let q of points){
            let dx=p.x-q.x, dy=p.y-q.y;
            let dist=Math.sqrt(dx*dx+dy*dy);

            if(dist < 120){
                ctx.strokeStyle="rgba(255,255,255,0.05)";
                ctx.beginPath();
                ctx.moveTo(p.x,p.y);
                ctx.lineTo(q.x,q.y);
                ctx.stroke();
            }
        }

        // connect to mouse (spider)
        if(mouse.x){
            let dx=p.x-mouse.x, dy=p.y-mouse.y;
            let dist=Math.sqrt(dx*dx+dy*dy);
            if(dist < 180){
                ctx.strokeStyle="rgba(255,255,255,0.25)";
                ctx.beginPath();
                ctx.moveTo(p.x,p.y);
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateWeb);
}
animateWeb();


/// ===== GLOBAL SPIDER FOLLOW CURSOR =====

const spider = document.getElementById("spiderCursor");

document.addEventListener("mousemove", (e)=>{
    spider.style.left = e.clientX + "px";
    spider.style.top = e.clientY + "px";
});
