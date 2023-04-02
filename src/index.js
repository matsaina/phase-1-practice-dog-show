function fetchData() {
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((characters) => characters.forEach((anim) => showList(anim)));
}

function showList(anim) {
  let tbody = document.getElementById("table-body");
  let tr = document.createElement("tr");

  tr.innerHTML = `
<td>Dog ${anim.name}</td>
<td>${anim.breed}</td>
<td>${anim.sex}</td>
<td><button id='btn${anim.id}' >Edit</button></td>
`;

  tbody.appendChild(tr);

  document.getElementById(`btn${anim.id}`).addEventListener("click", (e) => {
    fetch(`http://localhost:3000/dogs/${anim.id}`)
      .then((response) => response.json())
      .then((anim) => {
        document.getElementById("name").value = anim.name;
        document.getElementById("breed").value = anim.breed;
        document.getElementById("sex").value = anim.sex;
        document.getElementById("id").value = anim.id;
      });
  });
}

function submitData() {
  document.getElementById(`dogform`).addEventListener("submit", (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.name.value;
    let breed = event.target.breed.value;
    let sex = event.target.sex.value;

    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`success`);
        } else {
          console.error(`Failed`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  submitData();
});
