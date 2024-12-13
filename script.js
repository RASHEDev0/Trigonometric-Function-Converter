let selectedRatio = '';
let selectedTheta = '';
let selectedOperation = '';
let selectedAlpha = 'θ';

document.querySelectorAll('.ratio-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedRatio = button.textContent;
        highlightButton('.ratio-btn', button);
    });
});

document.querySelectorAll('.theta-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedTheta = button.textContent;
        highlightButton('.theta-btn', button);
    });
});

document.querySelectorAll('.op-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedOperation = button.textContent;
        highlightButton('.op-btn', button);
    });
});

document.querySelectorAll('.alpha-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedAlpha = button.textContent;
        highlightButton('.alpha-btn', button);
    });
});

document.getElementById('convertBtn').addEventListener('click', () => {
    const result = convertToFirstQuadrant(selectedRatio, selectedTheta, selectedOperation, selectedAlpha);
    document.getElementById('result').textContent = `Converted: ${result}`;
});

function highlightButton(buttonClass, activeButton) {
    document.querySelectorAll(buttonClass).forEach(button => {
        button.style.backgroundColor = '#007bff';
    });
    activeButton.style.backgroundColor = '#0056b3';
}

function convertToFirstQuadrant(ratio, theta, operation, alpha) {
    if (alpha === 'θ') {
        alpha = 'θ'; // default value
    }
    
    let convertedFunction = `${ratio}(${theta} ${operation} ${alpha})`;

    const transformations = {
        'sin': {
            'π': '-sin(θ)',
            'π/2': `cos(${alpha})`,
            '3π/2': `-cos(${alpha})`,
            '2π': `sin(${alpha})`
        },
        'cos': {
            'π': `-cos(${alpha})`,
            'π/2': `-sin(${alpha})`,
            '3π/2': `sin(${alpha})`,
            '2π': `cos(${alpha})`
        },
        'tan': {
            'π': `tan(${alpha})`,
            'π/2': `-cot(${alpha})`,
            '3π/2': `cot(${alpha})`,
            '2π': `tan(${alpha})`
        },
        'cot': {
            'π': `cot(${alpha})`,
            'π/2': `-tan(${alpha})`,
            '3π/2': `tan(${alpha})`,
            '2π': `cot(${alpha})`
        }
    };

    if (theta in transformations[ratio]) {
        convertedFunction = transformations[ratio][theta];
    }

    // Handle specific angle values (0, 30, 45, 60, 90, 180, 270, 360)
    const angleValues = {
        'sin': {
            '0': '0',
            '30': '1/2',
            '45': '√2/2',
            '60': '√3/2',
            '90': '1',
            '180': '0',
            '270': '-1',
            '360': '0'
        },
        'cos': {
            '0': '1',
            '30': '√3/2',
            '45': '√2/2',
            '60': '1/2',
            '90': '0',
            '180': '-1',
            '270': '0',
            '360': '1'
        },
        'tan': {
            '0': '0',
            '30': '√3/3',
            '45': '1',
            '60': '√3',
            '90': 'undefined',
            '180': '0',
            '270': 'undefined',
            '360': '0'
        },
        'cot': {
            '0': 'undefined',
            '30': '√3',
            '45': '1',
            '60': '√3/3',
            '90': '0',
            '180': 'undefined',
            '270': '0',
            '360': 'undefined'
        }
    };

    if (alpha in angleValues[ratio]) {
        convertedFunction = `${ratio}(${alpha}) = ${angleValues[ratio][alpha]}`;
    }

    return convertedFunction;
}
