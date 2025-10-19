const API = "http://localhost:5000/api";
let token = "";

function showRegister() {
  document.querySelector("#registerCard").classList.remove("hidden");
  document.querySelector(".card").classList.add("hidden");
}

function showLogin() {
  document.querySelector("#registerCard").classList.add("hidden");
  document.querySelector(".card").classList.remove("hidden");
}

async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });
  await res.json();
  alert("Compte créé ✅");
  showLogin();
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadFarms();
  } else alert("Erreur de connexion ⚠️");
}

function logout() {
  token = "";
  localStorage.removeItem("token");
  location.reload();
}

async function createFarm() {
  const name = document.getElementById("farmName").value;
  const location = document.getElementById("farmLoc").value;
  const res = await fetch(`${API}/farms`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ name, location })
  });
  await res.json();
  loadFarms();
}

async function loadFarms() {
  const res = await fetch(`${API}/farms`, { headers: { "Authorization": "Bearer " + token } });
  const farms = await res.json();
  const container = document.getElementById("farmList");
  container.innerHTML = "";
  farms.forEach(farm => {
    const farmCard = document.createElement("div");
    farmCard.className = "farm-card";
    farmCard.innerHTML = `
      <h3>${farm.name} 🌾 (${farm.location})</h3>
      <div>
        <input id="valveName-${farm._id}" placeholder="Nom vanne">
        <input id="valveLoc-${farm._id}" placeholder="Localisation">
        <button onclick="addValve('${farm._id}')">+ Ajouter Vanne</button>
        <button class="delete-btn" onclick="deleteFarm('${farm._id}')">Supprimer Ferme</button>
      </div>
      <div id="valves-${farm._id}"></div>
    `;
    container.appendChild(farmCard);
    loadValves(farm._id);
  });
}

async function deleteFarm(id) {
  if (!confirm("Supprimer cette ferme ?")) return;
  await fetch(`${API}/farms/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });
  loadFarms();
}

async function addValve(farmId) {
  const name = document.getElementById(`valveName-${farmId}`).value;
  const location = document.getElementById(`valveLoc-${farmId}`).value;
  await fetch(`${API}/valves/${farmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ name, location, farm: farmId })
  });
  loadValves(farmId);
}

async function loadValves(farmId) {
  const res = await fetch(`${API}/valves/${farmId}`, { headers: { "Authorization": "Bearer " + token } });
  const valves = await res.json();
  const container = document.getElementById(`valves-${farmId}`);
  container.innerHTML = "";
  valves.forEach(v => {
    const div = document.createElement("div");
    div.className = "valve-card";
    div.innerHTML = `
      <span>💧 ${v.name} (${v.state.toUpperCase()})</span>
      <div>
        <button class="toggle-btn ${v.state === "on" ? "toggle-on" : "toggle-off"}"
          onclick="toggleValve('${v._id}', '${v.state}', '${farmId}')">
          ${v.state === "on" ? "OFF" : "ON"}
        </button>
        <button class="delete-btn" onclick="deleteValve('${v._id}', '${farmId}')">🗑</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function toggleValve(id, state, farmId) {
  const newState = state === "on" ? "off" : "on";
  await fetch(`${API}/valves/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ state: newState })
  });
  loadValves(farmId);
}

async function deleteValve(id, farmId) {
  if (!confirm("Supprimer cette vanne ?")) return;
  await fetch(`${API}/valves/update/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });
  loadValves(farmId);
}