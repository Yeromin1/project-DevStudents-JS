const projects = [
  {
    title: 'power pulse webservice',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/power-pulse-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/power-pulse-2x.jpg', import.meta.url)
        .href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'vyshyvanka vibes Landing page',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/vyshyvanka-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/vyshyvanka-2x.jpg', import.meta.url)
        .href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'energy flow webservice',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/energy-flow-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/energy-flow-2x.jpg', import.meta.url)
        .href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'mimino website',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/mimino-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/mimino-2x.jpg', import.meta.url).href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'chego jewelry website',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL(
        '/images/my-project/chego-jewelry-1x.jpg',
        import.meta.url
      ).href,
      retina: new URL(
        '/images/my-project/chego-jewelry-2x.jpg',
        import.meta.url
      ).href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'fruitbox online store',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/fruitbox-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/fruitbox-2x.jpg', import.meta.url)
        .href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
  {
    title: 'starlight studio landing page',
    techStack: 'React, JavaScript, Node JS, Git',
    images: {
      regular: new URL('/images/my-project/starlight-1x.jpg', import.meta.url)
        .href,
      retina: new URL('/images/my-project/starlight-2x.jpg', import.meta.url)
        .href,
    },
    link: 'https://github.com/Yeromin1/project-DevStudents-JS',
  },
];

const projectList = document.querySelector('.project__list');
const loadMoreButton = document.getElementById('load-more');
const hideProjectsButton = document.getElementById('hide-projects');

loadMoreButton.addEventListener('click', loadMoreProjects);

hideProjectsButton.addEventListener('click', hideProjects);

let visibleProjects = 0;

function createProjectMarkup(project) {
  const spritePath = new URL('/images/icons.svg', import.meta.url).href;

  return `
    <li class="project__item">
      <img 
        src="${project.images.regular}" 
        srcset="${project.images.regular} 1x, ${project.images.retina} 2x"
        alt="${project.title}" 
        class="project__image"
        title="${project.title}" 
      />
      <div class="project__info">
        <p class="project__tech__stack p-l">${project.techStack}</p>
        <div class="project__info__item">
          <h3 class="project__subtitle">${project.title}</h3>
          <a href="${project.link}" class="visit__btn p-l" target="_blank">VISIT
              <svg class="project__svg" width="15" height="15">
                  <use href="${spritePath}#icon-arr-right"></use>
              </svg>
          </a>
        </div>
      </div>
    </li>
  `;
}

function loadMoreProjects() {
  const nextProjects = projects.slice(visibleProjects, visibleProjects + 3);

  nextProjects.forEach(project => {
    const projectMarkup = createProjectMarkup(project);
    projectList.insertAdjacentHTML('beforeend', projectMarkup);
  });

  visibleProjects += nextProjects.length;

  if (visibleProjects >= projects.length) {
    loadMoreButton.style.display = 'none';
    hideProjectsButton.style.display = 'inline-block';
  }
}

function hideProjects() {
  const projectItems = document.querySelectorAll('.project__item');

  projectItems.forEach((item, index) => {
    if (index >= 3) item.remove();
  });

  visibleProjects = 0;

  loadMoreButton.style.display = 'inline-block';
  hideProjectsButton.style.display = 'none';

  const projectsTitle = document.querySelector('.load__more');
  projectsTitle.focus();
}
