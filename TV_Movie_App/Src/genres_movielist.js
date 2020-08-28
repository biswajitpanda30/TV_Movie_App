$(document).ready(function () {
	// The base url for all API calls
	var apiBaseURL = "http://api.themoviedb.org/3/";

	// URL in Authentication. Base URL of image
	var imageBaseUrl = "https://image.tmdb.org/t/p/";

	const apiKey = "889abe3247f9348a43ba33d2c9270735";



	var genrelist_url = apiBaseURL + "genre/movie/list?api_key=" + apiKey;

	function getGenre() {
		$.getJSON(genrelist_url, function (genrelist) {
			for (let i = 0; i < genrelist.genres.length; i++) {
				var genrelisthtml = '';
				genreID = genrelist.genres[i].id;
				var genre_name = genrelist.genres[i].name;
				genrelisthtml += '<li><a class ="menu-item" href="#">' + genre_name + '</a></li>';
				$('#genre_list').append(genrelisthtml);
			}
			$('.menu-item').click(function () {
				var genre = document.querySelector('.menu-item').value;
				getMoviesByGenre(28);
				$('#movie_grid').html(genreHTML);
			})
			var ul = document.getElementById('genre_list');
			var liSelected;
			var index = -1;


			document.addEventListener('keydown', function (event) {
				var len = ul.getElementsByTagName('li').length - 1;
				if (event.which === 40) {
					index++;
					//down 
					if (liSelected) {
						removeClass(liSelected, 'selected');
						next = ul.getElementsByTagName('li')[index];
						if (typeof next !== undefined && index <= len) {

							liSelected = next;
						} else {
							index = 0;
							liSelected = ul.getElementsByTagName('li')[0];
						}
						addClass(liSelected, 'selected');
					} else {
						index = 0;

						liSelected = ul.getElementsByTagName('li')[0];
						addClass(liSelected, 'selected');
					}
				}
				if (event.which === 38) {

					//up
					if (liSelected) {
						removeClass(liSelected, 'selected');
						index--;
						next = ul.getElementsByTagName('li')[index];
						if (typeof next !== undefined && index >= 0) {
							liSelected = next;
						} else {
							index = len;
							liSelected = ul.getElementsByTagName('li')[len];
						}
						addClass(liSelected, 'selected');
					} else {
						index = 0;
						liSelected = ul.getElementsByTagName('li')[len];
						addClass(liSelected, 'selected');
					}
				}

				//enter
				//It is implemented for displaying movies according to action genre.
				
				if (event.which === 13) {
					getMoviesByGenre(28);
					$('#movie_grid').html(genreHTML);
					if (liSelected) {
						removeClass(liSelected, 'selected');
						index--;
						next = ul.getElementsByTagName('li')[index];
						if (typeof next !== undefined && index >= 0) {
							liSelected = next;
						} else {
							index = len;
							liSelected = ul.getElementsByTagName('li')[len];
						}
						addClass(liSelected, 'selected');
					} else {
						index = 0;
						liSelected = ul.getElementsByTagName('li')[len];
						addClass(liSelected, 'selected');
					}
				}
			}, false);

			function removeClass(el, className) {
				if (el.classList) {
					el.classList.remove(className);
				} else {
					el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			};

			function addClass(el, className) {
				if (el.classList) {
					el.classList.add(className);
				} else {
					el.className += ' ' + className;
				}
			};

		});
	}

	getGenre();

	function getMoviesByGenre(genre_id) {

		var getMoviesByGenreURL = apiBaseURL + "discover/movie?api_key=" + apiKey + "&with_genres=" + genre_id;
		$.getJSON(getMoviesByGenreURL, function (genreData) {
			for (let i = 0; i < genreData.results.length; i++) {
				$.getJSON(getMoviesByGenreURL, function (movieKey) {
					var poster = imageBaseUrl + 'w185' + genreData.results[i].poster_path;
					var back_poster = imageBaseUrl + 'w500' + genreData.results[i].backdrop_path;
					var title = genreData.results[i].original_title;
					var overview = genreData.results[i].overview;
					var genreHTML = '';
					genreHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie" class ="image_buttons">';
					genreHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
					genreHTML += '<div class="modal come-from-modal fade right" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
					genreHTML += '<div class="modal-dialog" role="document">';
					genreHTML += '<div class="modal-content col-sm-12 col-lg-12">';
					genreHTML += '<div class = "row">';
					genreHTML += '<div class="col-sm-8 moviePosterInModal">';
					genreHTML += '<div class="movieName">' + title + '</div><br>';
					genreHTML += '<a href="#"><img src="' + back_poster + '"></a>';
					genreHTML += '<div class="col-sm-3 btn btn-primary1">Play' + '</div>';
					genreHTML += '<div class="col-sm-3 btn btn-primary2"><span class="fa fa-play" style="font-size:20px;color:Orange"></span>&nbspTrailer' + '</div>';
					genreHTML += '</div>'; // close moviePosterInModal
					genreHTML += '<div class="col-sm-4 movieDetails">';
					genreHTML += '<div class="overview">' + overview + '</div><br>';
					genreHTML += '</div>'; //close movieDetails
					genreHTML += '</div>';
					genreHTML += '</div>'; //close modal-content
					genreHTML += '</div>'; //close modal-dialog
					genreHTML += '</div>'; //close modal
					genreHTML += '</div>'; //close off each div
					$('#movie_grid').append(genreHTML);
				})

			}

			var btn = document.getElementById('movie_grid');
			var buttonSelected;
			var index = 0;
			document.addEventListener('keydown', function (event) {
				var len = btn.getElementsByTagName('button').length - 1;
				if (event.which === 40) {
					index++;
					//down 
					if (buttonSelected) {
						removeClass(buttonSelected, 'selected');
						next = btn.getElementsByTagName('button')[index];
						if (typeof next !== undefined && index <= len) {

							buttonSelected = next;
						} else {
							index = 0;
							buttonSelected = btn.getElementsByTagName('button')[0];
						}
						addClass(buttonSelected, 'selected');
					} else {
						index = 0;

						buttonSelected = btn.getElementsByTagName('button')[0];
						addClass(buttonSelected, 'selected');
					}
				}
				if (event.which === 38) {

					//up
					if (buttonSelected) {
						removeClass(buttonSelected, 'selected');
						index--;
						next = btn.getElementsByTagName('button')[index];
						if (typeof next !== undefined && index >= 0) {
							buttonSelected = next;
						} else {
							index = len;
							buttonSelected = btn.getElementsByTagName('button')[len];
						}
						addClass(buttonSelected, 'selected');
					} else {
						index = 0;
						buttonSelected = btn.getElementsByTagName('button')[len];
						addClass(buttonSelected, 'selected');
					}
				}

				//enter
				if (event.which === 13) {
					if (buttonSelected) {
						removeClass(buttonSelected, 'selected');
						index++;
						next = btn.getElementsByTagName('button')[index];
						if (typeof next !== undefined && index >= 0) {
							buttonSelected = next;
						} else {
							index = len;
							buttonSelected = btn.getElementsByTagName('button')[len];
						}
						addClass(buttonSelected, 'selected');
					} else {
						index = 0;
						buttonSelected = btn.getElementsByTagName('button')[len];
						addClass(buttonSelected, 'selected');
					}
				}

				//Left
				if (event.which === 37){
					// to be implemented
				}

				//Right
				if (event.which === 39){
					//to be implemented
				}
			}, false);

			function removeClass(el, className) {
				if (el.classList) {
					el.classList.remove(className);
				} else {
					el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			};

			function addClass(el, className) {
				if (el.classList) {
					el.classList.add(className);
				} else {
					el.className += ' ' + className;
				}
			};

		})

	}
	var genreHTML = '';
})