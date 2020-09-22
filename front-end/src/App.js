import React, { Fragment } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import MainPage from './MainPage'
import AboutPage from './AboutPage'
import LanguagesPage from './LanguagesPage'
import CountriesPage from './CountriesPage'
import CharitiesPage from './CharitiesPage'
import { Switch, Route } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button, Icon, makeStyles, CssBaseline} from '@material-ui/core'

import LanguageDetailPage from './LanguageDetailPage'
import CountryDetailPage from './CountryDetailPage'
import CharityDetailPage from './CharityDetailPage'
import VisualizationsPage1 from './VisualizationsPage1'
import VisualizationsPage2 from './VisualizationsPage2'
import VisualizationsPage3 from './VisualizationsPage3'
import DeveloperVisualizationPage1 from './DeveloperVisualizationPage1'
import DeveloperVisualizationPage2 from './DeveloperVisualizationPage2'
import DeveloperVisualizationPage3 from './DeveloperVisualizationPage3'


const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
        backgroundImage: "url(" + "https://www.mapsinternational.com/pub/media/catalog/product/cache/afad95d7734d2fa6d0a8ba78597182b7/w/o/world-wall-map-political-without-flags_wm00001_h.jpg" + ")",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"

      },
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
  } ,
  }));



const App = () => {
    const classes = useStyles();
    return (
  <Fragment>
      <Navbar/>

    <Switch>
      <Route exact path='/' component={MainPage}/>
      <Route path='/about' component={AboutPage}/>
      <Route path='/languageInfo' component={LanguagesPage}/>
      <Route path='/countryInfo' component={CountriesPage}/>
      <Route path='/charityInfo' component={CharitiesPage}/>
      <Route path='/visualization1' component={VisualizationsPage1}/>
      <Route path='/visualization2' component={VisualizationsPage2}/>
      <Route path='/visualization3' component={VisualizationsPage3}/>
      <Route path='/developervisualization1' component={DeveloperVisualizationPage1}/>
      <Route path='/developervisualization2' component={DeveloperVisualizationPage2}/>
      <Route path='/developervisualization3' component={DeveloperVisualizationPage3}/>
      <Route path='/languageDetail/:code' component={LanguageDetailPage}/>
      <Route path='/countryDetail/:country' component={CountryDetailPage}/>
      <Route path='/charityDetail/:idNumber' component={CharityDetailPage}/>
    </Switch>
  </Fragment>
)}

export default App
