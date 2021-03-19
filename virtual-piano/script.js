const letterDisplay = document.querySelector('.btn-letters');
const noteDisplay = document.querySelector('.btn-notes');
const pianoKeys = document.querySelectorAll('.piano-key');
const pianoBoard = document.querySelector('.piano');
const screenSize = document.querySelector('.fullscreen');
const mainWindow = document.querySelector('.main');

// The switch function for displaying as letters
letterDisplay.addEventListener('click', function(e){
  if(!this.classList.contains('btn-active')){
    this.classList.add('btn-active');
    noteDisplay.classList.remove('btn-active');
    pianoKeys.forEach(key => key.classList.add('piano-key-letter'));
  }
});

// The switch function for displaying as notes
noteDisplay.addEventListener('click', function(e){
  if(!this.classList.contains('btn-active')){
    this.classList.add('btn-active');
    pianoKeys.forEach(key => key.classList.remove('piano-key-letter'));
    letterDisplay.classList.remove('btn-active');
  }
});


// catching the keys on keyboard
window.addEventListener('keydown', function(e){
  if(!e.repeat){let key = document.querySelector(`div[data-letter="${e.code.slice(3)}"]`);
  let audio = document.querySelector(`audio[data-letter="${e.code.slice(3)}"]`);
  if(key){
    key.classList.add('piano-key-active');
    key.classList.add('piano-key-active-pseudo');
    makeBubble();
    audio.currentTime = 0;
    audio.play();
    audio.repeat
  }}
});

// deactivating when keyboard is not pressed anymore
window.addEventListener('keyup', function(e){
    key = document.querySelector(`div[data-letter="${e.code.slice(3)}"]`);
    if(key){
      key.classList.remove('piano-key-active');
    key.classList.remove('piano-key-active-pseudo');
    }
});

//return keys back to normal state
pianoKeys.forEach(key => key.addEventListener('mouseup', function(e){
  this.classList.remove('piano-key-active');
  this.classList.remove('piano-key-active-pseudo');
}));



let ok = false; //check if the mouse is down

//mouse clicks on piano
pianoKeys.forEach(key => key.addEventListener('mousedown', function(e){
    ok = true;
  if(e.target.attributes[1]){
    let key = document.querySelector(`div[data-letter="${e.target.attributes[1].value}"]`);
    let audio = document.querySelector(`audio[data-letter="${e.target.attributes[1].value}"]`);
    if(key){
      key.classList.add('piano-key-active');
      key.classList.add('piano-key-active-pseudo');
      makeBubble();
      audio.currentTime = 0;
      audio.play();
  }
  }
}));


// check if mouse is not press holded anymore
window.addEventListener('mouseup', function(e){
  ok=false;
});


// if the mouse is pressed plays songs when mouse is moved
pianoKeys.forEach(key => key.addEventListener('mouseenter', function(e){
  if(ok){
    let key = document.querySelector(`div[data-letter="${e.target.attributes[1].value}"]`);
    let audio = document.querySelector(`audio[data-letter="${e.target.attributes[1].value}"]`);
    if(key && audio){
      key.classList.add('piano-key-active');
      key.classList.add('piano-key-active-pseudo');
      makeBubble();
      audio.currentTime = 0;
      audio.play();
    }
  }
}));

// deactivate if mouse is not pointing on the piano key anymore
pianoKeys.forEach(key => key.addEventListener('mouseleave', function(e){
    
    let key = document.querySelector(`div[data-letter="${e.target.attributes[1].value}"]`);
    key.classList.remove('piano-key-active');
    key.classList.remove('piano-key-active-pseudo');
  }));


  // set the screen size
  screenSize.addEventListener('click', function(e){
    
    if (!document.fullscreenElement){
      this.classList.add("openfullscreen");
      document.documentElement.requestFullscreen();
    }
    else{
      this.classList.remove("openfullscreen");
      document.exitFullscreen();
    }
  });


// make random bubbles, inspired from some youtube video
function makeBubble(){
  const bubbleElem = document.createElement('span');
  let size = Math.random() * 40;

  bubbleElem.style.width = 15+size + 'px';
  bubbleElem.style.height = 15+size + 'px';
  bubbleElem.style.left = Math.random()*innerWidth + 'px';
  bubbleElem.style.background = `rgba(${Math.random()*255} ${Math.random()*255} ${Math.random()*255})`;
  mainWindow.appendChild(bubbleElem);

  setTimeout(()=>{
    bubbleElem.remove();
  }, 3000);
}


