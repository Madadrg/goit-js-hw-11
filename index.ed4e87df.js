!function(){function e(){document.getElementById("notification").innerText="Sorry, there are no images matching your search query. Please try again."}document.getElementById("search-form").addEventListener("submit",(function(t){t.preventDefault();var n=document.getElementsByName("searchQuery")[0].value;fetch("https://pixabay.com/api/?key=".concat("42335893-81a0738270e344fb8d80a811a","&q=").concat(n,"&image_type=photo&orientation=horizontal&safesearch=true")).then((function(e){return e.json()})).then((function(t){!function(t){var n=document.getElementById("gallery");if(n.innerHTML="",0===t.length)return void e();t.forEach((function(e){var t=document.createElement("div");t.className="photo-card";var a=document.createElement("img");a.src=e.webformatURL,a.alt=e.tags,a.loading="lazy";var o=document.createElement("div");o.className="info",["Likes","Views","Comments","Downloads"].forEach((function(t){var n=document.createElement("p");n.className="info-item",n.innerHTML="<b>".concat(t,":</b> ").concat(e[t.toLowerCase()]),o.appendChild(n)})),t.appendChild(a),t.appendChild(o),n.appendChild(t)}))}(t.hits)})).catch((function(t){e()}))}))}();
//# sourceMappingURL=index.ed4e87df.js.map
