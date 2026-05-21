const sidebar = (function () {

    const setSidebarClickEvents = function () {

        $(".sidebar .item.tutees").click(() => {
            showPanel("tutees");
        })
        $(".sidebar .item.lessons").click(() => {
            showPanel("lessons");
        })
        $(".sidebar .item.tasks").click(() => {
            showPanel("tasks");
        })
        $(".sidebar .item.incomes").click(() => {
            showPanel("incomes");
        })
        $(".sidebar .item.website").click(() => {
            showPanel("website");
        })
        $(".sidebar .item.settings").click(() => {
            showPanel("settings");
        })
    }


    return {
        setSidebarClickEvents
    }
})();

