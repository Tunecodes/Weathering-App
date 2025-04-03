document.addEventListener("DOMContentLoaded", () => {
    //retrieve body and forecast container from home page
    const bodyContainer = document.querySelector('.body');
    const forecastContainer = document.querySelector('.forecast');
    //store original html content for later restoration
    const originalBodyContent = bodyContainer.innerHTML;
    const originalForecastContent = forecastContainer.innerHTML;

    //handles view switching between home, suggestion, and activity
    function switchView(viewName) {

        bodyContainer.style.display = 'none';
        forecastContainer.style.display = 'none';

        //remove all stylesheets from home page except for home-page.css since its shared by all files
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.href.endsWith('home-page.css')) {
                link.remove();
            }
        });

        //if current view is home, add mobile style then display the content in the body and forecast container
        if (viewName === 'home') {
            const cssMobile = `mobile-version.css`;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssMobile;
            document.head.appendChild(link);

            bodyContainer.innerHTML = originalBodyContent;
            forecastContainer.innerHTML = originalForecastContent; 

            bodyContainer.style.display = 'flex';
            forecastContainer.style.display = 'flex';
            return;
        }

        //else, it fetches for the current view page. If success, it adds the corresponding css file and 
        //retrieves the necessary contents to be displayed. If failed, error message is displayed 
        //and it is switched to home view.
        fetch(`${viewName}-page.html`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const containerSelector = viewName === 'suggestion' ? '.suggestion-container' : '.activity-container';
                const con = doc.querySelector(containerSelector);

                const cssFile = `${viewName}-page.css`;
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssFile;
                document.head.appendChild(link);

                bodyContainer.innerHTML = con.outerHTML;
                bodyContainer.style.display = 'flex';
                forecastContainer.style.display = 'none';
            })
            .catch(error => {
                console.error('Error loading page:', error);
                switchView('home');
            });
    }

    //when button is clicked, view should be switched
    document.getElementById('home').addEventListener('click', () => {switchView('home'); setCurrentPage("home")});
    document.getElementById('activity').addEventListener('click', () => {switchView('activity'); setCurrentPage("activity")});
    document.getElementById('suggestion').addEventListener('click', () => {switchView('suggestion'); setCurrentPage("suggestion")});

    //set initial view to home
    switchView('home');
    setCurrentPage("home")
});

function setCurrentPage(page) {
    localStorage.setItem("currentPage", page)
}
