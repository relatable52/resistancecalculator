var u = 100;
var k = [],
  kpre = [];
var con = [];
var cur, consize = 0;
var st, n, nsm, n1, n2, re, consm, rem, def, ex1, ex2, mode, pos = 0,
  nu = 0,
  sw = 0;

function setup() {
  createElement('h1', 'Máy tính điện trở');
  createCanvas(500, 320);
  textSize(20);
  background(220);
  createP('Chế độ:');
  def = createButton('Cơ bản');
  ex1 = createButton('Ví dụ 1');
  createP('Nhập số nút của mạch:')
  n = createInput('Số nút');
  nsm = createButton('Nhập');
  createP('Thêm một liên kết:');
  n1 = createInput('Nút một');
  n2 = createInput('Nút hai');
  re = createInput('Điện trở');
  consm = createButton('Thêm liên kết');
  createP();
  rem = createButton('Gỡ bỏ một liên kết');
  st = createButton("Chạy");
  //createP("(!!The nodes are labeled 0,1,2,3,... The 0 node is the positive terminal and the 1 node is the negative terminal. The first node's order has to be smaller than the second node's order. Use left and right arrow keys to scroll through the connections.!!)");
  createP("Hướng dẫn sử dụng: Một mạch điện thì gồm các nút, các nút lại được nối với nhau bằng các điện trở. Để tính các điện trở đầu tiên bạn nhập số nút, sau đó số nút sẽ hiện lên màn hình. Sau đó bạn thêm các liên kết (Nút nào nối với nút nào bằng điện trở bao nhiêu, Lưu ý: nút 1 là cực dương, nút 0 là cực âm, các nút được đánh số 0,1,2,3... Khi nhập nút ta chỉ nhập số thứ tự nút.), sau đó liên kết sẽ hiện lên màn hình. Bấm nút mũi tên trái hoặc phải để scroll qua các liên kết. Để tính điện trở bấm Chạy, khi giá trị điện trở đã đạt độ chính xác mong muốn thì nhấn Chạy lần nữa để dừng lại.")
  consm.mousePressed(addcon);
  nsm.mousePressed(de);
  rem.mousePressed(remov);
  ex1.mousePressed(example2);
  def.mousePressed(defawlt);
  st.mousePressed(swit);
}

function de() {
  if (mode == 2) {
    nu = n.value();
    for (let i = 0; i < nu; i++) {
      if (i == 0) {
        k[i] = u;
        kpre[i] = u;
      } else {
        k[i] = 0;
        kpre[i] = 0;
      }
    }
  }
}

function addcon() {
  if (mode == 2) {
    con.push({
      a: n1.value(),
      b: n2.value(),
      r: re.value()
    });
    consize++;
  }
}

function swit() {
  sw = !sw;
}

function remov() {
  if (mode == 2) {
    if (consize > 0) {
      con.pop();
      consize--;
    }
  }
}

function keyPressed() {
  if (pos < consize && keyCode == RIGHT_ARROW) {
    pos++;
  }
  if (pos > 0 && keyCode == LEFT_ARROW) {
    pos--;
  }
}

function example1() {
  mode = 0;
  nu = 66;
  con = [];
  consize = 0;
  for (let i = 0; i < nu; i++) {
    if (i == 0) {
      k[i] = u;
      kpre[i] = u;
    } else {
      k[i] = 0;
      kpre[i] = 0;
    }
    if (i >= 2) {
      if (i % 8 != 1) {
        con.push({
          a: i,
          b: i + 1,
          r: 1
        });
        consize++;
      }
      if (i < 58) {
        con.push({
          a: i,
          b: i + 8,
          r: 1
        });
        consize++;
      }
    }
  }
  con.push({
    a: 0,
    b: 29,
    r: 1
  });
  con.push({
    a: 1,
    b: 38,
    r: 1
  });
  consize += 2;
}

function example2() {
  mode = 1;
  nu = 22;
  con = [];
  consize = 0;
  for (let i = 0; i < nu; i++) {
    if (i == 0) {
      k[i] = u;
      kpre[i] = u;
    } else {
      k[i] = 0;
      kpre[i] = 0;
    }
    if (i < nu - 2) {
      con.push({
        a: i,
        b: i + 2,
        r: 1
      });
      consize++;
      if (i % 2 == 0) {
        if (i < nu - 5) {
          con.push({
            a: i,
            b: i + 5,
            r: 1
          });
          consize++;
        }
      } else {
        if (i < nu - 3) {
          con.push({
            a: i,
            b: i + 3,
            r: 1
          });
          consize++;
        }
      }
    }
  }
}

function defawlt() {
  mode = 2;
  nu = 0;
  con = [];
  consize = 0;
}

function draw() {
  background(220);
  strokeWeight(1);
  line(0, 260, 500, 260);
  text('Số nút: ' + nu, 20, 40);
  text('Các liên kết:', 20, 60);
  for (let i = 0; i < 9; i++) {
    if (pos + i < consize) {
      text(pos + i + 1 + ', ' + con[pos + i].a + ' - ' + con[pos + i].r + ' Ohm - ' + con[pos + i].b, 20, 80 + 20 * i);
    }
  }
  text('Điện trở: ' + u / cur + ' Ohm', 20, 280)
  if (mode == 0) {
    text('Rho(7):' + 2 / (u / cur - 2), 20, 300);
  }
  if (sw == 1) {
    cur = 0;
    for (let i = 0; i < consize; i++) {
      if (con[i].a > 1) {
        k[con[i].a] -= (kpre[con[i].a] - kpre[con[i].b]) / 5 / con[i].r;
      }
      if (con[i].b > 1) {
        k[con[i].b] -= (kpre[con[i].b] - kpre[con[i].a]) / 5 / con[i].r;
      }
      if (con[i].a == 0) {
        cur += (u - kpre[con[i].b]) / con[i].r;
      }
    }
    for (let i = 0; i < nu; i++) {
      kpre[i] = k[i];
    }
  }
}