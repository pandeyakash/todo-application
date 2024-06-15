const form = document.querySelector("form");
const title = document.querySelector("#title");
const pLevel = document.querySelector("#p-level");
const tBody = document.querySelector("table tbody");
const filterPriority = document.querySelector("#priority");
const filterStatus = document.querySelector("#status");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let archives = JSON.parse(localStorage.getItem("archives")) || [];
displayTodo(todos);
filterPriority.addEventListener("change", (ele) => {
  let filterToDos = filterToDo(todos, filterPriority.value, "pLevel");
  displayTodo(filterToDos);
});

filterStatus.addEventListener("change", (ele) => {
  let filterToDos = filterToDo(todos, filterStatus.value, "status");
  displayTodo(filterToDos);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  todoSubmit();
});

function todoSubmit() {
  let todo = {
    title: title.value,
    pLevel: pLevel.value,
    status: "Pending🔃",
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodo(todos);
}

function displayTodo(todos) {
  tBody.innerHTML = "";

  todos.forEach((ele, i) => {
    const row = document.createElement("tr");

    const t = document.createElement("td");
    const p = document.createElement("td");
    const s = document.createElement("td");
    const d = document.createElement("td");

    const db = document.createElement("button");

    t.textContent = ele.title;
    p.textContent = ele.pLevel;
    s.textContent = ele.status;
    p.classList.add(ele.pLevel);

    db.textContent = "Archive";
    d.append(db);

    row.append(t, p, s, d);

    tBody.append(row);

    s.addEventListener("click", () => {
      if (ele.status === "Pending🔃") {
        ele.status = "Completed✅";
        localStorage.setItem("todos", JSON.stringify(todos));
        s.textContent = ele.status;
      } else if (ele.status === "Completed✅") {
        ele.status = "Pending🔃";
        localStorage.setItem("todos", JSON.stringify(todos));
        s.textContent = ele.status;
      }
    });

    db.addEventListener("click", () => {
      let archive = todos.splice(i, 1);
      archives = [...archives, ...archive];
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("archives", JSON.stringify(archives));
      displayTodo(todos);
    });
  });
}

function filterToDo(todos, filterBy, value) {
  let filterToDos = [];
  if (filterBy !== "All") {
    filterToDos = todos.filter((ele) => {
      return ele[value] === filterBy;
    });
    return filterToDos;
  }
  return todos;
}
