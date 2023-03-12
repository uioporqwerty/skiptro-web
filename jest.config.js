module.exports = {
    collectCoverage: true,
    coverageReporters: ['json', 'html'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    }
};
