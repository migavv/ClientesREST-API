'use strict'

var usuarios = [];
fetch('https://reqres.in/api/users')
    .then(data => data.json())
    .then(data => {
        usuarios = data;
        console.log(usuarios)
    })