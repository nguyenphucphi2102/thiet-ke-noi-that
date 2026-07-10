// Design Gallery JavaScript

let currentRoomFilter = 'all';

document.addEventListener('DOMContentLoaded', function () {
  initFilters();
  initProjectCards();
});

function initFilters() {
  const roomButtons = document.querySelectorAll('.room-category-btn');
  roomButtons.forEach(button => {
    button.addEventListener('click', function () {
      roomButtons.forEach(item => {
        item.classList.remove('active');
        item.parentElement.classList.remove('active');
      });

      this.classList.add('active');
      this.parentElement.classList.add('active');
      currentRoomFilter = this.getAttribute('data-room');
      filterProjects();
    });
  });
}

function initProjectCards() {
  const projectCards = document.querySelectorAll('.design-project-item');

  projectCards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function () {
      openProjectDetail();
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectDetail();
      }
    });
  });
}

function filterProjects() {
  const projects = document.querySelectorAll('.design-project-item');

  projects.forEach(project => {
    const categories = project.getAttribute('data-category') || '';
    let showProject = true;

    if (currentRoomFilter !== 'all' && !categories.includes(currentRoomFilter)) {
      showProject = false;
    }

    project.style.display = showProject ? '' : 'none';
  });
}

function openProjectDetail() {
  window.location.href = 'DesignGalleryDetail.html';
}
