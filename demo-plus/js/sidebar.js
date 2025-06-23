const sidebar = (function () {

    const setSidebarClickEvents = function () {

        $(".sidebar .item.students").click(() => {
            showPanel("students");
        })
        $(".sidebar .item.lessons").click(() => {
            showPanel("lessons");
        })
        $(".sidebar .item.tasks").click(() => {
            showPanel("tasks");
        })
        $(".sidebar .item.website").click(() => {
            showPanel("website");
        })
        $(".sidebar .item.reports").click(() => {
            showPanel("reports");
        })
        $(".sidebar .item.settings").click(() => {
            showPanel("settings");
        })
    }


    return {
        setSidebarClickEvents
    }
})();

