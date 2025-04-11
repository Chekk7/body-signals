document.getElementById("signalForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const part = document.getElementById("part").value;
    const observation = document.getElementById("observation").value;
    const condition = document.getElementById("condition").value;
    await fetch("/signals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ part, observation, condition })
    });
    document.getElementById("signalForm").reset();
    loadSignals();
  });
  
  async function loadSignals() {
    const res = await fetch("/signals");
    const signals = await res.json();
    const list = document.getElementById("signalList");
    list.innerHTML = "";
    signals.forEach(signal => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${signal.part}:</strong> ${signal.observation} - ${signal.condition} (Added: ${signal.added})`;
      list.appendChild(li);
    });
  }
  
  loadSignals();