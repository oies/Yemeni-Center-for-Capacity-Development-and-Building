document.addEventListener('DOMContentLoaded', function() {
    // Get results from localStorage
    const results = JSON.parse(localStorage.getItem('intelligenceResults'));
    const intelligenceNames = JSON.parse(localStorage.getItem('intelligenceNames'));
    
    if (!results || !intelligenceNames) {
        window.location.href = 'index.html';
        return;
    }

    // Display results
    const resultsContent = document.getElementById('resultsContent');
    const dominantType = document.getElementById('dominantType');
    
    // Find highest score
    const highestScore = Math.max(...Object.values(results));
    const dominantTypes = Object.entries(results)
        .filter(([_, score]) => score === highestScore)
        .map(([type, _]) => intelligenceNames[type]);

    // Create result items
    Object.entries(results).forEach(([type, score]) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        if (score === highestScore) {
            resultItem.classList.add('highest-score');
        }
        resultItem.innerHTML = `
            <div class="result-label">${intelligenceNames[type]}</div>
            <div class="result-score">${score.toFixed(1)}</div>
            <div class="result-bar">
                <div class="bar-fill" style="width: ${(score/5)*100}%"></div>
            </div>
        `;
        resultsContent.appendChild(resultItem);
    });

    // Display dominant type
    dominantType.innerHTML = `
        <h2>نوع الذكاء لديك</h2>
        <div class="dominant-types">${dominantTypes.join(', ')}</div>
    `;

    // Create chart
    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.values(intelligenceNames),
            datasets: [{
                label: 'نتائج الذكاءات المتعددة',
                data: Object.values(results),
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: '#e74c3c',
                pointBackgroundColor: '#e74c3c',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#e74c3c'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});
