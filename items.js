
var posts = [];
let imageFiles = [];
var imageIndex = 0;

console.log(imageFiles.length + " images before fetch");


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
     console.log("imageAdded");
     imageIndex++;
     if(imageIndex > pageImageArray.length - 1) imageIndex = 0;
    }
    console.log(posts);
    localStorage.setItem(`posts${arrayName}`, JSON.stringify(posts)); 
}


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
        /* ADD SOME SORT OF RETRY FUNCTION*/
    }
}

fetchImages();



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

 /* Google API KEY: AIzaSyBZqtrFg3IkSUXc4G4UrTH_oi2-jrL02e0  */

        
        





