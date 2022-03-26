export default function () {
    function keygen(length = 6) {
        let result = '';
        let characters_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let characters_set_length = characters_set.length;
        for (let i = 0; i < length; i++) {
            result += characters_set.charAt(Math.random() * characters_set_length);
        }
        return result;
    }

    function generateKeyArray(array) {
        let keys = [];
        for (let i = 0; i < array.length; i++) {
            keys.push(keygen());
        }
        return keys;
    }

    function generateListKeys(array) {
        let keys = [];
        while ([...new Set(keys)].length < array.length) {
            keys = generateKeyArray(array);
        }
        return keys;
    }

    function assignKeysToList(array) {
        let keys = generateListKeys(array);
        for (let i = 0; i < array.length; i++) {
            array[i].key = keys[i];
        }
    }

    return {
        assignKeysToList
    }
}