document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("gallery");
  
    fetch("projects.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.projects.forEach((project, index) => {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project");
                // Uses the default template depending on the location of the project
                // It is designed to alternate imaage and text every other
                if (index % 2 === 1) {
                  projectDiv.innerHTML = `
                  <img src="${project.image}" alt="${project.alt}">
                  <div class="project-text">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <small>${project.date}</small>
                  </div>
                  `;
                } else {
                  projectDiv.innerHTML = `
                  <div class="project-text">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <small>${project.date}</small>
                  </div>
                  <img src="${project.image}" alt="${project.alt}">
                `;
                }

                container.appendChild(projectDiv);
            });
        })
        .catch(error => {
            console.error(error);
        });
});