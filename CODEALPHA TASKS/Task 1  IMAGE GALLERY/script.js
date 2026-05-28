const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;
const images = [...galleryItems].map(item => item.querySelector('img'));

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
  });
});

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    button.classList.add('active');

    const filter = button.dataset.filter;

    galleryItems.forEach(item => {
      if(filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});