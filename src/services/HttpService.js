export const PostWithAuth = (url, body) => {

    var request = fetch("http://localhost:8080"+url,  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" : localStorage.getItem("tokenKey"),
        },
        body : JSON.stringify(body),
      })

    return request
}

export const PostWithoutAuth = (url, body) => {

    var request = fetch("http://localhost:8080"+url,  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(body),
      })

    return request
}

export const PutWithAuth = (url, body) => {

    var request = fetch("http://localhost:8080"+url,  {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("tokenKey"),
        },
        body : JSON.stringify(body),
      })

    return request
}

export const GetWithAuth = (url) => {

    var request = fetch("http://localhost:8080"+url,  {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("tokenKey"),
        },
      })

    return request
}

export const DeleteWithAuth = (url) => {

    var request = fetch("http://localhost:8080"+url,  {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("tokenKey"),
        },
      })

    return request
}

export const RefreshToken = () => {

  var request = fetch("http://localhost:8080/auth/refresh", {
    method: "POST",
    headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: localStorage.getItem("currentUser"),
      refreshToken: localStorage.getItem("refreshKey"),
    }),
  })
  return request
}