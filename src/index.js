// index.js

document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementsByName('searchQuery')[0].value;
    const apiKey = '42335893-81a0738270e344fb8d80a811a';

    // Make API request
    fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    )
      .then(response => response.json())
      .then(data => {
        displayImages(data.hits);
      })
      .catch(error => {
        displayError();
      });
  });

function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    displayError();
    return;
  }

  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';

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

    photoCard.appendChild(img);
    photoCard.appendChild(info);
    gallery.appendChild(photoCard);
  });
}

function displayError() {
  const notification = document.getElementById('notification');
  notification.innerText =
    'Sorry, there are no images matching your search query. Please try again.';
}
