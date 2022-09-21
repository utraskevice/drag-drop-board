let toDo = [];

function render() {
  const toDoId = "toDoList";
  const toDoList =
    document.querySelector(`#${toDoId}`) || document.createElement("ul");

  toDoList.innerHTML = null;
  toDoList.id = toDoId;

  toDo.forEach((singleObject, index) => {
    // console.log("Draw:", singleObject);
    const object = document.createElement("li");
    const iconDiv = document.createElement("div");
    const removeEl = document.createElement("button");
    const starEl = document.createElement("button");
    const editEl = document.createElement("button");

    object.textContent = singleObject.newInput;
    object.className = "single-object";
    object.setAttribute("draggable", true);
    editEl.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    editEl.className = "icon";
    starEl.innerHTML = `<i class="fa-solid fa-star"></i>`;
    starEl.classList.add("icon");
    removeEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removeEl.className = "icon";

    // Remove function

    removeEl.addEventListener("click", () => {
      toDo.splice(index, 1);
      window.localStorage.setItem("toDo", JSON.stringify(toDo));
      render();
    });

    iconDiv.append(removeEl, starEl, editEl);
    object.append(iconDiv);
    toDoList.append(object);
  });

  document.querySelector("#to-do").append(toDoList);
}

document.querySelector("#input-container").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  toDo = toDo.concat(Object.fromEntries(formData));

  window.localStorage.setItem("toDo", JSON.stringify(toDo));
  e.target.reset();
  render();
});

window.addEventListener("DOMContentLoaded", () => {
  const toDoObject = window.localStorage.getItem("toDo");
  if (toDoObject) {
    // console.log("New object");
    toDo = JSON.parse(toDoObject);
    render();
  }
});
