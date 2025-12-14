document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");

    // Generates project html
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
                
                const class_name = project.image == '../images/projects/default-project.png'
                    ? 'normal-image'
                    : 'filtered-image';

                projectCard.innerHTML = `
                    <img class="${class_name}" src="${project.image}" alt="${project.image_alt}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p class="project-date">${project.date}</p>
                        <p class="project-description">${project.description}</p>
                    </div>
                `;
                galleryGrid.appendChild(projectCard);
            });
        });

    // Navbar show/hide
    const navbar = document.querySelector('.navigation-bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });
});
