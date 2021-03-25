const getUser = (id,token) => {
 let contact = fetch("/api/user" + id,{
  method:"GET",
  contentType: "application/json"
 })
 .then(response => response.json())
 .catch((error) => console.error('Error:', error));
 return contact
}

export {getUser}
