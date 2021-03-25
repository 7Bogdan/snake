const editUser = (user) => {
  fetch("api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      _id: user._id,
      score: user.score,
      token: user.token,
      lvl: user.lvl,
    }),
  })
    .catch((error) => console.error("Error:", error));
    return user
};

export {editUser}
