// async function sumiButton() {
//   const newUrl = new URL(url);
//   const urlSegment = url.split("/");
//   const apiKey = urlSegment[5];
//   const api = "https://buttontask-server.onrender.com/createTag";
//   const response = await fetch(api, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${3333333333}`,
//       "Content-Type": "application/json",
//     },
//     body: {},
//   });
// }



async function fetchData(url) {
  try {
    const newUrl = new URL(url);
    const urlSegment = url.split("/");
    const apiKey = urlSegment[5];
    const api = "https://buttontask-server.onrender.com";
    const response = await fetch(api + newUrl.pathname, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      
      const data = await response.json();
      const container = document.getElementById("buttons");
      const tagContainer = document.getElementById("tag");


      data.buttons.filter((value) => {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = value.label;
        buttonElement.style.backgroundColor = value.style.color;
        buttonElement.style.borderRadius = value.style.borderRadius;
        buttonElement.style.border = value.style.border;
        buttonElement.style.cursor = value.style.cursor;
        buttonElement.style.boxShadow = value.style.shadow;
        buttonElement.style.width = value.style.width;
        buttonElement.style.width = value.style.width;
        buttonElement.style.margin = "10px";
        buttonElement.addEventListener("click", async () => {
          try {
            const action = await fetch(
              api + newUrl.pathname + `/${value.label}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (action.status === 200) {
              const data = await action.json();
               alert(data.message);
            }
          } catch (error) {
            console.log();
          }
        });
        container.appendChild(buttonElement);
        tagContainer.style.backgroundColor = "rgb(240, 240, 240)"
        tagContainer.style.width = "50%"
        tagContainer.style.height = "200px"
        tagContainer.style.margin = "auto"
      });
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.log(error.message);
  }
}
