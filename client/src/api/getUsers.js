const getUsers = () => {
  let contacts = fetch("/api/users/", {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return contacts;
};

export { getUsers };
