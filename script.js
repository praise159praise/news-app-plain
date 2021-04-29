function hearts(id) {
  var isLiked = false;
  news = id.parentElement.parentElement.parentElement;

  if (id.classList.value === "far fa-heart") {
    id.classList.value = "fas fa-heart";
    id.style.color = " red";
    id.style.textShadow = "0 0 5px rgba(20,20,20,.5)";
    id.style.animation = "blop .2s forwards";
    news.querySelector(".largeHeart").style.animation = "heart 1s forwards";

    isLiked = true;
  } else {
    id.classList.value = "far fa-heart";
    id.style.color = "white";
    id.style.animation = "plop .2s forwards";
    news.querySelector(".largeHeart").style.animation = "die 2s forwards";
    isLiked = false;
  }
}
function bell(id) {
  var bell = document.getElementById("bell");
  if (id.classList.value === "far fa-bell-slash") {
    id.classList.value = "fas fa-bell";
    id.style.color = "white";
    id.style.textShadow = "0 0 5px rgba(20,20,20,.5)";
    id.style.animation = "blop .2s forwards";
  } else {
    id.classList.value = "far fa-bell-slash";
    id.style.animation = "plop .2s forwards";
  }
}
var loader = document.getElementById("loader");
var container = document.getElementById("container");
var news = document.getElementById("news");

container.style.display = "none";

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    setTimeout(function () {
      loader.style.opacity = "0";
      loader.style.zIndex = "-100";
      container.style.display = "";
    }, 5000);
    setTimeout(function () {
      loader.style.display = "none";
    }, 10000);
    console.log("completed");
  }
};

// fetch("news.json")
//     .then(response => response.json())
//     .then(data =>container.onrea
//         {
//             for(i = 0; i<data.length; i++){
//                 console.log(data[i].title)
//                 var newNews = news.cloneNode(true)
//                 newNews.id += i  //newNews.id = newNews.id + i
//                 container.appendChild(newNews)

//                 newsCard = document.getElementById("news"+i)
//                 newsCard.querySelector('.title').innerHTML = data[i].title
//                 newsCard.querySelector('.name').innerHTML = data[i].newsCompany

//             }
//             document.getElementById("news").style.display = "none"
//         }
//         )

var contLoader = loader.cloneNode(true);
var keyCont = document.querySelector(".keywords");
var tag = keyCont.querySelector(".key");

function toggleSearch() {
  var searchInput = document.getElementById("search");
  searchInput.style.transition = "2s";

  if (searchInput.style.width != "100%") {
    searchInput.style.width = "100%";
    console.log("yee");
  } else {
    searchInput.style.width = "0%";
    console.log("eey");
  }
  searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      removeChildren(keyCont);
      removeChildren(container);
      fetchNews(searchInput.value);
    }
  });
}

tag.remove();
news.remove();
function fetchNews(sQuery) {
  var titles = "";
  container.style.overflow = "hidden";

  container.appendChild(contLoader);
  container.querySelector(".loader").style.display = "";
  fetch(
    `https://newsapi.org/v2/everything?q=${sQuery}&pageSize=50&apiKey=dce437e87b9248fca40319ea046889aa`
  )
    .then((response) => response.json())
    .then((data) => {
      container.querySelector(".loader").style.display = "none";
      container.style.overflowY = "scroll";

      for (i = 0; i < data.articles.length; i++) {
        var newNews = news.cloneNode(true);

        newNews.id += i;
        container.appendChild(newNews);
        var newsContent = document.getElementById("news" + i);

        newsContent.querySelector(".title").innerHTML = data.articles[i].title;
        newsContent.querySelector(".content").innerHTML =
          data.articles[i].description;
        newsContent.querySelector(".name").innerText =
          data.articles[i].source.name;
        newsContent.style.backgroundImage = `url(${data.articles[i].urlToImage})`;
        // newsContent.classList += " remove"

        newsContent
          .querySelector("#goLink")
          .setAttribute("iframe", data.articles[i].url);
        titles += " " + data.articles[i].title.toLowerCase();
      }

      console.log(titles);
      //break titles string into seperate strings and put them in in words[]
      var wordCounts = {};
      var words = titles.split(/\b/);

      //
      words.forEach(function (a) {
        for (i = 0; i <= words.length; i++) {
          wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
        }
      });

      var sortable = [];
      var re = /^[A-Za-z]+$/;

      for (var word in wordCounts) {
        if (word.length > 4 && re.test(word)) {
          sortable.push(word);
        }
      }

      sortable.sort(function (a, b) {
        return b - a;
      });

      for (i = 0; i < 25; i++) {
        var newTag = tag.cloneNode(true);
        newTag.id += i;
        keyCont.appendChild(newTag);
        newTag.innerHTML = sortable[i];
      }
      console.log(wordCounts);
      console.log(sortable);
    });

  console.log(`gotten ${sQuery}`);
}

function removeChildren(parent) {
  var children = parent.childNodes;
  const childrenLength = children.length;
  for (i = 0; i < childrenLength; i++) {
    parent.firstChild.remove();
  }
}

fetchNews("Nigeria");
function openNews(element) {
  var iframe = element.getAttribute("iframe");
  window.open(iframe);
}

function fetchTag(id) {
  removeChildren(keyCont);
  removeChildren(container);
  fetchNews(id.innerHTML);
  // console.log(id.innerHTML+"lrfld")
}
