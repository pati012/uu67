"use strict";


//burger menu

 const burger = document.querySelector('#burger');
  const bodyMenuBurger = document.querySelector('.header__body');
  burger.addEventListener('click', function (e){
   burger.classList.toggle('openBurger');
    bodyMenuBurger.classList.toggle('OpenBodyMenu');
     if(burger.classList.contains('openBurger')){
       document.body.style.overflow = 'hidden';
     }
     else{
      document.body.style.overflow = 'visible';
     }
  });


 //ленивая подгрузка

  const allImage = document.querySelectorAll('img[data-src]');
   const clientHeight = document.documentElement.clientHeight;
  
   let imageArray = [];
    if(allImage.length > 0){
      allImage.forEach((item) => {
        imageArray.push(item.getBoundingClientRect().top + pageYOffset);
      });
      lazyLoading();
    }

   window.addEventListener('scroll', function (e){
     if(document.querySelectorAll('img[data-src]').length > 0){
       lazyLoading();
     }
   })

    function lazyLoading(){
      let arrayImageIndex = [];
       imageArray.forEach((item, index) => {
         if(pageYOffset > item - clientHeight){
           arrayImageIndex.push(index);
         }
         arrayImageIndex.forEach(item => {
           if(allImage[item].dataset.src){
             allImage[item].src = allImage[item].dataset.src;
            allImage[item].removeAttribute('data-src');
           }
           delete arrayImageIndex[item];
         });
       })
    }

       //swiper

       new Swiper('.swiper', {
         slidesPerView: 1,
         watchOverflow: true,
         spaceBetween: 30,
         conteredSlides: true,
         speed: 600,
         observer: true,
         observerSlideChildren: true,
         simulateTouch: true,
         navigation: {
          nextEl: '.swiper-button-next ',
          prevEl: '.swiper-button-prev',
          },      
          breakpoints:{    
            650: {
              slidesPerView: 2,
            }
          }
       });

       Fancybox.bind('[data-fancybox="gallery"]', {
       
      });


      //смена menu header
      const darkBlocks = document.querySelectorAll('.dark');
       const header = document.querySelector('header');
      const telephoneColor = document.querySelectorAll('.colors');
       console.log(telephoneColor);
      window.addEventListener('scroll', function () {
          let isIntersecting = false;
          for (let i = 0; i < darkBlocks.length; i++) {
              if (darkBlocks[i].getBoundingClientRect().bottom >= header.getBoundingClientRect().top
              && darkBlocks[i].getBoundingClientRect().top <= header.getBoundingClientRect().bottom) {
                  isIntersecting = true;
                  break;
              }
          }
      
          if (isIntersecting) {
              header.classList.add('header--light');
               telephoneColor.forEach(item =>{
                item.style.fill = '#fff';
               })
          } else {
              header.classList.remove('header--light');
              telephoneColor.forEach(item =>{
                item.style.fill = '#000';
               })
          }
      });
      


      //popup

       const popup = document.querySelectorAll('.popup-active[href]');
        var time = 800;
       let click = true;
        var timePopupOpen = 2000;
       const popupBig = document.querySelector('.popup-question');
        if(popup.length > 0){
           for(let item = 0; item < popup.length; item++){
             const element = popup[item];
              const clearElement = element.getAttribute('href').replace('#', '');
             const currentPopup = document.getElementById(clearElement);
              console.log(currentPopup);
            element.addEventListener('click', function (e){
              if(element && click){
                currentPopup.classList.add('popupOpen');
                bodyStop();  
              }
              currentPopup.addEventListener('click', function (e){
                if(!event.target.closest('.popup__capture')){
                  currentPopup.classList.remove('popupOpen');
                  bodyLoad();
                }
              })
              event.preventDefault();
            });
               
        const closesPopup = document.querySelectorAll('.popup__closes');
        if(closesPopup.length > 0){
          for(let item = 0; item < closesPopup.length; item++){
             const element = closesPopup[item];
            element.addEventListener('click', function (e){
               currentPopup.classList.remove('popupOpen');
                bodyLoad();
            });
          }
        }
          }
        }


        function bodyStop(){
          const activePopup = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
           document.body.style.paddingRight = activePopup + 'px';
           document.body.style.overflow = 'hidden';
        }
  
        function bodyLoad(){
          setTimeout(function (e){
            document.body.style.paddingRight = 0 + 'px';
            document.body.style.overflow = 'visible';
          }, time);
          click = false;
          setTimeout(function (e){
            click = true;
           }, timePopupOpen)
        }

        //проверка на наличии содержимого в input

        const input = document.querySelectorAll('.popup__input');
         const buttonPopup = document.querySelector('.popup__button');
          let timeColor = 3000;
         let submitTimeout = false;
          buttonPopup.addEventListener('click', function submits(e){
            const form = document.forms[0];
             const inputLogin = form.elements.login;  
             const inputPassword = form.elements.password;   
           const inputCheckBox = form.elements.agree;   
              if(!inputLogin.value || inputPassword.value.length < 6){
                const currentLogin = document.querySelector('.popup__login');
                 currentLogin.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    currentLogin.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                  event.preventDefault();
              }
              if(!inputPassword.value || inputPassword.value.length < 6){
                const currentPassword= document.querySelector('.popup__password');
                 currentPassword.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    currentPassword.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                  event.preventDefault();
              }
              if(!inputCheckBox.checked){
                const currentCheckBox = document.querySelector('.popup__agree');
                 const cupturePopup = document.querySelector('.popup__capture');
                  if(!cupturePopup.classList.contains('popup__error')){
                      const popupError = document.querySelector('.popup__error');
                      popupError.style.display = 'block';
                     setTimeout(function (e){
                      popupError.style.display = 'none';
                     }, timeColor)
                    event.preventDefault();
                  }
              }                   
         });

         //form 2
         const buttonPopupIn = document.querySelector('.popup__button-two');
         buttonPopupIn.addEventListener('click', function (e){
            const form = document.forms[1];
             const inputLogin = form.elements.login;  
             const inputPassword = form.elements.password;   
           const inputCheckBox = form.elements.agree; 
            const inputquestion = form.elements.question;
              if(!inputLogin.value || inputLogin.value.length < 6){
                const currentLogin = document.querySelectorAll('.popup__login');
                 currentLogin.forEach(item =>{
                  item.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    item.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                 })
                 
                  event.preventDefault();
              }
              if(!inputPassword.value || inputPassword.value.length < 6){
                const currentPassword= document.querySelectorAll('.popup__password');
                 currentPassword.forEach(item => {
                  item.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    item.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                 })
                  event.preventDefault();
              }
              if(!inputquestion.value || inputquestion.value.length < 6){
                const currentquestion = document.querySelector('.popup__question-in');
                currentquestion.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    currentquestion.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                  event.preventDefault();
              }
              if(!inputCheckBox.checked){
                 const cupturePopup = document.querySelectorAll('.popup__capture');
                  cupturePopup.forEach(item => {
                    if(!item.classList.contains('popup__error')){
                      const popupError = document.querySelectorAll('.popup__error');
                       popupError.forEach(item =>{
                        item.style.display = 'block';
                        setTimeout(function (e){
                         item.style.display = 'none';
                        }, timeColor)
                       })
                    event.preventDefault();
                  }
                  });
              }
            })
           
                                
         //scroll down section 1 to section 2

         const scrollSection = document.querySelector('.information__arrow-btn');
          const section = document.querySelector('.info-poduct__title');
              const coordinate = section.getBoundingClientRect().top + pageYOffset;
               scrollSection.addEventListener('click', function (e){
                 console.log(scrollSection);
                 window.scrollTo({
                  top: coordinate,
                  left: 0,
                  behavior: 'smooth',
                 })
               })

          //scroll up footer to header 
          
           const scrollUp = document.querySelector('.scroll-up');
            const cardBuildSection = document.querySelector('.card-build');
            window.addEventListener('scroll', function (e){
               const coordinate = cardBuildSection.getBoundingClientRect().top + pageYOffset;
               if(pageYOffset >= coordinate){
                 scrollUp.style.visibility = 'visible';
                 scrollUp.style.opacity = '1';
               }
               if(pageYOffset < coordinate){
                scrollUp.style.visibility = 'hidden';
                 scrollUp.style.opacity = '0';
               }
            });
             scrollUp.addEventListener('click', function (e){
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
             })
            
             