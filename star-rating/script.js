/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

function fillStar(elements, n) {
  for (el of elements) {
    //비교연산을 하는게 득인가 실인가
    if (n > 0) {
      el.className = "fa fa-star";
    } else {
      el.className = "fa fa-star-o";
    }
    n -= 1;
  }
}

function Star(el, count, callback) {
  const $el = document.querySelector(el);
	
  let countStar = 0;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star-o");
    star.id = "starIcon" + i;
    $el.appendChild(star);

    star.addEventListener("mouseover", () => {
      fillStar($el.children, i + 1);
	});
	star.addEventListener("mouseout", () => {
      fillStar($el.children, countStar);
	});
	star.addEventListener("click", () => {
	  countStar = i + 1 
      callback(countStar);
    });
  }
}
