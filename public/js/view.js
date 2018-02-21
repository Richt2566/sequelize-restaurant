$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $icecreamContainer = $(".icecream-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteFlavor);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".todo-item", editFlavor);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertFlavor);

  var icecreamArray = [];

  getIcecream();

  function initializeRows() {
    $icecreamContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < icecream.length; i++) {
      rowsToAdd.push(createNewRow(icecream[i]));
    }
    $icecreamContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getIcecream() {
    $.get("/api/icecream", function(data) {
      icecream = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteFlavor(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/icecream/" + id
    }).done(getIcecream);
  }

  // This function handles showing the input box for a user to edit a todo
  function editFlavor() {
    var currentFlavor = $(this).data("icecream");
    $(this).children().hide();
    $(this).children("input.edit").val(currentFlavor.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var flavor = $(this).parent().data("icecream");
    flavor.complete = !flavor.complete;
    updateTodo(flavor);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedFlavor = $(this).data("icecream");
    if (event.keyCode === 13) {
      updatedFlavor.text = $(this).children("input").val().trim();
      $(this).blur();
      updateBurger(updatedFlavor);
    }
  }

  // This function updates a todo in our database
  function updateFlavor(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/icecream",
      data: icecream
    }).done(getFlavors);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentFlavor = $(this).data("icecream");
    if (currentFlavor) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentFlavor.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    var $newInputRow = $(
      [
        "<li class='list-group-item flavor'>",
        "<span>",
        flavor.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", flavor.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("flavor", burger);
    if (flavor.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertFlavor(event) {
    event.preventDefault();
    var flavor = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/icecream", flavor, getFlavors);
    $newItemInput.val("");
  }
});