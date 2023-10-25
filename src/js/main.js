let bookController = angular.module("miApp", ["ngRoute"]);

bookController.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "mainController",
    })
    .when("/listadoPeliculas", {
      templateUrl: "views/listadoLibros.html",
      controller: "bookController",
    })
    .when("/top10Mejores", {
      templateUrl: "views/top10Mejores.html",
      controller: "top10Mejores",
    })
    .when("/top10Peores", {
      templateUrl: "views/top10Peores.html",
      controller: "top10Peores",
    })
    .when("/libro/:id", {
      templateUrl: "views/libro.html",
      controller: "bookController",
    })
    .when("/listadoPeliculas", {
      templateUrl: "views/listadoLibros.html",
      controller: "busquedaAvanzada",
    })
    .otherwise({
      templateUrl: "views/error.html",
      redirectTo: "/error",
    });
});

bookController.controller("mainController", function ($scope, $http) {
  $http
    .get("../data/libros.json")
    .then(function (response) {
      $scope.libros = response.data;
      $scope.generateStarRating = function (rating) {
        let starRatingString = "";

        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            starRatingString += "★"; // Estrella llena
          } else if (i - 0.5 <= rating) {
            starRatingString += "☆"; // Media estrella
          } else {
            starRatingString += "☆"; // Estrella vacía
          }
        }

        return starRatingString;
      };
    })
    .catch(function (error) {
      console.log(error);
    });
});

bookController.controller(
  "bookController",
  function ($scope, $routeParams, $http) {
    $http
      .get("../data/libros.json")
      .then(function (response) {
        $scope.libros = response.data;

        $scope.id = $routeParams.id - 1;

        $scope.generateStarRating = function (rating) {
          let starRatingString = "";

          for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
              starRatingString += "★"; // Estrella llena
            } else if (i - 0.5 <= rating) {
              starRatingString += "☆"; // Media estrella
            } else {
              starRatingString += "☆"; // Estrella vacía
            }
          }

          return starRatingString;
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);

bookController.controller("top10Mejores", function ($scope) {
  let librosPrueba = $scope.libros;

  // Ordenar los libros por puntuación en orden descendente.
  librosPrueba.sort((a, b) => b.rating - a.rating);

  // Tomar los primeros 10 libros (los 10 mejores).
  const mejoresLibros = librosPrueba.slice(0, 10);
  $scope.librosMejores = mejoresLibros;
  $scope.generateStarRating = function (rating) {
    let starRatingString = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starRatingString += "★"; // Estrella llena
      } else if (i - 0.5 <= rating) {
        starRatingString += "☆"; // Media estrella
      } else {
        starRatingString += "☆"; // Estrella vacía
      }
    }

    return starRatingString;
  };
});

bookController.controller("top10Peores", function ($scope) {
  let librosPrueba = $scope.libros;

  // Ordenar los libros por puntuación en orden descendente.
  librosPrueba.sort((a, b) => a.rating - b.rating);

  // Tomar los primeros 10 libros (los 10 mejores).
  const mejoresLibros = librosPrueba.slice(0, 10);
  $scope.librosMejores = mejoresLibros;
  $scope.generateStarRating = function (rating) {
    let starRatingString = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starRatingString += "★"; // Estrella llena
      } else if (i - 0.5 <= rating) {
        starRatingString += "☆"; // Media estrella
      } else {
        starRatingString += "☆"; // Estrella vacía
      }
    }

    return starRatingString;
  };
});

bookController.controller("busquedaAvanzada", function ($scope) {
  const tipoBusqueda = document.getElementById("tipo-busqueda").value;
  const buscador = document.getElementById("buscador").value;

  // Realizamos el filtrado en función del tipo de búsqueda y el término ingresado
  $scope.filteredLibros = $scope.libros.filter(function (libro) {
    if (tipoBusqueda === "title") {
      return libro.title.toLowerCase().includes(buscador.toLowerCase());
    } else if (tipoBusqueda === "author") {
      return libro.author.toLowerCase().includes(buscador.toLowerCase());
    } else if (tipoBusqueda === "editorial") {
      return libro.editorial.toLowerCase().includes(buscador.toLowerCase());
    } else {
      // Tipo de búsqueda no válido, muestra todos los libros
      
    }
  });
});
