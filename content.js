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
