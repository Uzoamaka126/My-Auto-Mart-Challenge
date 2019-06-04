// Function for opening the single car page details
function openDetails(tabName, element, color) {
    let i;
    let tabcontent;
    let tablinks;
    tabcontent = document.getElementsByClassName('single-details');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('details-button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = '';
    }
    document.getElementById(tabName).style.display = 'block';
    element.style.backgroundColor = color;
}

document.getElementById('defaultOpen').click();

function openTabs(tabName, element, color) {
    let i;
    let tabcontent;
    let tablinks;
    tabcontent = document.getElementsByClassName('about-1');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('details-button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = '';
    }
    document.getElementById(tabName).style.display = 'block';
    element.style.backgroundColor = color;
}

document.getElementById('defaultOpen').click();