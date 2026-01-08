/* THEME ENGINE */
/* THEME ENGINE */
const root = document.documentElement;
const op1 = "0.3";
const op2 = "0.5";
const themes = {
  cyber: {
    accent: "#00d4ff",
    glow: "rgba(0, 212, 255, 0.3)",
    // Custom Blue for Cyber (as per your request)
    btnColor: "#00d4ff",
    btnSecondary: "#035fffff",
    overlay: `linear-gradient(135deg, rgba(0,0,0,${op1}) 0%, rgba(5,15,30,${op2}) 100%)`,
  },
  matrix: {
    accent: "#00ff41",
    glow: "rgba(0, 255, 65, 0.3)",
    // Matrix Green Button
    btnColor: "#00cc33",
    btnSecondary: "#008f24",
    overlay: `linear-gradient(135deg, rgba(0,20,0,${op1}) 0%, rgba(0,0,0,${op2}) 100%)`,
  },
  crimson: {
    accent: "#ff003c",
    glow: "rgba(255, 0, 60, 0.3)",
    // Deep Red Button
    btnColor: "#d90033",
    btnSecondary: "#990024",
    overlay: `linear-gradient(135deg, rgba(30,0,0,${op1}) 0%, rgba(10,0,0,${op2}) 100%)`,
  },
  classic: {
    accent: "#ffffff",
    glow: "rgba(255, 255, 255, 0.2)",
    // White/Grey Button
    btnColor: "#e0e0e0",
    btnSecondary: "#b3b3b3",
    overlay: "linear-gradient(135deg, #181818ff 0%, #000 100%)",
  },
  sunset: {
    accent: "#f5576c",
    glow: "rgba(245, 87, 108, 0.3)",
    // Pinkish-Red Button
    btnColor: "#d1364e",
    btnSecondary: "#a3263a",
    overlay: `linear-gradient(135deg, rgba(45,10,30,${op1}) 0%, rgba(10,5,15,${op2}) 100%)`,
  },
  purple: {
    accent: "#667eea",
    glow: "rgba(102, 126, 234, 0.3)",
    // Deep Purple Button
    btnColor: "#5a6fd6",
    btnSecondary: "#4554a3",
    overlay: `linear-gradient(135deg, rgba(25,10,40,${op1}) 0%, rgba(10,5,20,${op2}) 100%)`,
  },
  ocean: {
    accent: "#2ebf91",
    glow: "rgba(46, 191, 145, 0.3)",
    // Teal Button
    btnColor: "#259c76",
    btnSecondary: "#1b7357",
    overlay: `linear-gradient(135deg, rgba(0,20,30,${op1}) 0%, rgba(5,10,20,${op2}) 100%)`,
  },
  gold: {
    accent: "#ffd200",
    glow: "rgba(255, 210, 0, 0.3)",
    // Gold/Yellow Button
    btnColor: "#e6bd00",
    btnSecondary: "#b39200",
    overlay:
      `linear-gradient(135deg, rgba(30,20,0,${op1}) 0%, rgba(15,10,0,${op2}) 100%)`,
  },
};

window.setTheme = (themeName) => {
  const t = themes[themeName];
  if (!t) return;

  // Set the Standard Theme Colors
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-glow", t.glow);
  root.style.setProperty("--bg-overlay", t.overlay);

  // Set the New Button Colors
  root.style.setProperty("--accent-btn", t.btnColor);
  root.style.setProperty("--accent-btn-secondary", t.btnSecondary);

  localStorage.setItem("lively-theme-pref", themeName);
};

const savedTheme = localStorage.getItem("lively-theme-pref");
if (savedTheme) window.setTheme(savedTheme);

/* WEATHER API */
const apikey = "dd35574ca84c015a1ec4acd1de4a5dd3";
const city = "dehradun";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apikey}`;

async function fetchWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    document.getElementById("city").innerText = data.name.toUpperCase();
    document.getElementById("description").innerText =
      data.weather[0].description.toUpperCase();

    let temp = Math.round(data.main.temp);
    document.getElementById("Temprature").innerText = temp + "°C";
    document.getElementById("windSpeed").innerText =
      "WIND: " + data.wind.speed + " M/S";
  } catch (err) {
    console.error("Weather offline");
  }
}
fetchWeather();
setInterval(fetchWeather, 900000); // Update every 15 mins

/* SEARCH ENGINE SWITCHER (UPDATED FOR 3D BUTTONS) */
let currentEngine = "google";
const searchEngines = {
  google: {
    url: "https://www.google.com/search?q=",
    placeholder: "Search Google...",
  },
  youtube: {
    url: "https://www.youtube.com/results?search_query=",
    placeholder: "Search YouTube videos...",
  },
  mdn: {
    url: "https://developer.mozilla.org/en-US/search?q=",
    placeholder: "Search MDN Web Docs...",
  },
  wikipedia: {
    url: "https://en.wikipedia.org/wiki/Special:Search?search=",
    placeholder: "Search Wikipedia...",
  },
  github: {
    url: "https://github.com/search?q=",
    placeholder: "Search GitHub repositories...",
  },
};

window.setSearchEngine = (engine) => {
  currentEngine = engine;

  // 1. Handle Visuals (The 3D Buttons)
  const buttons = document.querySelectorAll(".threed-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Map engine names to button indexes based on HTML order
  const engineMap = {
    google: 0,
    youtube: 1,
    mdn: 2,
    wikipedia: 3,
    github: 4,
  };

  if (engineMap[engine] !== undefined) {
    buttons[engineMap[engine]].classList.add("active");
  }

  // 2. Handle Search Input Placeholder
  const searchInput = document.getElementById("google-search");
  if (searchEngines[engine]) {
    searchInput.placeholder = searchEngines[engine].placeholder;
  }

  searchInput.focus();
};

window.handleSearch = (event) => {
  if (event.key === "Enter") {
    const query = document.getElementById("google-search").value;
    if (query) {
      const engine = searchEngines[currentEngine];
      window.open(engine.url + encodeURIComponent(query), "_blank");
      document.getElementById("google-search").value = "";
    }
  }
};

/* CLOCK */
function updateClock() {
  const now = new Date();
  document.getElementById("time-display").textContent = now.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  document.getElementById("date-display").textContent = now.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );

  const hr = now.getHours();
  let greet = "SYSTEM ONLINE";
  if (hr >= 5 && hr < 12) greet = "GOOD MORNING";
  else if (hr >= 12 && hr < 17) greet = "GOOD AFTERNOON";
  else if (hr >= 17 && hr < 22) greet = "GOOD EVENING";
  document.getElementById("greeting").textContent = `${greet} // KASHIF`;
}
setInterval(updateClock, 1000);
updateClock();

/* DROPDOWN MENU LOGIC */
window.toggleDropdown = (id) => {
  const content = document.getElementById(`dropdown-${id}`);
  const btn = event.target.closest(".dropdown-btn");
  const isShown = content.classList.contains("show");

  // Close all other dropdowns
  document
    .querySelectorAll(".dropdown-content")
    .forEach((el) => el.classList.remove("show"));
  document
    .querySelectorAll(".dropdown-btn")
    .forEach((el) => el.classList.remove("active"));

  // Toggle the clicked one
  if (!isShown) {
    content.classList.add("show");
    btn.classList.add("active");
  }
};

// Close dropdowns when clicking outside
window.onclick = function (event) {
  if (!event.target.closest(".dropdown-btn")) {
    document
      .querySelectorAll(".dropdown-content")
      .forEach((el) => el.classList.remove("show"));
    document
      .querySelectorAll(".dropdown-btn")
      .forEach((el) => el.classList.remove("active"));
  }
};

/* TODO LIST LOGIC */
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("lively-todos")) || [];
  todoList.innerHTML = "";
  todos.forEach((task) => createTodoElement(task));
}

function createTodoElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `${task} <span style="cursor:pointer; font-weight:bold; color:var(--accent);" onclick="removeTodo(this)">✕</span>`;
  todoList.appendChild(li);
}

window.addTodo = () => {
  const task = todoInput.value.trim();
  if (task) {
    createTodoElement(task);
    saveTodos();
    todoInput.value = "";
  }
};

// Allow adding todo with Enter key
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    window.addTodo();
  }
});

window.removeTodo = (btn) => {
  btn.parentElement.remove();
  saveTodos();
};

function saveTodos() {
  const tasks = [];
  todoList.querySelectorAll("li").forEach((li) => {
    // Get just the text, not the X button text
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem("lively-todos", JSON.stringify(tasks));
}

// Initialize Todos
loadTodos();

/* STOPWATCH LOGIC */
let swInterval;
let swSeconds = 0;

function formatTime(sec) {
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

window.swStart = () => {
  if (swInterval) return; // Prevent multiple intervals
  swInterval = setInterval(() => {
    swSeconds++;
    document.getElementById("stopwatch-display").innerText =
      formatTime(swSeconds);
  }, 1000);
};

window.swStop = () => {
  clearInterval(swInterval);
  swInterval = null;
};

window.swReset = () => {
  swStop();
  swSeconds = 0;
  document.getElementById("stopwatch-display").innerText = "00:00:00";
};

/* MOUSE GLOW EFFECT */
const glow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* --- DYNAMIC FONT SCALING --- */
const fontSizeInp = document.getElementById("font-slider");

// 1. Define your Default "Base" Sizes here (Numeric values only)
const baseFontSizes = {
  "--font-size-greeting": 2.6,
  "--font-size-card-title": 2.2,
  "--font-size-weather-city": 4.0, // I updated this to match your list
  "--font-size-weather-temp": 3.6,
  "--font-size-weather-detail": 1.9,
  "--font-size-dropdown-btn": 1.7, // Was 1.2 in your comment, adjusted to fit theme
  "--font-size-dropdown-link": 2.05, // Adjusted to fit theme
  "--font-size-todo-item": 1.1,
  "--font-size-general-btn": 1.6,
  "--font-size-stopwatch": 3.8, // Was 2.8, kept your original large size
};

// 2. The Scaling Function
if (fontSizeInp) {
  fontSizeInp.addEventListener("input", (e) => {
    // The slider value represents the "change" (e.g., +0.5 or -0.2)
    const offset = parseFloat(e.target.value);

    // Loop through every font variable and update it
    for (const [variable, baseValue] of Object.entries(baseFontSizes)) {
      // Formula: Base Size + Slider Offset
      // Example: Greeting (2.6) + Slider (0.5) = 3.1rem
      const newSize = (baseValue + offset).toFixed(2);

      root.style.setProperty(variable, `${newSize}rem`);
    }

    // Optional: Save preference
    localStorage.setItem("lively-font-offset", offset);
  });

  // 3. Load Saved Font Size on Startup
  const savedFontOffset = localStorage.getItem("lively-font-offset");
  if (savedFontOffset) {
    fontSizeInp.value = savedFontOffset;
    // Trigger the update manually
    fontSizeInp.dispatchEvent(new Event("input"));
  }
}
