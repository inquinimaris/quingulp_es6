$(()=>{
    $('.open-popup').magnificPopup({
        items:{
            src: '#popup',
        },
        type:'inline',
        removalDelay: 200,
        callbacks:{
            beforeOpen: function(){
                this.st.mainClass = 'mfp-zoom-in';
            }
        }
    });
});