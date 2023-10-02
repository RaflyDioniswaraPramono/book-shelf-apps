let readBookShelf = [];
let unreadBookShelf = [];

window.onload = () => {
  const getReadBooks = JSON.parse(localStorage.getItem("readBookItems"));
  const getUnreadBooks = JSON.parse(localStorage.getItem("unreadBookItems"));

  if (getReadBooks === null) {
    localStorage.setItem("readBookItems", JSON.stringify([]));
  } else {
    readBookShelf.push(...getReadBooks);

    for (var i = 0; i < readBookShelf.length; i++) {
      createElementReadBooks(readBookShelf[i]);
    }
  }

  if (getUnreadBooks === null) {
    localStorage.setItem("unreadBookItems", JSON.stringify([]));
  } else {
    unreadBookShelf.push(...getUnreadBooks);

    for (var i = 0; i < unreadBookShelf.length; i++) {
      createElementUnreadBooks(unreadBookShelf[i]);
    }
  }

  const getThemes = localStorage.getItem("themes").toString();
  if (getThemes == "dark") {
    darkTheme("dark");
  } else {
    lightTheme(getThemes);
  }
};

const submitHandler = async () => {
  try {
    const id = new Date().getMilliseconds();
    const title = await document.getElementById("title").value;
    const author = await document.getElementById("author").value;
    const year = await document.getElementById("year").value;
    const isComplete = await document.getElementById("complete").value;

    const datas = {
      id: id,
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };

    var regexNumberOnly = /^\d+$/;
    if (!year.match(regexNumberOnly)) {
      return errorHandler({
        type: "error",
        message: "Year must be number only!"
      })
    }

    if (datas.isComplete === "true") {
      saveReadBook(datas);
      createElementReadBooks(datas);
    } else {
      saveUnreadBook(datas);
      createElementUnreadBooks(datas);
    }    
  } catch (error) {
    throw error;
  }
};

const errorHandler = async (validation) => {
  try {
    const { type, message } = await validation;

    document.getElementById("alert").classList.add(type);
    document.getElementById("alert-type").innerText = type;
    document.getElementById("alert-text").innerText = message;

    setTimeout(() => {
      document.getElementById("alert").classList.remove(type);

      return window.location.reload();
    }, 3000)
  } catch (error) {
    throw error;
  }
}

const saveReadBook = async (datas) => {
  try {
    readBookShelf.push(await datas);

    if (readBookShelf.length > 0) {
      localStorage.setItem("readBookItems", JSON.stringify(readBookShelf));
    }

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};

const saveUnreadBook = async (datas) => {
  try {
    unreadBookShelf.push(await datas);

    if (unreadBookShelf.length > 0) {
      localStorage.setItem("unreadBookItems", JSON.stringify(unreadBookShelf));
    }

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};

const createElementReadBooks = async (datas) => {
  try {
    const { id, title, author, year, isComplete } = await datas;

    const container = document.getElementById("read-book-shelf");
    container.innerHTML += `
      <div class="read-box" id="read-box-${id}">
        <p class="text-id">Book ID ${id}</p>
        <div class="unread-box-comp">
          <label>Book Title : </label>
          <p>${title}</p>
        </div>
        <div class="unread-box-comp">
          <label>Book Author : </label>
          <p>${author}</p>
        </div>
        <div class="unread-box-comp">
          <label>Year : </label>
          <p>${year}</p>
        </div>
        <div class="unread-box-comp">
          <label>Is Complete : </label>
          <p>${isComplete}</p>
        </div>
        <div class="button-box">
          <button class="hapus-btn" onclick="deleteReadBooks(${id})">Hapus Buku</button>
          <button class="pindah-btn" onclick="moveReadBooks(${id})">Pindahkan Buku</button>
        </div>
      </div>
    `;
  } catch (error) {
    throw error;
  }
};

const createElementUnreadBooks = async (datas) => {
  try {
    const { id, title, author, year, isComplete } = await datas;

    const container = document.getElementById("unread-book-shelf");
    container.innerHTML += `
      <div class="read-box" id="unread-box-${id}">
        <p class="text-id">Book ID ${id}</p>
        <div class="unread-box-comp">
          <label>Book Title : </label>
          <p>${title}</p>
        </div>
        <div class="unread-box-comp">
          <label>Book Author : </label>
          <p>${author}</p>
        </div>
        <div class="unread-box-comp">
          <label>Year : </label>
          <p>${year}</p>
        </div>
        <div class="unread-box-comp">
          <label>Is Complete : </label>
          <p>${isComplete}</p>
        </div>
        <div class="button-box">
          <button class="hapus-btn" onclick="deleteUnreadBooks(${id})">Hapus Buku</button>
          <button class="pindah-btn" onclick="moveUnreadBooks(${id})">Pindahkan Buku</button>
        </div>
      </div>
    `;
  } catch (error) {
    throw error;
  }
};

const deleteReadBooks = async (ids) => {
  document.getElementById(`read-box-${ids}`).remove();

  try {
    const getReadBooks = await JSON.parse(
      localStorage.getItem("readBookItems")
    );

    const index = getReadBooks.findIndex((object) => object.id === ids);
    if (index > -1) {
      getReadBooks.splice(index, 1);
    }

    localStorage.setItem("readBookItems", JSON.stringify(getReadBooks));

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};

const deleteUnreadBooks = async (ids) => {
  document.getElementById(`unread-box-${ids}`).remove();

  try {
    const getUnreadBooks = await JSON.parse(
      localStorage.getItem("unreadBookItems")
    );

    const index = getUnreadBooks.findIndex((object) => object.id === ids);
    if (index > -1) {
      getUnreadBooks.splice(index, 1);
    }

    localStorage.setItem("unreadBookItems", JSON.stringify(getUnreadBooks));

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};

const moveReadBooks = async (ids) => {
  document.getElementById(`read-box-${ids}`).remove();

  try {
    console.log(await ids);

    let newUnreadArray = [];

    const getReadBooks = await JSON.parse(
      localStorage.getItem("readBookItems")
    );

    const findObj = await getReadBooks.findIndex((object) => {
      object.id === ids;

      return (object.isComplete = "false");
    });

    const findObjects = getReadBooks[findObj];
    newUnreadArray.push(findObjects);
    unreadBookShelf.push(...newUnreadArray);

    const container = document.getElementById("unread-book-shelf");
    newUnreadArray.map((newDatas) => {
      const { id, title, author, year, isComplete } = newDatas;

      container.innerHTML += `
        <div class="read-box" id="unread-box-${id}">
          <p class="text-id">Book ID ${id}</p>
          <div class="unread-box-comp">
            <label>Book Title : </label>
            <p>${title}</p>
          </div>
          <div class="unread-box-comp">
            <label>Book Author : </label>
            <p>${author}</p>
          </div>
          <div class="unread-box-comp">
            <label>Year : </label>
            <p>${year}</p>
          </div>
          <div class="unread-box-comp">
            <label>Is Complete : </label>
            <p>${isComplete}</p>
          </div>
          <div class="button-box">
            <button class="hapus-btn" onclick="deleteUnreadBooks(${id})">Hapus Buku</button>
            <button class="pindah-btn" onclick="moveUnreadBooks(${id})">Pindahkan Buku</button>
          </div>
        </div>
      `;
    });

    const newData = getReadBooks.filter((x) => x.id !== findObjects.id);
    localStorage.setItem("readBookItems", JSON.stringify(newData));

    localStorage.setItem("unreadBookItems", JSON.stringify(unreadBookShelf));

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};

const moveUnreadBooks = async (ids) => {
  document.getElementById(`unread-box-${ids}`).remove();

  try {
    console.log(await ids);

    let newReadArray = [];

    const getUnreadBooks = await JSON.parse(
      localStorage.getItem("unreadBookItems")
    );

    const findObj = await getUnreadBooks.findIndex((object) => {
      object.id === ids;

      return (object.isComplete = "true");
    });

    const findObjects = getUnreadBooks[findObj];
    newReadArray.push(findObjects);
    readBookShelf.push(findObjects);

    const container = document.getElementById("read-book-shelf");
    newReadArray.map((newDatas) => {
      const { id, title, author, year, isComplete } = newDatas;

      container.innerHTML += `
        <div class="read-box" id="read-box-${id}">
          <p class="text-id">Book ID ${id}</p>
          <div class="read-box-comp">
            <label>Book Title : </label>
            <p>${title}</p>
          </div>
          <div class="read-box-comp">
            <label>Book Author : </label>
            <p>${author}</p>
          </div>
          <div class="read-box-comp">
            <label>Year : </label>
            <p>${year}</p>
          </div>
          <div class="read-box-comp">
            <label>Is Complete : </label>
            <p>${isComplete}</p>
          </div>
          <div class="button-box">
            <button class="hapus-btn" onclick="deleteReadBooks(${id})">Hapus Buku</button>
            <button class="pindah-btn" onclick="moveReadBooks(${id})">Pindahkan Buku</button>
          </div>
        </div>
      `;
    });

    const newData = getUnreadBooks.filter((x) => x.id !== findObjects.id);
    localStorage.setItem("unreadBookItems", JSON.stringify(newData));

    localStorage.setItem("readBookItems", JSON.stringify(readBookShelf));

    return window.location.reload();
  } catch (error) {
    throw error;
  }
};
