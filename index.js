$(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var img = document.createElement("img");

    $("#uploadButton").on("click", function () {
        $("#fileInput").trigger("click");
    });

    $("#fileInput").on("change", function () {
        var file = $(this)[0].files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                $("#textInput").val("");
            };
        };
        reader.readAsDataURL(file);
    });

    $("#textButton").on("click", function () {
        $("#textInput").toggle().focus();
    });

    $("#mergeButton").on("click", function () {
        var text = $("#textInput").val();
        drawTextOnImage(text);
        $("#textInput").hide().val("");
    });

    $("#resetTextButton").on("click", function () {
        clearTextOnImage();
    });

    function drawTextOnImage(text) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";

        context.fillText(text, canvas.width / 2, canvas.height / 2);

        $("#contentContainer").html('<img src="' + canvas.toDataURL("image/png") + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
    }

    function clearTextOnImage() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        $("#contentContainer").html('<img src="' + canvas.toDataURL("image/png") + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
    }
});
