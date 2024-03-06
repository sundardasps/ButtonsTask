const url =
  "https://buttontask-server.onrender.com/v2/location/4ZHX75zypH3j4EruPOgm/contacts/detail/4ZHX75zypH3j4EruPOgm";

$(document).ready(function () {
  fetchData(url);
});

async function fetchData(url) {
  try {
    const urlSegment = url.split("/");
    const apiKey = urlSegment[5];
    const response = await $.ajax({
      url: url,
      type: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      success: function (data) {
        // No need for specific HTML elements
        const container = $("body"); // Append buttons to the body
        const tagContainer = $("body"); // Append tags to the body

        $.each(data.buttons, function (index, value) {
          const buttonElement = $("<button>")
            .text(value.label)
            .css({
              backgroundColor: value.style.color,
              borderRadius: value.style.borderRadius,
              border: value.style.border,
              cursor: value.style.cursor,
              boxShadow: value.style.shadow,
              width: value.style.width,
              margin: "10px",
            })
            .click(async function () {
              try {
                const action = await $.ajax({
                  url: `https://buttontask-server.onrender.com/v2/location/4ZHX75zypH3j4EruPOgm/contacts/detail/4ZHX75zypH3j4EruPOgm/${value.label}`,
                  type: "GET",
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                  },
                  success: function (newTag) {
                    const tag = $("<button>").text(newTag.newTag.tagName).css({
                      backgroundColor: newTag.newTag.style.color,
                      borderRadius: newTag.newTag.style.borderRadius,
                      border: newTag.newTag.style.border,
                      cursor: newTag.newTag.style.cursor,
                      boxShadow: newTag.newTag.style.shadow,
                      width: newTag.newTag.style.width,
                      margin: "10px",
                    });
                    tagContainer.append(tag);
                  },
                  error: function () {
                    alert("Tag already added!");
                  },
                });
              } catch (error) {
                console.log(error);
              }
            });
          container.append(buttonElement);
        });

        $.each(data.tags, function (index, value) {
          const tag = $("<button>").text(value.tagName).css({
            backgroundColor: value.style.color,
            borderRadius: value.style.borderRadius,
            border: value.style.border,
            cursor: value.style.cursor,
            boxShadow: value.style.shadow,
            width: value.style.width,
            margin: "10px",
          });
          tagContainer.append(tag);
          console.log(data.message);
        });
      },
      error: function (xhr, status, error) {
        alert(xhr.statusText);
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}
