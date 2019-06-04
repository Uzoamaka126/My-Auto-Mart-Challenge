let modal = document.getElementById('myModal');

let modalEdit = document.getElementById('myEditPostModal');

let modalDelete = document.getElementById('myDeletePostModal');

// let reportFakeModal = document.getElementById('fakePostModal')

// Grab the modalButton onetime
let modalButton = document.getElementById('modalButton');

// Grab the editButton for the Seller's Edit Button
let editPostButton = document.getElementsByClassName('edit-button');

// Grab the deleteButton for the Seller's Edit Button
let deletePostButton = document.getElementsByClassName('delete-post-button');

// Grab the several modal buttons in the Admin Section
let modalAdminButton = document.getElementsByClassName('modal-admin-button');

// Grab the X(close) button to close the modal
let closeButton = document.getElementsByClassName('close');

// When the user clicks the modal button 
modalButton.addEventListener('click', function() {
    modal.style.display = 'block';
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}) 
// Function to close the X modal button
function adminModalClose() {
    let i;    
    for (i = 0; i < closeButton.length; i++) {
        closeButton[i].onclick = function() {
            modal.style.display = "none" || modalEdit.style.display = 'none' || modalDelete.style.display = 'none';
        }
    }
}

// Function to open each modal in a page
function adminModal() {
    let i;    
    for (i = 0; i < modalAdminButton.length; i++) {
        modalAdminButton[i].onclick = function() {
            modal.style.display = "block";
        }
    }
}

// Function to open the edit modal
function editPostModal() {
    let i;    
    for (i = 0; i < editPostButton.length ; i++) {
        editPostButton[i].onclick = function() {
            modalEdit.style.display = "block";
        }
    }
}

// Function to delete the edit modal
function deletePostModal() {
    let i;    
    for (i = 0; i < editPostButton.length; i++) {
        deletePostButton[i].onclick = function() {
            modalDelete.style.display = "block";
        }
    }
}
