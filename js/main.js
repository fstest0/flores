
const colorPalettes = [
  { name: "Sunset Bliss", colors: ["#ff6b6b", "#ffd93d", "#6bcf7f"] },
  { name: "Ocean Dreams", colors: ["#4ecdc4", "#45b7d1", "#96ceb4"] },
  { name: "Royal Purple", colors: ["#a8e6cf", "#dcedc1", "#ffd3a5"] },
  { name: "Cherry Blossom", colors: ["#ffc0cb", "#ffb6c1", "#f0e68c"] },
  { name: "Autumn Glow", colors: ["#ff8c42", "#ffd662", "#ff6b35"] },
  { name: "Lavender Fields", colors: ["#c7ceea", "#b19cd9", "#ffc8dd"] },
  { name: "Tropical Paradise", colors: ["#ff9a9e", "#fecfef", "#fecfef"] },
  { name: "Midnight Blues", colors: ["#1e3a8a", "#3b82f6", "#60a5fa"] },
  { name: "Starlight Silver", colors: ["#e5e7eb", "#d1d5db", "#9ca3af"] },
  { name: "Cosmic Violet", colors: ["#7c3aed", "#a855f7", "#c084fc"] },
  { name: "Forest Shadows", colors: ["#065f46", "#059669", "#10b981"] },
  { name: "Rose Gold Night", colors: ["#f59e0b", "#fbbf24", "#fcd34d"] },
  { name: "Deep Sea", colors: ["#0f172a", "#1e293b", "#334155"] },
  { name: "Aurora Glow", colors: ["#06b6d4", "#22d3ee", "#67e8f9"] },
  { name: "Ember Flames", colors: ["#dc2626", "#ef4444", "#f87171"] },
  { name: "Moonbeam White", colors: ["#f8fafc", "#f1f5f9", "#e2e8f0"] },
  { name: "Twilight Mist", colors: ["#6366f1", "#8b5cf6", "#a78bfa"] },
  { name: "Garden Moss", colors: ["#16a34a", "#22c55e", "#4ade80"] }
];

// Daily experience titles
const dailyTitles = [
  "UM ABRAÇO",
  "UM BEIJO",
  "UM SORRISO",
  "UM ELOGIO",
  "UM MOMENTO JUNTINHOS",
  "UM DATE",
  "UM VALE TUDO",
  "UM DIA ABRAÇADOS",
  "UM FILME",
  "UMA SÉRIE",
  "UM JANTAR",
  "UM ALMOÇO",
  "UM LANCHE",
  "UM PASSEIO",
  "DORMIR ENCOSTADOS",
  "UM CHOCOLATE"
];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Pseudo-random function that's consistent per day but seemingly random
function getDailyIndex(seed, arrayLength) {
  const day = getDayOfYear();
  // Create a pseudo-random but consistent seed for the day
  const hash = Math.sin((day + seed) * 12345.6789) * 10000;
  return Math.floor(Math.abs(hash) % arrayLength);
}

function getTodaysColors() {
  // Use seed 42 for colors
  const colorIndex = getDailyIndex(42, colorPalettes.length);
  return colorPalettes[colorIndex];
}

function getTodaysTitle() {
  // Use seed 123 for titles (different from colors)
  const titleIndex = getDailyIndex(123, dailyTitles.length);
  return dailyTitles[titleIndex];
}

function applyDailyColors() {
  const palette = getTodaysColors();
  const root = document.documentElement;
  
  // Apply colors to flower elements
  root.style.setProperty('--petal-color-1', palette.colors[0]);
  root.style.setProperty('--petal-color-2', palette.colors[1]);
  root.style.setProperty('--petal-color-3', palette.colors[2]);
  
  console.log(`Today's palette: ${palette.name}`, palette.colors);
}

function setupTicket() {
  const showBtn = document.getElementById('showTicketBtn');
  const hideBtn = document.getElementById('hideTicketBtn');
  const ticket = document.getElementById('ticket');
  const ticketDate = document.getElementById('ticketDate');
  const dailyReward = document.getElementById('dailyReward');
  const dailyTitle = document.getElementById('dailyTitle');
  
  // Set today's date, reward, and title
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  ticketDate.textContent = today;
  dailyTitle.textContent = getTodaysTitle();
  
  // Button event listeners
  showBtn.addEventListener('click', () => {
    ticket.classList.remove('hidden');
    ticket.classList.add('show');
    showBtn.style.display = 'none';
    hideBtn.style.display = 'block';
  });
  
  hideBtn.addEventListener('click', () => {
    ticket.classList.remove('show');
    ticket.classList.add('hidden');
    hideBtn.style.display = 'none';
    showBtn.style.display = 'block';
  });
}

onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    
    // Apply daily colors to flowers
    applyDailyColors();
    
    // Setup ticket functionality
    setupTicket();

    clearTimeout(c);
  }, 1000);
};
