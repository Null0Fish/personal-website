document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".sample-gallery-grid");

    fetch("projects.json")
        .then(response => {
            return response.json();
        })
        .then(data => {

            const projects = data.projects.slice(0, 3);
            galleryGrid.innerHTML = "";

            projects.forEach(project => {
                const projectCard = document.createElement("a");
                projectCard.href = "#";
                console.log(projectCard.href)
                projectCard.classList.add("sample-project");
                // Uses the default template after reading data
                projectCard.innerHTML = `
                <img src="${project.preview_image}" alt="${project.alt}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.preview_description}</p>
                </div>
                `;

                galleryGrid.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error(error);
        });
});