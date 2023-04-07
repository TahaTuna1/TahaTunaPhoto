


  

async function generateMasonryGrid(columns, posts, sleepTime){
    
    await sleep(sleepTime);

    posts = JSON.parse(localStorage.getItem('postsMain'));
    const container = document.querySelector(`.container`);

    container.innerHTML = ``;

    let columnWrappers = {};
    for(let i = 0; i < columns; i++){
        columnWrappers[`column${i}`] = []
    }

    for(let i = 0; i < posts.length; i++){
        const column = i % columns;
        columnWrappers[`column${column}`].push(posts[i]);
    }
    
    for(let i = 0; i < columns; i++){
        let columnPosts = columnWrappers[`column${i}`];
        let column = document.createElement('div');
        column.classList.add('column');

        columnPosts.forEach(post => {
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            let image = document.createElement('img');
            image.addEventListener('load', () => {
                // Generate the masonry grid only after all images have been loaded
                if (i === columns - 1 && columnPosts.indexOf(post) === columnPosts.length - 1) {
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
    posts = JSON.parse(localStorage.getItem('postsMain'));
    imageIndex = 0;
    if(window.innerWidth < 650 && previousScreenSize > 650){
        generateMasonryGrid(2, posts, 0);
    }else if(window.innerWidth >= 650 && window.innerWidth < 1100 &&(previousScreenSize < 650 || previousScreenSize >= 1100)){
        generateMasonryGrid(3, posts, 0);
    }else if(window.innerWidth >= 1100 && previousScreenSize < 1100){
        generateMasonryGrid(4, posts, 0);
    }
    previousScreenSize = window.innerWidth;
})

//Initial Page Load

if(previousScreenSize < 650){
    generateMasonryGrid(2, posts, 1);
}else if(previousScreenSize >= 650 & previousScreenSize <1100){
    generateMasonryGrid(3, posts, 1);
} else{
    generateMasonryGrid(4, posts, 1);
}

async function sleep(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000)); 
}


