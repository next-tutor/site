const htmlLoader = (function () {

    const files = [
        { id: 'sidebar', file: './html/sidebar.html' },
        { id: 'students', file: './html/students.html' },
        { id: 'student', file: './html/student.html' },
        { id: 'lessons', file: './html/lessons/lessons.html' },
        { id: 'new-lesson-dlg', file: './html/lessons/new-lesson-dlg.html' },
        { id: 'search-lesson-dlg', file: './html/lessons/search-lesson-dlg.html' },
        { id: 'past-lesson-dlg', file: './html/lessons/past-lesson-dlg.html' },
        { id: 'tasks', file: './html/tasks/tasks.html' },
        { id: 'task-dlg', file: './html/tasks/task-dlg.html' },
        { id: 'task-req-dlg', file: './html/tasks/task-req-dlg.html' },
        { id: 'task-update-item-dlg', file: './html/tasks/task-update-item-dlg.html' },
        { id: 'offer-dlg', file: './html/tasks/offer-dlg.html' },
        { id: 'task-info-dlg', file: './html/tasks/task-info-dlg.html' },
        { id: 'settings', file: './html/settings/settings.html' }
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

