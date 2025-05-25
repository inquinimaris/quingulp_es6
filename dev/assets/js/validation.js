document.addEventListener('DOMContentLoaded', () => {
    function checkValidityName(name) {
        const regexName = /^[a-zA-Zа-яА-ЯёЁ\-'\s]{2,64}$/;
        return regexName.test(name);
    }

    function checkValidityPhone(tel) {
        const regexTel = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return regexTel.test(tel);
    }

    function checkValidityConsent(consent) {
        return consent.checked;
    }

    function checkInputValidity(name, tel, consent) {
        let validityName = true;
        let validityTel = true;
        let validityConsent = true;

        if (name) {
        const valueName = name.value.trim();
        if (!checkValidityName(valueName)) {
            if (!name.classList.contains('invalid')) {
                name.classList.add('invalid');
            }
            validityName = false;
        }
        }

        if (tel) {
        const valueTel = tel.value.trim();
        if (!checkValidityPhone(valueTel)) {
            if (!tel.classList.contains('invalid')) {
                tel.classList.add('invalid');
            }
            validityTel = false;
        }
        }

        if (consent) {
        if (!checkValidityConsent(consent)) {
            if (!consent.classList.contains('invalid')) {
                consent.classList.add('invalid');
            }
            validityConsent = false;
        }
        }

        return validityName && validityTel && validityConsent;
    }

    document.querySelectorAll('form').forEach(form => {
        const buttonSubmit = form.querySelector('button[type="submit"]');
        const inputName = form.querySelector('.input_name');
        const inputTel = form.querySelector('.input_tel');
        const inputConsent = form.querySelector('.input_consent');

        form.addEventListener('submit', (event) => {
        buttonSubmit.disabled = true;
        if (!checkInputValidity(inputName, inputTel, inputConsent)) {
            event.preventDefault();
            console.debug('Fields validation failed');
            buttonSubmit.disabled = false;
        } else {
            event.preventDefault();
            const formData = new FormData(form);
            fetch('./send_popup.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                // do something on success
            })
            .catch(error => {
                console.debug(error);
            })
            .finally(() => {
                // do something regardless
            });
        }
        });

        form.addEventListener('input', (e) => {
        if (e.target.classList.contains('invalid')) {
            e.target.classList.remove('invalid');
        }
        if (buttonSubmit.disabled) {
            buttonSubmit.disabled = false;
        }
        });
    });
});
