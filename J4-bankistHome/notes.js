'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Smooth Scrolling
//
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (event) {
  //getting coordinates
  // event.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  //new way to implement smooth scolling, will only work on more modern browsers
  // section1.scrollIntoView({ behavior: 'smooth' });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Page Navigation
/*
this is not a clean solution because it attaches the same function to each element and the more elements you have the slower your code will be. Event Delegation will make the code more efficient.
//
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    //prevent the automatic jump from the href internal link
    e.preventDefault();
    // implement smooth scrolling using the href as the target coordinates.
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/
//Event Delegation
// 1.) Add the event listener on the common parent of all the events that you are interested in. This way you can use BUBBLING (not caputing) to your avantage as you navigate.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 2.) Determine what element originated the event
  //Matching strategy (make sure that you're only listening to clicks that happen ON one of your target elements and not just on the parent box. In this case only targets that have the nav__link class)
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //guard clause
  if (!clicked) return;
  //guard clause --> if there is no clicked (if it returns null because where you clicked doesn't have the parent element with the operations__tab class, and it doesn't have it itself (clicking on the tabs container but not near a button)) then the event handler will return immediately
  //
  //remove the active class (and all related styles) from all tabs and then add it only to the clicked tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //activate content area
  //data attribute tells you which content should be desplayed
  //make sure to first remove the active class from all before adding it to the clicked element
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // select the content dynamically by using the data-tab attribute to finish the contents class name
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Menu fade animation
//
const headerHover = function (event, op) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(elem => {
      if (elem !== link) elem.style.opacity = op;
      //^^if the element we're iterating through in 'sibling' is NOT the target element then change the opacity to op parameter
    });
    logo.style.opacity = op;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  headerHover(e, 0.5);
});
//if the mouse moves over an element in the nav class (section) and that element has the nav__link class, then the condition ^^ is true and code will be executed.

nav.addEventListener('mouseout', function (e) {
  headerHover(e, 1);
});
//change the opacity back when the mouse moves out of the element's range
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Sticky (locked) Navigation Bar
//
// add sticky class to the nav bar after you've scroll a certain distances so that it will remain locked at the top of the screen and the background will be transparent
//
// const initialCoords = section1.getBoundingClientRect();
//the code below is functional. However using the scroll event is bad for performance and should be avoided. Because it fireds constantly no matter how small the scroll is.
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });
///////////////////////////////////////////////////////////
// intersection observer API
//better way to lock nav bar when scrolling
//this API allows our code to observe changes to the way that a target element intersects another element or the way it intersects the viewport

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //root--> the element that the target is intersecting
//   //when the target (section1) intersects the entire viewport (null)
//   threshold: [0, 0.2], // the percentage of intersection at which the obsCallback will be called --> callBack function will be called whenever the target (section1) moves into view or completely out of view 0%. Will also be called when the target has 20% visible.
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
// console.log(nav.getBoundingClientRect());
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//rootMargin --> a box of '-90px' (calculated dynamically above incase viewport changes size) that will be applied inside of our target element (header). Essentially making the header 90px smaller (negative) so that we trigger the callback before the header is fully out of view. (positive would be a box OUTside of the target)
//this way the nav bar locks when there is still room BEFORE the section1 element for it, so it does not immediately cover part of the section1 element.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//reveal elements on scroll

//reveal sections
//add or remove the section--hidden class on each section as it enters or exits the viewport.
//this is just for the sections right now, not the images.
const allSections = document.querySelectorAll('.section');
//select every section
const revealSect = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //after it abserves it and makes it visible, it will not observe it again. Improves performance
};
const sectObserver = new IntersectionObserver(revealSect, {
  root: null,
  threshold: 0.15,
  //reveal section when it is 15% 'visible' in the viewport
});

allSections.forEach(function (section) {
  sectObserver.observe(section);
  //observe each section
  section.classList.add('section--hidden');
  //add the hidden class to every section
});
///////////////////////////////////////

// lazy loading images
//all images have a very low resolution image to start off with which is loaded immediately. (Low resolution so loads quickly and easily)
//as you scroll to a LowRes image you replace it with the second image link in the html which has the highRes image. This way the highRes images only load one at a time as you come to them.
//have a blur filter on the LowRes image to hide how pixelated it is. Remove that filter once the highRes image is fully loaded. (give it a special class and in CSS have that class set to filter: blur(20px))

const imgTargets = document.querySelectorAll('img[data-src]');
//select only the images which have the property data-src. These are the highRes images and the only ones that we want to lazy load.
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace the src attribute (lowRes Img) with the data-src (highRes Img). (happens behind the scenes)
  entry.target.src = entry.target.dataset.src;
  //once javascript has finished replacing the lowRes image with the highRes (loading the img) it will emit the 'load event'. You don't want to remove the blur until after that has happen. Else users on slow networks will wittness the pixelated loading.
  //listen for the load event THEN remove the blur
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshhold: 0,
  rootMargin: '200px', //start loading img 200px before user reaches them
});
//create image observer function

imgTargets.forEach(img => imgObserver.observe(img));
// loop over the images and observe each image

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//building a slider component
const slider = function () {
  //put all code within one function so you don't pollute the global space with variable names. Call imediately.
  // 1.) establish the initial contition so all three slides are side-by-side and not right on top of one another. Set the transform property to 0%, 100% and 200% respectively.

  const slides = document.querySelectorAll('.slide');
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    ); // for each slide, set the transform value to the desired value
  };
  goToSlide(0); //call function when slide=0 so that you're using (100*(i-0)) which is just 100*i

  //

  // 2.) use the buttons to move the slides right or left. (change their transform property by -100px or +100px)
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length; // set equal to the number of slides in the slides node list
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      //curSlide is 0 based so -1 from the maxSlide
      curSlide = 0; //reset back to the beginning
    } else {
      curSlide++; //if you haven't reached the maxSlide yet, add one to the curSlide count
    }
    goToSlide(curSlide); //call the function to transform the slides using the curSlide count
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1; //when we're back at the beginning, if we click left again, we want to jump to the end
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //

  // 3.) use the left and right arrow keys to move the slides left and right.
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  //

  // 4.) create the dots to a) show which slide you're on, and b) allow you to click which slide you want to view.
  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();
  //my own code below DID create the html code correctly! :D
  // const createDots = function (num) {
  //   let button = document.createElement('button');
  //   button.classList.add('dots__dot');
  //   button.dataset.slide = num;
  //   dotContainer.append(button);
  // };
  // createDots(0);
  // createDots(1);
  // createDots(2);
  //
  //Change the color of the clicked dot
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //remove the active class from all dots
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
    //select the dot (clss=dots__dot) that has the attribute [data-slide=${slide}] where slide is the number that the function is called with. Add the active class
  }; //call this function everywhere you call goToSlide()
  activateDot(0); //give it an initial call so the first dot is colored before we clich anything
  //
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      //when you click on the dotContainer (e) then IF the place you clicked has an element with the class dots__dot, you will create a varible equal to the value of the data-slide within that dot (a number as created in the createDots function)
      curSlide = slide;
      //Update the curSlide so that the slide that the dots are on is the same that the buttons and arrow keys will be working with
      goToSlide(slide);
      //Next goToSlide(stored number)
      activateDot(slide);
    }
  });
};
slider();
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cookie message
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics.`;
message.innerHTML = `We use cookies for improved functionality and analytics. <button class ='btn btn--close-cookie'>Got it!</button>`;
// const header = document.querySelector('.header'); //declared above
// header.prepend(message);
header.append(message);
//remove the cookie message when the button is clicked.
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //OR   message.parentElement.removeChild(message);
  });

//styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// message.style.height = '80px';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// //data attributes

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
const h1 = document.querySelector('h1');

// h1.onmouseenter = function () {
//   alert('addEventListener2: You are reading the heading.');
// };
const alertH1 = function (e) {
  alert('addEventListener: You are reading the heading.');
  //remove it after listening for the event one time
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);
//
//if instead of removing the event listener after using it once; you wanted to remove it after a certain amount of time, you can use a timeout
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Bubbling and Capturing Events

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
  // console.log('click1', e.target, e.currentTarget);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // console.log('click2', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // console.log('click3', e.target, e.currentTarget);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DOM Traversing
const h1 = document.querySelector('h1');
// going downwards (selecting child elements)
//selects all the child elements with the class highlight no matter how deeply they're buried in the DOM tree
console.log(h1.querySelectorAll('.highlight'));
//element.children gives a live collection of all the direct children of an element
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards, selecting parents
//selecting direct parent
console.log(h1.parentNode);
console.log(h1.parentElement);
//selecting the closes parent with the specified class/id
h1.closest('.header').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';
//going sideways -- direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//all of the sibling elements by going to the parent element and then selecting ALL the child elements
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (elem) {
  if (elem !== h1) elem.style.transform = 'scale(0.5';
});

*/
