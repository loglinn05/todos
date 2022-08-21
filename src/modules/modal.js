export default function () {
    function hideModal(id) {
        const dismissButton = document.querySelector('#' + id + ' .btn-close');
        dismissButton.click();
    }

    function modalInputFocus(id) {
        const input = document.querySelector('#' + id + ' input');
        setTimeout(function() {
            input.focus();
        }, 500);
    }

    return {
        hideModal,
        modalInputFocus
    }
}