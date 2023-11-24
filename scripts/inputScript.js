document.getElementById("inputDate").value =
  localStorage.getItem("countdownDate") || "";
function setCountdown() {
  const inputDate = document.getElementById("inputDate").value;

  if (isValidDate(inputDate)) {
    // Save the input date in localStorage
    localStorage.setItem("countdownDate", inputDate);

    // Redirect to the clock page
    window.location.href = "clock.html";
  } else {
    alert("Invalid date format. Please enter a valid date (YYYY-MM-DD).");
  }
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
