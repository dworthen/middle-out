# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2018-05-11)


### Bug Fixes

* Use lower camelcase for function names. ([9820790](https://github.com/dworthen/middle-out/commit/9820790))
* validation is optional except for Required ([abd4dc2](https://github.com/dworthen/middle-out/commit/abd4dc2))


### BREAKING CHANGES

* - Use lower camelcase for function names
CHANGE:
- Required to required
- StringLength to stringLength



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2018-05-10)


### Bug Fixes

* Define defaults for StringLength function ([1392b1a](https://github.com/dworthen/middle-out/commit/1392b1a))



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2018-05-10)


### Features

* Add StringLength validator ([cda0c22](https://github.com/dworthen/middle-out/commit/cda0c22))



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2018-05-10)


### Bug Fixes

* Resolve compilation error with Required.ts ([fe1699f](https://github.com/dworthen/middle-out/commit/fe1699f))



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2018-05-10)


### Bug Fixes

* Add Required to public API ([e3b9433](https://github.com/dworthen/middle-out/commit/e3b9433))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-05-09)


### Features

* Add Required validator ([85a5aff](https://github.com/dworthen/middle-out/commit/85a5aff))



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-05-09)


### Features

* Add argument type checking function helper ([6809492](https://github.com/dworthen/middle-out/commit/6809492))



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.4...v1.0.0-alpha.6) (2018-05-09)


### Bug Fixes

* Change filenames and add exports for API ([a157adc](https://github.com/dworthen/middle-out/commit/a157adc))
* Change license from ISC to MIT ([36d0fff](https://github.com/dworthen/middle-out/commit/36d0fff))



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.3...v1.0.0-alpha.5) (2018-05-09)


### Bug Fixes

* Change filenames and add exports for API ([a157adc](https://github.com/dworthen/middle-out/commit/a157adc))


### Features

* Add core validation logic ([a4abba0](https://github.com/dworthen/middle-out/commit/a4abba0))


### BREAKING CHANGES

* ADD:
- registerValidator
- getValidators
- validate
- errorTemplate



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2018-05-07)


### Features

* Add core validation logic ([a4abba0](https://github.com/dworthen/middle-out/commit/a4abba0))


### BREAKING CHANGES

* ADD:
- registerValidator
- getValidators
- validate
- errorTemplate



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2018-04-27)


### Bug Fixes

* Change Reflect API to use overloads ([82ce369](https://github.com/dworthen/middle-out/commit/82ce369))


### BREAKING CHANGES

* Removed:
- getAllMetaData
Changed:
- getMetaData overloads to handle getting all metadata
for an object, for an object/property key and a single
piece of metadata.



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2018-04-26)


### Features

* **Reflect:** Change API ([1b4c70d](https://github.com/dworthen/middle-out/commit/1b4c70d))


### BREAKING CHANGES

* **Reflect:** - getMetaData(target, property, metaData) now returns stored
value or undefined instead of [[name, value]]|[].



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/dworthen/middle-out/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2018-04-25)


### Features

* Add reflect API and tests ([220e54e](https://github.com/dworthen/middle-out/commit/220e54e))



<a name="1.0.0-alpha.0"></a>
# 1.0.0-alpha.0 (2018-04-21)
