let myObj = {
    method: "GET",
    url: "",
    gender:null,
    country:null
}

let request = obj => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open(obj.method, obj.url)
        xhr.onload = () => {
            if (xhr.status == 200) {
                let resp = JSON.parse(xhr.responseText)
                resolve(resp.results)
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.send()
    })
}

let html = ""
let createHtml = htmlElement => {
    let htmlContent = `
        <div class="col">
            <div class="card text-dark bg-light mb-3">
                <img src="${htmlElement.picture.large}" class="card-img-top" alt="">

                <div class="card-body">
                    <h5 class="card-title">${htmlElement.name.first} ${htmlElement.name.last}</h5>
                    <p class="card-text">${htmlElement.phone}</p>
                </div>

                <div class="card-footer">
                    <small class="text-muted">@${htmlElement.login.username}</small>
                </div>
            </div>
        </div>
    `
    html+=htmlContent
    document.getElementById("result").innerHTML = html
}

function getData() {

    if (myObj.gender==null && myObj.country==null) {
        myObj.url="https://randomuser.me/api/?results=100";
    }else if (myObj.gender==null && myObj.country!=null){
        myObj.url = `https://randomuser.me/api/?nat=${myObj.country}&results=100`;
    }else if (myObj.gender!=null && myObj.country==null){
        myObj.url = `https://randomuser.me/api/?gender=${myObj.gender}&results=100`;
    }else if (myObj.gender!=null && myObj.country!=null){
        myObj.url = `https://randomuser.me/api/?gender=${myObj.gender}&nat=${myObj.country}&results=100`;
    }

    request(myObj)
    .then(data => {
        data.forEach(element => {
            createHtml(element)
        });
    })
    .catch(data => {
        }
    )
}



function genderFilter(params) {
    html = "";
    myObj.gender=params;
    getData();
}

function filterCountry() {
    html = "";
    myObj.country = document.getElementById("filterCountry").value;
    getData();
}

getData();