let inputDataValues = {};
let readBookShelf = [];
let unreadBookShelf = [];

window.onload = async () => {
  const getReadBookItems = await JSON.parse(
    localStorage.getItem("readBookItems")
  );
  const getUnreadBookItems = await JSON.parse(
    localStorage.getItem("unreadBookItems")
  );

  if (getReadBookItems === null) {
    createReadBookItemsLocalStorage();
  }

  if (getUnreadBookItems === null) {
    createUnreadBookItemsLocalStorage();
  }

  return loadItemsFromLocalStorageToArray();
};

const createReadBookItemsLocalStorage = () => {
  return localStorage.setItem("readBookItems", JSON.stringify([]));
};

const createUnreadBookItemsLocalStorage = () => {
  return localStorage.setItem("unreadBookItems", JSON.stringify([]));
};

const loadItemsFromLocalStorageToArray = async () => {
  const getReadBookItems = await JSON.parse(
    localStorage.getItem("readBookItems")
  );

  const getUnreadBookItems = await JSON.parse(
    localStorage.getItem("unreadBookItems")
  );

  readBookShelf = [...getReadBookItems];
  unreadBookShelf = [...getUnreadBookItems];

  createTableReadBooks();
  createTableUnreadBooks();
};

const submitHandler = async () => {
  try {
    const id = new Date().getMilliseconds();
    const title = await document.getElementById("title").value;
    const author = await document.getElementById("author").value;
    const year = await document.getElementById("year").value;
    const isComplete = await document.getElementById("complete").value;

    inputDataValues = {
      id: id,
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };

    return valuesValidator();
  } catch (error) {
    throw error;
  }
};

const valuesValidator = async () => {
  var numberRegex = /^\d+$/;

  try {
    const { title, year, isComplete } = inputDataValues;

    if (!year.match(numberRegex)) {
      return validatorOutput({
        type: "error",
        message: "Year field must be numbers only!",
      });
    }

    if (isComplete === "true") {
      return validatorOutput({
        type: "success",
        message: `Add ${title} book succesfully to read bookshelf`,
      });
    } else {
      return validatorOutput({
        type: "success",
        message: `Add ${title} book successfully to unread bookshelf!`,
      });
    }
  } catch (error) {
    throw error;
  }
};

const validatorOutput = async (reportMessage) => {
  try {
    const { type, message } = await reportMessage;

    document.getElementById("alert").classList.add(type);
    document.getElementById("alert-type").innerText = type;
    document.getElementById("alert-text").innerText = message;

    setTimeout(() => {
      document.getElementById("alert").classList.remove(type);
    }, 3000);

    return addBookToArray();
  } catch (error) {
    throw error;
  }
};

const addBookToArray = () => {
  const { isComplete } = inputDataValues;

  if (isComplete === "true") {
    readBookShelf.unshift(inputDataValues);
    addReadBookTable();

    return addReadBook();
  } else {
    unreadBookShelf.unshift(inputDataValues);
    addUnreadBookTable();

    return addUnreadBook();
  }
};

const addReadBook = async () => {
  return localStorage.setItem("readBookItems", JSON.stringify(readBookShelf));
};

const addUnreadBook = async () => {
  return localStorage.setItem(
    "unreadBookItems",
    JSON.stringify(unreadBookShelf)
  );
};

const addReadBookTable = () => {
  const { id, title, author, year, isComplete } = inputDataValues;

  document.getElementById("read-table-body").innerHTML += `
    <tr id="read-row-${id}">
      <td>${title}</td>
      <td>${author}</td>
      <td>${year}</td>
      <td>${isComplete}</td>
      <td>
        <button onclick="deleteReadBook(${id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button>
          <i class="fa-solid fa-maximize"></i>
        </button>
      </td>
    </tr>
  `;
};

const addUnreadBookTable = () => {
  const { id, title, author, year, isComplete } = inputDataValues;

  document.getElementById("unread-table-body").innerHTML += `
    <tr id="read-row-${id}">
      <td>${title}</td>
      <td>${author}</td>
      <td>${year}</td>
      <td>${isComplete}</td>
      <td>
        <button onclick="deleteUnreadBook(${id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button>
          <i class="fa-solid fa-maximize"></i>
        </button>
      </td>
    </tr>
  `;
};

const createTableReadBooks = async () => {
  readBookShelf.map((items) => {
    const { id, title, author, year, isComplete } = items;

    document.getElementById("read-table-body").innerHTML += `
      <tr id="read-row-${id}">
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>${isComplete}</td>
        <td>
          <button onclick="deleteReadBook(${id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button>
            <i class="fa-solid fa-maximize"></i>
          </button>
        </td>
      </tr>
    `;
  });
};

const createTableUnreadBooks = async () => {
  unreadBookShelf.map((items) => {
    const { id, title, author, year, isComplete } = items;

    document.getElementById("unread-table-body").innerHTML += `
      <tr id="unread-row-${id}">
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>${isComplete}</td>
        <td>
          <button onclick="deleteUnreadBook(${id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button>
            <i class="fa-solid fa-maximize"></i>
          </button>
        </td>
      </tr>
    `;
  });
};

const deleteReadBook = async (ids) => {
  document.getElementById(`read-row-${ids}`).remove();

  const getReadBookItems = await JSON.parse(
    localStorage.getItem("readBookItems")
  );

  var findIndex = getReadBookItems.findIndex((objects) => objects.id === ids);

  if (findIndex > -1) {
    getReadBookItems.splice(findIndex, 1);
  }

  return localStorage.setItem(
    "readBookItems",
    JSON.stringify(getReadBookItems)
  );
};

const deleteUnreadBook = async (ids) => {
  document.getElementById(`unread-row-${ids}`).remove();

  const getUnreadBookItems = await JSON.parse(
    localStorage.getItem("unreadBookItems")
  );

  var findIndex = getUnreadBookItems.findIndex((objects) => objects.id === ids);

  if (findIndex > -1) {
    getUnreadBookItems.splice(findIndex, 1);
  }

  return localStorage.setItem(
    "unreadBookItems",
    JSON.stringify(getUnreadBookItems)
  );
};
