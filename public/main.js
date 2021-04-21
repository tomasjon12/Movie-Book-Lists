const ViewMoviesList = document.querySelector('#ViewMovies')
//const ViewBookList = document.querySelector('#ViewBooks')


ViewMoviesList.addEventListener('click', _ => {
    console.log("Movie was pressed")
    fetch('/movielist', {method: 'get',})
})

//ViewBookList.addEventListener('click', _ => {
//    console.log("Book was pressed")
//    fetch('/booklist', {method: 'get',})
//})
