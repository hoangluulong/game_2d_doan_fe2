const settings = {
    DOT: 0.5,
    CHIEU_CAO_NHAY: 30,
    TOC_DO_CHAY: 100,
    TOC_DO_NHAY: 15,
    TOC_DO_VAT_CAN: 20,
    TOC_DO_CAY: 100,
}

const theme = {
    PRIMARY: '	#FF0000',
    BACKGROUND: '#9999FF',
    DUONGCHAY: '#000055'
}

const uImg = {
    IMG_NV_0: "./image/nv_0.png",
    IMG_NV_1: "./image/nv_1.png",
    IMG_NV_2: "./image/nv_2.png",
    IMG_NV_3: "./image/nv_3.png",
    IMG_NV_4: "./image/nv_4.png",
    IMG_NV_5: "./image/nv_5.png",
    IMG_NV_NHAY: "./image/nv_nhay.png",
    VAT_CAN: "./image/thung_go.jpg",
    BACKGROUND: "./image/bg.jpg",
    TIEN_VANG: "./image/tien_vang.png",
}

const arrayLeft = [22, 33];

const uTmgCay = [
    "./image/cay1.png",
    "./image/cay2.png",
    "./image/cay3.png",
    "./image/cay4.png",
    "./image/cay5.png",
    "./image/cay6.png",
    "./image/cay7.png",
];

const getSize = size => {
    return `${size * settings.DOT}vmin`;
}

class NhanVat {
    constructor(audio) {
        this.height = 15;
        this.width = 15;
        this.left = 40;
        this.altitude = 0;
        this.statusImg = 0;
        this.statusRun = false;
        this.timeRun = null;
        this.timeGoUp = null;
        this.audio = audio;
        this.sJump = false;
        this.cao = 0;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `30vmin`;
        this.el.style.zIndex = 9990;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = this.srcImage(uImg.IMG_NV_0);
    }

    //nhảy
    jump() {
        //Nếu độ cao (altitude) > 0 thì kết thúc không làm gì, còn ngược lại thì ta gọi hàm nhảy lên goUp.
        if (this.altitude > 0) {
            return;
        }
        this.goUp();
    }

    //Nhảy lên
    goUp() {
        //nếu độ cao >= 30 thì gọi hàm rớt xuống goDown(). 
        if (this.altitude >= settings.CHIEU_CAO_NHAY) return this.goDown()
        //ngược lại thì sẽ tăng chiều cao ++
        clearInterval(this.timeRun);
        this.el.innerHTML = this.srcImage(uImg.IMG_NV_NHAY);
        this.sJump = true;
        this.altitude++;
        this.cao++;
        this.timeGoUp = setTimeout(this.goUp.bind(this), settings.TOC_DO_NHAY);
        // this.timeGoUp = setTimeout(this.goUp.bind(this), 350);
    }

    //Rớt xuống
    goDown() {
        if (this.altitude === 0) {
            if (this.statusRun == true) {
                this.audio.loop = true;
                this.audio.src = './audio/chay_bo.mp3';
                this.audio.play();
                this.sJump = false;
                this.run();
            } else {
                //Chuyển hình lại 
                this.el.innerHTML = this.srcImage(uImg.IMG_NV_0);
            }
            return;
        }
        this.altitude--;
        this.cao--;
        this.statusJump = setTimeout(this.goDown.bind(this), settings.TOC_DO_NHAY);
        // this.statusJump = setTimeout(this.goDown.bind(this), 350);
    }

    //Tăng, giảm y
    render() {
        this.statusRun = true;
        this.el.style.transform = `translateY(-${getSize(this.altitude)})`;
    }

    //chạy
    run() {
        this.statusImg = 1;
        this.timeRun = setInterval(this.moveImage.bind(this), settings.TOC_DO_CHAY);
    }

    //set hinh chuyển động
    moveImage() {
        switch (this.statusImg) {
            case 1:
                this.el.innerHTML = this.srcImage(uImg.IMG_NV_1);
                this.statusImg = 2;
                break;
            case 2:
                this.el.innerHTML = this.srcImage(uImg.IMG_NV_2);
                this.statusImg = 3;
                break;
            case 3:
                this.el.innerHTML = this.srcImage(uImg.IMG_NV_3);
                this.statusImg = 1;
                break;
        }
    }

    //Đường dẫn hình
    srcImage(e) {
        return `<img src="${e}" alt="Nhân vật">`;
    }
}

// Vật cản
class VatCan {
    constructor() {
        this.height = 7;
        this.width = 7;
        this.left = 200;
        this.distance = 0; //Khoảng cách

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `34vmin`;
        this.el.style.zIndex = 9991;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = this.srcImage(uImg.VAT_CAN);
    }

    //Di chuyển
    move() {
        this.distance++;
        setTimeout(this.move.bind(this), settings.TOC_DO_VAT_CAN);
    }

    //Giảm x
    render() {
        this.el.style.transform = `translateX(-${getSize(this.distance)})`;
    }

    srcImage(e) {
        return `<img src="${e}" alt="Vật cản">`;
    }
}

class TienVang {
    constructor() {
        this.height = 7;
        this.width = 7;
        this.left = 220;
        this.distance = 0; //Khoảng cách

        this.loai = this.getRandomInt(0, 2);
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        if (this.loai == 0) {
            this.el.style.top = `${arrayLeft[0]}vmin`;
        } else {
            this.el.style.top = `${arrayLeft[1]}vmin`;
        }

        this.el.style.zIndex = 9990;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = this.srcImage(uImg.TIEN_VANG);
    }

    //Di chuyển
    move() {
        this.distance++;
        setTimeout(this.move.bind(this), settings.TOC_DO_VAT_CAN);
    }

    //Giảm x
    render() {
        this.el.style.transform = `translateX(-${getSize(this.distance)})`;
    }

    //Đường dẫn hình
    srcImage(e) {
        return `<img src="${e}" alt="Vàng">`;
    }

    //random 
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

class DuongChay {
    constructor() {
        this.height = 3;
        this.width = 200;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `37vmin`;
        this.el.style.zIndex = 9998;
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.style.background = theme.DUONGCHAY;
    }
}

class Cay {
    constructor() {
        this.height = 100;
        this.width = 50;
        this.left = 200;
        this.distance = 0; //Khoảng cách

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.bottom = 0;
        this.el.style.zIndex = 1;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        // this.el.style.background = theme.BACKGROUND;
        this.el.innerHTML = this.srcImage(uTmgCay[Math.floor(Math.random() * uTmgCay.length)]);
    }

    //Di chuyển
    move() {
        this.distance++;
        setTimeout(this.move.bind(this), settings.TOC_DO_CAY);
    }

    //Giảm x
    render() {
        this.el.style.transform = `translateX(-${getSize(this.distance)})`;
    }

    srcImage(e) {
        return `<img src="${e}" alt="cay">`;
    }
}

class KhungHinh {
    constructor(el) {
        this.height = 100;
        this.width = 200;

        this.el = document.createElement('div');
        this.el.style.position = 'relative';
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.style.overflow = 'hidden';
        // this.el.style.backgroundImage = "url('../image/bg.jpg')";
        this.el.innerHTML += `<div class="bg">
                                        <img src="${uImg.BACKGROUND}" alt="background">
                                    </div>`;
        el.appendChild(this.el)
    }

    add(child) {
        this.el.appendChild(child.el)
    }
}

//Điếm số
const SCORE_KEY = 'TREX_HIGHSCORE'
class DiemSo {
    constructor() {
        this.score = 0; //Điểm
        this.highscore = localStorage.getItem(SCORE_KEY) || 0 ;//Điểm cao

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.zIndex = 9992;
        this.el.style.top = getSize(1);
        this.el.style.right = getSize(2);
        this.el.style.color = theme.PRIMARY;
    }

    //Tăng điểm
    countUp() {
        console.log("a");
        this.score++;
    }

    //Lưu điểm cao
    save() {
        if (this.score > this.highscore) {
            localStorage.setItem(SCORE_KEY, this.score);
        }
    }

    //Chạy bảng điểm
    render() {
        this.el.innerHTML = `SĐiểm số: ${this.score} | Kỉ lục: ${this.highscore}`;
    }
}

class Game {
    constructor(selector, audio, leve) {
        this.el = document.querySelector(selector);
        this.audio = document.getElementById(audio);
        this.audio1 = document.getElementById("audioVang");
        this.startGame = null;
        this.lv_kho = null;
        this.lv_de = null;
    }

    init() {
        this.statusStop = false;
        this.foes = []; //Mảng vật cản
        this.cays = [];
        this.vangs = [];
        this.loop = null; //Vòng 1
        this.loop2 = null;

        this.audio1.src = './audio/an_vang.mp4';

        this.khunghinh = new KhungHinh(this.el);
        this.batdau = new BatDau();
        this.Kho = new Kho(this.leve);
        this.de = new De(this.leve);
        this.cay = new Cay();
        this.duongchay = new DuongChay();
        this.nv = new NhanVat(this.audio);
        this.diem = new DiemSo();

        this.khunghinh.add(this.cay);
        this.khunghinh.add(this.duongchay);
        this.khunghinh.add(this.nv);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.Kho);
        this.khunghinh.add(this.de);
        this.khunghinh.add(this.diem);
        this.startGame = document.querySelector('.start');
        this.initListeners();
    }

    //Bắt sự kiện
    initListeners() {
        window.addEventListener('keydown', this.handleInput.bind(this));
        this.startGame.addEventListener('click', () => {
            if (this.nv.statusRun == false) {
                this.audio.loop = true;
                this.audio.play();
                this.start();
            }
        });
    }

    // Sự kiện khi ấn space
    handleInput(event) {
        if (event.key === ' ' && this.statusStop == false && this.nv.sJump == false && this.nv.statusRun == true) {
            this.audio.currentTime = 0;
            this.audio.src = './audio/nhay_3.wav';
            this.audio.loop = false;
            this.audio.play();
            this.nv.jump();
        }
        return;
    }

    generateVatCan() {
        if (this.loop === null) { return; }
        const foe = new VatCan();
        this.khunghinh.add(foe);
        this.foes.push(foe);
        foe.move();
        var time = this.getRandomInt(1200, 2500);
        setTimeout(this.generateVatCan.bind(this), time);
    }

    generateCay() {
        if (this.loop === null) return;
        const cay = new Cay();
        this.khunghinh.add(cay);
        this.cays.push(cay);
        cay.move();

        var time = this.getRandomInt(10000, 15000);
        setTimeout(this.generateCay.bind(this), time);
    }

    generateVang() {
        if (this.loop === null) return;
        const vang = new TienVang();
        this.khunghinh.add(vang);
        this.vangs.push(vang);
        vang.move();

        var time = this.getRandomInt(1000, 2000);
        setTimeout(this.generateVang.bind(this), time);
    }

    // thành tích
    tick() {
        this.nv.render();
        this.diem.render();
        this.foes.forEach(foe => {
            foe.render();
            if (this.collision(this.nv, foe)) {
                this.stop();
            }
        });

        this.cays.forEach(cay => {
            cay.render();
        });

        this.vangs.forEach(vang => {
            vang.render();
            if (vang.loai == 1) {
                if (this.collision(this.nv, vang)) {
                    vang.el.innerHTML = '';
                    this.audio1.currentTime = 0;
                    this.audio1.play();
                }
            } else {
                if (this.collision2(this.nv, vang)) {
                    vang.el.innerHTML = '';
                    this.audio1.currentTime = 0;
                    this.audio1.play();
                }
            }
        });
    }

    tick2() {
        this.batdau.render();
        this.Kho.render();
        this.de.render();
        if (this.batdau.distance >= 200) {
            clearInterval(this.loop2);
        }
    }

    addScore() {
        if (this.loop === null) return
        this.diem.countUp()
        setTimeout(this.addScore.bind(this), 500)
    }

    //Bắt đầu trò chơi
    start() {
        this.nv.run();
        this.nv.statusRun == true;
        this.loop = setInterval(this.tick.bind(this), 5);
        this.loop2 = setInterval(this.tick2.bind(this), 5);
        this.batdau.move();
        this.Kho.move();
        this.de.move();
        this.generateVatCan();
        this.generateVang();
        this.generateCay();
        this.addScore();
    }

    //Kết thúc
    stop() {
        this.statusStop = true;
        this.diem.save()
        this.audio.currentTime = 0;
        this.audio.src = './audio/game_over.mp3';
        this.audio.loop = false;
        this.audio.play();
        clearInterval(this.loop);
        clearInterval(this.nv.timeRun);
        clearTimeout(this.nv.timeGoUp);
        clearTimeout(this.nv.statusJump);
        // this.nv.statusRun == false;
        this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_4);
        setTimeout(() => { this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_5); }, 1000);
        this.loop = null;
    }

    //Va chạm
    collision(a, b) {
        //Nếu chiều cao của nhân vật lớn hơn chiều cao của vật cản
        if (a.altitude > b.height) return false;
        if (a.left + a.width < b.left - b.distance) return false;
        if (a.left > b.left - b.distance + b.width) return false;
        return true;
    }

    //Va chạm
    collision2(a, b) {
        //Nếu chiều cao của nhân vật lớn hơn chiều cao của vật cản
        if (a.left + a.width < b.left - b.distance) return false;
        if (a.left > b.left - b.distance + b.width) return false;
        if (a.cao < 7) return false;
        return true;
    }

    //random thời gian có vật cản xuất hiện
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

class BatDau {
    constructor() {
        this.left = 85;
        this.height = 7;
        this.width = 28;
        this.distance = 0;
        this.start = null;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `20vmin`;
        this.el.style.zIndex = 9991;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = `<button class="start batdau">Bắt đầu</button>`;
    }

    //Di chuyển
    move() {
        if (this.distance >= 200) return;
        this.distance++;
        setTimeout(this.move.bind(this), 1);
    }

    //Giảm y
    render() {
        this.el.style.transform = `translateY(-${getSize(this.distance)})`;
    }
}

class De {
    constructor(leve) {
        this.left = 85;
        this.height = 7;
        this.width = 28;
        this.distance = 0;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `5vmin`;
        this.el.style.zIndex = 9991;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        if (leve == 1) { this.el.innerHTML = `<button class="start de">Dễ</button>`; }
        else { this.el.innerHTML = `<button class="start de1">Dễ</button>`; }

    }

    //Di chuyển
    move() {
        if (this.distance >= 200) return;
        this.distance++;
        setTimeout(this.move.bind(this), 1);
    }

    //Giảm x
    render() {
        this.el.style.transform = `translateY(-${getSize(this.distance)})`;
    }
}

class Kho {
    constructor(leve) {
        this.left = 85;
        this.height = 7;
        this.width = 28;
        this.distance = 0;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `10vmin`;
        this.el.style.zIndex = 9991;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        if (leve == 1) { this.el.innerHTML = `<button class="start kho1">Khó</button>`; }
        else { this.el.innerHTML = `<button class="start kho">Khó</button>`; }
    }

    //Di chuyển
    move() {
        if (this.distance >= 200) return;
        this.distance++;
        setTimeout(this.move.bind(this), 1);
    }

    //Giảm x
    render() {
        this.el.style.transform = `translateY(-${getSize(this.distance)})`;
    }
}

var leve = 1;
const g = new Game("#app", "myAudio", leve);

g.init();
