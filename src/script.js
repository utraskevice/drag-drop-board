let toDo = [];

function render() {
  const toDoId = "toDoList";
  const toDoList =
    document.querySelector(`#${toDoId}`) || document.createElement("ul");

  toDoList.innerHTML = null;
  toDoList.id = toDoId;

  toDo.forEach((singleObject) => {
    // console.log("Draw:", singleObject);
    const object = document.createElement("li");

    object.textContent = singleObject.newInput;

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
