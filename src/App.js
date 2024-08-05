import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import React, {useState} from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App=(props)=> {
  const pageSize=15;
  const api_key=process.env.REACT_APP_NEWS_API_KEY
  const [progress,setProgress]=useState(0);
    
 
 

  
  
    return (
      <div>
        
      <Router>
      < NavBar />
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
      <Routes>
      
      
      <Route path="/" element={<News setProgress={setProgress} api_key={api_key} key="general" pageSize={pageSize}country="in" category="general" />}/>
      
      
      <Route path="/business" element={<News setProgress={setProgress} api_key={api_key} key="business" pageSize={pageSize}country="in" category="business" />}/>
      
      
      <Route path="/entertainment" element={<News setProgress={setProgress} api_key={api_key} key="entertainment" pageSize={pageSize}country="in" category="entertainment" />}/>
      
      
      <Route path="/general" element={<News setProgress={setProgress} api_key={api_key} key="general" pageSize={pageSize}country="in" category="general" />}/>
      
      
      <Route path="/health" element={<News setProgress={setProgress} api_key={api_key} key="health" pageSize={pageSize}country="in" category="health" />}/>
      
      
      <Route path="/science" element={<News setProgress={setProgress} api_key={api_key} key="science" pageSize={pageSize}country="in" category="science" />}/>

      <Route path="/sports" element={<News setProgress={setProgress} api_key={api_key} key="sports" pageSize={pageSize}country="in" category="sports" />}/>
      
      <Route path="/technology" element={<News setProgress={setProgress} api_key={api_key} key="technology" pageSize={pageSize}country="in" category="technology" />}/>

      
      
    </Routes>
    </Router>
    </div>
      

        
    )
  
    }

export default App;