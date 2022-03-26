// eslint-disable-next-line no-unused-vars
import { defineComponent } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default function () {
    function toast(title, type = 'danger', description = '') {
        const { close } = createToast(
            {
                title: title,
                description: description
            },
            {
                type: type,
                position: 'top-center',
                transition: 'slide',
                showIcon: true
            }
        );
        return { close };
    }

    function infoToast() {
        let { close } = toast('Wait a bit, please...', 'info');
        return { close };
    }

    function successToast(message) {
        toast(message, 'success');
    }

    function dangerToast(message) {
        toast(message, 'danger');
    }

    return {
        infoToast,
        successToast,
        dangerToast
    }
}