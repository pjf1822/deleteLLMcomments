// Method 1: Capture phase event listener
document.addEventListener(
  "click",
  (e) => {
    let target = e.target;

    // Go up 4 layers
    for (let i = 0; i < 4; i++) {
      if (target.parentElement) {
        target = target.parentElement;
      }
    }
    const nextSibling = target.nextElementSibling;
    const codeBlock = nextSibling.firstElementChild;
    if (!codeBlock) return;

    e.preventDefault();
    e.stopPropagation();

    const cloned = codeBlock.cloneNode(true);
    cloned.querySelectorAll(".hljs-comment").forEach((c) => c.remove());
    const plainText = cloned.innerText;
    const newCodeBlock = document.createElement("code");
    newCodeBlock.textContent = plainText;

    navigator.clipboard
      .writeText(newCodeBlock.textContent)
      .then(() => console.log("Method 1 override successful"))
      .catch((err) => console.error("Method 1 failed:", err));
  },
  true
);

function removeCommentsFromCode() {
  const comments = document.querySelectorAll(".hljs-comment");
  comments.forEach((comment) => {
    comment.remove();
  });
}

const observer = new MutationObserver(removeCommentsFromCode);

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

window.addEventListener("load", removeCommentsFromCode);
