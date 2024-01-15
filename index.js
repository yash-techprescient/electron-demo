const { ipcRenderer } = require("electron");
const responseElement = document.getElementById("response");

ipcRenderer.on("fetch-data-response", (event, data) => {
  console.log(data, "data");
  for (var i = 0; i < data.items.length; i++) {
    document.getElementsByTagName("table")[0].innerHTML +=
      "<tr><td>" +
      data.items[i].name +
      "</td><td>" +
      data.items[i].full_name +
      "</td><td>" +
      data.items[i].owner.repos_url +
      "</td><td>" +
      data.items[i].private +
      "</td></tr>";
  }
  //   responseElement.innerHTML = JSON.stringify(data);
});

ipcRenderer.send("fetch-data");
