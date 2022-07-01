import {Card} from './context';
import pic from './bank.png';

function Home(){
  return (
    <Card
      txtcolor="black"
      header="Da BadBank"
      title="Welcome to our humble bank"
      text="Where Security is not a consideration."
      body={(<img src={pic} className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}

export default Home;