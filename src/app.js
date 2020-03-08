function videoTag(link) {
  return `
  <video width="100%" height="500px" controls >
       <source src="${link}" type="video/mp4" /> 
      <!-- <source src="mov_bbb.ogg" type="video/ogg" /> -->
      Your browser does not support HTML5 video.
    </video>
  `;
}

function changeUrl() {
  const links = document.querySelectorAll("ul a");
  const container = document.querySelector(".container");
  // video.removeAttribute("src");
  links.forEach(e => {
    e.addEventListener("click", function(e) {
      e.preventDefault();

      container.innerHTML = "";
      setTimeout(() => {
        let href = e.target.getAttribute("href");
        href = href.replace("/Downloads/", "http://127.0.0.1/");
        container.innerHTML = videoTag(href);
      }, 1000);
    });
  });
  document.querySelector('a').click();
}

changeUrl();
