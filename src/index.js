// Described in the documentation
import SimpleLightbox from 'simplelightbox';
// Additional style import
import 'simplelightbox/dist/simple-lightbox.min.css';

// Constants
const API_KEY = '42335893-81a0738270e344fb8d80a811a';
const gallery = document.getElementById('gallery');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1; // Initialize the current page

// Hide the gallery initially
gallery.style.display = 'none';

document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementsByName('searchQuery')[0].value;

    // Reset current page to 1 when a new search is initiated
    currentPage = 1;

    // Make API request
    fetchImages(searchQuery, currentPage);
  });

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      const searchQuery = document.getElementsByName('searchQuery')[0].value;

      // Increment the current page for the next set of images
      currentPage++;

      // Make API request
      fetchImages(searchQuery, currentPage);
    }
  },
  { threshold: 0.5 } // Adjust the threshold as needed
);

// Start observing the bottom of the page
observer.observe(loadMoreButton);

function fetchImages(searchQuery, page) {
  const perPage = 40;

  // Make API request with pagination parameters
  fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  )
    .then(response => response.json())
    .then(data => {
      if (page === 1) {
        clearGallery();
        // Show the "Load more" button after the first request
        loadMoreButton.style.display = 'block';

        // Show the gallery after the first search
        gallery.style.display = 'block';
      }

      // Display images
      displayImages(data.hits);

      // After displaying images, call refresh for SimpleLightbox
      refreshSimpleLightbox();

      // Smooth scroll to the next set of images
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      // Check if there are more images to load
      if (data.totalHits <= page * perPage) {
        // Hide the "Load more" button and display end of results notification
        loadMoreButton.style.display = 'none';
        displayEndOfResults();
      }

      // After displaying images, call refresh for SimpleLightbox
      refreshSimpleLightbox();
    })
    .catch(error => {
      displayError();
    });
}

function clearGallery() {
  gallery.innerHTML = ''; // Clears the gallery content
}

function displayEndOfResults() {
  const notification = document.getElementById('notification');
  notification.innerText =
    "We're sorry, but you've reached the end of search results.";
}

function displayImages(images) {
  if (images.length === 0) {
    displayError();
    return;
  }

  images.forEach(image => {
    const photoCard = createPhotoCard(image);
    gallery.appendChild(photoCard);
  });
}

function createPhotoCard(image) {
  const photoCard = document.createElement('div');
  photoCard.className = 'photo-card';

  const imgLink = document.createElement('a');
  imgLink.href = image.largeImageURL;
  imgLink.setAttribute('data-lightbox', 'gallery');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';

  const infoItems = ['Likes', 'Views', 'Comments', 'Downloads'];

  infoItems.forEach(item => {
    const p = document.createElement('p');
    p.className = 'info-item';
    p.innerHTML = `<b>${item}:</b> ${image[item.toLowerCase()]}`;
    info.appendChild(p);
  });

  photoCard.appendChild(imgLink); // Append the link instead of the image directly
  imgLink.appendChild(img); // Append the image to the link
  photoCard.appendChild(info);

  return photoCard;
}

function displayError() {
  const notification = document.getElementById('notification');
  notification.innerText =
    'Sorry, there are no images matching your search query. Please try again.';
}

function refreshSimpleLightbox() {
  // Check if SimpleLightbox is defined and has the refresh method
  if (typeof SimpleLightbox !== 'undefined' && SimpleLightbox.refresh) {
    SimpleLightbox.refresh();
  }
}
