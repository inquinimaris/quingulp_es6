$(()=>{
    function openMFP_core(popupId){
        $.magnificPopup.open({
            items:{
                src: `#${popupId}`,
            },
            type:'inline',
            removalDelay: 200,
            fixedContentPos: true,
            callbacks:{
                beforeOpen: function(){
                    this.st.mainClass = 'mfp-zoom-in';
                },
            }
        });
    }
    function openMFP(popupId){
        if(!$.magnificPopup.instance.isOpen){
            openMFP_core(popupId);
        } else{
            $.magnificPopup.instance.st.callbacks = {
                afterClose: function() {
                    openMFP_core(popupId);
                }
            }
            $.magnificPopup.close();
        }
    }
    $('body').on('click', '.open-popup', function(){
        openMFP($(this).attr('data-popup'));
    });
    $('body').on('click', '.close-popup', function(){
        $.magnificPopup.close();
    });
});
