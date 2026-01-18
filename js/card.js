const cardsContainer = document.querySelector("#cards");

const loadPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    cardsContainer.innerHTML = "";

    posts.forEach(post => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUDAv/EADgQAAIBAwEEBAwFBQAAAAAAAAABAgMEEQUGITFREhNBcRQiI0JSYXKBkaGxwTJiY9HhFSQlNUP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALSABpkAAAAAAAAAAAHnWr0qEc16kaa7HN4RqrV9Ncuir+26XLrEUbwPmnOFWPSpTjOPOLyfQAAEAAAAAAAAAAAAAAAAAAAAAAIrru1HVTlbaY4ynF+NXfBPlHn3nrtjq0rairG3k41aqTnJcYx5e8hJYPSvWq3FR1K9SdSbe+U3lnmAVHta3VzZzVS1qzpyT814+PMmmz+0kL6Uba86NO5a8WS3RqfsyCmU2mmuK4BYtoHF2X1V6lY9Cs/7ijum/TXZI7RKAAIAAAAAAAAAAAAAAAABhtRi5S3RS3mTV1SThpt1JcVRl9Cit9Tup31/cXNR5dSba9S7PkawXAFQAAAAAdTZq6dprFvLOI1H1U+5/wA4LHKmpycasJLipJr4lsReYp81kixkAEAAAAAAAAAAAAAAAAA19Qh1lhcwXGVKS+RsGGs7nwfEoqUGzqdrKz1Cvby/5zaXrXFfLBrFQAAAAAelCHTr0oelNL5lrJYSXJFdbMWvhWtW6a8Wk+tl3L+cFjEWAAIAAAAAAAAAAAAAAAAAAAjO2GkzuaavraGatKPRqRXGUex+4hRbZHtX2Xt7ycq1pLwerJ5kvMk+7sKYgoOxcbM6tRk0rZVV2SpzX3wzW/omq5x/T7j3x3fEuo0DKTbwk23uSXFnattltVrvx6UaMPSqTT+SySbR9nLTTZqtPy9xj8clhL2V92CMbLaQ9Ns3UrrFzW3yXorsR2wCKAAgAAAAAAAAAAAAAAAAAGJuMYSlOXRillybwkuYGQR3UtrLO3bhZxdzP0uEPiR+72m1S4bxWjRi/NpRxj38S4LCfeYzu4lV1bq6qvytzVn7U2eSynlN555GGra7N7SBVlG9u6D6VG5rQa4YmzqWm1Wp278pKFzHlVW/4oYJ+Dh6ZtRZXjjCtm3qvzaj8XPtHcWGsrgAABAAAAAAAAAAAAAAADU1O/o6bZzua+9LdGPbKXYkUY1TUbbTLfrrmXsQT3zfqIFq+tXeqTfWy6FHOY0ovcu/mzW1G+r6jdTuLmScnuSXCK5L1GsVAAAAAAAAA7Gi7QXOmONOWa1rwdOT3xX5X9jjgC1LK8oX1vG4tZ9OnLl2Pkz3Kz0bVa+lXXW025U5bqlPO6S/cse1uKV1bwr0JKVOayiK9QAQAAAAAAAAAAUM43ldbSao9Svn0JZt6T6NPk+cvfu+RLNq77wLSZxhLFSv5OPc+L+H1K9ESgAKAAAAAAAAAAAEi2P1R2t34HUl5C4fi5e6M/54EdGWnlPD7GCLaX2Mmjot6tQ0yjcZTm49GftLibxFAAQAAAAAAAAQbbe5dXU6duvw0aSbX5nv+mCOnR2hqurrV5L9THw3HONJQAAAAAAAAAAAAAAAEu2Euni6tJPcsVIfR/YlpANjqjhrkF2ThJP6/Yn5KoACAAAAAABcUAFVdqv+zu3+rL6mqAaZAAAAAAAAAAAAAAAAdbZV/wCfte9/Rli9iAJVAAQAAB//2Q==" alt="post image">
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;

      cardsContainer.append(card);
    });

  } catch (error) {
    console.error(error);
    cardsContainer.innerHTML = "<p>Ошибка загрузки данных</p>";
  }
};

loadPosts();
