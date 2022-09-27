let toDo = [];
let inProgress = [];
let done = [];
const containers = document.querySelectorAll(".container");

let object = null;

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
  object = this;
  //   console.log("dragStart");
}
function dragEnd() {
  object = null;
  //   console.log("dragEnd");
}

containers.forEach((singleContainer) => {
  singleContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  singleContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    const objectId = e.dataTransfer.getData("text");
    e.target.append(document.getElementById(objectId));
  });
});

// Remove function
function deleteObject(index) {
  toDo.splice(index, 1);
  window.localStorage.setItem("toDo", JSON.stringify(toDo));
  render();
}
// Favorite function
function favoriteObject(index) {
  toDo[index].isFavorite = !toDo[index].isFavorite;
  window.localStorage.setItem("toDo", JSON.stringify(toDo));
  render();
}

// Edit function
function editObject(singleObject, listItem, index) {
  if (singleObject.isInEdit) {
    toDo[index].newInput = listItem.value;
  }
  toDo[index].isInEdit = !toDo[index].isInEdit;
  window.localStorage.setItem("toDo", JSON.stringify(toDo));
  render();
}

function render() {
  const toDoId = "toDoList";
  const toDoList =
    document.querySelector(`#${toDoId}`) || document.createElement("ul");
  const inProgressId = "inProgressList";
  const inProgressList =
    document.querySelector(`#${inProgressId}`) || document.createElement("ul");
  const doneId = "doneList";
  const doneList =
    document.querySelector(`#${doneId}`) || document.createElement("ul");

  toDoList.innerHTML = null;
  toDoList.id = toDoId;
  inProgressList.innerHTML = null;
  inProgressList.id = inProgressId;
  doneList.innerHTML = null;
  doneId.id = doneId;

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
    object.addEventListener("dragstart", dragStart);
    object.addEventListener("dragend", dragEnd);
    object.id = Math.random() * 100;
    editEl.innerHTML = singleObject.isInEdit
      ? `<i class="fa-solid fa-check"></i>`
      : `<i class="fa-solid fa-pen"></i>`;
    editEl.className = "icon";
    if (singleObject.isInEdit) {
      listItem.type = "text";
      listItem.value = singleObject.newInput;
    } else {
      listItem.textContent = singleObject.newInput;
    }
    starEl.innerHTML = `<i class="fa-solid fa-star"></i>`;
    starEl.className = singleObject.isFavorite ? "favorite" : "icon";
    removeEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removeEl.className = "icon";

    removeEl.addEventListener("click", () => {});

    starEl.addEventListener("click", () => favoriteObject(index));

    editEl.addEventListener("click", () =>
      editObject(singleObject, listItem, index)
    );

    iconDiv.append(removeEl, starEl, editEl);
    object.append(listItem, iconDiv);
    toDoList.append(object);
  });

  inProgress.forEach(() => {});

  done.forEach(() => {});

  document.querySelector("#to-do").append(toDoList);
  document.querySelector("#in-progress").append(inProgressList);
  document.querySelector("#done").append(doneList);
}

document.querySelector("#input-container").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newToDo = Object.assign(Object.fromEntries(formData), {
    isFavorite: false,
    isInEdit: false,
    // isInProgress: false,
    // isDone: false,
  });
  toDo = toDo.concat(newToDo);

  window.localStorage.setItem("toDo", JSON.stringify(toDo));
  e.target.reset();
  render();
});

window.localStorage.setItem("inProgress", JSON.stringify(inProgress));
window.localStorage.setItem("done", JSON.stringify(done));

window.addEventListener("DOMContentLoaded", () => {
  const toDoObject = window.localStorage.getItem("toDo");
  if (toDoObject) {
    // console.log("New object");
    toDo = JSON.parse(toDoObject);
    render();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const inProgressObject = window.localStorage.getItem("inProgress");
  if (inProgressObject) {
    inProgress = JSON.parse(inProgressObject);
    render();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const doneObject = window.localStorage.getItem("done");
  if (doneObject) {
    done = JSON.parse(doneObject);
    render();
  }
});
