$(()=>{
    function checkValidityName(name) {
        let regexName = /^[a-zA-Zа-яА-ЯёЁ\-'\s]{2,64}$/;
        return regexName.test(name);
    }
    
    function checkValidityPhone(tel) {
        let regexTel = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return regexTel.test(tel);
    }

    function checkValidityEmail(email) {
        // Yes, it's the RFC 5322-compliant monstrosity
        let regexEmail = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:+(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        return regexEmail.test(email);
    }
    
    function checkValidityCheckbox(checkbox){
        return checkbox.is(':checked');
    }

    function validateInputField(element, validator) {
        if (!!element) {
            const value = element.val().trim();
            const isValid = validator(value);
            element.toggleClass('invalid', !isValid);
            return isValid;
        }
        return true;
    }
    
    function validateCheckbox(element) {
        if (!!element) {
            const isValid = checkValidityCheckbox(element);
            element.toggleClass('invalid', !isValid);
            return isValid;
        }
        return true;
    }
    
    function checkInputValidity(name, tel, email, consent, promo){
        const validityName = validateInputField(name, checkValidityName);
        const validityTel = validateInputField(tel, checkValidityPhone);
        const validityEmail = validateInputField(email, checkValidityEmail);
        const validityConsent = validateCheckbox(consent);
        const validityPromo = validateCheckbox(promo);
        if(validityName && validityTel && validityConsent && validityPromo && validityEmail){
            return true;
        } else{
            return false;
        }
    }
    
    $('.input_tel').inputmask({
        mask: "+7 (999) 999-99-99", 
    });
    $('.input_email').inputmask("email");
    
    $('form').each(function(_, element){
        $(element).attr('data-first-submit', 'true');
        function safeFind(selector){
            const found = $(element).find(selector);
            console.debug(found);
            return found.length ? found : null;
        };
        let buttonSubmit = safeFind('button[type="submit"]');
        let inputName    = safeFind('.input_name');
        let inputTel     = safeFind('.input_tel');
        let inputEmail   = safeFind('.input_email');
        let inputConsent = safeFind('.input_consent');
        let inputPromo   = safeFind('.input_promo');
        const validityState = {
            name: checkValidityName(inputName?.val().trim() || ''),
            tel: checkValidityPhone(inputTel?.val().trim() || ''),
            email: checkValidityEmail(inputEmail?.val().trim() || ''),
            consent: checkValidityCheckbox(inputConsent),
            promo: checkValidityCheckbox(inputPromo)
        };
        function updateSubmitButton() {
            const isFirstSubmit = $(element).attr('data-first-submit') === 'true';
            const allValid = Object.values(validityState).every(Boolean);
            if (isFirstSubmit) {
                buttonSubmit.prop('disabled', false);
            } else {
                buttonSubmit.prop('disabled', !allValid);
            }
        }
        updateSubmitButton();
        $(element).on('submit', function(event) {
            event.preventDefault();
            $(element).attr('data-first-submit', 'false');
            buttonSubmit.prop('disabled', true);
            if (!checkInputValidity(inputName, inputTel, inputEmail, inputConsent, inputPromo)) {
                console.debug('Fields validation failed');
            } else{
                var formData = $(element).serialize();
                $.ajax({
                    type: 'POST',
                    url: './send_popup.php', // just a dummy receiver
                    data: formData,
                    success: function(response) { 
                        // do something 
                    },
                    error: function(xhr, status, error){
                        console.debug(xhr); 
                        console.debug(status);
                        console.debug(error);
                    },
                    complete: function(){
                        // do something **regardless**
                    }
                });
            }
        });
        $(element).on('input change', '.input_name', function() {
            validityState.name = checkValidityName($(this).val().trim());
            $(this).removeClass('invalid');
            updateSubmitButton();
        });
        $(element).on('input change', '.input_tel', function() {
            validityState.tel = checkValidityPhone($(this).val().trim());
            $(this).removeClass('invalid');
            updateSubmitButton();
        });
        $(element).on('input change', '.input_email', function() {
            validityState.email = checkValidityEmail($(this).val().trim());
            $(this).removeClass('invalid');
            updateSubmitButton();
        });
        $(element).on('input change', '.input_consent', function() {
            validityState.consent = checkValidityCheckbox($(this));
            $(this).removeClass('invalid');
            updateSubmitButton();
        });
        $(element).on('input change', '.input_promo', function() {
            validityState.promo = checkValidityCheckbox($(this));
            $(this).removeClass('invalid');
            updateSubmitButton();
        });
    });
    
});