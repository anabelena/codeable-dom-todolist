// Elements
const taskButton = document.getElementById("task-button");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Filters
const filterButtons = document.querySelectorAll("#filters button");
console.log(filterButtons)
// Listeners
// Add Task
taskButton.addEventListener("click", addTask);

function addTask(event) {

  event.preventDefault();

  const taskText = taskInput.value;
  if (taskText==="") return

  // li
  const li = document.createElement("li");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // Event listener for checkbox
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.setAttribute("data-status", "completed");
      li.className = "completed"
    } else {
      li.setAttribute("data-status", "pending");
      li.className = "pending"
    }
  });

  // span
  const span = document.createElement("span")
  span.textContent = taskText

  // Delete Button
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "🗑️";
  // Event listerner for Delete button
  btnDelete.addEventListener("click", () => {
     taskList.removeChild(li);
  });

  li.append(checkbox, span, btnDelete);
  li.setAttribute("data-status", "pending");
  li.className = "pending"
  taskList.append(li);
  taskInput.value = "";
}

// Función que aplica el filtro activo
function updateFilter() {

  const activeBtn = document.querySelector("#filters button.active");
  const filter = activeBtn.dataset.filter; // all,completed,pending
  const tasks = taskList.querySelectorAll("li"); 

  tasks.forEach(li => {
    if (filter === "all") {
      li.style.display = "flex"; // show all
    } else {
      li.style.display = li.dataset.status === filter ? "flex" : "none";
    }
  });
}

// Filter Button Event listener
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // delete status active 
    filterButtons.forEach(b => b.classList.remove("active"));
    // add status to clicked button
    btn.classList.add("active");
    //apply filter!
    updateFilter();
  });
});

