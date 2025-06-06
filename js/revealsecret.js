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
    console.log("Shift-hover detected. Curious, aren't you?");
  }
});

// Super sneaky: log to the console
console.log("The code is fake! I swear!");
