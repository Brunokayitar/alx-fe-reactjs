import WelcomeMessage from './components/WelcomeMessage.jsx';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import UserProfile from './components/UserProfile.jsx';

function App() {
  
  return (
     <> 
        <UserProfile name="Alice" age="25" bio="Loves hiking and photography"/>
        <Header />
        <MainContent />
        <Footer />
        <WelcomeMessage /> 
     </>

  );
}

export default App
