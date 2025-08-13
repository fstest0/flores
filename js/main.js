
// Daily color palettes for flowers
const colorPalettes = [
  { name: "Sunset Bliss", colors: ["#ff6b6b", "#ffd93d", "#6bcf7f"] },
  { name: "Ocean Dreams", colors: ["#4ecdc4", "#45b7d1", "#96ceb4"] },
  { name: "Royal Purple", colors: ["#a8e6cf", "#dcedc1", "#ffd3a5"] },
  { name: "Cherry Blossom", colors: ["#ffc0cb", "#ffb6c1", "#f0e68c"] },
  { name: "Autumn Glow", colors: ["#ff8c42", "#ffd662", "#ff6b35"] },
  { name: "Lavender Fields", colors: ["#c7ceea", "#b19cd9", "#ffc8dd"] },
  { name: "Tropical Paradise", colors: ["#ff9a9e", "#fecfef", "#fecfef"] }
];



// Daily experience titles
const dailyTitles = [
  "UM ABRAÇO",
  "UM BEIJO",
  "UM SORRISO",
  "UMELOGIO",
  "UM MOMENTO JUNTOS",
  "UM DATE",
  "UM VALE TUDO"
];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getTodaysColors() {
  const dayIndex = getDayOfYear() % colorPalettes.length;
  return colorPalettes[dayIndex];
}

function getTodaysTitle() {
  const dayIndex = getDayOfYear() % dailyTitles.length;
  return dailyTitles[dayIndex];
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