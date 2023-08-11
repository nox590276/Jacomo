window.addEventListener('load', () => {
  const $header = document.querySelector('header')
  const $menuBtn = document.querySelector('header>button>img')
  const $mobileMenuWrap = document.querySelector('#mobilemenu')
  const $mobileMenu = document.querySelectorAll('#mobile_mainMenu>li>a')
  const $closeBtn = document.querySelector('#mobileclose_btn')
  const grayWrap = document.createElement('div')

  grayWrap.id = 'mobile_graylayer'

  let selectedMenu = null;
  let closeHeight = 45;
  let openHeight = null;
  let menuWidth = window.innerWidth * 0.5
  
  gsap.set($mobileMenuWrap, { width: menuWidth, height: window.innerHeight, right: -menuWidth, display: 'none' })

  window.addEventListener('resize', resetMenuWidth)//반응형을 위한 코드
  function resetMenuWidth() {
    menuWidth = window.innerWidth * 0.8;
    gsap.set($mobileMenuWrap, { width: menuWidth });
  }

  $menuBtn.addEventListener('click', openMobileMenu)
  $closeBtn.addEventListener('click',closeMobileMenu)
  for(item of $mobileMenu){
    item.addEventListener('click',activatMenu)
  }

  function openMobileMenu() {
    gsap.set(grayWrap,{display:'block'})
    $header.append(grayWrap)
    gsap.set($mobileMenuWrap, { display: 'block' })
    gsap.to($mobileMenuWrap, { right: 0, duration: 0.3, ease:'power1.out' })
    gsap.set('body,html', { overflow: 'hidden' })
  }
  
  function closeMobileMenu(){
    if(selectedMenu!=null){
      gsap.to(selectedMenu.parentElement,{height:closeHeight,duration:0.3,ease:'power1.out'})
      selectedMenu.classList.remove('selected')
    }

    gsap.set(grayWrap, { display: 'none' })
    gsap.to($mobileMenuWrap,{right:-menuWidth,duration:0.3, ease:'power1.out' ,onComplete:()=>{
      gsap.set($mobileMenuWrap,{display:'none'})
    }})
  }

  function activatMenu(){
    if(selectedMenu!=null && selectedMenu!=this){
      gsap.to(selectedMenu.parentElement,{height:closeHeight,duration:0.3,ease:'power1.out'})
      selectedMenu.classList.remove('selected')
    }
    if(selectedMenu!=this){
      selectedMenu=this
      openHeight=closeHeight+(closeHeight*selectedMenu.nextElementSibling.children.length)
      gsap.to(selectedMenu.parentElement,{height:openHeight,duration:0.3,ease:'power1.out'})
      selectedMenu.classList.add('selected')
    }else if(selectedMenu==this){
      gsap.to(selectedMenu.parentElement,{height:closeHeight,duration:0.3,ease:'power1.out'})
      selectedMenu.classList.remove('selected')
      selectedMenu=null;
    }
    if(selectedMenu.nextElementSibling!=null){
      selectedMenu.classList.add('selected')
    }
  }

})