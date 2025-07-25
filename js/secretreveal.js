// Bonus: Reveal secret with keyboard shortcut (Shift + Ctrl + S)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
    const secret = document.getElementById('secret');
    secret.style.display = 'block';
    alert("You shouldn't have done that...");
  }
});

// Optional red herring interaction
document.getElementById('sign').addEventListener('mouseenter', (e) => {
  if (e.shiftKey) {
    console.log("Shift-hover detected. You fell for that? And you're smart enough to be in the console?");
  }
});

// Super sneaky: log to the console
console.log("The code is fake! I swear!");

  const target = document.getElementById("target-area");

  let clickCount = 0;
  let firstClickTime = null;
  const maxTimeBetweenClicks = 3000; // 3 seconds

  target.addEventListener("click", () => {
    const now = Date.now();

    if (!firstClickTime || now - firstClickTime > maxTimeBetweenClicks) {
      clickCount = 1;
      firstClickTime = now;
    } else {
      clickCount++;
    }

    if (clickCount === 3) {
      alert("Getting curious... aren't you?");
      clickCount = 0;
      firstClickTime = null;
    }
  });
