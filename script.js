// let xhr = new XMLHttpRequest();
// xhr.responseType = 'json'
// xhr.open('GET','/data/resturants_data.json');

// xhr.onload = function() {
//     console.log(xhr.response);
// }
// xhr.send();
// console.log('hello');

fetch('/data/resturants_data.json')
    .then(res => res.json())

    .then(data => {
        console.log(data[0].name)
    })
