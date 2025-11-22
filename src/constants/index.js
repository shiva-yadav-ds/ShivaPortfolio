import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  dignosis,
  iitmhub,
  iitm,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];


const services = [
  {
    title: "Data Science Enthusiast",
    icon: backend, // You can replace this with an appropriate icon
  },
  {
    title: "Data Analysis Specialist",
    icon: mobile, // Replace with an appropriate icon
  },
  {
    title: "Machine Learning Practitioner",
    icon: web, // Replace with an appropriate icon
  },
  {
    title: "Python and Statistics Learner",
    icon: creator, // Replace with an appropriate icon
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: "https://img.icons8.com/?size=100&id=v8RpPQUwv0N8&format=png&color=000000",
  },
  {
    name: "CSS 3",
    icon: "https://img.icons8.com/?size=100&id=7gdY5qNXaKC0&format=png&color=000000",
  },
  {
    name: "JavaScript",
    icon: "https://img.icons8.com/?size=100&id=PXTY4q2Sq2lG&format=png&color=000000",
  },
  {
    name: "TypeScript",
    icon: "https://img.icons8.com/?size=100&id=PZQVBAxaueDJ&format=png&color=000000",
  },
  {
    name: "React JS",
    icon: "https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000",
  },
  {
    name: "Tailwind CSS",
    icon: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000",
  },
  {
    name: "Node JS",
    icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
  },
  {
    name: "MongoDB",
    icon: "https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000",
  },
  {
    name: "Three JS",
    icon: "https://img.icons8.com/?size=100&id=QSjnrUKYMnxO&format=png&color=000000",
  },
  {
    name: "git",
    icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
  },
  {
    name: "figma",
    icon: "https://img.icons8.com/?size=100&id=xSkewUSqtErH&format=png&color=000000",
  },
  {
    name: "docker",
    icon: "https://img.icons8.com/?size=100&id=aR9CXyMagKIS&format=png&color=000000",
  },
  {
    name: "Redux Toolkit",
    icon: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
  },
];

const experiences = [
  {
    title: "Foundation Year Student - Data Science",
    company_name: "IIT Madras",
    icon: iitm,
    iconBg: "#E6DEDD",
    date: "Jan 2025 - Present",
    points: [
      "Enrolled in the IIT Madras BS program in Data Science, building a rigorous foundation in Mathematics, Statistics, and Computational Thinking.",
      "Mastering Statistical Modeling, Probability Theory, and Linear Algebra for advanced data analysis and inference.",
      "Implementing efficient Data Structures and Algorithms in Python to optimize computational solutions.",
      "Applying statistical inference techniques to analyze real-world datasets and derive actionable business insights."
    ],
  },
  {
    title: "Full Stack Web Development Student",
    company_name: "PW Skills",
    icon: "https://www.pw.live//version14/assets/img/logo.png",
    iconBg: "#383E56",
    date: "Completed in 2024",
    points: [
      "Acquired full-stack development skills as a complementary asset to deploy and showcase data science models.",
      "Built and deployed scalable web applications using React.js and Node.js, integrating machine learning models for end-to-end solutions.",
      "Leveraged D3.js and Chart.js to create interactive data visualizations and dashboards.",
      "Collaborated in agile teams to solve complex problems, enhancing communication and project management skills."
    ],
  },
  {
    title: "Data Science Projects",
    company_name: "Personal Portfolio",
    icon: "https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png&color=000000",
    iconBg: "#383E56",
    date: "2022 - 2024",
    points: [
      "Developed predictive models using Scikit-learn and TensorFlow to solve classification and regression problems.",
      "Performed exploratory data analysis (EDA) on large datasets using Pandas and NumPy.",
      "Created interactive data visualizations using Matplotlib, Seaborn, and Plotly.",
      "Deployed machine learning models as web applications using Streamlit and Flask."
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "The Full Stack Web Development course at PW Skills, taught by Hitesh Choudhary, gave me the confidence to build real-world applications. His practical teaching approach made the learning journey transformative.",
    name: "Hitesh Choudhary",
    designation: "Instructor",
    company: "PW Skills",
    image: "https://avatars.githubusercontent.com/u/11613311?v=4",
  },
  {
    testimonial:
      "The foundation year at IIT Madras BS Data Science program, guided by Professor Andrew Thangaraj, has been incredibly enriching. His hands-on teaching approach has helped me develop a strong foundation in data science.",
    name: "Andrew Thangaraj",
    designation: "Professor",
    company: "IIT Madras",
    image: "https://study.iitm.ac.in/ds/assets/img/academics/instructors/9023_2x.jpg",
  },
  {
    testimonial:
      "With the guidance of exceptional mentors like Andrew Thangaraj and Hitesh Choudhary, I have successfully built personal projects that allowed me to apply concepts practically and tackle real-world challenges.",
    name: "Shiva Yadav",
    designation: "Learner",
    company: "IIT Madras BS Data Science and Applications",
    image: "https://avatars.githubusercontent.com/u/123328731?v=4",
  },
];


const projects = [
  {
    name: "AI Clinical Suite",
    description:
      "An AI-powered web platform for clinical diagnosis, assisting in disease prediction and patient health assessment.",
    problem: "Early diagnosis of disease outbreaks is often delayed due to a lack of accessible, rapid predictive tools.",
    methodology: "Implemented Random Forest and SVM classifiers. Performed extensive data preprocessing (imputation, scaling) using Pandas and Scikit-learn.",
    results: "Achieved 92% prediction accuracy. Reduced potential diagnosis turnaround time by approximately 40% in simulated tests.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "pink-text-gradient",
      },
    ],
    image: dignosis,
    source_code_link: "https://github.com/shiva-yadav-ds/Prediction-of-Disease-Outbreaks",
    live_demo_link: "https://clinical-ai-diagnostic-suite.streamlit.app/",
  },
  {
    name: "IITM Scholar Hub",
    description:
      "A comprehensive platform for IITM students to predict end-term marks and calculate CGPA.",
    problem: "Students lack a centralized tool to track academic progress and predict future performance based on current grades.",
    methodology: "Developed linear regression models to forecast end-term marks. Built a responsive, interactive dashboard using React and TypeScript.",
    results: "Adopted by 500+ students. Improved grade tracking efficiency by 50% and provided actionable academic insights.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "orange-text-gradient",
      }
    ],
    image: iitmhub,
    source_code_link: "https://github.com/shiva-yadav-ds/",
    live_demo_link: "https://iitm-scholar-hub.vercel.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
