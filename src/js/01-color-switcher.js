function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const bodeEl = document.querySelector('body');
  const btnStartChangeColorEl = document.querySelector('button[data-start]');
  const btnStopChangeColorEl = document.querySelector('button[data-stop]');

  btnStartChangeColorEl.addEventListener('click',startChangeColorHandler);
  btnStopChangeColorEl.addEventListener('click', stopChangeColorHandler)

  let timerId = null;


  function startChangeColorHandler (){
    btnStartChangeColorEl.setAttribute('disabled', 'true');
    btnStopChangeColorEl.removeAttribute('disabled')
    timerId = setInterval(()=>{  bodeEl.style.backgroundColor = getRandomHexColor();
       }, 1000)
  };

  function stopChangeColorHandler(){
    clearInterval(timerId);
    
    btnStartChangeColorEl.removeAttribute('disabled')
    btnStopChangeColorEl.setAttribute('disabled', 'true');
  };