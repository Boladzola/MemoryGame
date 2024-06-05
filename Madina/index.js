// const rootNode = document.getElementById("root");

const arr = [
    "img/alice.png",
    "img/cat.png",
    "img/cups.jpg",
    "img/hatter.png",
    "img/hear.jpg",
    "img/queen.jpg",
    "img/rabbit.png",
    "img/time.jpg"
]



const addPhoto = (content, container) => {
    const image = document.createElement("img");
    const div = document.createElement("div");
    
    image.src = content.src;
    // image.alt = content.alt;
    // image.title = content.title

    // div.className = "imageBox";
    div.classList.add("imageBox")
    div.classList.add("openedImageBox")
    div.onclick = () => { 
        // const currentCard = event.target;
        // console.log("clik", div.classList.contains("openedImageBox"));
        if (div.classList.contains("openedImageBox")) {
            div.classList.remove("openedImageBox")
            div.classList.add("closedImageBox")
        }
        else {
            div.classList.remove("closedImageBox")
            div.classList.add("openedImageBox")
        }
    }
    div.append(image)
    container.append(div);
};

const addPhotosBox = (photosList) => {
    const rootNode = document.getElementById("root")
    const imageContainer = document.createElement("section")
    imageContainer.className = "grid4x4"
    rootNode.append(imageContainer);
    photosList.forEach(item => {
        addPhoto(
            {
               src: item
            },
            imageContainer
        );
    });
};

addPhotosBox([...arr, ...arr])
