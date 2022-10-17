/**
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
*/


/**
 * Define Global Variables
 * 
*/

//Creating document fragment.
const fragment = document.createDocumentFragment();

//Creating data structure containing all sections (nodeList).
const sections = document.querySelectorAll("section");

//Getting ul element.
const navList = document.getElementById("navbar__list");

//Getting alist of h2 text contents in order to use them in menu bar. 
const text = document.querySelectorAll("h2");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//Creating a function which creates lists in a navigation menu.
function createNavBar(sectionsList) {
    /**Using for loop to create four li elements containing anchor tags then
    appending them to the document fragment.*/
    for (let i=1; i<=sectionsList.length; i++) {
    const navSec = document.createElement("li");
    //appending sections id and text contents to anchor tags.
    navSec.innerHTML = `<a href='#${sectionsList[i-1].id}' 
    class="menu__link">${sectionsList[i-1].getAttribute("data-nav")}</a>`;
    fragment.appendChild(navSec);
    }
}

createNavBar(sections) //invoking the function with the argument 'sections'.

//appending document fragment to ul element.
navList.appendChild(fragment);

/**
 * End Main Functions
 * Begin Events
 * 
*/

//Adding event listener to listen for clicks on any anchor element in nav. menu.
navList.addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
        // Prevent the default action of href attribute of anchor tag.
        e.preventDefault();
        sections.forEach(sec => {
            if (e.target.getAttribute("href").slice(1) === sec.id) {
                /**Scroll to anchor ID in a smooth behavior using scrollIntoView
                event (Source of scrollIntoView: MDN Documentation).*/
                sec.scrollIntoView({
                    behavior: "smooth"
                })
            }
        });
    }
});


//Creating function to detect if the section is in viewport or not.
function InView(element) {
    /**Getting the space between the section and the top of view + all space
    of page being scrolled - the space remained of section being scrolled.*/
    const secTop = (element.getBoundingClientRect().top +
    window.pageYOffset) - 150;
    const verticalScroll = window.pageYOffset;
    /**Containing the space in which section is viewed
    (to highlight even the viewed part of it).*/
    return (verticalScroll > secTop) && 
    (verticalScroll <= secTop + element.offsetHeight);
    //source:https://gist.github.com/khuongyolo/4e7d8308c01733961f7ad0c9964db591
}

//Adding event listener to listen for scrolling through sections.
document.addEventListener("scroll", () => {
    for (const section of sections) {
        /**In order for a better user experience the highlight would last
        for most of section while scrolling.*/
        if (InView(section)) {
            //Add class 'your-active-class' to section when near viewport top.
            section.classList.add("your-active-class");
            //Add class 'active' to anchor tag when scrolling near viewport top.
            document.querySelector(`.navbar__menu a[href='#${section.id}']`)
            .classList.add("active");
        } else {
            section.classList.remove("your-active-class");
            document.querySelector(`.navbar__menu a[href='#${section.id}']`)
            .classList.remove("active");
        }
    }
});
