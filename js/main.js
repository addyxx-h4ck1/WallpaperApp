/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  // openNav()

///////////////background change////////////////////
const  backgroundDiv = document.querySelector('.header-overlay')
fetch('database/background.json')
.then(res => {return res.json()})
.then(res => {
  const links = res.links
  let random = Math.floor(Math.random()*links.length)
  backgroundDiv.style.backgroundImage = `url(${links[random]})`
})
///////////////background change////////////////////

///////////////News////////////////////
fetch('database/news.json')
.then(res =>{return res.json()})
.then(res =>{
  const newsArray = res.news

        /////////////function//////////
        var displayNames = {
          max : newsArray.length, 
          current : 0,
          timeout : null,
          go : function() {
              // console.log(newsArray[this.current]);

            let currentNews = newsArray[this.current]

              this.current = (this.current+1) % this.max;//increment current position
              this.timeout = setTimeout(function(){displayNames.go();}, 40000);

              let newsImg = currentNews.image
              let newsp = currentNews.p

              let newsBlockImage = document.querySelector('.news-append img')
              newsBlockImage.src = newsImg

              let newsBlockContent = document.querySelector('.news-append p')
              newsBlockContent.textContent = newsp
              

          },
          stop : function(){
              clearTimeout(this.timeout);
          }
        
      }
      //to start
      displayNames.go();
      //set to stop after 5 seconds:
      setTimeout(function(){displayNames.stop();}, 100000000);
        /////////////function//////////


})
///////////////News////////////////////

const myfunc1 = () => {
    fetch('database/sorted.json')
    .then(res => {
      return res.json();
    })
    .then(res => {
      ///////////////shuffle////////////////////////////
      function shuffleArray(array) {
        let len = array.length,
            currentIndex;
        for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
            let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
            var temp = array[currentIndex];
            array[currentIndex] = array[randIndex];
            array[randIndex] = temp;
        }
    }
    let a = res.fourk;

    shuffleArray(a);
      /////////////////append data//////////////////////////

      const parent = document.getElementById('fourkimages')

      a.forEach(element => {
        const thumbnail = document.createElement('img')
        thumbnail.src = `${element.url}`

         ////////////////onslock//////////////
        thumbnail.addEventListener('click', () => {
          openNav();

          let imageName = document.querySelector('.image-name')
          let imageDimention = document.querySelector('.image-dimention')
          let imageSize = document.querySelector('.image-size')
          let imageDate = document.querySelector('.image-date')
          let selectedImage = document.querySelector('.selected-image')
          let imageView = document.querySelector('.view')
          let imageDownload = document.querySelector('.download')

          imageName.textContent = (`${element.name}`)

          imageDimention.textContent = (` Dimention : ${element.width} * ${element.height}`)

          imageSize.textContent = (`Image Size : ${element.size / 1000}KB`)

          imageDate.textContent = (`Created : ${element.createdAt}`)

          imageView.href = (`${element.url}`)
          imageView.setAttribute('target', '_blank')

          
////////////////////download///////////////////////////
          let imageData
          fetch(`${element.url}`)
            .then(response => response.blob())
            .then(data => {
            const urlCreator = window.URL || window.webkitURL;
            imageData = urlCreator.createObjectURL(data);
            selectedImage.src = imageData ;
          //add this
            imageDownload.href = imageData;
            ////////////////////download///////////////////////////
//
});
        })
        //////////////////////////////////////
        parent.appendChild(thumbnail)
      })
      const button = document.createElement('button')
      button.className = 'load-more'
      button.textContent = 'Load More'
    
      parent.appendChild(button)
      
      ///////////////////////////////////////////

//////////////load more////////////
    let loadMore = document.querySelector('.load-more');
    let currentItem = 7;

    loadMore.onclick = () =>{
      let boxes = [...document.querySelectorAll('#fourkimages img')];
      for (var i = currentItem; i < currentItem + 10; i++){
          boxes[i].style.display = 'inline-block';
       
      }
      currentItem += 10;
      if(currentItem >= boxes.length){
        loadMore.style.display = 'none';
    }}
      


///////////////load more///////////////////
/////////////////on click///////////////
      
    }).catch(err => {
      throw err;
    })}
myfunc1();
