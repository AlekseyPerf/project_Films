/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        backgroundFilm = document.querySelector('.promo__bg'),
        genre = backgroundFilm.querySelector('.promo__genre'),     
        listViewedFilms = document.querySelector('.promo__interactive-list'),
        formAdd = document.querySelector('form.add'),
        inputFormAdd = formAdd.querySelector('.adding__input'),
        checkForm = formAdd.querySelector('[type="checkbox"]');

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        })
    }   
    
    const makeChanges = () => {
        genre.textContent = 'Драма';
        backgroundFilm.style.backgroundImage = 'url("../img/bg.jpg")';
    }

    const sortArr = (arr) => {
        arr.sort()
    }

    function showFilm(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
                                        <div class="delete"></div>
                                    </li>`
        });   
        
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                showFilm(films, parent)
            })
        });
    }
    makeChanges();
    deleteAdv(adv);
    showFilm(movieDB.movies, listViewedFilms);



    /* Задания на урок:
    1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    новый фильм добавляется в список. Страница не должна перезагружаться.
    Новый фильм должен добавляться в movieDB.movies.
    Для получения доступа к значению input - обращаемся к нему как input.value;
    P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
    3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
    4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
    "Добавляем любимый фильм"
    5) Фильмы должны быть отсортированы по алфавиту */

    formAdd.addEventListener('submit', (e) => {
        e.preventDefault();
        let newWachedFilm = inputFormAdd.value;
        if (newWachedFilm) {
            if (inputFormAdd.value.length > 21) {
                newWachedFilm = `${newWachedFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newWachedFilm);
            showFilm(movieDB.movies, listViewedFilms);

            if (checkForm.checked) {
                console.log("Добавляем любимый фильм");
            }
        }
        e.target.reset();
    });
})