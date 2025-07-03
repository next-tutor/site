const student = (function () {

    const closeStudentPanel = function () {
        $("#student").removeClass("show");
    }


    const setStudentClickEvents = function () {

        $("#student .btn-close").click((e) => {
            closeStudentPanel(e);
        });
    }


    return {
        setStudentClickEvents
    }
})();

