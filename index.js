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
              const newTag = await action.json();
              const tag = document.createElement("button");
              tag.textContent = newTag.newTag.tagName;
              tag.style.backgroundColor = newTag.newTag.style.color;
              tag.style.borderRadius = newTag.newTag.style.borderRadius;
              tag.style.border = newTag.newTag.style.border;
              tag.style.cursor = newTag.newTag.style.cursor;
              tag.style.boxShadow = newTag.newTag.style.shadow;
              tag.style.width = newTag.newTag.style.width;
              tag.style.width = newTag.newTag.style.width;
              tag.style.margin = "10px";

              tagContainer.appendChild(tag);
            } else {
              alert(action.statusText);
            }
          } catch (error) {
            console.log(error);
          }
        });
        container.appendChild(buttonElement);
        tagContainer.style.backgroundColor = "rgb(240, 240, 240)";
        tagContainer.style.width = "50%";
        tagContainer.style.height = "200px";
        tagContainer.style.margin = "auto";
      });

      data.tags.filter((value) => {
        const tag = document.createElement("button");
        tag.textContent = value.tagName;
        tag.style.backgroundColor = value.style.color;
        tag.style.borderRadius = value.style.borderRadius;
        tag.style.border = value.style.border;
        tag.style.cursor = value.style.cursor;
        tag.style.boxShadow = value.style.shadow;
        tag.style.width = value.style.width;
        tag.style.width = value.style.width;
        tag.style.margin = "10px";
        tagContainer.appendChild(tag);
        console.log(data.message);
      });
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.log(error.message);
  }
}
