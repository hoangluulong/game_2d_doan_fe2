

const settings = {
    DOT: 0.5,
    CHIEU_CAO_NHAY: 30,
    TOC_DO_CHAY: 68,
    TOC_DO_NHAY: 10,
    TOC_DO_VAT_CAN: 13,
    TOC_DO_CAY: 68,
}

//Cấp độ dễ lv 1
const settings1 = {
    DOT: 0.5,
    CHIEU_CAO_NHAY: 30,
    TOC_DO_CHAY: 68,
    TOC_DO_NHAY: 10,
    TOC_DO_VAT_CAN: 13,
    TOC_DO_CAY: 68,
}
//lv 2
const settings2 = {
    DOT: 0.5,
    CHIEU_CAO_NHAY: 30,
    TOC_DO_CHAY: 60,
    TOC_DO_NHAY: 7,
    TOC_DO_VAT_CAN: 9,
    TOC_DO_CAY: 65,
}

//lv3
const settings3 = {
    DOT: 0.5,
    CHIEU_CAO_NHAY: 30,
    TOC_DO_CHAY: 65,
    TOC_DO_NHAY: 3,
    TOC_DO_VAT_CAN: 5,
    TOC_DO_CAY: 70,
}


const theme = {
    PRIMARY: '	#FF0000',
    BACKGROUND: '#9999FF',
    DUONGCHAY: 'hsl(61, 64%, 27%)',
    BUTTON_UN_COLOR: '#b9b9b0',
    BUTTON_COLOR: '#04AA6D',

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
    VAT_CAN1: "./image/vatcan1.png",
    BACKGROUND: "./image/bg2.jpg",
    TIEN_VANG: "./image/tien_vang.png",
}

const imageBG = ['./image/bg.jpg', './image/bg2.jpg', './image/bg3.jpg'];

const IMG_NV_1 = {
    IMG_NV_0: "./image/nv_0.png",
    IMG_NV_1: "./image/nv_1.png",
    IMG_NV_2: "./image/nv_2.png",
    IMG_NV_3: "./image/nv_3.png",
    IMG_NV_4: "./image/nv_4.png",
    IMG_NV_5: "./image/nv_5.png",
    IMG_NV_NHAY: "./image/nv_nhay.png",
}

const IMG_NV_2 = {
    IMG_NV_0: "./image/nv_0_2.png",
    IMG_NV_1: "./image/nv_1_2.png",
    IMG_NV_2: "./image/nv_2_2.png",
    IMG_NV_3: "./image/nv_3_2.png",
    IMG_NV_4: "./image/nv_4_2.png",
    IMG_NV_5: "./image/nv_5_2.png",
    IMG_NV_NHAY: "./image/nv_nhay_2.png",
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

const uTmgTrangTRi = [
    "./image/trangtri1.png",
    "./image/trangtri2.png",
    "./image/trangtri3.png",
    "./image/trangtri4.png",
    "./image/trangtri5.png",
    "./image/trangtri6.png",
];

const getSize = size => {
    return `${size * settings.DOT}vmin`;
}

const KEY_NHAN_VAT = "key_nv";
class NhanVat {
    constructor(audio) {
        this.skin = localStorage.getItem(KEY_NHAN_VAT) || 2;//Điểm cao nhất
        this.height = 15;
        this.width = 15;
        this.left = 40;
        this.top = 30;
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
        this.el.style.top = this.top + `vmin`;
        this.el.style.zIndex = 9990;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        if (this.skin == 1) {
            this.el.innerHTML = this.srcImage(uImg.IMG_NV_0);
        } else {
            uImg.IMG_NV_0 = "./image/nv_0_2.png";
            uImg.IMG_NV_1 = "./image/nv_1_2.png";
            uImg.IMG_NV_2 = "./image/nv_2_2.png";
            uImg.IMG_NV_3 = "./image/nv_3_2.png";
            uImg.IMG_NV_4 = "./image/nv_4_2.png";
            uImg.IMG_NV_5 = "./image/nv_5_2.png";
            uImg.IMG_NV_NHAY = "./image/nv_nhay_2.png";
            this.el.innerHTML = this.srcImage(uImg.IMG_NV_0);
        }
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
        //yes
        this.sJump = true;
        this.altitude++;
        this.top--;
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
                //yes
            }
            return;
        }
        this.altitude--;
        this.cao--;
        this.top++;
        this.statusJump = setTimeout(this.goDown.bind(this), settings.TOC_DO_NHAY + 1);
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
        this.height = 10;
        this.width = 10;
        this.left = 200;
        this.distance = 0; //Khoảng cách
        this.altitude = 0;
        this.timeGoUpVatCan = null;
        this.statusJumpVatCan = null;
        this.top = 32;
        this.loai = 1;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = this.top + 'vmin';
        this.el.style.zIndex = 9999;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = this.srcImage(uImg.VAT_CAN1);
    }

    //Di chuyển
    move() {
        this.distance++;
        setTimeout(this.move.bind(this), settings.TOC_DO_VAT_CAN);
    }

    //Giảm x
    render() {
        if (this.loai == 2) {

        }
        // this.el.style.transform = `translate(-${getSize(this.distance)}, -${getSize(this.altitude)})`;
        this.el.style.transform = `translateX(-${getSize(this.distance)}`;
        this.el.style.top = this.top + 'vmin';
    }

    jump() {
        this.top = this.getRandomInt(31, 40);
        this.el.style.top = this.top + 'vmin';
        this.goUp();
    }

    goUp() {
        if (this.top >= 40) return this.goDown();
        this.top++;
        this.timeGoUpVatCan = setTimeout(this.goUp.bind(this), 100);
    }

    goDown() {
        if (this.top == 27) {
            this.goUp();
            return;
        }
        this.top--;
        this.statusJumpVatCan = setTimeout(this.goDown.bind(this), 100);
    }

    //random 
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
        this.diem = false;

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
        this.el.style.bottom = -2 + 'vmin';
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

const KEY_BG = "KEY_BG";
var sBG = localStorage.getItem(KEY_BG) || 0;
class KhungHinh {
    constructor(el) {
        this.height = 100;
        this.width = 200;
        this.el = document.createElement('div');
        this.el.style.position = 'relative';
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.style.overflow = 'hidden';
        this.el.style.background = 'url(./image/bg.jpg);';
        this.el.innerHTML += `<div class="bg">
        <img src="${imageBG[sBG]}" alt="background">
        </div>`;
        el.appendChild(this.el);
    }

    init() {

    }

    add(child) {
        this.el.appendChild(child.el)
    }
}

//Điếm số
const SCORE_KEY = 'DIEM_CAO_NHAT';
class DiemSo {
    constructor() {
        this.score = 0; //Điểm
        this.highscore = localStorage.getItem(SCORE_KEY) || 0;//Điểm cao nhất

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.zIndex = 9992;
        this.el.style.top = getSize(1);
        this.el.style.right = getSize(2);
        this.el.style.color = theme.PRIMARY;
    }

    //Tăng điểm
    countUp() {
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
        this.el.innerHTML = `Điểm số: ${this.score} | Kỉ lục: ${this.highscore}`;
    }
}

class ThoiGianPlay {
    constructor() {
        this.time = 60; //thời gian

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.zIndex = 9992;
        this.el.style.top = getSize(1);
        this.el.style.left = getSize(2);
        this.el.style.color = theme.PRIMARY;

        this.loop = null;
    }

    getDiem() {
        if (this.time <= 0) return;
        this.time--;
        this.loop = setTimeout(this.getDiem.bind(this), 1000);
    }

    //Chạy bảng điểm
    render() {
        this.el.innerHTML = `Thời gian còn lại: ${this.time} giây`;
    }
}

class HienThiDiemCong {
    constructor() {
        this.height = 10;
        this.width = 20;
        this.left = 88;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `10vmin`;
        this.el.style.zIndex = -1;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = '<p class="diem-cong">+ 30</p>';
    }

    setZIndex() {
        this.el.style.zIndex = 9998;
        setTimeout(() => {
            this.el.style.zIndex = -1;
        }, 500);
    }
}

const KEY_LEVEL = "KEY_LEVEL";
class Game {
    constructor(selector, audio) {
        this.el = document.querySelector(selector);
        this.audio = document.getElementById(audio);
        this.audio1 = document.getElementById("audioVang");
        this.startGame = null;
        this.choilaigame = null;
        this.level = localStorage.getItem(KEY_LEVEL) || 1;
    }

    init() {
        this.statusStop = false;
        this.foes = []; //Mảng vật cản
        this.cays = [];
        this.vangs = [];
        this.trangtris = [];
        this.loop = null; //Vòng 1
        this.loop2 = null;
        this.loopVatCan = null;
        this.loopVang = null;
        this.loopTrangTri = null;
        this.loopCay = null;
        this.levelTime = null;
        this.time = 0;
        this.loopTimePlay = null;

        this.audio1.src = './audio/an_vang.mp4';

        this.khunghinh = new KhungHinh(this.el);
        this.batdau = new BatDau();
        this.Kho = new Kho(this.level);
        this.de = new De(this.level);
        this.duongchay = new DuongChay();
        this.nv = new NhanVat(this.audio);
        this.diem = new DiemSo();
        this.hienthemdiem = new HienThiDiemCong();
        this.choilai = new ChoiLai();
        this.timePlay = new ThoiGianPlay();
        this.trangphuc = new TrangPhuc();
        this.backgr2 = new TrangPhuc();
        this.backgr2.el.style.top = 18 + 'vmin';
        this.backgr2.el.innerHTML = `<div class="skin-bg"><img src="./image/next.png"></div>`;
        this.backgr2.el.style.background = null;

        this.khunghinh.add(this.duongchay);
        this.khunghinh.add(this.nv);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.Kho);
        this.khunghinh.add(this.de);
        this.khunghinh.add(this.diem);
        this.khunghinh.add(this.hienthemdiem);
        this.khunghinh.add(this.choilai);
        this.khunghinh.add(this.trangphuc);
        this.khunghinh.add(this.backgr2);

        this.diem.render();
        this.startGame = document.querySelector('.start');
        this.choilaigame = document.querySelector('.choilai');
        this.lv_de = document.querySelector('.de');
        this.lv_kho = document.querySelector('.kho');
        this.skinNV = document.querySelector('.skin');
        this.skinbg = document.querySelector('.skin-bg');

        if (this.level == 1) {
            this.lv_de.style.background = theme.BUTTON_COLOR;
            this.lv_kho.style.background = theme.BUTTON_UN_COLOR;
        } else {
            this.lv_kho.style.background = theme.BUTTON_COLOR;
            this.lv_de.style.background = theme.BUTTON_UN_COLOR;
        }

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
        this.choilaigame.addEventListener('click', () => {
            this.restart();
        });

        this.lv_kho.addEventListener('click', () => {
            this.level = 2;
            localStorage.setItem(KEY_LEVEL, this.level);
            this.lv_kho.style.background = theme.BUTTON_COLOR;
            this.lv_de.style.background = theme.BUTTON_UN_COLOR;
        });

        this.lv_de.addEventListener('click', () => {
            this.level = 1;
            localStorage.setItem(KEY_LEVEL, this.level);
            this.lv_de.style.background = theme.BUTTON_COLOR;
            this.lv_kho.style.background = theme.BUTTON_UN_COLOR;
        });

        this.skinNV.addEventListener('click', () => {
            var sk = localStorage.getItem(KEY_NHAN_VAT) || 1;

            if (sk == 1) {
                this.skinNV.innerHTML = `<img src="./image/nv_1.png">`;
                uImg.IMG_NV_0 = "./image/nv_0_2.png";
                uImg.IMG_NV_1 = "./image/nv_1_2.png";
                uImg.IMG_NV_2 = "./image/nv_2_2.png";
                uImg.IMG_NV_3 = "./image/nv_3_2.png";
                uImg.IMG_NV_4 = "./image/nv_4_2.png";
                uImg.IMG_NV_5 = "./image/nv_5_2.png";
                uImg.IMG_NV_NHAY = "./image/nv_nhay_2.png";
                this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_0);
                localStorage.setItem(KEY_NHAN_VAT, 2);
                // this.skin = document.querySelector('.skin');

            } else {
                this.skinNV.innerHTML = `<img src="./image/nv_1_2.png">`;
                uImg.IMG_NV_0 = "./image/nv_0.png";
                uImg.IMG_NV_1 = "./image/nv_1.png";
                uImg.IMG_NV_2 = "./image/nv_2.png";
                uImg.IMG_NV_3 = "./image/nv_3.png";
                uImg.IMG_NV_4 = "./image/nv_4.png";
                uImg.IMG_NV_5 = "./image/nv_5.png";
                uImg.IMG_NV_NHAY = "./image/nv_nhay.png";
                this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_0);
                localStorage.setItem(KEY_NHAN_VAT, 1);
                // this.skin = document.querySelector('.skin');
            }
        });

        this.skinbg.addEventListener('click', () => {
            
            if (sBG == 2){
                sBG = 0;
            }else{
                sBG++;
            }
            
            localStorage.setItem(KEY_BG, sBG);
            var bg = document.querySelector('.bg');
            bg.innerHTML = `<img src="${imageBG[sBG]}" alt="background">`;
        });
    }

    // Sự kiện khi ấn space
    handleInput(event) {
        if (event.key === ' ' && this.statusStop == false && this.nv.sJump == false && this.nv.statusRun == true) {//
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
        if ((this.timePlay.time <= 58 && this.timePlay.time >= 55) || (this.timePlay.time <= 41 && this.timePlay.time >= 40) ||
            (this.timePlay.time <= 31 && this.timePlay.time >= 30) || (this.timePlay.time <= 21 && this.timePlay.time >= 20)) {
            foe.jump();

            foe.loai = 2;
        }
        this.foes.push(foe);
        foe.move();
        if (this.level == 1) {
            var time = this.getRandomInt(1200, 2500);
        } else {
            var time = this.getRandomInt(700, 1000);
        }

        this.loopVatCan = setTimeout(this.generateVatCan.bind(this), time);
    }

    generateCay() {
        if (this.loop === null) return;
        const cay = new Cay();
        this.khunghinh.add(cay);
        this.cays.push(cay);
        cay.move();
        var time = this.getRandomInt(10000, 15000);
        this.loopCay = setTimeout(this.generateCay.bind(this), time);
    }

    generateVang() {
        if (this.loop === null) return;
        const vang = new TienVang();
        this.khunghinh.add(vang);
        this.vangs.push(vang);
        vang.move();
        var time = this.getRandomInt(1000, 2000);
        this.loopVang = setTimeout(this.generateVang.bind(this), time);
    }

    generateTrangTri() {
        if (this.loop === null) return;
        const trangtri = new vatTrangTri();
        this.khunghinh.add(trangtri);
        this.trangtris.push(trangtri);

        trangtri.move();
        var time = this.getRandomInt(2000, 5000);
        this.loopTrangTri = setTimeout(this.generateTrangTri.bind(this), time);
    }

    // thành tích
    tick() {
        this.timePlay.render();
        this.nv.render();
        this.diem.render();
        this.foes.forEach(foe => {
            foe.render();
            if (foe.loai == 1) {
                if (this.collision(this.nv, foe)) {
                    this.stop();
                }
            } else {
                if (this.collision3(this.nv, foe)) {
                    this.stop();
                }
            }
        });

        this.cays.forEach(cay => {
            cay.render();
        });

        this.trangtris.forEach(trangtri => {
            trangtri.render();
        });

        this.vangs.forEach(vang => {
            vang.render();
            if (vang.loai == 1) {
                if (this.collision(this.nv, vang)) {
                    vang.el.innerHTML = '';
                    this.audio1.currentTime = 0;
                    this.audio1.play();
                    this.hienthemdiem.setZIndex();
                    if (vang.diem == false) {
                        this.diem.score += 30;
                        vang.diem = true;
                    }
                }
            } else {
                if (this.collision2(this.nv, vang)) {
                    vang.el.innerHTML = '';
                    this.audio1.currentTime = 0;
                    this.audio1.play();
                    this.hienthemdiem.setZIndex();
                    if (vang.diem == false) {
                        this.diem.score += 30;
                        vang.diem = true;
                    }
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
        if (this.loop === null) return;
        this.diem.countUp();
        setTimeout(this.addScore.bind(this), 1);
    }

    setLevel() {
        if (this.level == 1) {
            settings.CHIEU_CAO_NHAY = settings1.CHIEU_CAO_NHAY;
            settings.TOC_DO_CHAY = settings1.TOC_DO_CHAY;
            settings.TOC_DO_VAT_CAN = settings1.TOC_DO_VAT_CAN;
            settings.TOC_DO_CAY = settings1.TOC_DO_CAY;
            settings.TOC_DO_NHAY = settings1.TOC_DO_NHAY;
        } else {
            settings.CHIEU_CAO_NHAY = settings2.CHIEU_CAO_NHAY;
            settings.TOC_DO_CHAY = settings2.TOC_DO_CHAY;
            settings.TOC_DO_VAT_CAN = settings2.TOC_DO_VAT_CAN;
            settings.TOC_DO_CAY = settings2.TOC_DO_CAY;
            settings.TOC_DO_NHAY = settings2.TOC_DO_NHAY;
        }
    }

    //Bắt đầu trò chơi
    start() {
        // this.levelTime = setInterval(this.tangLevel.bind(this), 10000);
        this.setLevel();
        this.nv.run();
        this.trangphuc.el.style.zIndex = -1;
        this.backgr2.el.style.zIndex = -1;
        this.nv.statusRun == true;
        this.loop = setInterval(this.tick.bind(this), 5);
        this.loop2 = setInterval(this.tick2.bind(this), 5);
        this.khunghinh.add(this.timePlay);
        // this.loopTimePlay = setInterval(this.timePlay.getDiem(), 1000);
        this.timePlay.getDiem();
        this.batdau.move();
        this.Kho.move();
        this.de.move();
        this.generateVatCan();
        this.generateVang();
        this.generateCay();
        this.generateTrangTri();
        this.addScore();
    }

    //Kết thúc
    stop() {
        clearInterval(this.levelTime);
        this.statusStop = true;
        this.nv.sJump == false;
        this.diem.save();
        this.audio.currentTime = 0;
        this.audio.src = './audio/game_over.mp3';
        this.audio.loop = false;
        this.audio.play();
        clearTimeout(this.timePlay.loop);
        clearInterval(this.loop);
        clearInterval(this.loop2);
        clearInterval(this.nv.timeRun);
        clearTimeout(this.nv.timeGoUp);
        clearTimeout(this.nv.statusJump);
        this.nv.statusRun == true;
        this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_4);
        setTimeout(() => { this.nv.el.innerHTML = this.nv.srcImage(uImg.IMG_NV_5); }, 1000);
        this.loop = null;
        this.loop2 = null;
        this.levelTime = null;
        this.timePlay.loop = null;
        this.timePlay.time = 60;
        this.choilai.el.style.zIndex = 9995;
    }

    restart() {
        // this.audio.src = './audio/chay_bo.mp3';

        //Xóa hết thẻ trên màn hình
        while (this.khunghinh.el.firstChild) {
            this.khunghinh.el.removeChild(this.khunghinh.el.firstChild);
        }
        this.statusStop = false;

        this.khunghinh.el.innerHTML += `<div class="bg">
                                            <img src="${imageBG[sBG]}" alt="background">
                                        </div>`;
        this.audio.src = './audio/chay_bo.mp3';

        this.reset();
        
        // this.skinbg.el.style.zIndex = 9993;

        this.batdau = new BatDau();
        this.Kho = new Kho(this.leve);
        this.de = new De(this.leve);
        this.cay = new Cay();
        this.duongchay = new DuongChay();
        this.nv = new NhanVat(this.audio);
        this.diem = new DiemSo();
        this.hienthemdiem = new HienThiDiemCong();
        this.choilai = new ChoiLai();
        this.trangphuc = new TrangPhuc();
        this.backgr2 = new TrangPhuc();
        this.backgr2.el.style.top = 18 + 'vmin';
        this.backgr2.el.innerHTML = `<div class="skin-bg"><img src="./image/next.png"></div>`;
        this.backgr2.el.style.background = null;

        this.khunghinh.add(this.cay);
        this.khunghinh.add(this.duongchay);
        this.khunghinh.add(this.nv);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.batdau);
        this.khunghinh.add(this.Kho);
        this.khunghinh.add(this.de);
        this.khunghinh.add(this.diem);
        this.khunghinh.add(this.hienthemdiem);
        this.khunghinh.add(this.choilai);
        this.khunghinh.add(this.trangphuc);
        this.khunghinh.add(this.backgr2);

        this.backgr2.el.style.zIndex = 9993;

        this.diem.render();
        this.startGame = document.querySelector('.start');
        this.choilaigame = document.querySelector('.choilai');
        this.lv_de = document.querySelector('.de');
        this.lv_kho = document.querySelector('.kho');
        this.skinNV = document.querySelector('.skin');
        this.skinbg = document.querySelector('.skin-bg');

        if (this.level == 1) {
            this.lv_de.style.background = theme.BUTTON_COLOR;
            this.lv_kho.style.background = theme.BUTTON_UN_COLOR;
        } else {
            this.lv_kho.style.background = theme.BUTTON_COLOR;
            this.lv_de.style.background = theme.BUTTON_UN_COLOR;
        }

        this.initListeners();
    }

    reset() {
        clearTimeout(this.loopVatCan);
        clearTimeout(this.loopVang);
        clearTimeout(this.loopCay);
        clearTimeout(this.loopTrangTri);
        this.loopVatCan = null;
        this.loopVang = null;
        this.loopCay = null;
        this.loopTrangTri = null;
        this.foes = []; //Mảng vật cản
        this.cays = [];
        this.vangs = [];
        this.trangtris = [];

        settings.CHIEU_CAO_NHAY = 30;
        settings.TOC_DO_CHAY = 70;
        settings.TOC_DO_NHAY = 13;
        settings.TOC_DO_VAT_CAN = 15;


        this.loop = null; //Vòng 1
        this.loop2 = null;

        this.batdau = null;
        this.Kho = null;
        this.de = null;
        this.cay = null;
        this.duongchay = null;
        this.nv = null;
        this.diem = null;
        this.hienthemdiem = null;
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

    //Va chạm 
    collision3(a, b) {
        if (a.top + (a.height * 0.5) < b.top) return false;
        if (a.left + a.width < b.left - b.distance) return false;
        if (a.left > b.left - b.distance + b.width) return false;
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
        this.el.innerHTML = `<button class="start de">Dễ</button>`;
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
        this.el.innerHTML = `<button class="start kho">Khó</button>`;
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

class ChoiLai {
    constructor() {
        this.left = 85;
        this.height = 7;
        this.width = 28;
        this.distance = 0;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `25vmin`;
        this.el.style.zIndex = -1;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = `<button class="start choilai">Chơi lại</button>`;
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

class TrangPhuc {
    constructor() {
        this.left = 0;
        this.height = 10;
        this.width = 8;
        this.skin = localStorage.getItem(KEY_NHAN_VAT) || 1;
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = `10vmin`;
        this.el.style.zIndex = 9995;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.style.borderBottomRightRadius = '15px';
        this.el.style.borderTopRightRadius = '15px';
        this.el.style.background = `#b9b9b0`;
        if (this.skin == 1) {
            this.el.innerHTML = `<div class="skin"><img src="./image/nv_1_2.png"></div>`;
        } else {
            this.el.innerHTML = `<div class="skin"><img src="./image/nv_1.png"></div>`;
        }
    }
}

class vatTrangTri {
    constructor() {
        this.height = 20;
        this.width = 20;
        this.left = 200;
        this.distance = 0; //Khoảng cách

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.bottom = getSize(5);
        this.el.style.zIndex = 9988;
        this.el.style.left = getSize(this.left);
        this.el.style.height = getSize(this.height);
        this.el.style.width = getSize(this.width);
        this.el.innerHTML = this.srcImage(uTmgTrangTRi[Math.floor(Math.random() * uTmgTrangTRi.length)]);
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
        return `<img src="${e}" alt="trang trí ">`;
    }
}

const g = new Game("#app", "myAudio");

var games = g.init();
