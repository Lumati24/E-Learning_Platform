// Course data
const courses = [
  {
    id: 1,
    title: "Introduction to HTML",
    description: "Learn the basics of HTML for web development.",
    lessons: [
      "What is HTML?",
      "HTML Elements",
      "Links and Images",
      "Lists and Tables"
    ]
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    description: "Style your web pages with CSS.",
    lessons: [
      "Selectors and Properties",
      "Box Model",
      "Flexbox and Grid",
      "Responsive Design"
    ]
  },
  {
    id: 3,
    title: "JavaScript Basics",
    description: "Get started with JavaScript programming.",
    lessons: [
      "Variables and Data Types",
      "Functions",
      "DOM Manipulation",
      "Events"
    ]
  }
];

// State
let currentView = "home"; // or "course"
let selectedCourseId = null;
let completedCourses = JSON.parse(localStorage.getItem("completedCourses") || "[]");

// Render functions
function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Mini E-Learning Platform</h1>
    <ul class="course-list">
      ${courses.map(course => `
        <li class="course-item">
          <span class="course-title" data-id="${course.id}">${course.title}</span>
          ${completedCourses.includes(course.id) ? '<span class="completed-label">Completed</span>' : ''}
        </li>
      `).join("")}
    </ul>
  `;

  document.querySelectorAll('.course-title').forEach(el => {
    el.addEventListener('click', () => {
      selectedCourseId = Number(el.getAttribute('data-id'));
      currentView = "course";
      render();
    });
  });
}

function renderCourseDetail() {
  const course = courses.find(c => c.id === selectedCourseId);
  if (!course) return renderHome();

  const isCompleted = completedCourses.includes(course.id);

  const app = document.getElementById("app");
  app.innerHTML = `
    <button class="button" id="backBtn">&larr; Back</button>
    <h2>${course.title}</h2>
    <p>${course.description}</p>
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" id="progressBar"></div>
    </div>
    <ul class="lesson-list">
      ${course.lessons.map(lesson => `
        <li class="lesson-item">${lesson}</li>
      `).join("")}
    </ul>
    <div style="margin-top: 24px;">
      ${isCompleted
        ? '<span class="completed-label">Course Completed</span>'
        : `<button class="button" id="completeBtn">Mark as Completed</button>`
      }
    </div>
  `;

  document.getElementById('backBtn').onclick = () => {
    currentView = "home";
    render();
  };

  if (!isCompleted) {
    document.getElementById('completeBtn').onclick = () => {
      completedCourses.push(course.id);
      localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
      render();
    };
  }

  // Animate progress bar
  setTimeout(() => {
    const progress = isCompleted ? 100 : 0;
    document.getElementById('progressBar').style.width = progress + "%";
  }, 100);
}

function render() {
  if (currentView === "home") {
    renderHome();
  } else if (currentView === "course") {
    renderCourseDetail();
  }
}

// Initial render
render();