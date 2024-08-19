var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var lightBoxContainer = document.getElementById("lightBoxContainer");
var closeLightBox = document.querySelector("#lightBoxContainer .fa-xmark");
var btn = document.querySelector("button");
var sitesList;



localStorage.getItem("sitesList") == null
  ? (sitesList = [])
  : ((sitesList = JSON.parse(localStorage.getItem("sitesList"))),
    displaySites(sitesList));



btn.addEventListener("click", function (event) {
  var name = siteName.value;
  var url = siteURL.value;
  if (validateInput(name, url)) {
    var addSite = {
      name: name,
      link: url
    };
    sitesList.push(addSite);
    localStorageUpdate();
    displaySites();
    clearInputs()
  } 
    else {
      showLightBox();}
});
function clearInputs(){
  siteName.value = "";
  siteURL.value = "";
}
function localStorageUpdate() {
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
}
function ValidateURL(check) {
  try {
    new URL(check);
    return true;
  } catch (error) {
    return false;
  }
}
function validateInput(name, url) {
  return name.length >= 4 && ValidateURL(url);
}
function displaySites() {
  let cartona = ``;
  for (let i = 0; i < sitesList.length; i++) {
    cartona += `<tr>
            <td>${i + 1}</td>
            <td>${sitesList[i].name}</td>
            <td><button class="btn btn-success" onclick="visitSite('${
              sitesList[i].link
            }')"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn pe-2 btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function visitSite(link) {
  window.open(link);
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorageUpdate();
  displaySites();
}

function showLightBox() {
  lightBoxContainer.classList.remove("d-none");
}

function hideLightBox() {
  lightBoxContainer.classList.add("d-none");
}

closeLightBox.addEventListener("click", hideLightBox);

document.addEventListener("keyup", function (event) {
  if (event.key == "Escape") {
    hideLightBox();
  }
});
