// Resposta

const URL_BASE = "https://6388fbf0a4bb27a7f796c4f7.mockapi.io";

const getDataFromApi = function(numeroPosts) {
  
  const url = URL_BASE+"/user/"+numeroPosts+"/posts";
  const ajax = new XMLHttpRequest();
  const urlUser = URL_BASE+"/user/"+numeroPosts;
  const ajaxUser = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let dataPost = JSON.parse(this.responseText);

      ajaxUser.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let dataUser = JSON.parse(this.responseText);

          findPosts(dataPost, dataUser);
        };
      };
    };
  };

  ajax.open('GET', url, true);
  ajax.send();

  ajaxUser.open('GET', urlUser, true);
  ajaxUser.send();

};

const findPosts = function(dataPost, dataUser) {
  createPost(dataPost, dataUser);
}

const createPost = function(post, user) {
  
  const paginationDiv = document.querySelector(".pagination");
  let total = 4;
  let cont;

  for (cont = 1; cont < total; cont++) {

    paginationDiv.insertAdjacentHTML("beforebegin", 
        `<article class="box post post-excerpt">
          <header>
            <h2><a href="#">${post[cont].titlePost}</a></h2>
            <p>${post[cont].captionPost}p>
          </header>
          <div class="info">
            <span class="date"><span class="month">Dez</span> <span class="day">01</span><span class="year">,
                2022</span></span>
            <ul class="stats">
              <li><a href="#" class="icon fa-comment">86</a></li>
              <li><a href="#" class="icon fa-heart">99</a></li>
              <li><a href="#" class="icon brands fa-twitter">21</a></li>
              <li><a href="#" class="icon brands fa-facebook-f">21</a></li>
            </ul>
          </div>
          <a href="#" class="image featured"><img src="${post[cont].imagePost}" alt="" /></a>
          <p>
            ${post[cont].textPost}
          </p>
          <p class="author-avatar">
            <strong>Create by</strong>
            ${user.userName}
            <img src="${user.avatar}" />
          </p>
        </article>`
  )};
};

let contUser = 1;

const carregarMais = document.querySelector("#carregar-mais");
carregarMais.addEventListener("click", function() {
  if (contUser < 35) {
    getDataFromApi(contUser);
    contUser++;
  };
});