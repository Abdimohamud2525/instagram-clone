//select ansplash apiKeys
const accessKey = 'aS92sxM8f7dHyscUfDQp_PZsppetmji-9h1YBtLvLoA';

// select elemenst
const searchElemen = document.querySelector("#searchElement");
const searchBtn = document.querySelector("#btn");
// const searchControll = document.querySelector(".search-controll")
const postElements = document.querySelector(".posts")

let currentQuary = "car";
let currenPage = 1

async function fetchImg(quary = 'car' , page = 1){

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${quary}&client_id=${accessKey}&per_page=10&page=${page}`)
    const data = await response.json()
    console.log(data.results)
    let images = data.results
    images.forEach((image)=>{
        postElements.innerHTML += `<div class="post">
    <div class="user">
        <img src="${image.user.profile_image.large}" alt="">
        <span>${image.user.username}</span>
    </div>
    <img class="pic-img" src="${image.urls.small}" alt="">
    <div class="post-details">
        ${showHeart(image.like_by_username)}
    </div>
    <div class="likes">
        <span><span class="count">${image.likes}</span> likes</span>
    </div>
    <div>
        <p>
            <span class="username">${image.user.username}</span>
            ${image.description} ?  ${image.description} : ${image.alt_description}
        </p>
    </div>
 </div>`
    })
}
function showHeart(isLiked){
    return isLiked ? ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
  
  `:`

  
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 red ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

`
}
searchBtn.addEventListener("click", function(){
    let quary = searchElemen.value
   if(quary === '')alert("please select a valid search term");
   currentQuary = quary;
   postElements .innerHTML = ''
   currenPage = 1
   searchElemen.value = ''
   fetchImg(currentQuary, currenPage)

})
fetchImg()

window.addEventListener("scroll" , function(){
   console.log('window.innerHeight' + window.innerHeight, 'px' )
   console.log('window.scollY.' + window.scrollY, 'px' )
   console.log('document.body.offHeight' + document.body.offsetHeight , 'px' )

   if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
    currenPage++ ; 
    fetchImg(currentQuary,currenPage);
   }
})

