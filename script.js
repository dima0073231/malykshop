let isLoggedIn = false;
let uploadedImage = '';
let cart = [];

let cars = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: '$25,000',
    image: 'https://via.placeholder.com/300x200',
    description: 'Надежный седан с хорошей экономией топлива.'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    price: '$45,000',
    image: 'https://via.placeholder.com/300x200',
    description: 'Премиальный кроссовер с мощным двигателем.'
  }
];

function goHome() {
  document.getElementById('main-content').innerHTML = cars.map(car => `
    <div class="car-card">
      <img src="${car.image}" alt="${car.model}" class="car-img" />
      <h2>${car.brand} ${car.model}</h2>
      <p>${car.year} — ${car.price}</p>
      <button onclick="viewCar('${car.id}')">Подробнее</button>
    </div>
  `).join('');
}

function viewCar(id) {
  const car = cars.find(c => c.id === id);
  if (!car) {
    document.getElementById('main-content').innerHTML = 'Машина не найдена';
    return;
  }
  document.getElementById('main-content').innerHTML = `
    <div class="car-card">
      <img src="${car.image}" alt="${car.model}" class="car-img" />
      <h1>${car.brand} ${car.model}</h1>
      <p>Год: ${car.year}</p>
      <p>Цена: ${car.price}</p>
      <p>${car.description}</p>
      <button onclick="addToCart('${car.id}')">Добавить в корзину</button>
    </div>
  `;
}

function goLogin() {
  document.getElementById('main-content').innerHTML = `
    <h2>Вход в админку</h2>
    <input type="password" id="admin-pass" placeholder="Введите пароль" />
    <button onclick="handleLogin()">Войти</button>
  `;
}

function handleLogin() {
  const pass = document.getElementById('admin-pass').value;
  if (pass === 'admin') {
    isLoggedIn = true;
    document.getElementById('login-link').style.display = 'none';
    goAdmin();
  } else {
    alert('Неверный пароль');
  }
}

function goAdmin() {
  if (!isLoggedIn) {
    document.getElementById('main-content').innerHTML = 'Доступ запрещён';
    return;
  }

  let form = '';
  ['id','brand','model','year','price','description'].forEach(field => {
    form += `<input placeholder="${field}" id="new-${field}" /><br/>`;
  });

  form += `
    <input type="file" id="new-image" accept="image/*" onchange="previewImage(event)" /><br/>
    <img id="image-preview" style="max-width:200px; margin-bottom:10px;" />
  `;

  document.getElementById('main-content').innerHTML = `
    <h2>Админ-панель</h2>
    ${form}
    <button onclick="addCar()">Добавить авто</button>
    <h3>Ассортимент</h3>
    <ul>
      ${cars.map(car => `
        <li>
          <strong>${car.brand} ${car.model}</strong>
          <button onclick="deleteCar('${car.id}')">Удалить</button><br/>
          <textarea onchange="updateDescription('${car.id}', this.value)">${car.description}</textarea>
        </li>
      `).join('')}
    </ul>
  `;
}

function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImage = e.target.result;
    document.getElementById('image-preview').src = uploadedImage;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

function addCar() {
  const newCar = {
    id: document.getElementById('new-id').value,
    brand: document.getElementById('new-brand').value,
    model: document.getElementById('new-model').value,
    year: document.getElementById('new-year').value,
    price: document.getElementById('new-price').value,
    image: uploadedImage || 'https://via.placeholder.com/300x200',
    description: document.getElementById('new-description').value
  };
  cars.push(newCar);
  uploadedImage = '';
  goAdmin();
}

function deleteCar(id) {
  cars = cars.filter(car => car.id !== id);
  goAdmin();
}

function updateDescription(id, value) {
  cars = cars.map(car => car.id === id ? { ...car, description: value } : car);
}


  let car = [];

  function addToCart(id) {
    const car = cars.find(c => c.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...car, qty: 1 });
    }
    alert('Товар добавлен в корзину');
  }

  function goCart() {
    if (cart.length === 0) {
      document.getElementById('main-content').innerHTML = '<p>Корзина пуста</p>';
      return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    let items = cart.map(item => `
      <tr>
        <td><img src="${item.image}" width="100"/></td>
        <td>${item.brand} ${item.model}</td>
        <td>${item.qty}</td>
        <td>${item.price * item.qty} грн</td>
      </tr>
    `).join('');

    document.getElementById('main-content').innerHTML = `
      <h2>Корзина</h2>
      <table border="1">
        <tr><th>Фото</th><th>Название</th><th>Кол-во</th><th>Цена</th></tr>
        ${items}
      </table>
      <h3>Итого: ${total} грн</h3>
      <button onclick="goCheckout()">Оформить заказ</button>
    `;
  }

  function goCheckout() {
    document.getElementById('main-content').innerHTML = `
      <h2>Оформление заказа</h2>
      <label>Имя*: <input id="name" /></label><br/>
      <label>Телефон*: <input id="phone" /></label><br/>
      <label>Доставка:
        <select id="delivery">
          <option>Новая Почта</option>
          <option>Курьер</option>
          <option>Укрпочта</option>
        </select>
      </label><br/>
      <label>Оплата:
        <select id="payment">
          <option>При получении</option>
          <option>Карта (LiqPay)</option>
          <option>IBAN</option>
        </select>
      </label><br/>
      <label>Комментарий: <textarea id="comment"></textarea></label><br/>
      <button onclick="submitOrder()">Подтвердить заказ</button>
    `;
  }

  function submitOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const delivery = document.getElementById('delivery').value;
    const payment = document.getElementById('payment').value;
    const comment = document.getElementById('comment').value;

    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон');
      return;
    }

    alert(`Спасибо, ${name}! Ваш заказ оформлен. Мы свяжемся с вами по номеру ${phone}.`);
    cart = [];
    goHome();
  }

  function goHome() {
    document.getElementById('main-content').innerHTML = cars.map(car => `
      <div class="car-card">
        <img src="${car.image}" alt="${car.model}" class="car-img" />
        <h2>${car.brand} ${car.model}</h2>
        <p>${car.year} — ${car.price} грн</p>
        <button onclick="viewCar('${car.id}')">Подробнее</button>
        <button onclick="addToCart('${car.id}')">Купить</button>
      </div>
    `).join('');
  }




window.onload = goHome;
