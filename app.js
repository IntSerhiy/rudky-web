// Змінна для зберігання поточних даних погоди
let currentWeatherData = null;

// Словники для перекладу погодних умов
const weatherTranslations = {
    'uk': {
        'clear': 'ясно',
        'clouds': 'хмарно',
        'rain': 'дощ',
        'drizzle': 'мряка',
        'thunderstorm': 'гроза',
        'snow': 'сніг',
        'mist': 'туман',
        'smoke': 'дим',
        'haze': 'серпанок',
        'dust': 'пил',
        'fog': 'туман',
        'sand': 'піщана буря',
        'ash': 'вугільна зола',
        'squall': 'шквал',
        'tornado': 'торнадо',
        'loading': 'Завантаження...',
        'error': 'Помилка завантаження'
    },
    'en': {
        'clear': 'clear',
        'clouds': 'cloudy',
        'rain': 'rain',
        'drizzle': 'drizzle',
        'thunderstorm': 'thunderstorm',
        'snow': 'snow',
        'mist': 'mist',
        'smoke': 'smoke',
        'haze': 'haze',
        'dust': 'dust',
        'fog': 'fog',
        'sand': 'sand',
        'ash': 'ash',
        'squall': 'squall',
        'tornado': 'tornado',
        'loading': 'Loading...',
        'error': 'Loading error'
    }
};

// Відображення іконок погоди
const iconMap = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog',
    'loading': 'fas fa-spinner fa-spin',
    'error': 'fas fa-exclamation-triangle'
};

// Функція для оновлення інтерфейсу погоди
function updateWeatherUI(lang) {
    const weatherText = document.getElementById('weather-text');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTitle = document.getElementById('weather-title');

    // Отримуємо поточну мову
    const currentLang = lang || document.documentElement.lang || 'uk';

    // Оновлюємо заголовок
    weatherTitle.textContent = currentLang === 'uk'
        ? 'Погода в Рудках'
        : 'Weather in Rudky';

    if (!currentWeatherData) {
        weatherText.textContent = weatherTranslations[currentLang]['loading'];
        weatherIcon.innerHTML = `<i class="${iconMap['loading']}"></i>`;
        return;
    }

    if (currentWeatherData.error) {
        weatherText.textContent = weatherTranslations[currentLang]['error'];
        weatherIcon.innerHTML = `<i class="${iconMap['error']}"></i>`;
        return;
    }

    const condition = currentWeatherData.weather[0].main.toLowerCase();
    const conditionTranslated = weatherTranslations[currentLang][condition] || condition;

    const temp = Math.round(currentWeatherData.main.temp);
    const humidity = currentWeatherData.main.humidity;
    const windSpeed = Math.round(currentWeatherData.wind.speed);

    // Оновлюємо інформацію про погоду
    if (currentLang === 'uk') {
        weatherText.innerHTML = `
              ${conditionTranslated.charAt(0).toUpperCase() + conditionTranslated.slice(1)}, ${temp}°C<br>
              Вологість: ${humidity}%, Вітер: ${windSpeed} м/с
          `;
    } else {
        weatherText.innerHTML = `
              ${conditionTranslated.charAt(0).toUpperCase() + conditionTranslated.slice(1)}, ${temp}°C<br>
              Humidity: ${humidity}%, Wind: ${windSpeed} m/s
          `;
    }

    // Оновлюємо іконку погоди
    const iconCode = currentWeatherData.weather[0].icon;
    const iconClass = iconMap[iconCode] || 'fas fa-cloud';
    weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

// Функція для отримання погоди
async function fetchWeather() {
    const apiKey = '2dffdc1273d4fbe614d103017bdeaa37';
    const city = 'Rudky,UA';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            currentWeatherData = data;
        } else {
            currentWeatherData = { error: true };
            console.error('Помилка отримання погоди:', data.message);
        }
    } catch (error) {
        console.error('Помилка отримання погоди:', error);
        currentWeatherData = { error: true };
    }

    // Оновлюємо інтерфейс після отримання даних
    updateWeatherUI();
}

// Бізнес-дані
const businesses = [
    {
        id: 1,
        name: "Кафе 'Каліфорнійська суші-піца'",
        name_en: "Cafe 'California-sushi-pizza'",
        category: "cafe",
        description: "California Sushi & Pizza — це поєднання японської та італійської кухні з якісними інгредієнтами та швидкою доставкою. Завітай до нас або замов онлайн — задоволення гарантовано!",
        description_en: "California Sushi & Pizza offers a perfect mix of Japanese and Italian cuisine, made with quality ingredients and fast delivery. Visit us or order online — satisfaction guaranteed!",
        rating: 4.8,
        address: "пл. Відродження, 25",
        phone: "+380 67 123 4567",
        image: "https://static.shaketopay.com.ua/backgroundimage/62116FBC8473615C04E5E4E2673A99A0.jpeg"
    },
    {
        id: 2,
        name: "Магазин 'Рукавичка'",
        name_en: "Shop 'Rukavychka'",
        category: "shop",
        description: "Зручний продуктовий магазин з широким вибором товарів щоденного вжитку. Свіжі продукти, доступні ціни та привітне обслуговування — усе, що потрібно для вашого комфорту.",
        description_en: "A convenient grocery store with a wide selection of everyday products. Fresh food, affordable prices, and friendly service — everything you need for comfort and ease.",
        rating: 4.9,
        address: "вул. Валова, 3",
        phone: "+380 50 765 4321",
        image: "https://promokarta.com/images/post/21/full-5ee78b5b00fff.jpg"
    },
    {
        id: 3,
        name: "Салон краси 'Монро'",
        name_en: "Beauty Salon 'Monro'",
        category: "service",
        description: "Повний спектр послуг для краси та догляду за собою: стрижки, фарбування, манікюр, педикюр, косметологія.",
        description_en: "Full range of beauty and care services: haircuts, coloring, manicure, pedicure, cosmetology.",
        rating: 4.7,
        address: "вул. Степана Бандери, 1",
        phone: "+380 63 987 6543",
        image: "https://lh3.googleusercontent.com/p/AF1QipNCvaKJUY4HD7olPrtbVRLxx44GCrwESe7iChWK=w600-k"
    },
    {
        id: 5,
        name: "Пекарня 'Кулиничі'",
        name_en: "Bakery 'Kulynychi'",
        category: "cafe",
        description: "Свіжа випічка щодня: хліб, булочки, тістечка, тортіки. Використовуємо лише натуральні інгредієнти.",
        description_en: "Fresh baked goods daily: bread, buns, pastries, cakes. We use only natural ingredients.",
        rating: 4.9,
        address: "пл. Відродження, 1",
        phone: "+380 68 111 2233",
        image: "https://scontent.flwo3-1.fna.fbcdn.net/v/t39.30808-6/468353240_18275754070222219_8141656661005142043_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4AVQ3eDuY8MQ7kNvwEXXbOL&_nc_oc=AdkhpGHExlSzlEBtng1NL7kRPQnJIaZSfXtJ1ZUJ6-7lr8P8yFsms8rhD5NqdI9-HDc&_nc_zt=23&_nc_ht=scontent.flwo3-1.fna&_nc_gid=PcCr-oaNtxpzO-zaSJluKQ&oh=00_AfPgxN8wNLHXoIuj6qUHvJXfs61o8Lxi5ZVSsNlgYcqY8Q&oe=685473DA"
    },
];

// Змінні стану для фільтрації
let currentCategory = 'all';
let currentSearchTerm = '';

// Функція для відображення бізнесів з урахуванням фільтрів
function renderBusinesses() {
    const container = document.getElementById('business-container');
    if (!container) {
        console.error("Business container not found!");
        return;
    }
    container.innerHTML = '';

    const currentLang = document.documentElement.lang || 'uk';

    // Фільтрація бізнесів за категорією та пошуковим запитом
    const filteredBusinesses = businesses.filter(business => {
        // Перевірка категорії
        const categoryMatch = currentCategory === 'all' || business.category === currentCategory;

        // Перевірка пошукового запиту
        const name = (currentLang === 'uk' ? business.name : business.name_en).toLowerCase();
        const desc = (currentLang === 'uk' ? business.description : business.description_en).toLowerCase();
        const searchMatch = currentSearchTerm === '' ||
            name.includes(currentSearchTerm) ||
            desc.includes(currentSearchTerm);

        return categoryMatch && searchMatch;
    });

    if (filteredBusinesses.length === 0) {
        container.innerHTML = `
              <div class="col-12 text-center py-5">
                  <h4 class="text-muted">${currentLang === 'uk' ? 'Бізнеси не знайдено' : 'No businesses found'}</h4>
                  <p>${currentLang === 'uk' ? 'Спробуйте змінити фільтри або пошуковий запит' : 'Try changing filters or search query'}</p>
              </div>
          `;
        return;
    }

    // Перемальовуємо відфільтровані бізнеси
    filteredBusinesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4 fade-in';
        card.innerHTML = `
              <div class="business-card">
                  <div class="business-img">
                      <img src="${business.image}" alt="${currentLang === 'uk' ? business.name : business.name_en}">
                  </div>
                  <div class="business-content">
                      <span class="business-category">${getCategoryName(business.category, currentLang)}</span>
                      <h4>${currentLang === 'uk' ? business.name : business.name_en}</h4>
                      <div class="business-rating">
                          ${renderStars(business.rating)}
                          <span>${business.rating}</span>
                      </div>
                      <p>${currentLang === 'uk' ? business.description : business.description_en}</p>
                      <div class="business-meta">
                          <div>
                              <i class="fas fa-map-marker-alt"></i>
                              <span>${business.address}</span>
                          </div>
                          <div>
                              <i class="fas fa-phone"></i>
                              <span>${business.phone}</span>
                          </div>
                      </div>
                  </div>
              </div>
          `;
        container.appendChild(card);
    });
}

// Функція для відображення зірочок рейтингу
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Функція для отримання назви категорії
function getCategoryName(category, lang) {
    const categories = {
        'all': { uk: 'Всі', en: 'All' },
        'cafe': { uk: 'Кафе', en: 'Cafe' },
        'shop': { uk: 'Магазин', en: 'Shop' },
        'hotel': { uk: 'Житло', en: 'Accommodation' },
        'service': { uk: 'Послуги', en: 'Services' }
    };

    return categories[category][lang];
}

// Зміна мови
const languageBtn = document.querySelector('.language-btn');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = document.querySelectorAll('.language-option');

languageBtn.addEventListener('click', () => {
    languageMenu.classList.toggle('active');
});

languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        changeLanguage(selectedLang);
        languageMenu.classList.remove('active');
    });
});

function changeLanguage(lang) {
    // Приховуємо всі мовні контейнери
    document.querySelectorAll('.language-container').forEach(container => {
        container.classList.remove('active');
    });

    // Показуємо контейнери для обраної мови
    document.querySelectorAll(`.language-container[data-lang="${lang}"]`).forEach(container => {
        container.classList.add('active');
    });

    // Оновлюємо атрибут lang в кореневому елементі
    document.documentElement.lang = lang;

    // Оновлюємо погоду
    updateWeatherUI(lang);

    // Скидаємо пошуковий термін та поле вводу
    currentSearchTerm = '';
    document.getElementById('business-search').value = '';

    // Скидаємо активний стан фільтрів
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('.list-group-item[data-category="all"]').classList.add('active');
    currentCategory = 'all';

    // Перемальовуємо бізнеси з урахуванням поточних фільтрів
    renderBusinesses();
}

// Фільтрація бізнесів за категорією
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', function () {
        // Оновлюємо активний пункт меню
        document.querySelectorAll('.list-group-item').forEach(i => {
            i.classList.remove('active');
        });
        this.classList.add('active');

        // Оновлюємо поточну категорію
        currentCategory = this.getAttribute('data-category');

        // Перемальовуємо бізнеси
        renderBusinesses();
    });
});

// Пошук бізнесів
document.querySelector('#business-search').addEventListener('input', function () {
    currentSearchTerm = this.value.toLowerCase();
    renderBusinesses();
});

// Кнопка пошуку
document.querySelector('#search-button').addEventListener('click', function () {
    currentSearchTerm = document.querySelector('#business-search').value.toLowerCase();
    renderBusinesses();
});

// Керування музикою
const musicBtn = document.querySelector('.music-btn');
const audioPlayer = document.querySelector('.audio-player');
const audioElement = document.getElementById('background-music');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const volumeSlider = document.querySelector('.volume-slider');

musicBtn.addEventListener('click', () => {
    musicBtn.classList.toggle('active');

    if (musicBtn.classList.contains('active')) {
        audioPlayer.classList.remove('hidden');
        const savedVolume = localStorage.getItem('musicVolume');
        audioElement.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
        volumeSlider.value = audioElement.volume;
        audioElement.play().catch(e => console.log("Audio play error:", e));
    } else {
        audioPlayer.classList.add('hidden');
        audioElement.pause();
    }
});

playBtn.addEventListener('click', () => {
    audioElement.play().catch(e => console.log("Audio play error:", e));
});

pauseBtn.addEventListener('click', () => {
    audioElement.pause();
});

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    localStorage.setItem('musicVolume', volumeSlider.value);
});

// Анімація лічильників
function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Кнопка повернення нагору
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Темна тема
const themeBtn = document.querySelector('.theme-btn');
themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        this.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Ініціалізація після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Переконаємось, що мова встановлена
    if (!document.documentElement.lang) {
        document.documentElement.lang = 'uk';
    }

    // Анімація лічильників
    setTimeout(() => {
        animateCounter('population-counter', 0, 5400, 2000);
        animateCounter('year-counter', 1200, 1472, 1500);
        animateCounter('attraction-counter', 0, 12, 1800);
        animateCounter('area-counter', 0, 36, 1700);
    }, 500);

    // Відображення бізнесів
    renderBusinesses();

    // Перевірка збереженої теми
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Ініціалізація карти
    const map = L.map('map').setView([49.6532, 23.4870], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Додавання маркерів
    const markers = [
        {
            name: "Центр міста",
            position: [49.6532, 23.4870],
            description: "Центральна площа Рудок"
        },
        {
            name: "Історичний музей",
            position: [49.6520, 23.4850],
            description: "Музей історії міста"
        },
        {
            name: "Церква Св. Юрія",
            position: [49.6545, 23.4902],
            description: "Історична церква XVI століття"
        },
        {
            name: "Парк культури",
            position: [49.6505, 23.4803],
            description: "Головний парк міста"
        }
    ];

    markers.forEach(marker => {
        L.marker(marker.position).addTo(map)
            .bindPopup(`<b>${marker.name}</b><br>${marker.description}`);
    });

    // Анімації при скролі
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Додамо обробник помилок для аудіо
    audioElement.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Audio error details:', audioElement.error);
    });

    // Отримання даних погоди
    fetchWeather();

    // Оновлюємо погоду кожні 10 хвилин
    setInterval(fetchWeather, 10 * 60 * 1000);
});