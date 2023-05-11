const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

let destList = document.querySelectorAll(".dest-list li");

let crewBulletsContainer = document.querySelector(".crew .bullets");
let techBulletsContainer = document.querySelector(".technology .bullets");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("show");
  nav.classList.toggle("show");
});

destList.forEach((item) => {
  item.addEventListener("click", (e) => {
    let img = document.querySelector(".row .img img");
    let destName = document.querySelector(".row .info .dest-name");
    let destText = document.querySelector(".row .info .dest-description");
    let distance = document.querySelector(".row .details .distance");
    let travel = document.querySelector(".row .details .travel");

    destinationName = e.target.textContent.toLowerCase();

    destList.forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");

    fetchData("./data.json").then((res) => {
      let destData = res.destinations.find((item) => {
        return item.name.toLowerCase() === destinationName;
      });
      //update the content
      img.src = destData.images.png;
      destName.textContent = destData.name;
      destText.textContent = destData.description;
      distance.textContent = destData.distance;
      travel.textContent = destData.travel;
    });
  });
});

//crew
fetchData("./data.json").then((res) => {
  let crewData = res.crew;

  // create bullets
  crewData.forEach((el) => {
    let span = document.createElement("span");

    span.setAttribute("data-name", el.name);

    crewBulletsContainer.appendChild(span);

    let bullets = document.querySelectorAll(".crew .bullets > span");

    bullets[0].classList.add("active");
  });

  let bullets = document.querySelectorAll(".crew .bullets > span");

  bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      bullets.forEach((bullet) => {
        bullet.classList.remove("active");
      });
      e.target.classList.add("active");
      let crewName = e.target.getAttribute("data-name").toLowerCase();

      let currentData = crewData.find((item) => {
        if (item.name.toLowerCase() === crewName) {
          return item;
        }
      });

      //get selectors
      let img = document.querySelector(".crew .img img");
      let crewRole = document.querySelector(".crew .content .role");
      let crewNameEl = document.querySelector(".crew .name");
      let crewText = document.querySelector(".crew .content p");
      //update the content
      img.src = currentData.images.png;
      crewRole.textContent = currentData.role;
      crewNameEl.textContent = currentData.name;
      crewText.textContent = currentData.bio;
    });
  });
});

fetchData("./data.json").then((res) => {
  let techData = res.technology;

  // create bullets
  techData.forEach((obj, index) => {
    let span = document.createElement("span");

    span.setAttribute("data-vehicle", obj.name);

    span.textContent = `${index + 1}`;

    techBulletsContainer.appendChild(span);

    document.querySelectorAll(".bullets span")[0].className = "active";
  });

  let bullets = document.querySelectorAll(".technology .bullets span");

  bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      bullets.forEach((bullet) => {
        bullet.classList.remove("active");
      });
      e.target.classList.add("active");

      // get selectors
      let mobileImg = document.querySelector(".technology .img .small");
      let desktopImg = document.querySelector(".technology .img .big");
      let vehicleName = document.querySelector(
        ".technology .content .tech-name"
      );
      let vehicleText = document.querySelector(
        ".technology .content .tech-description"
      );

      let myData = techData.find((tech) => {
        return (
          tech.name.toLowerCase() === e.target.dataset.vehicle.toLowerCase()
        );
      });

      //update content
      vehicleName.textContent = myData.name;
      vehicleText.textContent = myData.description;
      mobileImg.src = myData.images.landscape;
      desktopImg.src = myData.images.portrait;
    });
  });
});

// fetch function
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null;
  }
}
