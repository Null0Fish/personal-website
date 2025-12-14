document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");

    fetch("../project_files/projects.json")
        .then(response => response.json())
        .then(data => {
            const projects = Object.values(data);
            galleryGrid.innerHTML = "";

            projects.forEach(project => {
                const projectCard = document.createElement("a");
                projectCard.href = project.url;
                projectCard.target = "_blank";
                projectCard.classList.add("project");
                if (project.image == '../images/projects/default-project.png'){
                    class_name = 'normal-image'
                } else {
                    class_name = 'filtered-image'
                }
                projectCard.innerHTML = `
                    <img class="${class_name}" src="${project.image}" alt="${project.image_alt}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p class="project-date">${project.date}</p>
                        <p>${project.description}</p>
                    </div>
                `;
                galleryGrid.appendChild(projectCard);
            });
        });
});