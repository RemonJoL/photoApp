const overlay = document.querySelector(".email-overlay");
const assignBtn = document.getElementById("open-assign-popup");
const emailPopup = document.querySelector(".email-popup");

assignBtn.addEventListener("click", function() {
  overlay.style.display = "flex";
  setTimeout(function(){
    emailPopup.style.opacity = "1";
      overlay.style.opacity = "1";
  }, 50);
});


function closeOverlay(){
  emailPopup.style.opacity = "0";
    overlay.style.opacity = "0";
  setTimeout(function(){
    overlay.style.display = "none";
  }, 300);
}
// overlay.addEventListener("click", function() {
// });
