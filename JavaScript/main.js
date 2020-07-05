// const TypeWriter = function (txtElement, words, wait=3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
// }

// // Type Method
// TypeWriter.prototype.type = function(){

//     // cuurent index of wod
//     const current = this.wordIndex %  this.words.length;
    
//     // Get full text of current word
//     const fullTxt = this.words[current];
//     console.log(fullTxt);

//     // Check if deleting
//     if(this.isDeleting){
//         // remove char
//         this.txt = fullTxt.substring(0, this.txt.length - 1);

//     } else {
//         // Add char
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     // INsert txt into element
//     this.txtElement.innerHTML = `<span class=txt>${this.txt}</span>`;
    
//     // initial Type Speed
//     let typeSpeed = 300;

//     if(this.isDeleting) {
//         typeSpeed /= 2;
//     }

//     // If word is complete
//     if(!this.isDeleting && this.txt===fullTxt) {
//         // Pause
//         typeSpeed = this.wait;
//         // set delete to true
//         this.isDeleting = true;
//     } else if (this.isDeleting && this.txt == ''){
//         this.isDeleting = false;
//         // Move to next word
//         this.wordIndex++;
//         // Paues before start typing
//         this.type = 500;
//     }
//     setTimeout( () => this.type(), typeSpeed);
// }


// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait=3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type(){
        // cuurent index of wod
        const current = this.wordIndex %  this.words.length;
        
        // Get full text of current word
        const fullTxt = this.words[current];
        console.log(fullTxt);

        // Check if deleting
        if(this.isDeleting){
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);

        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // INsert txt into element
        this.txtElement.innerHTML = `<span class=txt>${this.txt}</span>`;
        
        // initial Type Speed
        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt===fullTxt) {
            // Pause
            typeSpeed = this.wait;
            // set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt == ''){
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Paues before start typing
            typeSpeed = 500;
        }
        setTimeout( () => this.type(), typeSpeed);
    }
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // inin TypeWriter
    new TypeWriter(txtElement, words, wait);
}