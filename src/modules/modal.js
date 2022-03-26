export default function () {
    function hideModal(id) {
        const dismissButton = document.querySelector('#' + id + ' .btn-close');
        dismissButton.click();
    }

    return {
        hideModal
    }
}