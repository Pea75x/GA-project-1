const button = document.querySelector("button");

function startAgain() {
  window.location.assign("./index.html");
}
button.addEventListener("click", startAgain);
