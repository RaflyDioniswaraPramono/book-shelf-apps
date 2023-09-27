window.onload = function () {
  getDataReadBook();
  getDataUnreadBook();
}

let completedBookShelf = [];
let unCompleteBookShelf = [];

const submitHandler = async () => {
  try {
    const id = new Date().getMilliseconds().toString();
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

    inputValidation(datas);
  } catch (error) {
    console.log(error.message);
  }
};

const inputValidation = (datas) => {
  var numberRegex = /\d$/g;

  const { title, author, year } = datas;

  if (title === "") {
    return alertHandler({
      statusType: "Error",
      message: "Title field cannot be empty!",
    });
  }

  if (title.match(numberRegex)) {
    return alertHandler({
      statusType: "Error",
      message: "Title field cannot filled with only numbers!",
    });
  }

  if (author === "") {
    return alertHandler({
      statusType: "Error",
      message: "Author field cannot be empty!",
    });
  }

  if (author.match(numberRegex)) {
    return alertHandler({
      statusType: "Error",
      message: "Author field cannot filled with only numbers!",
    });
  }

  if (year == "" && year == 0) {
    return alertHandler({
      statusType: "Error",
      message: "Year field cannot be empty or zero!",
    });
  }

  if (!year.match(numberRegex)) {
    return alertHandler({
      statusType: "Error",
      message: "Year field must filled with number only!",
    });
  }

  return addData(datas);
};

const alertHandler = async (reports) => {
  const alert = document.getElementById("alert");
  const alertType = document.getElementById("alert-type");
  const alertText = document.getElementById("alert-text");

  const { statusType, message } = await reports;

  if (statusType === "Error") {
    alert.classList.add("error");
    alertType.innerText = statusType;
    alertText.innerText = message;

    setTimeout(() => {
      return alert.classList.remove("error");
    }, 3000);
  } else {
    alert.classList.add("success");
    alertType.innerText = statusType;
    alertText.innerText = message;

    setTimeout(() => {
      alert.classList.remove("success");
    }, 3000);
  }
};

const getDataReadBook = () => { 
  let datas = {};

  const dataStorageReadBook = JSON.parse(localStorage.getItem("readBooks"));
  dataStorageReadBook.map(data => {
    datas = data;
  })
  
  addData(datas);
}

const getDataUnreadBook = () => {
  let datas = {};

  const dataStorageReadBook = JSON.parse(localStorage.getItem("unreadBooks"));
  dataStorageReadBook.map(data => {
    datas = data;
  })

  addData(datas);
}

const addData = async (datas) => {
  const { id, title, author, year, isComplete } = await datas;

  if (isComplete === "true") {
    completedBookShelf.push(datas);     

    document.getElementById("read-table-body").innerHTML += `
    <tr id="read-rows-${id}">
      <td>${title}</td>
      <td>${author}</td>
      <td>${year}</td>
      <td>${isComplete}</td>
      <td>
        <button onclick="removeReadBook(${id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button onclick="moveReadBook(${id})">
          <i class="fa-solid fa-maximize"></i>
        </button>
      </td>      
    </tr>
    `;

    localStorage.setItem("readBooks", JSON.stringify(completedBookShelf));

    totalBooks();
    return alertHandler({
      statusType: "Success",
      message: "Completed read book has been successfully saved!",
    });
  } else {
    unCompleteBookShelf.push(datas);
    document.getElementById("unread-table-body").innerHTML += `
    <tr id="unread-rows-${id}">
      <td>${title}</td>
      <td>${author}</td>
      <td>${year}</td>
      <td>${isComplete}</td>
      <td>
        <button onclick="removeUnreadBooks(${id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button onclick="moveUnreadBook(${id})">
          <i class="fa-solid fa-maximize"></i>
        </button>
      </td>      
    </tr>
    `;

    localStorage.setItem("unreadBooks", JSON.stringify(unCompleteBookShelf));

    totalBooks();
    return alertHandler({
      statusType: "Success",
      message: "Not completed read book has been successfully saved!",
    });
  }
};

const removeReadBook = (ids) => {
  let objWithIdIndex = completedBookShelf.findIndex((obj) => obj.id == ids);

  if (objWithIdIndex > -1) {
    completedBookShelf.splice(objWithIdIndex, 1);
  }
  document.getElementById(`read-rows-${ids}`).remove();

  return totalBooks();
};

const removeUnreadBooks = (ids) => {
  var objWithIdIndex = unCompleteBookShelf.findIndex((obj) => obj.id == ids);

  if (objWithIdIndex > -1) {
    unCompleteBookShelf.splice(objWithIdIndex, 1);
  }
  document.getElementById(`unread-rows-${ids}`).remove();

  return totalBooks();
};

const totalBooks = () => {
  const totalReadBooks = completedBookShelf.length;
  const totalUnReadBooks = unCompleteBookShelf.length;
  var total = totalReadBooks + totalUnReadBooks;

  document.getElementById("total-books").innerText = total;
  document.getElementById("total-read").innerText = totalReadBooks;
  document.getElementById("total-unread").innerText = totalUnReadBooks;
};
totalBooks();

const moveReadBook = async (ids) => {
  let objWithIdIndex = completedBookShelf.findIndex((obj) => {
    if (obj.id == ids) {
      obj.isComplete = "false";
      return addData(obj);
    }
  });

  if (objWithIdIndex > -1) {
    completedBookShelf.splice(objWithIdIndex, 1);
  }
  document.getElementById(`read-rows-${ids}`).remove();

  return totalBooks();
};

const moveUnreadBook = async (ids) => {
  let objWithIdIndex = unCompleteBookShelf.findIndex((obj) => {
    if (obj.id == ids) {
      obj.isComplete = "true";
      return addData(obj);
    }
  });

  if (objWithIdIndex > -1) {
    unCompleteBookShelf.splice(objWithIdIndex, 1);
  }
  document.getElementById(`unread-rows-${ids}`).remove();

  return totalBooks();
};
