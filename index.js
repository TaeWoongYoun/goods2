$(document).ready(function () {
    var originalImageSrc = ""; // 추가된 원본 이미지 주소 저장
    // 원래대로 버튼
    $("#uploadButton").on("click", function () {
        $("#fileInput").trigger("click");
    });

    $("#fileInput").on("change", function () {
        var file = $(this)[0].files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            originalImageSrc = e.target.result; // 원본 이미지 주소 저장
            $("#contentContainer").html('<img id="previewImage" src="' + e.target.result + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
            $("#textInput").val("");
        };
        reader.readAsDataURL(file);
    });
    // 글상자버튼
    $("#textButton").on("click", function () {
        $("#textInput").toggle().focus();
    });

    $("#mergeButton").on("click", function () {
        var text = $("#textInput").val();
        drawTextOnImage(text);
        $("#textInput").hide().val("");
    });

    $("#resetTextButton").on("click", function () {
        resetToOriginal();
    });

    $("#deleteButton").on("click", function () {
        deleteAllImages();
        $("#textInput").val(""); // 추가된 이미지 삭제 시 텍스트도 초기화
        $("#previewImage").show();
    });

    function drawTextOnImage(text) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        var img = document.querySelector('.editarea img');
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";

        context.fillText(text, canvas.width / 2, canvas.height / 2);

        $("#contentContainer").html('<img id="previewImage" src="' + canvas.toDataURL("image/png") + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
        $("#previewImage").show();
    }

    function resetToOriginal() {
        // 원본 이미지로 리셋
        $("#contentContainer").html('<img id="previewImage" src="' + originalImageSrc + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
        $("#textInput").val("");
    }

    function deleteAllImages() {
        $(".editarea img").remove();
    }
});
