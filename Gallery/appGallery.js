
/* Redirect to the homepage on first time visit to fetch photos*/
if (!localStorage.getItem('visited')) {
    window.location.href = "../index.html";
    localStorage.setItem('visited', true);
}

for (let i = 0; i < storedPosts.length; i++) {
    storedPosts[i].image = "../" + storedPosts[i].image;
  }
console.log(storedPosts);




async function generateMasonryGrid(columns, storedPosts){
    const container = document.querySelector(`.container`);
    
    container.innerHTML = ``;
    
    //Store all column arrays which contain the relevant storedPosts
    let columnWrappers = {};

        //Create column item array and add this to columnwrapper object
    for(let i = 0; i < columns; i++){
        columnWrappers[`column${i}`] = []
    }

    for(let i = 0; i < storedPosts.length; i++){
        const column = i % columns;
        columnWrappers[`column${column}`].push(storedPosts[i]);
    }
    
    for(let i = 0; i < columns; i++){
        let columnstoredPosts = columnWrappers[`column${i}`];
        let column = document.createElement('div');
        column.classList.add('column');

        columnstoredPosts.forEach(post => {
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            let image = document.createElement('img');
            image.addEventListener('load', () => {
                // Generate the masonry grid only after all images have been loaded
                if (i === columns - 1 && columnstoredPosts.indexOf(post) === columnstoredPosts.length - 1) {
                    new Masonry(container, {
                        itemSelector: '.post',
                        columnWidth: '.column',
                        percentPosition: true
                    });
                }
            });
            image.src = post.image;
            let overlay = document.createElement('div');
            overlay.classList.add('overlay');
            let title = document.createElement('h3');
            title.innerText = post.title;

            overlay.append(title);

            postDiv.append(image, overlay);

            column.appendChild(postDiv)
        })
        container.appendChild(column)
    }

   

}

let previousScreenSize = window.innerWidth;
window.addEventListener('resize', () =>{
    imageIndex = 0;
    if(window.innerWidth < 650 && previousScreenSize > 650){
        generateMasonryGrid(2, storedPosts, 0);
    }else if(window.innerWidth >= 650 && window.innerWidth < 1100 &&(previousScreenSize < 650 || previousScreenSize >= 1100)){
        generateMasonryGrid(3, storedPosts, 0);
    }else if(window.innerWidth >= 1100 && previousScreenSize < 1100){
        generateMasonryGrid(4, storedPosts, 0);
    }
    previousScreenSize = window.innerWidth;
})

//Page Load

if(previousScreenSize < 650){
    generateMasonryGrid(2, storedPosts, 1);
}else if(previousScreenSize >= 650 & previousScreenSize <1100){
    generateMasonryGrid(3, storedPosts, 1);
} else{
    generateMasonryGrid(4, storedPosts, 1);
}

async function sleep(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000)); 
}


