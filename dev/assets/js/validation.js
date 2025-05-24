$(()=>{
    function checkValidityName(name) {
        let regexName = /^[a-zA-Zа-яА-ЯёЁ\-'\s]{2,64}$/;
        return regexName.test(name);
    }
    
    function checkValidityPhone(tel) {
        let regexTel = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return regexTel.test(tel);
    }
    
    function checkValidityConsent(consent){
        return consent.is(':checked');
    }
    
    function checkInputValidity(name, tel, consent){
        let validityName    = false;
        let validityTel     = false;
        let validityConsent = false;
        if(!!name){
            const valueName = name.val().trim();
            if(!checkValidityName(valueName)){
                if(!name.hasClass('invalid')){
                    name.addClass('invalid');
                }
                validityName = false;
            } else{
                validityName = true;
            }
        } else{
            validityName = true;
        }
    
        if(!!tel){
            const valueTel = tel.val().trim();
            if(!checkValidityPhone(valueTel)){
                if(!tel.hasClass('invalid')){
                    tel.addClass('invalid');
                }
                validityTel = false;
            } else{
                validityTel = true;
            }
        } else{
            validityTel = true;
        }
    
        if(!!consent){
            if(!checkValidityConsent(consent)){
                if(!consent.hasClass('invalid')){
                    consent.addClass('invalid');
                }
                validityConsent = false;
            } else{
                validityConsent = true;
            } 
        }
    
        if(validityName && validityTel && validityConsent){
            return true;
        } else{
            return false;
        }
    }
    
    $('.input_tel').inputmask({
        "mask": "+7 (999) 999-99-99", 
    });
    
    $('form').each(function(_, element){
        function safeFind(selector){
            const found = $(element).find(selector);
            return found.length ? found : null;
        };
        let buttonSubmit = safeFind(element, 'button[type="submit"]');
        let inputName    = safeFind(element, '.input_name');
        let inputTel     = safeFind(element, '.input_tel');
        let inputConsent = safeFind(element, '.input_consent');
        $(element).on('submit', function(event) {
            buttonSubmit.prop('disabled', true);
            if (!checkInputValidity(inputName, inputTel, inputConsent)) {
                event.preventDefault();
                console.debug('Fields validation failed');
            } else{
                event.preventDefault();
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
            $(element).on('input change', '.input, .input_consent', function(e){
                if($(e.target).hasClass('invalid')){
                    $(e.target).removeClass('invalid');
                }
                buttonSubmit.prop('disabled', false);
            });
        });
    });
});