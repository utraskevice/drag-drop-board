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
    const listItem = document.createElement(
      singleObject.isInEdit ? "input" : "span"
    );
    const iconDiv = document.createElement("div");
    const removeEl = document.createElement("button");
    const starEl = document.createElement("button");
    const editEl = document.createElement("button");

    listItem.className = singleObject.isInEdit ? "input" : "";
    object.className = "single-object";
    object.setAttribute("draggable", true);
    editEl.innerHTML = singleObject.isInEdit
      ? `<i class="fa-solid fa-check"></i>`
      : `<i class="fa-solid fa-pen"></i>`;
    editEl.className = "icon";
    if (singleObject.isInEdit) {
      listItem.type = "text";
      listItem.value = singleObject.newInput;
    } else {
      listItem.textContent = [index + 1] + ". " + singleObject.newInput;
    }
    starEl.innerHTML = `<i class="fa-solid fa-star"></i>`;
    starEl.className = singleObject.isFavorite ? "favorite" : "icon";
    removeEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removeEl.className = "icon";

    // Remove function
    removeEl.addEventListener("click", () => {
      toDo.splice(index, 1);
      window.localStorage.setItem("toDo", JSON.stringify(toDo));
      render();
    });

    // Favorite function
    starEl.addEventListener("click", () => {
      toDo[index].isFavorite = !toDo[index].isFavorite;
      window.localStorage.setItem("toDo", JSON.stringify(toDo));
      render();
    });

    // Edit function
    editEl.addEventListener("click", () => {
      if (singleObject.isInEdit) {
        toDo[index].newInput = listItem.value;
      }
      toDo[index].isInEdit = !toDo[index].isInEdit;
      window.localStorage.setItem("toDo", JSON.stringify(toDo));
      render();
    });

    iconDiv.append(removeEl, starEl, editEl);
    object.append(listItem, iconDiv);
    toDoList.append(object);
  });

  document.querySelector("#to-do").append(toDoList);
}

document.querySelector("#input-container").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newToDo = Object.assign(Object.fromEntries(formData), {
    isFavorite: false,
    isInEdit: false,
  });
  toDo = toDo.concat(newToDo);

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
