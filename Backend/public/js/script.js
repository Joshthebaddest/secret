function copyText (){
    
    var copyText = document.querySelector(".textArea");
    var displayText = document.querySelector(".alert");
    displayText.style.display = "block";
    copyText.select();
    copyText.setSelectionRange(0, 9999999);
    navigator.clipboard.writeText(copyText.value);
    
    setTimeout(()=>{
        displayText.style.display = "none";
    }, 1000)
}
