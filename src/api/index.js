const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
//This is the API

export async function getBooks(){
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    return data;
}
//This fetches the books

export async function getBookById(id) {
    const response = await fetch (`${BASE_URL}/books/${id}`)
    const data = await response.json();
    return data;
}

//This fetches the book by id.

export async function register(userData) {
    const response = await fetch (`${BASE_URL}/users/register`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userData),
    })
    const data = await response.json();
    return data;
}
//register notes: 
// We are fetching the register users and using the post method to send data in this function.
// Since we are sending data our headers would be Content-Type and application/json as 
// the data we are sending is content and the colon converts it to a javascript object which is how
//the data needs to be recived according to the API

export async function login(credentials) {
    const response = await fetch (`${BASE_URL}/users/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(credentials),
    })
    const data = await response.json();
    return data;
}

//login notes:
//same notes user apply for register, however, the renaming here is to accomodate the login credentials for our api
// this incluodes a change in our fetch and our parameter. 

export async function getMe(token){
   const response = await fetch(`${BASE_URL}/users/me`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
   })
   const data = await response.json()
   return data;
}

//getMe notes:
// get me is fetching for the users profile details. This also includes the token for the user 
// to accesss the resources of our softwar.

export async function reserveBook(bookId, token) {
    const response = await fetch (`${BASE_URL}/reservations`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({bookId}),
    });
    const data = await response.json()
    return data;
}

//reserveBook:
//we are fetching the reservations, sending data to our server via post and as a content-type
// then converting it to a json, we also send our token, to confirm our identity for this access
// the body of the data when returned will become stringify back to us. So we are able to see the books
// we have reserved. 

export async function returnBook(id, token){
    const response = await fetch (`${BASE_URL}/reservations/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

//returnbook:
//Here since id is bound to change we used back ticks to represent the dynamicness of the data.
//returning a book will be deleted on our end as the book we have reserved and returned to the 
//general public. the api also required us to have the id. 