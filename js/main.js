// ----------------------------------------------
// Burgermenu
// ----------------------------------------------

// Declares values to shorten burger menu function and red dots that notify changes in page
const redDot = document.querySelector(".red-dot");
const redDotProfile = document.querySelector(".red-dot-profile");
const burgerBtn = document.querySelector(".menu-btn");
const burgermenu = document.querySelector(".burgermenu-container");
// Declares an array to be used to assign menu toggle buttons
const burgerToggleArray = [burgerBtn, document.querySelector(".btn-close-menu")];
// Loops through burgerToggleArray to assign event listener to burger toggle buttons
for(let i=0;i<burgerToggleArray.length;i++){
  burgerToggleArray[i].addEventListener("click", bugermenuToggle);
};

// Toggles Burger menu
function bugermenuToggle() {
  // If the Burger menu not currently visible
  if (burgermenu.classList.length === 1) {
    // Makes burger menu visible and after a short delay, it slides it into place, overlay fades in and the red dot disappears if there is one
    burgermenu.style.display = "flex";
    setTimeout(function(){
      burgermenu.classList.add("menu-open");
      overlay.style.display = "flex";
      overlay.style.opacity = "1";
      redDot.style.display = "none"
    }, 100);
  }
  else {
    // Closes the burger menu and hides it after a short delay so the animations play out properly
    burgermenu.classList.remove("menu-open");
    overlay.style.display = "none";
    overlay.style.opacity = "0";
    setTimeout(function(){
      burgermenu.style.display = "none";
    }, 300);
  }
}

// ----------------------------------------------
// Popup
// ----------------------------------------------

// Declares values to shorten email popup function
const assignBtn = document.getElementById("open-assign-popup");
const emailPopup = document.querySelector(".email-popup");
// Opens the email popup
assignBtn.addEventListener("click", function() {
  // Displays the overlay and after a short delay the overlay fades into full visibility and displays the email popup
  overlay.style.display = "flex";
  setTimeout(function(){
    overlay.style.opacity = "1";
    emailPopup.style.display = "block";
    emailPopup.style.opacity = "1";
  }, 300);
});

// ----------------------------------------------
// Overlay
// ----------------------------------------------

const overlay = document.querySelector(".overlay");
const overlayArray = [document.querySelector(".overlay"), document.querySelector(".btn-close-popup"), document.querySelector(".btn-cancel")];
// Loops through elements that can close the overlay and assigns an event listener and function to close the overlay to each element
for(let i=0;i<overlayArray.length;i++){
  // Function that closes the overlay
  overlayArray[i].addEventListener("click", function(){
    // If email popup is displayed
    if (emailPopup.style.display === "block"){
      // Closes the popup and fades out the overlay and after a 300ms fully hides the overlay
      emailPopup.style.display = "none";
      emailPopup.style.opacity = "0";
      overlay.style.opacity = "0";
      setTimeout(function(){
        overlay.style.display = "none";
      }, 300);
    }
    else {
      // If Burger menu is open, closes burger menu and hides overlay
      bugermenuToggle();
    }
  });
}

// ----------------------------------------------
// New Image
// ----------------------------------------------

// Url needed to fetch a random image from unsplash
const requestUrl = 'https://api.unsplash.com/photos/random?client_id=Eixsm88TabftaZDIofWlQslifc0D_FoHW_lwUw5ERkk';
// Declares all variables that represent elements to be changed in order to display picture
const newImgBtn = document.querySelector('.btn-new');
const newImg = document.querySelector('.randomg-img');
const userInfo = document.querySelector('.photographer-profile');
const imgInfo = document.querySelector('.img-photographer');
const imgLink = document.querySelector('.img-link');
const imgAvatar = document.querySelector('.img-avatar');
// Declares empty object to have data be assigned to it, and then to be used by other functions
let obj;
let randomImage;
let avatarUrl;
let photographerProfile;
let responseObj;

// Button that requests new image from unsplash
newImgBtn.addEventListener('click', getNewImage);

// Function that requests a new image from unsplash and assigns data from the object created in the fetch request to variables,
// which are then used in the functions that assign the picture to its correct place, both on the main page and on any profiles it is to be assigned to
function getNewImage() {
  // Picture request
  axios.get('https://api.unsplash.com/photos/random?client_id=Eixsm88TabftaZDIofWlQslifc0D_FoHW_lwUw5ERkk')
  // Takes the picture response and stores the data associated with the picture in an object
  .then(function (response) {
    obj = response.data;
  })
  // Assigns the data from the picture to the picture card
  .then(function () {
    randomImage = obj.urls.regular;
    avatarUrl = obj.user.profile_image.small;
    photographerProfile = obj.user.links.html;
    // Sets photographer name to be displayed under picture
    imgInfo.innerHTML = obj.user.name;
    // Sets picture link to be displayed under picture
    imgLink.href = obj.links.html;
    // Sets photographer avatar to be displayed under picture
    imgAvatar.src = avatarUrl;
    // Sets profile to be displayed in link under picture
    userInfo.href = photographerProfile;
    // Sets the fetched picture on the main page
    newImg.src = randomImage;
  });
}

// Loads picture when page is opened
document.addEventListener("DOMContentLoaded", getNewImage);

// ----------------------------------------------
// Email Validation
// ----------------------------------------------

// Sets emailcheck to not valid so that attempting to assign a picture with an empty email field shows the correct message
let emailCheck = "not valid";
// Validates email format
function emailValidation(inputText) {
  const emailFormat = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  //       yourname   @   domain   .    com        ( .uk )
  // see regex101.com for reference of all characters
  /*
  ([a-z\d\.-]+) a-z represents alphabet characters, d resembles digits.
  a backslash is an escape character, used so the dot isnt parsed in the syntax,
  the hyphen does not need escaping.the plus sign denotes that any amount of
  characters above 1 is accepted.

  @ next we just have an 'at' symbol

  ([a-z\d-]+) everything here is explained in the first brackets. This is
  the domain such as 'google'

  \. the backslash is used as an escape character here too, to separate the
  domain and domain suffix

  ([a-z]{2,8}) this is the first part of the domain suffix, eg 'com'. the curly
  braces restrict the potential length of the suffix

  (\.[a-z]{2,8})? and finally the back slash once again escapes the dot, the
  question mark dilineates that this is an optional addendum to the suffix, eg
  the .uk of .co.uk
  */
  // If text in the email field has a valid format
  if(inputText.value.match(emailFormat)) {
    // Turns the line green, displays the checkmark to inform the user the email format is valid, hides the X mark and sets emailcheck to valid,
    // which is needed to display a message confirming the picture has been assigned to a profile after clicking assign
    document.querySelector(".email-field").style.borderBottom = "1px solid #5c9f58";
    document.querySelector(".emailAccept").className = "emailAccept email-confirmation confirm-show";
    document.querySelector(".emailDecline").className = "emailDecline email-confirmation confirm-hide";
    emailCheck = "valid";
  }
  // If the email field is empty
  else if(inputText.value == "") {
    // Turns the black, hides checkmark and X mark because there's no email address to be validated in the input and sets emailcheck to not valid,
    // which is needed to display a message saying no valid email address is entered after clicking assign
    document.querySelector(".email-field").style.borderBottom = "1px solid black";
    document.querySelector(".emailDecline").className = "emailDecline email-confirmation confirm-hide";
    document.querySelector(".emailAccept").className = "emailAccept email-confirmation confirm-hide";
    emailCheck = "not valid";
  }
  // if the email field contains text that does not match a valid email address
  else {
    // Turns the line green, displays the X to inform the user the email format is not valid, hides the checkmark mark and sets emailcheck to not valid,
    // which is needed to display a message saying the input does not contain a valid format email address after clicking assign
    document.querySelector(".email-field").style.borderBottom = "1px solid #FF8080";
    document.querySelector(".emailDecline").className = "emailDecline email-confirmation confirm-show";
    document.querySelector(".emailAccept").className = "emailAccept email-confirmation confirm-hide";
    emailCheck = "not valid";
  }
}

// ----------------------------------------------
// Email Assignment
// ----------------------------------------------

// Arrays
// Holds profiles
let profileArray = [];

// Holds just profile names for easier verification
const profileChecker = [];

// Shorthand for profile length
let profileCounter;

// Holds profile name, taken from input
let profileName;

// Holds picture info, taken from obj
let picture;

// Boolean for email confirmation message, used for assignConfirmation()
let assignCheck;

// Check Profile Array if profile exists
function checkingProfile(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

// Check Profile if picture has been assigned
function checkingPicture(arr, val, x) {
  return arr.some(function(arrVal) {
      for (var i=0; i < profileArray[x].length; i++) {
          if (arr[i].picture === obj.urls.regular) {
            return arr[i].picture === obj.urls.regular;
          }
      }
  });
}

// Assigns picture to email address in input
document.querySelector(".btn-assign").addEventListener("click", function(){
  if (profileCounter===undefined && emailCheck === "valid") {
    // Sets profile name to email address in input
    profileName = [{name:document.emailForm.emailInput.value}];
    // Pulls information from fetch request and applies it to picture info
    picture = {picture:obj.urls.regular, avatar:obj.user.profile_image.small, user:obj.user.name, userUrl:obj.user.links.html, imgUrl:obj.links.html};
    // Adds picture info to profile
    profileName.push(picture);
    // Adds profile to profile array
    profileArray.push(profileName);
    // Adds profile to profile checker array
    profileChecker.push(document.emailForm.emailInput.value);
    // Updates profile counter for loop in next condition
    profileCounter = profileArray.length;
    // Triggers function to create new profile link and profile page
    newProfileLink(0);
    // Triggers function to create new picture card
    createPictureCard(0);
    // Triggers function to set new picture card to picture on the main page
    addPicture(0, 0);
    // Adds eventlistener to profile link created by newProfileLink() that allows user to view profile when clicked
    displayProfile();
    // Adds eventlistener to profile footer to allow user to go back to home page when clicked
    hideProfile();
    // Sets value to true and then runs function to display confirmation message
    assignCheck = true;
    assignConfirmation(assignCheck, 0)
    // Shows red dot on the burger button to show user there's been a change there
    redDot.style.display = "block";
  }
  else if (profileCounter>0 && emailCheck === "valid"){
    for(let i=0;i<profileCounter;i++){
      // If picture already exists in the profile with the name that's in the email input
      if (profileArray[i][0].name === document.emailForm.emailInput.value && checkingProfile(profileChecker, document.emailForm.emailInput.value) === true && checkingPicture(profileArray[i], obj.urls.regular, i) === true && emailCheck === "valid") {
        console.log("picture already assigned");
        // Sets value to false and then runs function to display message saying picture is already attached to profile
        assignCheck = false;
        assignConfirmation(assignCheck, i)
      }
      // If email in input already has a profile added to it, and the picture has not yet been assigned to the profile
      else if (profileArray[i][0].name === document.emailForm.emailInput.value && checkingProfile(profileChecker, document.emailForm.emailInput.value) === true && emailCheck === "valid") {
        // Pulls information from fetch request and applies it to picture info
        picture = {picture:obj.urls.regular, avatar:obj.user.profile_image.small, user:obj.user.name, userUrl:obj.user.links.html, imgUrl:obj.links.html};
        // Adds picture info to profile
        profileArray[i].push(picture);
        // Triggers function to create new picture card
        createPictureCard(i);
        // Triggers function to set new picture card to picture on the main page
        addPicture(i, profileArray[i].length-2);
        // Shows red dot on the burger button to show user there's been a change there
        redDot.style.display = "block";
        // Sets value to true and then runs function to display confirmation message
        assignCheck = true;
        assignConfirmation(assignCheck, i)
      }
      // If email in input doesn't have a profile yet
      else if(profileArray[i][0].name !== document.emailForm.emailInput.value && checkingProfile(profileChecker, document.emailForm.emailInput.value) === false && emailCheck === "valid"){
        // Sets profile name to email address in input
        profileName = [{name:document.emailForm.emailInput.value}];
        // Pulls information from fetch request and applies it to picture info
        picture = {picture:obj.urls.regular, avatar:obj.user.profile_image.small, user:obj.user.name, userUrl:obj.user.links.html, imgUrl:obj.links.html};
        // Adds picture info to profile
        profileName.push(picture);
        // Adds profile to profile array
        profileArray.push(profileName);
        // Adds profile to profile checker array
        profileChecker.push(document.emailForm.emailInput.value);
        // Triggers function to create new profile link and profile page
        newProfileLink(profileCounter);
        // Triggers function to create new picture card
        createPictureCard(profileCounter);
        // Triggers function to set new picture card to picture on the main page
        addPicture(profileCounter, 0);
        // Updates profile counter for loop in next condition
        profileCounter = profileArray.length;
        // Adds eventlistener to profile link created by newProfileLink() that allows user to view profile when clicked
        displayProfile();
        // Adds eventlistener to profile footer to allow user to go back to home page when clicked
        hideProfile();
        // Shows red dot on the burger button to show user there's been a change there
        redDot.style.display = "block";
        // Sets value to true and then runs function to display confirmation message
        assignCheck = true;
        assignConfirmation(assignCheck, i)
        break;
      }
    }
  }
  // If email in input does not have a valid format or if the input is empty
  else if (emailCheck === "not valid") {
    console.log("no valid email");
    // Sets value to false and then runs function to display message saying email is not a valid email
    assignCheck = false;
    assignConfirmation(assignCheck)
  }
});

// ----------------------------------------------
// New Profile
// ----------------------------------------------

const confirmationText = document.querySelector(".confirmation-text");

// Displays confirmation message after assigning image to profile, and checks if picture can be assigned to email in input
function assignConfirmation(assignCheck, i) {
  // If the picture can be assigned and a valid email address has been entered
  if (assignCheck === true && emailCheck === "valid") {
    // Displays message confirming picture can be added and sets text colour to green
    confirmationText.style.visibility = "visible";
    confirmationText.textContent = "Picture assigned to ".concat(profileArray[i][0].name, "!");
    confirmationText.style.color = "#5c9f58";
    setTimeout(function () {
      // Hides confirmation message
      confirmationText.style.visibility = "hidden";
      confirmationText.textContent = "placeholder";
      confirmationText.style.color = "black";
    }, 2500);
  } else if (assignCheck === false && emailCheck === "valid") {
    // Displays message saying picture has already been assigned to email and sets text colour to red
    confirmationText.style.visibility = "visible";
    confirmationText.textContent = "Picture has already been assigned to ".concat(profileArray[i][0].name, ".");
    confirmationText.style.color = "#FF8080";
    setTimeout(function () {
      // Hides confirmation message
      confirmationText.style.visibility = "hidden";
      confirmationText.textContent = "placeholder";
      confirmationText.style.color = "black";
    }, 2500);
  } else if (emailCheck === "not valid") {
    // Displays message saying no valid email has been entered and sets text colour to red
    confirmationText.style.visibility = "visible";
    confirmationText.textContent = "Please enter a valid e-mail address.";
    confirmationText.style.color = "#FF8080";
    setTimeout(function () {
      // Hides confirmation message
      confirmationText.style.visibility = "hidden";
      confirmationText.textContent = "placeholder";
      confirmationText.style.color = "black";
    }, 2500);
  }
}

// ----------------------------------------------
// New Profile
// ----------------------------------------------

// Creates elements for the new profile, i.e. profile page and link in burger menu
function newProfileLink(x) {
// New profile list item
const newBurgerItem = document.createElement("li");
// Content for new profile list item
const newBurgerItemContent = "<div class=\"red-dot-profile\"></div><p>".concat(profileArray[x][0].name, "</p>");
const profileList = document.querySelector('.burger-list');
const profilePage = document.createElement("div");
// Clone Profile Header
let profileHeader = document.querySelector('.profile-header-container');
let newProfileHeader = profileHeader.cloneNode(true);
// Clone Profile Header
let profileFooter = document.querySelector('.profile-footer-container');
let newProfileFooter = profileFooter.cloneNode(true);

  // Adds class to new new profile list item
  newBurgerItem.className = "burger-item";
  // Clones profile list item with new class
  newBurgerItem.innerHTML = newBurgerItemContent;
  // Appends new profile list item to profile list
  profileList.appendChild(newBurgerItem);
  // Adds ID to new profile page
  profilePage.setAttribute("id", profileArray[x][0].name);
  // Adds class to profile page
  profilePage.setAttribute("class", "profile-page");
  // Appends profile page to main content section
  document.querySelector("main").appendChild(profilePage);
  // Adds profile header to profile page
  document.getElementById(profileArray[x][0].name).appendChild(newProfileHeader);
  // Adds content to profile header
  document.getElementsByClassName("profile-header-inner")[x].innerHTML = "<h3>Pictures assigned to <span class=\"username-text\">".concat(profileChecker[x], "</span></h3>");
  // Adds profile footer
  document.getElementById(profileArray[x][0].name).appendChild(newProfileFooter);
}

// ----------------------------------------------
// Create Picture Card
// ----------------------------------------------

// Creates picture card to hold new picture that's assigned to profile
function createPictureCard(x){
  // Clone picture card
  let card = document.querySelector('.user-container');
  let newCard = card.cloneNode(true);
  // Inserts picture card into the dom at the bottom of the profile page by inserting it before the profile footer
  document.getElementById(profileArray[x][0].name).insertBefore(newCard, document.getElementById(profileArray[x][0].name).querySelector(".profile-footer-container"));
}

// ----------------------------------------------
// Add Picture to Card
// ----------------------------------------------

// Sets the elements in the picture card to display the picture
function addPicture(x, y){
// Declares all variables that represent content and elements in the picture card to be modified, x is the pofile and y is the picture card attached to that profile
let userImgPhotographer = document.getElementById(profileArray[x][0].name).querySelectorAll('.user-img-photographer')[y];
let userImgLink = document.getElementById(profileArray[x][0].name).querySelectorAll('.user-img-link')[y];
let userImgAvatar = document.getElementById(profileArray[x][0].name).querySelectorAll('.user-img-avatar')[y];
let userPhotographerProfile = document.getElementById(profileArray[x][0].name).querySelectorAll('.user-photographer-profile')[y];
let userImg = document.getElementById(profileArray[x][0].name).querySelectorAll('.user-img')[y];
  // Sets nodes and elements to be updated with data pulled from the picture's json data
  userImgPhotographer.innerHTML = picture.user;
  userImgLink.href = picture.imgUrl;
  userImgAvatar.src = picture.avatar;
  userPhotographerProfile.href = picture.userUrl;
  userImg.src = picture.picture;
  // Displays red dot on profile that had a picture added to it
  document.querySelectorAll('.red-dot-profile')[x].style.display = "block";
};

// ----------------------------------------------
// Display & Hide profile
// ----------------------------------------------

// Display profile

let burgerItems = document.querySelectorAll('.burger-item');

// Adds button functionality to burger items, to open profile pages
function displayProfile(){
  // Declares burgerItems to get updated amount
  burgerItems = document.querySelectorAll('.burger-item');
  // Loops over burger items and adds event listener and button function that displays the profile's page
  for(let i=0;i<burgerItems.length;i++){
    burgerItems[i].addEventListener('click', function() {
      for(let j=0;j<profileChecker.length;j++){
        // If the name of the profile matches the profile in the loop
        if (this.textContent === profileChecker[j]) {
          // Makes the proifle page visible, hides the main page and hides the red dot on the profile in the profile list
          document.getElementById(profileChecker[j]).className = "profile-page visible";
          document.querySelectorAll(".container")[1].style.display = "none";
          document.querySelectorAll('.red-dot-profile')[j].style.display = "none";
        }
        // If the name of the profile doesn't match the profile in the loop
        else if (this.textContent !== profileChecker[j]) {
          // Hides profile pages that don't match the name of the profile
          document.getElementById(profileChecker[j]).className = "profile-page";
        }
      }
    });
  }
}

// Hide Profile

let homeButtons = document.querySelectorAll(".home-btn");

// Adds functionality to buttons to hide profile pages and bring back the home page
function hideProfile(){
  // Declares homeButtons to get updated amount
  homeButtons = document.querySelectorAll(".home-btn");
  // Loops over home buttons and adds event listener and button function that hides the profile's page
  for(let i=0;i<homeButtons.length;i++){
    // Adds function that hides current profile and displays the main page
    homeButtons[i].addEventListener("click", function(){
      for(let j=0;j<profileChecker.length;j++){
        // Hides currently displayed profile
        document.getElementById(profileChecker[j]).classList.remove("visible");
        // Displays main page
        document.querySelectorAll(".container")[1].style.display = "flex";
      }
    });
  }
}
