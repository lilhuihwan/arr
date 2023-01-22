import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {Context1}  from './../App.js';
import {addItem} from "./../store.js";
import {useDispatch} from "react-redux";

let BuyBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg  == 'red' ? 'white' : 'black' };
  padding:10px;
  width:100px;
  border-radius:15px;
  border:none;
`

// let NewBtn = styled.button(YellowBtn)

function Sub1(props){

  useEffect(()=>{
    let a = setTimeout(()=>{ setEvent(false) },2000)
    return ()=>{
      clearTimeout(a)
    }
  },[])
  //  return을 주면 useEffect 전에 실행되고 useEffect가 실행된다.
  // [] (디펜던시) 안의 변수가 바뀔때만 useEffect를 실행시켜 줌 , 공란이면 mount(로드)시 1회 실행하고 영영 실행되지 않음
  // 내용 안의 버튼을 눌렀을때 발생되는 재랜더링 시 useEffect가 실행되는 것을 막아준다. 최초 mount 됬을때만 실행된다.
  // clearTimeout = 기존 데이터 요청은 제거해주세요
  let [event , setEvent] = useState(true)
  let [num,setNum] = useState('')
  let [탭,탭변경] = useState(0)
  let [screen,setScreen] = useState('')
  let dispatch = useDispatch()

  useEffect(()=>{
    if(isNaN(num) == true){
      alert('숫자만입력하세요')
    }
  },[num]
  )
  console.log(num)
// isNaN 문자인지 판별해준다 아래 input의 num 값이 문자가 true 라면 얼럿창이 뜬다. [num] 변수가 변경될때만 실행된다!

    

// mount , update시 실행
// useEffect는 실행시점이 다르다. html 렌더링 후에 실행이된다.
// 

// for (var i = 0;  i<10000; i++){
//   console.log(1)
// }
// javascript 특성상 위에서부터 읽기때문에 이렇게 되면 html을 늦게 보여줌
//  그러나 해당 반복문을 useEffect에 넣기 되면 html 먼저 보여지고 나중에 함수가 실행됨




// --------------------------------------useParams (유저 입력 url 파라미터)------------------------------//


  let {id} = useParams();
  let 찾은상품 = props.pet.find(function(x){
    return x.id == id
  })
    //유저가 입력한 url 파라미터를 갖다 쓸 수 있음







// --------------------------------------localStorage------------------------------//

    useEffect(()=>{
      let preview = localStorage.getItem('watched')
      //  watched를 꺼내고
      preview = JSON.parse(preview)
      // JSON 자료로 뽑아오게되고
      preview.push(찾은상품.id)
      // array에 자료 추가
      preview = new Set(preview)
      // set자료형으로 변환해서 중복데이터 제거
      preview = Array.from(preview)
      // 다시 array 형태로 변환
      localStorage.setItem('watched',JSON.stringify(preview))
      // localStorage에 다시 저장
    },[])
  // 누가 Detail 페이지에 접속하면
  // 그 페이지에 보이는 상품ID를 가져와서
  // localStorage에 watched 항목에 추가




    useEffect(()=>{
      setTimeout(()=>{setScreen('end')},100)
      return()=>{
        setScreen('')
      }
    },[])

    return(
      <div className={"container start "+screen}>
      {
      event == true
      ?<div className="alert alert-warning">
        2초 이내 구매시 할인
      </div>
      : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={'/image/mid-cont'+id+'.jpg'} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <div>개수:<input onChange={(e)=>{setNum(e.target.value)}}></input></div>
          <BuyBtn bg="red" onClick={()=>{
            dispatch(addItem({id : 찾은상품.id, name : 찾은상품.title, count : 1}))
          }}>주문하기</BuyBtn>

        </div>
      </div>


      <Nav fill variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link-0">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link-1">Loooonger NavLink</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent 탭={탭}/>
    
    </div> 
    )
  }
  function TabContent({탭}){
  let [fade,setFade] = useState('')

  useEffect(()=>{
    setTimeout(()=>{setFade('end')},100)
    return ( )=>{
      setFade('')
    }
  },[탭])
  // [탭]을 줘서 탭이 변할때마다 내용에 애니메이션을 추가하기 위해
  //  return으로 useEffect 가 실행되기 전 fade를 비워주고
  //  TabContent 마운트 전 fade에 end를 0.1초 뒤에 부여해준다.
  //  automatic batching 기능으로 인해 setTimeout으로 시간차를 준다
  //  automatic batching : 같은 스테이트가 가까이 있으면 하나로 인식함 (end만 실행됨)


  if(탭==0){
  return  <div className={'start '+fade}>내용0</div>
  }else if(탭==1){
  return <div className={'start '+fade}>내용1</div>
  }else if(탭==2){
  return <div className={'start '+fade}>내용2</div>
  }
    //HTML을 담은 if문을 사용하고 싶다면  앱 컴포넌트 바깥에 Tabcontent 컴포넌트를 생성한 뒤 그 안에 담아
    // props 전송 하여 사용
    // props 사용이 귀찮다하면 {부모에서 props로 넘긴 스테이트이름을 파라메터에 주면 됨}
    //*2)     [<div>내용0</div>,<div>내용1</div>,<div>내용2</div>[탭]] 탭에 들어가는 숫자에 따라 보이는 내용이 달라짐


    // *3) return <div className="start end">
    //     {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][탭]}
    //     </div>
    //    위 각 각 className="start end"을 준 내용을 단축시키고 동일한 내용임


  }
  export default Sub1;