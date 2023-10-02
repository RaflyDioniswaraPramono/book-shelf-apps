const getReadBooks = async () => {
  try {
    const getReadBooks = await JSON.parse(
      localStorage.getItem("readBookItems")
    );

    return await getReadBooks.length;
  } catch (error) {
    throw error;
  }
};
getReadBooks()
  .then((response) => {
    return (document.getElementById("total-read").innerText = response);
  })
  .catch((error) => {
    console.log(error.message);
  });

const getUnreadBooks = async () => {
  try {
    const getUnreadBooks = await JSON.parse(
      localStorage.getItem("unreadBookItems")
    );

    return await getUnreadBooks.length;
  } catch (error) {
    throw error;
  }
};
getUnreadBooks()
  .then((response) => {
    return (document.getElementById("total-unread").innerText = response);
  })
  .catch((error) => {
    console.log(error.message);
  });

const getTotal = async () => {
  try {
    const getReadBooks = await JSON.parse(
      localStorage.getItem("readBookItems")
    );

    const getUnreadBooks = await JSON.parse(
      localStorage.getItem("unreadBookItems")
    );

    const total = await getReadBooks.length + await getUnreadBooks.length;    

    return total;
  } catch (error) {
    throw error;
  }
};
getTotal()
  .then((response) => {
    return (document.getElementById("total-books").innerText = response);
  })
  .catch((error) => {
    console.log(error);
  });
