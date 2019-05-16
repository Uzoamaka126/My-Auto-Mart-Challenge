// Function for the about us page tabs
function openTabs(tabName, element, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.querySelectorAll('.about-1');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.querySelectorAll('.tab-button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = '';
    }
    document.getElementById(tabName).style.display = 'block';
    element.style.backgroundColor = color;
}

document.getElementById('default').click();

// Function for opening the single car page details
function openDetails(tabName, element, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.querySelectorAll('.single-details');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.querySelectorAll('.details-button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = '';
    }
    document.getElementById(tabName).style.display = 'inline-block';
    element.style.backgroundColor = color;
}

document.getElementById('default-details-button').click();