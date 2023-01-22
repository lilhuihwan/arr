

import { lazy , Suspense, createContext, useEffect, useState } from 'react';
import data from './data.js';
import {Container,Nav,Navbar} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from "react-query"

// import Cart from './routes/Cart.js';
// import Sub1 from './routes/Sub1.js';
const Sub1 = lazy(()=> import ('./routes/Sub1.js'));
const Cart = lazy(()=> import ('./routes/Cart.js'));
// 현재 페이지에서 늦게 구동되도 되는 페이지는 lazy함수를 써서 페이지 로드를 빠르게 만든다.

export let Context1 = createContext()

let MoreBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg  == '#b9dcd2' ? 'white' : 'black' };
  padding:10px;
  width:100px;
  border-radius:15px;
  border:none;
  position:relative;
  left:50%;
  transform:translateX(-50%);
`
// state 보관함

function App() {


  
// useEffect(()=>{
// localStorage.setItem('watched',JSON.stringify( [] ))
// },[])


// useEffect(() => {
//   preview === null
//     ? localStorage.setItem('watched',JSON.stringify( [] ))
//     : null;
// }, []);

useEffect(()=>{
  if(localStorage.getItem('watched') != null){
    console.log('초기화방지');
  } else if(localStorage.getItem('watched') == null){
    localStorage.setItem('watched', JSON.stringify([]));
  }
}, []);


let preview = JSON.parse(localStorage.getItem("watched"));


// let obj = { name : 'kim'}
// localStorage.setItem('data',JSON.stringify(obj))
// let 꺼낸거 = localStorage.getItem('data')
// console.log(JSON.parse(꺼낸거).name);

let [pet,setPet] = useState(data);
let [재고] = useState([10, 11 ,12]);
let navigate = useNavigate();
let [count,setCount] = useState(0);
let [more,setMore] = useState(true)
let [loading,setLoading] = useState(false)






// --------------------------react query-----------------------------------------------

let result = useQuery('작명',()=>{
   return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
    console.log('요청됨')
  return a.data
  })
  // ,
  // { staleTime : 2000 }
  // repatch 되는 간격 설정
})

// result.data
// result.isLoading
// result.error





const gameurl = "https://huihwan2.cafe24.com/dog"




  return (
    <div className="App">
      <Navbar  className="header_wrap">
        <Container className="header_inner">
          <Navbar.Brand href="#home" className="header">
          <Link className="home-button" to="/">
            <h1>
    {/* 퍼블릭 방식 이미지 삽입 */}
            <img className="header_logo" src={process.env.PUBLIC_URL +"/image/logo.png"}/>
            </h1>
            </Link>
            </Navbar.Brand>
          <Nav className="me-auto">
          {/* <Link className="nav-button" to="/">Home</Link>
          <Link className="nav-button" to="/detail">상세페이지</Link> */}
          <Nav.Link onClick={()=>{ navigate('/')}} className="nav-button" >Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/cart')}} className="nav-button">Cart</Nav.Link>
          <Nav.Link onClick={()=>{window.open(gameurl)}} className="nav-button">Game</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러가 발생하였습니다.' }
            { result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
    




      <Suspense fallback={<div>로딩중입니다. 잠시만 기다려주세요</div>}>
      <Routes>
      <Route path="/" element={
<div>
  <div className="main-bg" style={{backgroundImage : 'url('+ process.env.PUBLIC_URL +"/image/bg.jpg" +')'}}></div>

    <div>
    <div className="container">
      <div className="row mid-cont">
          {
          pet.map(function(a,i){
            return(
            <Midcont pet={pet} i={i} key={i}/>
            )
          })
        }
      </div>
    </div>
    {
    more == true?
    <MoreBtn class="morebtn" bg="#b9dcd2" onClick={()=>{
      setLoading(true)
      console.log(loading)
      setCount(count+1)
      console.log(count)
      axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((결과0)=>{
      axios.get('https://codingapple1.github.io/shop/data3.json')
      .then((결과1)=>{        
          if(count == 0){
            let copy = [...pet, ...결과0.data]
            setPet(copy)
            setLoading(false)
          }else if(count == 1){
            let copy = [...pet,  ...결과1.data]
            setPet(copy)
            setLoading(false)
          }else if(count>=2){
            setMore(false)
            setLoading(false)
          }
        })
        .catch(()=>{console.log('서버전송이 실패하였습니다.')})
      })
      .catch(()=>{console.log('서버전송이 실패하였습니다.')})
    // axios.post('/sadsad', {name : 'kim'}) 서버에 데이터를 보낼때

    // Promise.all([ axios.get('/url1'), axios.get('/url2') ]).then(()=>{})
    // 동시에 ajax 요청



    }}>더보기</MoreBtn>
    :
    null
  }

  <Loading loading={loading}/>
  </div> 
  

{/* --------------최근 본 상품--------------------------- */}

  <div className="cart-box">
    <p style={{marginTop: '10px'}}>최근 본 상품</p>
    {preview !== null
    ? preview.map((a,i)=>{
      return(
        <div className="cart-inner">
          <img src={''+process.env.PUBLIC_URL+'/image/mid-cont'+a+'.jpg'} width="100%"></img>
        </div>
        
      );  
    })
    :null}
    
  </div>
</div>


      }/>

        <Route path="/detail/:id" element={
        //  {/* //URL파라미터 : ":id" 는 아무거나 적어도 그 값이 전송된다. */}

          <Context1.Provider value={{ 재고 , pet }}>
            <Sub1 pet={pet}></Sub1>
          </Context1.Provider>

        }/>


        {/* <Route path="/detail/1" element={
          <Sub1 pet={pet}></Sub1>
        }/>
        <Route path="/detail/2" element={
          <Sub1 pet={pet}></Sub1>
        }/> */}



        <Route path="/cart" element={ <Cart/>}>

        </Route>







        {/* 1 */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        {/* 2 */}
        {/* <Route path="/about/member" element={<About/>}/>
            <Route path="/about/location" element={<About/>}/>
         */}
        {/* 1과 2는 같은 문법 */}

         <Route path="/event" element={<Event></Event>}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
            <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
         </Route>



        <Route path="*" element={<div>없는 페이지에요</div>}/>
        {/* 404 페이지 */}


      </Routes>
      </Suspense>
        

</div>


  );
}

function Midcont(props){
  return(

  <div className="col-md-4">
    <Link to={'/detail/'+props.i+''} style={{ textDecoration: "none" }}>
    <img src={''+process.env.PUBLIC_URL+'/image/mid-cont'+props.i+'.jpg'} width="80%"></img>
    <h4>{props.pet[props.i].title}</h4>
    <p>{props.pet[props.i].content}</p>
    <p>{props.pet[props.i].price}</p>
    </Link>
  </div>

  )}

function About(){
  return(
    <div>
    <h4>회사정보임</h4>
    <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Loading(props){
  return(
    <div className="loading">
      {props.loading == true ? 
      '로딩중입니다. 잠시만 기다려주세요.'
      :null
      }
      </div>
  )
}

export default App;
