document.addEventListener("DOMContentLoaded", function () {
  // Check if there is a saved date in localStorage
  let savedDate = localStorage.getItem("countdownDate");

  // If there is no saved date, set a new one (e.g., 7 days from now)
  if (!savedDate) {
    // Redirect to input page to set a new countdown date
    backToInputPage();
  } else {
    // Display the countdown clock using the saved date
    displayCountdown(savedDate);
  }

  console.log(days); // 'days' is not defined here, it will result in an error
});

function displayCountdown(targetDate) {
  // Get the target time in milliseconds
  const targetTime = new Date(targetDate).getTime();

  // Get references to HTML elements for displaying countdown
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minsElement = document.getElementById("mins");
  const secsElement = document.getElementById("secs");
  const messageElement = document.getElementsByClassName("finish-message");
  const clockElement = document.getElementsByClassName("clock-grid");

  messageElement[0].style.display = "none";
  clockElement[0].style.display = "flex";

  // Initialize countdown elements with zeros
  daysElement.innerHTML = `00`;
  hoursElement.innerHTML = `00`;
  minsElement.innerHTML = `00`;
  secsElement.innerHTML = `00`;

  // Function to update the countdown clock
  function updateClock() {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate the time difference between target and current time
    const timeDifference = targetTime - currentTime;

    // Calculate days, hours, minutes, and seconds
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Ensure each unit has two digits by padding with zeros
    days = padZero(days);
    hours = padZero(hours);
    minutes = padZero(minutes);
    seconds = padZero(seconds);

    // Update the HTML elements with the calculated values
    daysElement.innerHTML = `${days}`;
    hoursElement.innerHTML = `${hours}`;
    minsElement.innerHTML = `${minutes}`;
    secsElement.innerHTML = `${seconds}`;

    // Display a message when the countdown reaches zero
    if (timeDifference < 0) {
      clockElement[0].style.display = "none";
      messageElement[0].style.display = "block";
    }
  }

  // Update the clock every second using setInterval
  setInterval(updateClock, 1000);
}

// Function to get the user's time zone offset
function getTimezoneOffset() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  return timezoneOffset;
}

// Function to format a date according to the user's time zone
function formatWithTimezone(dateString) {
  // Get the user's time zone and format the date accordingly
  const options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  const formattedDate = new Date(dateString).toLocaleString(undefined, options);
  return formattedDate;
}

// Function to redirect to the input page
function backToInputPage() {
  window.location.href = "input.html"; // Redirect to the input page
}

// Function to pad a number with zero if it is less than 10
function padZero(number) {
  return number < 10 ? "0" + number : number;
}
