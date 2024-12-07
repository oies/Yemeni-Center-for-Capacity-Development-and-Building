const questions = {
    linguistic: [
        'أستمتع بقراءة الكتب والقصص',
        'أجد سهولة في تعلم اللغات الجديدة',
        'أحب وصف الأشياء التي أراها',
        'أستمتع بالمشاركة في النقاشات والمحادثات',
        'لدي قدرة على شرح الأفكار للآخرين بطريقة واضحة'
    ],
    logical: [
        'أستمتع بحل الألغاز والمسائل الرياضية',
        'أفضل مناقشة القضايا بطريقة منظمة',
        'أحب إجراء التجارب العلمية',
        'أستطيع اكتشاف الفروق الفردية بين الناس بسهولة',
        'أستمتع بحل المسائل الرياضية '
    ],
    spatial: [
        'لدي حسّ جيد بمعرفةالاتجاهات',
        'أستطيع تخيل الأشياء بسهولة في ذهني',
        'أستمتع برسم الخرائط والرسومات البيانية',
        'أستمتع بتصميم الأشياء أو بناء نماذج العمرانية',
        'أستطيع فهم الرسوم البيانية والخرائط بسهولة'
    ],
    kinesthetic: [
        'أتمتع بمهارات رياضية جيدة',
        '(الجري، التسلق، ...الخ)أستمتع بالانشطة الحركية',
        'أفضل التعلم من خلال الأنشطة العملية',
        'أستمتع بصنع الأشياء بيدي',
        'أجد سهولة في تعلم مهارات جديدة تتطلب استخدام جسدي'
    ],
    musical: [
        'لدى القدرة على ملاحظات التفاصيل الدقيقة في اللوحات والتصاميم',
        'عندما أرى الأعمال الفنية يمكنني وصفها للآخرين بسهولة',
        'عندما أسمع الشعر الملحن أتفاعل معه اللحن أكثر من الكلمات',
        'أقدم أفكارا تعتمد على الذائقة التي أمتلكها أكثر من أي معيار آخر',
        'أشعر بارتباط قوي عند قراءة/ مشاهدة مشهد فني وأفسر العمل بناءً على مشاعري'
    ],
    interpersonal: [
        'أستمتع بالعمل في مجموعات',
        'لدي العديد من الأصدقاء',
        'أستطيع فهم مشاعر الآخرين بسهولة',
        'أستمتع بمساعدة الآخرين',
        'أستطيع التواصل مع الآخرين بسهولة'
    ],
    intrapersonal: [
        'أفهم مشاعري جيدًا',
        'أستمتع بقضاء الوقت بمفردي',
        'أفضل العمل بشكل مستقل',
        'لدي وعي قوي بذاتي ',
        'أستطيع تحديد أهدافي وتحقيقها'
    ],
    naturalistic: [
        'أهتم بالبيئة والحيوانات',
        'أستمتع بقضاء الوقت في الطبيعة',
        'أستطيع تمييز أنواع النباتات والحيوانات بسهولة',
        'أستمتع بمشاهدة الأفلام الوثائقية عن الطبيعة',
        'أشعر بالراحة في البيئات الطبيعية'
    ]
};

const intelligenceNames = {
    linguistic: 'الذكاء اللغوي',
    logical: 'الذكاء المنطقي الرياضي',
    spatial: 'الذكاء المكاني',
    kinesthetic: 'الذكاء الجسدي الحركي',
    musical: 'الذكاء الفني',
    interpersonal: 'الذكاء الشخصي',
    intrapersonal: 'الذكاء الداخلي',
    naturalistic: 'الذكاء الطبيعي'
};

const options = [
    'أوافق بشدة',
    'موافق',
    'محايد',
    'غير موافق',
    'غير موافق بشدة'
];

let currentTab = 0;
const tabs = Object.keys(questions);

// Generate form questions for each tab
tabs.forEach((type, index) => {
    const section = document.getElementById(type);
    const questionList = questions[type];
    
    // Add tab title
    const title = document.createElement('h2');
    title.textContent = intelligenceNames[type];
    section.appendChild(title);
    
    // Generate questions
    questionList.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${qIndex + 1}. ${question}`;
        questionDiv.appendChild(questionText);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        const radioGroup = document.createElement('div');
        radioGroup.className = 'radio-group';

        options.forEach((option, optionIndex) => {
            const radioOption = document.createElement('div');
            radioOption.className = 'radio-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `${type}_${qIndex}`;
            input.value = 5 - optionIndex;  
            input.required = true;
            input.id = `${type}_${qIndex}_${optionIndex}`;

            const label = document.createElement('label');
            label.htmlFor = `${type}_${qIndex}_${optionIndex}`;
            label.textContent = option;

            radioOption.appendChild(input);
            radioOption.appendChild(label);
            radioGroup.appendChild(radioOption);
        });

        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'الرجاء اختيار إجابة';

        optionsDiv.appendChild(radioGroup);
        questionDiv.appendChild(optionsDiv);
        questionDiv.appendChild(errorMessage);
        section.appendChild(questionDiv);
    });
});

// Show first tab
document.querySelector('.tab-pane').classList.add('active');

// Navigation functions
function showTab(n) {
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes[currentTab].classList.remove('active');
    tabPanes[n].classList.add('active');
    
    // Update progress bar
    const progress = ((n + 1) / tabs.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.getElementById('currentSection').textContent = n + 1;
    
    // Update buttons
    document.getElementById('prevBtn').disabled = n === 0;
    if (n === tabs.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'block';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('submitBtn').style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    currentTab = n;
}

// Validate current tab
function validateTab() {
    const currentPane = document.querySelectorAll('.tab-pane')[currentTab];
    const questions = currentPane.querySelectorAll('.question');
    let valid = true;
    
    questions.forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        const checked = Array.from(radios).some(radio => radio.checked);
        
        if (!checked) {
            question.classList.add('error');
            valid = false;
        } else {
            question.classList.remove('error');
        }
    });
    
    return valid;
}

// Navigation event listeners
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentTab > 0) {
        showTab(currentTab - 1);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (validateTab()) {
        showTab(currentTab + 1);
    } else {
        const firstError = document.querySelector('.tab-pane.active .question.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Add click handler for radio options
document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Remove selected class from other options in the same group
        const name = radio.getAttribute('name');
        document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            input.closest('.radio-option').classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Remove error class if exists
        this.closest('.question').classList.remove('error');
    });
});

// Form submission handling
document.getElementById('intelligenceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateTab()) {
        const firstError = document.querySelector('.tab-pane.active .question.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const results = {};
    Object.keys(questions).forEach(type => {
        const scores = [];
        for(let i = 0; i < questions[type].length; i++) {
            const selected = document.querySelector(`input[name="${type}_${i}"]:checked`);
            if(selected) {
                scores.push(parseInt(selected.value));
            }
        }
        if(scores.length > 0) {
            results[type] = scores.reduce((a, b) => a + b) / scores.length;
        }
    });

    // حفظ النتائج محلياً
    localStorage.setItem('intelligenceResults', JSON.stringify(results));
    localStorage.setItem('intelligenceNames', JSON.stringify(intelligenceNames));
    
    // الانتقال إلى صفحة النتائج
    window.location.href = 'results.html';
});
