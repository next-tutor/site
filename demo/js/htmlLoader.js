const htmlLoader = (function () {

    const files = [
        { id: 'sidebar', file: './html/sidebar.html' },
        { id: 'students', file: './html/students.html' },
        { id: 'lessons', file: './html/lessons.html' },
        { id: 'past-lesson-dlg', file: './html/past-lesson-dlg.html' },
        { id: 'tutee-popup-dlg', file: './html/tutee-popup-dlg.html' }
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

