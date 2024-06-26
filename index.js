const apiKey = "44245145-3992e974edb390e4edf38875e"; 
let query = ""; 
let currentPage = 1;
const perPage = 15;

const imageContainer = document.querySelector("#image-container");
const loadMoreButton = document.querySelector("#load-more");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const modal = document.querySelector("#modal");
const modalImage = document.querySelector("#modal-image");

function getImages(page) {
  fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка мережі");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.hits.length > 0) {
        data.hits.forEach((image) => {
          const imageElement = `
            <div class="image-wrapper">
              <img src="${image.webformatURL}" alt="${image.tags}">
            </div>
          `;
          imageContainer.innerHTML += imageElement;
        });
        const images = document.querySelectorAll(".image-wrapper img");
        images.forEach((image) => {
          image.addEventListener("click", () => {
            modalImage.src = image.src;
            modal.classList.add("active");
          });
        });
      } else {
        const messageElement = document.createElement("p");
        messageElement.textContent = "На жаль, (більше) зображень за вашим запитом не знайдено. Обновіть сторінку щоб спробувати ще раз.";
        imageContainer.appendChild(messageElement);
      }
    })
    .catch((error) => {
      console.error("Помилка при отриманні даних:", error);
    });
}

modal.addEventListener("click", () => {
  modal.classList.remove("active");
});

searchButton.addEventListener("click", () => {
  query = searchInput.value;
  imageContainer.innerHTML = ""; 
  currentPage = 1; 
  getImages(currentPage);
});

loadMoreButton.addEventListener("click", () => {
  currentPage += 1;
  getImages(currentPage);
});

getImages(currentPage);
