$(function () {
    $(".eaten").on("click", function (event) {
        let id = $(this).data("id");
        let newEat = $(this).data("neweat")
        let newEatState = {
            eaten: newEat
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatState
        }).then(
            function () {
                console.log("changed eaten to", newEat);
                location.reload();
            }
        );
    })

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        let newBurger = {
            name: $("#bu").val().trim(),
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function (event) {
        let id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                location.reload();
            }
        );
    });
});