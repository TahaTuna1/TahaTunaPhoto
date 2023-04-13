
var posts = [];
let imageFiles = [];
var imageIndex = 0;

fetch('./images.json') /* Fetching JSON from local file instead. */
  .then(response => response.json())
  .then(data => {

    console.log(data);
        createPosts(data.imagesMain, "Main");    
        createPosts(data.street, "Street");
        createPosts(data.product, "Product");
        createPosts(data.portrait, "Portrait");
        createPosts(data.stage, "Stage");
  })
  .catch(error => {
    console.error(error);
  });


function createPosts(pageImageArray, arrayName){
    posts = [];
    console.log(pageImageArray.length + " images after fetch. Value means success.");

    const imageCount = pageImageArray.length;
    for(let i = 1; i <= imageCount; i++){
     let item = {
         id: i,
         title: `Post ${i}`, 
         image: pageImageArray[imageIndex]
     }
     posts.push(item);
     console.log("images added to " + arrayName);
     imageIndex++;
     if(imageIndex > pageImageArray.length - 1) imageIndex = 0;
    }
    console.log(posts);
    localStorage.setItem(`posts${arrayName}`, JSON.stringify(posts)); 
}

localStorage.setItem('visited', true);


/* Express JS Solution Removed 07/04/2023. Writing image names to local json file instead. Node.js only.*/
/* 
async function fetchImages() {
    try{
        const response = await fetch('http://localhost:8080/images');
        const data = await response.json();
        console.log(data);
        const imagesMain = data.images.imagesMain;
        const street = data.images.street;
        const product = data.images.product;
        const portrait = data.images.portrait;
        const stage = data.images.stage;
        console.log(imageFiles);
        // Call the function that uses the imageFiles array here
        
        
        createPosts(imagesMain, "Main");
        createPosts(street, "Street");
        createPosts(product, "Product");
        createPosts(portrait, "Portrait");
        createPosts(stage, "Stage");
        
    }catch (error) {
        console.error(`ERROR ${error}`)
        console.log("Failed. Retrying...")

    }
}

fetchImages();
*/


/*
fetch('http://localhost:8080/images')
    .then(response => response.json())
    .then(data => {
        imageFiles = data.images // Do something with the data
        console.log(imageFiles.length + " images inside fetch. It means it works and gets the images.");
    })
    .catch(error => {
        console.error(error);
    });
*/




/*
const imageFiles = [
    "images/DSC_8465_exp1.jpg",
    "images/DSCF2410_exp1.jpg",
    "images/DSCF6588_exp1.jpg",
    "images/DSCF7433_exp1.jpg",
    "images/DSCF8322_exp1.jpg"
]; */

        
        





