module.exports = {
    collectCoverage: true,
    coverageReporters: ['xml'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    }
};
