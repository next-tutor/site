const htmlLoader = (function () {

    const files = [
        { id: 'sidebar', file: './html/sidebar.html' },
        { id: 'students', file: './html/students.html' },
        { id: 'student', file: './html/student.html' },
        { id: 'lessons', file: './html/lessons.html' },
        { id: 'tasks', file: './html/tasks.html' },
        { id: 'new-lesson-dlg', file: './html/new-lesson-dlg.html' },
        { id: 'search-lesson-dlg', file: './html/search-lesson-dlg.html' },
        { id: 'past-lesson-dlg', file: './html/past-lesson-dlg.html' },
        { id: 'task-req-dlg', file: './html/task-req-dlg.html' },
        { id: 'offer-dlg', file: './html/offer-dlg.html' }
    ];

    //---------------------------------------------------

    const loadHtmlIntoElement = function (elementId, filePath) {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(html => {
                document.getElementById(elementId).innerHTML = html;
                return html;
            });
    }

    //-----------------------------------------------------

    const load = function () {
        return Promise.all(
            files.map(item => loadHtmlIntoElement(item.id, item.file))
        );
    }

    return {
        load
    }
})();

