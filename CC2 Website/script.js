const defaultData = {
  name: "Your Name",
  title: "Student | Designer | Developer",
  intro: "I am a student who enjoys learning, creating, and improving my skills in technology and design.",
  about: "I am passionate about technology, creativity, and problem-solving. I enjoy learning new things, building projects, and becoming better every day.",
  skills: [
    { title: "HTML", description: "Creating structured and well-designed web pages." },
    { title: "CSS", description: "Designing clean layouts and responsive interfaces." },
    { title: "JavaScript", description: "Adding interactivity and dynamic web elements." },
    { title: "Design", description: "Creating user-friendly and visually appealing experiences." }
  ],
  projects: [
    { title: "School Website", description: "A project built to share school activities and information." },
    { title: "Personal Blog", description: "A blog where I write about my ideas, interests, and learning journey." },
    { title: "Portfolio Design", description: "A creative portfolio page that reflects my personality and style." }
  ],
  email: "yourname@email.com",
  phone: "+123 456 789",
  instagram: "@yourname",
  github: "github.com/yourname",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
};

const storageKey = "portfolioData";

function getPortfolioData() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : defaultData;
}

function savePortfolioData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function renderSkills(skills) {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";

  skills.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `
      <h4>${skill.title}</h4>
      <p>${skill.description}</p>
    `;
    skillsList.appendChild(card);
  });
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projectsList");
  projectsList.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    `;
    projectsList.appendChild(card);
  });
}

function renderPortfolio() {
  const data = getPortfolioData();

  document.getElementById("nameDisplay").textContent = data.name;
  document.getElementById("titleDisplay").textContent = data.title;
  document.getElementById("introDisplay").textContent = data.intro;
  document.getElementById("aboutDisplay").textContent = data.about;
  document.getElementById("emailDisplay").textContent = data.email;
  document.getElementById("phoneDisplay").textContent = data.phone;
  document.getElementById("instagramDisplay").textContent = data.instagram;
  document.getElementById("githubDisplay").textContent = data.github;
  document.getElementById("footerName").textContent = data.name;
  document.getElementById("yearDisplay").textContent = new Date().getFullYear();

  document.getElementById("profileImage").src = data.image;

  renderSkills(data.skills);
  renderProjects(data.projects);

  document.getElementById("nameInput").value = data.name;
  document.getElementById("titleInput").value = data.title;
  document.getElementById("introInput").value = data.intro;
  document.getElementById("aboutInput").value = data.about;
  document.getElementById("emailInput").value = data.email;
  document.getElementById("phoneInput").value = data.phone;
  document.getElementById("instagramInput").value = data.instagram;
  document.getElementById("githubInput").value = data.github;

  const skillsText = data.skills.map(s => `${s.title}: ${s.description}`).join("\n");
  const projectsText = data.projects.map(p => `${p.title}: ${p.description}`).join("\n");

  document.getElementById("skillsInput").value = skillsText;
  document.getElementById("projectsInput").value = projectsText;
}

function parseSkills(text) {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  return lines.map(line => {
    const [title, ...rest] = line.split(":");
    return {
      title: title.trim(),
      description: rest.join(":").trim() || "My skill"
    };
  });
}

function parseProjects(text) {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  return lines.map(line => {
    const [title, ...rest] = line.split(":");
    return {
      title: title.trim(),
      description: rest.join(":").trim() || "My project"
    };
  });
}

document.getElementById("editBtn").addEventListener("click", () => {
  document.getElementById("formModal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("formModal").classList.add("hidden");
});

document.getElementById("portfolioForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const data = getPortfolioData();

  data.name = document.getElementById("nameInput").value || "Your Name";
  data.title = document.getElementById("titleInput").value || "Student | Designer | Developer";
  data.intro = document.getElementById("introInput").value || defaultData.intro;
  data.about = document.getElementById("aboutInput").value || defaultData.about;
  data.email = document.getElementById("emailInput").value || "yourname@email.com";
  data.phone = document.getElementById("phoneInput").value || "+123 456 789";
  data.instagram = document.getElementById("instagramInput").value || "@yourname";
  data.github = document.getElementById("githubInput").value || "github.com/yourname";

  const skillsInput = document.getElementById("skillsInput").value.trim();
  const projectsInput = document.getElementById("projectsInput").value.trim();

  data.skills = skillsInput ? parseSkills(skillsInput) : defaultData.skills;
  data.projects = projectsInput ? parseProjects(projectsInput) : defaultData.projects;

  savePortfolioData(data);
  renderPortfolio();

  document.getElementById("formModal").classList.add("hidden");
});

document.getElementById("photoInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = getPortfolioData();
    data.image = e.target.result;
    savePortfolioData(data);
    renderPortfolio();
  };
  reader.readAsDataURL(file);
});

renderPortfolio();