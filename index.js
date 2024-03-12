$(document).ready(function () {
    // 추가버튼 클릭 시 파일 입력 창 트리거
    $("#uploadButton").on("click", function () {
        $("#fileInput").trigger("click");
    });

    // 파일이 선택되었을 때 동작하는 이벤트
    $("#fileInput").on("change", function () {
        var file = $(this)[0].files[0];

        // 선택된 파일을 읽어서 미리보기 표시 (옵션)
        var reader = new FileReader();
        reader.onload = function (e) {
            // 이미지를 표시할 수 있는 경우에만 미리보기 표시
            $(".editarea").html('<img src="' + e.target.result + '" alt="업로드된 이미지" style="max-width: 100%; max-height: 100%;" />');
        };
        reader.readAsDataURL(file);
    });
});

$(document).ready(function () {
    $("#textButton").on("click", function () {
        $("#textInput").toggle().focus();
    });

    $("#textInput").on("blur", function () {
        var text = $(this).val();
        $(".editarea").append('<div class="textOverlay">' + text + '</div>');
        $(this).hide().val("");
    });

    $("#uploadButton").on("click", function () {
        // 파일 업로드 로직 추가
        var imageUrl = "https://via.placeholder.com/150"; // 예시 이미지 URL
        $(".editarea").append('<img src="' + imageUrl + '" alt="Uploaded Image" class="uploadedImage">');
    });
});