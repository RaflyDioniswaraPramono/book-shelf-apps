const changePages = (key) => {    
  const btnMain = document.getElementById("btn-main");
  const btnBook = document.getElementById("btn-book");
  const mainPage = document.getElementById("main-page");
  const bookPage = document.getElementById("book-page");

  if (key === "main") {
    btnMain.classList.add("active");
    btnBook.classList.remove("active");
    mainPage.classList.add("show");
    bookPage.classList.remove("show");
  } else {
    btnBook.classList.add("active");
    btnMain.classList.remove("active");
    bookPage.classList.add("show");
    mainPage.classList.remove("show");
  }
};
