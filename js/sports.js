const sportsFunc = () => {
    fetch('database/sports-collection.json')
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
    let a = res.sportsCollection;

    shuffleArray(a);;
      /////////////////append data//////////////////////////
  
      const parent = document.getElementById('sports-block')
  
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
      button.className = 'load-more-sp'
      button.textContent = 'Load More'
    
      parent.appendChild(button)
      
      ///////////////////////////////////////////
  
  //////////////load more////////////
    let loadMore = document.querySelector('.load-more-sp');
    let currentItem = 7;
    const b = document.querySelectorAll('#sports-block img')
  
    loadMore.onclick = () =>{
      let boxes = [...document.querySelectorAll('#sports-block img')];
      for (var i = currentItem; i < currentItem + 9; i++){
          boxes[i].style.display = 'inline-block';
      }
      currentItem += 9;
  
      if(currentItem == boxes.length){
          loadMore.style.display = 'none';
      }}
  ///////////////load more///////////////////
  /////////////////on click///////////////
      
  })}
  sportsFunc();
  