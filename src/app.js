function changeUrl() {
  const links = document.querySelectorAll("ul a");
  const video = document.querySelector("source");
  links.forEach(e => {
    e.addEventListener("click", function(e) {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      video.setAttribute("src", href);
    });
  });
}

changeUrl();
