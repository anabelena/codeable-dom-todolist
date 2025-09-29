// Elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const filterBtns = document.querySelectorAll("#filters button");

// ===== Listeners ====
// SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value;
  if (!taskText) return;
  addTask(taskText);
  updateFilter()
  taskInput.value = "";
});

// FILTERS BUTTONS
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateFilter();
  });
});

function addTask(taskText) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const btnDelete = document.createElement("button");

  li.dataset.status = "pending";
  checkbox.type = "checkbox";
  span.textContent = taskText;
  btnDelete.textContent = "🗑️";

  // ===Events===
  checkbox.addEventListener("change", () => {
    li.setAttribute("data-status", checkbox.checked ? "completed" : "pending");
  });
  btnDelete.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  li.append(checkbox, span, btnDelete);
  taskList.append(li);
}

function updateFilter() {
  const activeBtn = document.querySelector("#filters button.active");
  const filter = activeBtn.dataset.filter; // all,completed,pending
  taskList.querySelectorAll("li").forEach((li) => {
    if (filter === "all") {
      li.style.display = "flex";
    } else {
      li.style.display = li.dataset.status === filter ? "flex" : "none";
    }
  });
}
