# Skiptro

[![CI/CD](https://github.com/uioporqwerty/skiptro-web/actions/workflows/cicd.yaml/badge.svg?branch=main)](https://github.com/uioporqwerty/skiptro-web/actions/workflows/cicd.yaml)
[![codecov](https://codecov.io/gh/uioporqwerty/skiptro-web/branch/main/graph/badge.svg?token=oTxaR7SRh8)](https://codecov.io/gh/uioporqwerty/skiptro-web)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uioporqwerty_skiptro-web&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=uioporqwerty_skiptro-web)

Skiptro is a web extension that allows you to skip intros for any video on a page. Skiptro displays a "Skip" button on the video which allows you to completely skip the intro.

## Technical Notes

Changes to the `app/config.ts` require that the development version is symmetrically encrypted using the following command and the encrypted file committed to source control:

`gpg --symmetric --batch --yes --passphrase "$passphrase" --output ./config.ts.asc ./app/config.ts`
