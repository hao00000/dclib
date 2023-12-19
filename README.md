# debug-component library

Repository to build UI component library to showcase with the same code structure.

## Prerequisites:

`npx` is used in this library and it comes by default from npm >= 5.2. You’ll need to have Node >= 6 and npm >= 5.2 on your machine.

The library at time of development has developers' environment of:

- `node lts v8.11.3`
- `npm v6.2.0`
- `nvm` is used as well `v0.33.11`

## Getting Started

Clone the repository

### Installing

```
yarn
```

## Building

To build the library:

`yarn build`

To build the docs:

`yarn build:docs`

## Running

To start the documentation where you can show case the elements from lib:

`yarn start`

The command is for library development and local testing.

`yarn serve <port>` can be used to serve the JSON content in localhost, ensure src/docs/index.js reference of the same PORT.

## Built With

* [Webpack 4](https://webpack.js.org/) - For building the library
* [Parcel Bundler](https://parceljs.org/) - For building the docs
* React
* Redux
* React-Loadable
* Reactstrap and Bootstrap 4
* Bundle Optimization goal

## Structure:

The SchemaX library is built composing of several reusable and exportable Lib modules: the SinglePage (main), the SchemaX (main), the old sample Button, and sample Table.

```
├── src
│   ├── demo
│   │   ├── controllers
│   │   │   ├── appController.js
│   │   │   ├── cacheDebuggerController.js
│   │   │   ├── page0DemoController.js
│   │   │   ├── page1DemoController.js
│   │   │   ├── page2Demo.scss
│   │   │   ├── page2DemoController.js
│   │   │   ├── tableSchemaController.js
│   │   │   └── viewConfigController.js
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── modules
│   │   │   └── index.js
│   │   ├── pageContainers
│   │   │   ├── hydra
│   │   │   │   ├── HydraContainer.js
│   │   │   │   ├── HydraContainer.scss
│   │   │   │   └── sampleSectionData.js
│   │   │   └── turnstile
│   │   │       └── TurnstileContainer.js
│   │   └── pageSchemas
│   │       └── index.js
│   ├── lib
│   │   ├── Button
│   │   │   ├── DataTestSuite.js
│   │   │   └── index.js
│   │   ├── IframePage
│   │   │   └── index.js
│   │   ├── SampleTable
│   │   │   ├── SampleTableRenderer.js
│   │   │   └── index.js
│   │   ├── SchemaX
│   │   │   ├── Layout.js
│   │   │   ├── actions
│   │   │   │   ├── ActionTypes.js
│   │   │   │   ├── AppConfigActions.js
│   │   │   │   ├── PageActions.js
│   │   │   │   ├── SourceActions.js
│   │   │   │   └── UserFetch.js
│   │   │   ├── assets
│   │   │   │   ├── link-external.svg
│   │   │   │   ├── logo.svg
│   │   │   │   └── nav-icons
│   │   │   │       ├── angle-arrow-pointing-to-right.svg
│   │   │   │       ├── chip.svg
│   │   │   │       ├── file.svg
│   │   │   │       ├── handle.svg
│   │   │   │       ├── house.svg
│   │   │   │       ├── ladybug.svg
│   │   │   │       ├── right-arrow.svg
│   │   │   │       ├── settings.svg
│   │   │   │       ├── stopwatch.svg
│   │   │   │       └── www.svg
│   │   │   ├── components
│   │   │   │   ├── SchemaView.js
│   │   │   │   ├── SecondNavBarSection.js
│   │   │   │   ├── UserFetch.js
│   │   │   │   ├── content
│   │   │   │   │   ├── ContentBody.js
│   │   │   │   │   ├── ContentHeader.js
│   │   │   │   │   └── contentHeader.scss
│   │   │   │   ├── fixtures
│   │   │   │   │   ├── Collapsible.js
│   │   │   │   │   ├── DclibNotification.js
│   │   │   │   │   ├── ModalBox.js
│   │   │   │   │   └── NavBarWithTooltip.js
│   │   │   │   └── sideMenu
│   │   │   │       ├── SideBarHeader.js
│   │   │   │       ├── SideBarMenu.js
│   │   │   │       ├── sideBarHeader.scss
│   │   │   │       └── sideBarMenu.scss
│   │   │   ├── config
│   │   │   │   ├── dcLibConfig.json
│   │   │   │   └── dcLibMockConfig.json
│   │   │   ├── constants
│   │   │   │   └── index.js
│   │   │   ├── containers
│   │   │   │   ├── content
│   │   │   │   │   ├── contentBody.js
│   │   │   │   │   └── contentHeader.js
│   │   │   │   ├── fixtures
│   │   │   │   │   └── navBarWithTooltip.js
│   │   │   │   ├── schemaView.js
│   │   │   │   ├── secondNavBarSection.js
│   │   │   │   ├── sideMenu
│   │   │   │   │   ├── sideBarHeader.js
│   │   │   │   │   └── sideBarMenu.js
│   │   │   │   └── userFetch.js
│   │   │   ├── index.js
│   │   │   ├── logics
│   │   │   │   ├── index.js
│   │   │   │   └── userFetchLogic.js
│   │   │   ├── reducers
│   │   │   │   ├── index.js
│   │   │   │   ├── initReducer.js
│   │   │   │   ├── pageReducer.js
│   │   │   │   ├── serviceInfoReducer.js
│   │   │   │   ├── sourceReducer.js
│   │   │   │   └── userReducer.js
│   │   │   ├── registerServiceWorker.js
│   │   │   ├── routes
│   │   │   │   └── Routes.js
│   │   │   ├── store
│   │   │   │   ├── configureStore.js
│   │   │   │   └── dataStore.js
│   │   │   ├── styles
│   │   │   │   └── schemaX.scss
│   │   │   ├── utils
│   │   │   │   ├── fragments.js
│   │   │   │   └── index.js
│   │   │   └── vertical.scss
│   │   ├── SinglePage
│   │   │   ├── components
│   │   │   │   ├── fixtures
│   │   │   │   │   ├── JsonView.js
│   │   │   │   │   ├── ListView.js
│   │   │   │   │   ├── PreView.js
│   │   │   │   │   ├── TableView.js
│   │   │   │   │   ├── charts
│   │   │   │   │   │   ├── AreaView.js
│   │   │   │   │   │   ├── BarView.js
│   │   │   │   │   │   ├── Chart.js
│   │   │   │   │   │   ├── ChartView.scss
│   │   │   │   │   │   ├── LineView.js
│   │   │   │   │   │   ├── PieView.js
│   │   │   │   │   │   ├── ScatterView.js
│   │   │   │   │   │   └── SingleStatsView.js
│   │   │   │   │   ├── form
│   │   │   │   │   │   ├── FormFieldList.js
│   │   │   │   │   │   ├── FormView.js
│   │   │   │   │   │   ├── FormView.scss
│   │   │   │   │   │   └── HorizontalFieldTemplate.js
│   │   │   │   │   └── loader
│   │   │   │   │       └── LoaderFactory.js
│   │   │   │   └── layout
│   │   │   │       ├── GenericView.js
│   │   │   │       ├── SectionFooter.js
│   │   │   │       ├── SectionHeader.js
│   │   │   │       └── headerActions
│   │   │   │           └── LinkAction.js
│   │   │   ├── containers
│   │   │   │   ├── fixtures
│   │   │   │   │   ├── chartView.js
│   │   │   │   │   ├── formView.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── jsonView.js
│   │   │   │   │   ├── listView.js
│   │   │   │   │   ├── loaderFactory.js
│   │   │   │   │   ├── preView.js
│   │   │   │   │   └── tableView.js
│   │   │   │   └── layout
│   │   │   │       ├── genericView.js
│   │   │   │       ├── sectionFooter.js
│   │   │   │       └── sectionHeader.js
│   │   │   ├── index.js
│   │   │   ├── styles
│   │   │   │   └── singlePage.scss
│   │   │   └── utils
│   │   │       └── index.js
│   │   ├── index.js
│   │   ├── styles
│   │   │   ├── base.scss
│   │   │   ├── import-once.scss
│   │   │   ├── index.scss
│   │   │   ├── mixins.scss
│   │   │   └── variables.scss
│   │   └── utils
│   │       └── index.js
│   ├── mockData
│   │   ├── appConfig.json
│   │   ├── schemas
│   │   │   ├── UrlsDocumentation
│   │   │   │   └── pageSchemas
│   │   │   │       ├── UrlsDocumentation.json
│   │   │   │       └── sectionSchemas
│   │   │   │           └── UrlPatterns.json
│   │   │   ├── admin.json
│   │   │   ├── appDataSet.json
│   │   │   ├── cacheDebugger
│   │   │   │   └── pageSchemas
│   │   │   │       ├── cacheDebugger.json
│   │   │   │       ├── cacheDebuggerLinkedPage1.json
│   │   │   │       ├── cacheDebuggerLinkedPage2.json
│   │   │   │       ├── cacheDebuggerLinkedPage3.json
│   │   │   │       ├── cacheDebuggerLinkedPage4.json
│   │   │   │       ├── cacheDebuggerLinkedPage5.json
│   │   │   │       ├── cacheDebuggerLinkedPage6.json
│   │   │   │       └── sectionSchemas
│   │   │   │           ├── appInfo.json
│   │   │   │           ├── cacheMainPage
│   │   │   │           │   ├── sectionCFM.json
│   │   │   │           │   └── sectionCache.json
│   │   │   │           ├── linkPage1
│   │   │   │           │   ├── sectionLP1CFM.json
│   │   │   │           │   ├── sectionLP1CacheConfig.json
│   │   │   │           │   ├── sectionLP1CacheEntries.json
│   │   │   │           │   ├── sectionLP1FlushStatus.json
│   │   │   │           │   └── sectionLP1Stats.json
│   │   │   │           ├── linkPage2
│   │   │   │           │   ├── sectionLP2CFM.json
│   │   │   │           │   ├── sectionLP2CacheConfig.json
│   │   │   │           │   ├── sectionLP2CacheEntries.json
│   │   │   │           │   ├── sectionLP2FlushStatus.json
│   │   │   │           │   └── sectionLP2Stats.json
│   │   │   │           ├── linkPage3
│   │   │   │           │   ├── sectionLP3CFM.json
│   │   │   │           │   ├── sectionLP3CacheConfig.json
│   │   │   │           │   ├── sectionLP3CacheEntries.json
│   │   │   │           │   ├── sectionLP3FlushStatus.json
│   │   │   │           │   └── sectionLP3Stats.json
│   │   │   │           ├── linkPage4
│   │   │   │           │   ├── sectionLP4CFM.json
│   │   │   │           │   ├── sectionLP4CacheConfig.json
│   │   │   │           │   ├── sectionLP4CacheEntries.json
│   │   │   │           │   ├── sectionLP4FlushStatus.json
│   │   │   │           │   └── sectionLP4Stats.json
│   │   │   │           ├── linkPage5
│   │   │   │           │   ├── sectionLP5CFM.json
│   │   │   │           │   ├── sectionLP5CacheConfig.json
│   │   │   │           │   ├── sectionLP5CacheEntries.json
│   │   │   │           │   ├── sectionLP5FlushStatus.json
│   │   │   │           │   └── sectionLP5Stats.json
│   │   │   │           ├── linkPage6
│   │   │   │           │   ├── sectionLP6CFM.json
│   │   │   │           │   ├── sectionLP6CacheConfig.json
│   │   │   │           │   ├── sectionLP6CacheEntries.json
│   │   │   │           │   ├── sectionLP6FlushStatus.json
│   │   │   │           │   └── sectionLP6Stats.json
│   │   │   │           └── netstat.json
│   │   │   ├── components
│   │   │   │   └── table
│   │   │   │       ├── sampleData
│   │   │   │       │   └── 1.json
│   │   │   │       └── tableSchema.json
│   │   │   ├── page0
│   │   │   │   └── pageSchemas
│   │   │   │       └── page0Demo.json
│   │   │   ├── page1
│   │   │   │   └── pageSchemas
│   │   │   │       ├── page1Demo.json
│   │   │   │       └── sectionSchemas
│   │   │   │           ├── sectionEmployeeForm.json
│   │   │   │           ├── sectionEmployeeTable.json
│   │   │   │           └── sectionListData.json
│   │   │   ├── page2
│   │   │   │   └── pageSchemas
│   │   │   │       ├── page2Demo.json
│   │   │   │       └── sectionSchemas
│   │   │   │           └── sectionChartData.json
│   │   │   ├── page3
│   │   │   │   └── pageSchemas
│   │   │   │       └── page3Demo.json
│   │   │   ├── page4
│   │   │   │   └── pageSchemas
│   │   │   │       └── page4Demo.json
│   │   │   ├── page8
│   │   │   │   └── pageSchemas
│   │   │   │       └── page8Demo.json
│   │   │   ├── stats.json
│   │   │   └── viewConfiguration
│   │   │       └── pageSchemas
│   │   │           └── viewConfiguration.json
│   │   ├── server.py
│   │   ├── start_server.sh
│   │   └── unused
│   │       └── _server.js
│   └── test
│       ├── PageContainer.test.js
│       ├── __snapshots__
│       │   └── PageContainer.test.js.snap
│       └── setupTest.js
```



# Technical insight:

`appConfig.json` is there for reference purpose, and can be exampled as the `appConfig.json` for SchemaX users to be able to use the Library.

SchemaX users can either write and import a JSON configuration file on their own OR provide an URL to fetch that configuration file from a server.

SchemaX users should be able to fetch a list of sections from a server.

SchemaX users can define their custom _pageContainer_ and _sectionContainer_ for the entire page and section rendition of their liking.

It also uses _pageWrapper_ and _sectionWrapper_ for custom wrapping effects and functionalities to the existing section rendition.
That is to enhance the look and feel, and also esthetics behaviors.

## Further development of SchemaX should account for :
### Lib modules:
* Further on modular architecture, each module can be exported and the modules may be dependent but also decoupled if needs be.
* Loose-coupling and flexibility
* Each Lib module is like a small project which can leverage use of Redux and other related Redux helper libraries.
The decision to use a set or subset of libraries should be based on need.
* For SchemaX module specifically, localStorage is currently used to store the URL for createResource. Perhaps, there could be a better way.
Until then, all URLs/Paths the user provides should be built into a localStorage obj and be retrieved at time of createResource for the right URL and XHR request.

### Styles
* Independent, composable styles required as per Lib module
* Factor the styles to their own `styles` folder in a Lib module
* Leverage the use of _mixins and other Singleton in lib/styles
* Integrate [styled-component](https://www.styled-components.com/) and [classnames](https://github.com/JedWatson/classnames).
  Evaluate which is better and whether we need both.
  Styled-Component receives a lot of good reviews.

e.g. SinglePage>styles>index.scss, and SchemaX>styles>index.scss and import them independently and appropriately, so won’t float the release.

## Contributing

All PRs are welcome.

## Authors

* **Pristine Phuc Tran** - [gmail](pristinekallio@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## References:


1. [Dynamic Component](https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9)
2. [Parcel assets supported by default](https://parceljs.org/assets.html)
3. [Rollup vs Webpack vs Parcel](https://x-team.com/blog/rollup-webpack-parcel-comparison/)
4. [ignore-module](https://remarkablemark.org/blog/2017/02/25/webpack-ignore-module/) Although we use Webpack external to achieve the same thing.
5. [Detect if prop is a component](https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element)
6. [pass-react-component-as-props](https://stackoverflow.com/questions/39652686/pass-react-component-as-props/39655113)
7. [component transclude](https://stackoverflow.com/questions/25797048/how-to-pass-in-a-react-component-into-another-react-component-to-transclude-the)
8. [Bundle analyser 1](https://hackernoon.com/webpack-bundle-analysis-a-necessary-step-for-all-react-angular-vue-application-developers-fe6564fa62ca)
9. [React-Table](https://codehandbook.org/how-to-use-react-table-in-react-web-app/)
10. [React-Router-Redux](https://stackoverflow.com/questions/43577836/accessing-params-with-react-router-redux) -- overhead: migrate react-router to v4 and use connected-router-redux instead.
- https://tylermcginnis.com/react-router-programmatically-navigate/
- https://tylermcginnis.com/react-router-url-parameters/
- https://github.com/supasate/connected-react-router/blob/master/FAQ.md#how-to-set-router-props-eg-basename-initialentries-etc
11. [Library-W-ES6](https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953)

12. [Public-Path-Webpack-Solution](https://github.com/smooth-code/loadable-components/issues/138)
13. [CustomAttrs-For-JSX](https://stackoverflow.com/questions/48995052/add-custom-attribute-to-jsx)

#### old

/*
// .eslintrc
"settings": {
  "import/resolver": {
    "webpack": {
    "config": "webpack.config.js"
    }
  }
}
*/

parcel-plugin-purgecss
node-sass-once-importer
https://github.com/shakacode/bootstrap-sass-loader/issues/43
