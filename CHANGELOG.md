# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
