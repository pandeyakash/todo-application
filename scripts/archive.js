const tbody = document.querySelector("table tbody");

let archives = JSON.parse(localStorage.getItem("archives")) || [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(archives);

displayArchives();

function displayArchives() {
  tbody.textContent = "";
  archives.forEach((ele, i) => {
    let row = document.createElement("tr");

    let t = document.createElement("td");
    let p = document.createElement("td");
    let s = document.createElement("td");
    let r = document.createElement("td");
    let d = document.createElement("td");

    let rb = document.createElement("button");
    let db = document.createElement("button");

    rb.textContent = "Restore";
    db.textContent = "Delete";

    console.log(ele);
    t.textContent = ele.title;
    p.textContent = ele.pLevel;
    s.textContent = ele.status;
    p.classList.add(ele.pLevel);

    r.append(rb);
    d.append(db);

    row.append(t, p, s, r, d);

    tbody.append(row);

    rb.addEventListener("click", () => {
      let restore = archives.splice(i, 1);
      todos = [...todos, ...restore];
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("archives", JSON.stringify(archives));
      displayArchives();
    });

    db.addEventListener("click", () => {
      archives.splice(i, 1);
      localStorage.setItem("archives", JSON.stringify(archives));
      displayArchives();
    });
  });
}
