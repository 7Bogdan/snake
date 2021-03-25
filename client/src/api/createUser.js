let createContact = async (user) => {
  let create = await fetch("api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user,
    }),
  })
  .then((response) => response.json())
  .catch((error) => console.error("Error:", error));

return create
};

export { createContact };
