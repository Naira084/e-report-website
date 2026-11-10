function switchPage(page) {
    const homePage = document.getElementById('page-home');
    const statsPage = document.getElementById('page-stats');
    const navButtons = document.querySelectorAll('.nav-item');

    if (page === 'home') {
        homePage.classList.remove('hidden');
        statsPage.classList.add('hidden');

        document.body.classList.remove('page-stats');
        
        navButtons[0].classList.add('active');
        navButtons[1].classList.remove('active');
    } else {
        homePage.classList.add('hidden');
        statsPage.classList.remove('hidden');

        document.body.classList.add('page-stats');
        
        navButtons[0].classList.remove('active');
        navButtons[1].classList.add('active');
    }
}

// function filterStatus(status, btnElement) {
//     const buttons = document.querySelectorAll('.filter-btn');
//     buttons.forEach(btn => btn.classList.remove('active'));
//     btnElement.classList.add('active');

//     const rows = document.querySelectorAll('#report-table-body tr.table-row');
    
//     rows.forEach(row => {
//         const rowStatus = row.getAttribute('data-status') || 
//                           row.querySelector('.status-text')?.textContent.trim();

//         if (status === 'SEMUA') {
//             row.style.setProperty('display', '', 'important');
//         } else if (rowStatus && rowStatus.toUpperCase().includes(status.toUpperCase())) {
//             row.style.setProperty('display', '', 'important');
//         } else {
//             row.style.setProperty('display', 'none', 'important');
//         }
//     });
// }