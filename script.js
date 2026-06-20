// --- CUSTOMIZE YOUR DATA HERE ---
const PAPA_AGE = 46; // Papa ki age daalein

// Local Folder Images aur Messages
const balloonData = {
    1: { img: "images/photo1.jpg", text: "The world's most stubborn umbrella-bringer ☂️" },
    2: { img: "images/photo2.jpg", text: "Still checks the door locks three times. Every night. 🚪" },
    3: { img: "images/photo3.jpg", text: "He's home before you even text 'where are you' 📍" }
};

// Lamba Message for typewriter
const letterText = "Some people carry a room just by walking into it quietly. You're one of them, Papa. There's a steadiness in you that I've leaned on more than I've ever said out loud. May this year give you back some of the stillness you've given everyone else.";
// ---------------------------------

let balloonsPopped = 0;
let currentScreenNumber = 1;

// Music Start Function
function playMusicAndNext() {
    const music = document.getElementById('bg-music');
    music.volume = 0.5;
    music.play().catch(error => console.log("Audio play deferred."));
    navigateTo('screen-2');
    startCounter();
}

// Navigation Logic
function navigateTo(screenId) {
    currentScreenNumber++;
    document.querySelectorAll('.side-dot').forEach(el => el.classList.remove('active'));
    const currentDot = document.getElementById(`dot-${currentScreenNumber}`);
    if(currentDot) currentDot.classList.add('active');

    document.querySelectorAll('.hidden-screen, div[id^="screen-"]:not(.hidden-screen)').forEach(el => el.style.display = 'none');
    document.getElementById(screenId).style.display = (screenId === 'screen-3' || screenId === 'screen-4') ? 'block' : 'flex';
}

// Counter Logic
function startCounter() {
    let count = 0;
    const counterEl = document.getElementById('counter');
    const duration = 2500; 
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        count = Math.floor(easedProgress * PAPA_AGE);
        counterEl.innerText = count;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counterEl.innerText = PAPA_AGE;
            setTimeout(() => {
                document.getElementById('btn-screen-2').classList.remove('hidden');
                document.getElementById('btn-screen-2').classList.add('fade-in');
            }, 500);
        }
    }
    requestAnimationFrame(updateCounter);
}

// Balloon Pop Logic
function popBalloon(id) {
    document.getElementById(`b-${id}`).style.visibility = 'hidden';
    document.getElementById('polaroid-img').src = balloonData[id].img;
    document.getElementById('polaroid-text').innerText = balloonData[id].text;
    document.getElementById('polaroid-modal').classList.remove('hidden');
    
    balloonsPopped++;
    document.getElementById('balloons-left').innerText = `${3 - balloonsPopped} left to pop`;
}

function closePolaroid() {
    document.getElementById('polaroid-modal').classList.add('hidden');
    if (balloonsPopped === 3) {
        const btn = document.getElementById('pop-another-btn');
        btn.innerHTML = "Read Letter 💌";
        btn.onclick = () => { navigateTo('screen-4'); startTypewriter(); };
        btn.onclick();
    }
}

// Typewriter Logic
function startTypewriter() {
    let i = 0;
    const speed = 40;
    const el = document.getElementById('typewriter-text');
    el.innerHTML = "";
    function type() {
        if (i < letterText.length) {
            el.innerHTML += letterText.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            document.getElementById('btn-screen-4').classList.remove('hidden');
            document.getElementById('btn-screen-4').classList.add('fade-in');
        }
    }
    type();
}

// Confetti Logic
function triggerConfetti() {
    var duration = 5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#A47E5B', '#D8C3A5', '#052e16'] });
        confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#A47E5B', '#D8C3A5', '#dc2626'] });

        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
