export function signIn(data) {
  console.log(data);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "example token",
        user: {
          name: "name",
          email: "email@example.com"
        }
      })
    }, 1000)
  })
}