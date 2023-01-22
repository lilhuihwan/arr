import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux"
import { changeName , increase } from "./../store/userSlice.js"
import { addCount , decreaseCount , deleteCount } from "./../store.js"
import { memo, useState } from 'react';

// let Child = memo (function (){
//   console.log('재렌더링됨')
//   return <div>자식임</div>
// })
//memo = 필요할 때 꼭 재 렌더링 해주세요 쓸데없이 재 렌더링이 되는것을 막는다
//memo = 특정상황에서만 재 렌더링을 시켜준다.
// props가 변할때만  전송된다. 기존 props와 신규 props를 비교해서 렌더링을 진행하여
// 복잡하면 시간이 오래걸릴 수 있다. 

// state 변경함수가 성능저하의 원인이라면 startTransition(()=>{})으로 감싸준다.

function Cart(){
 let state = useSelector((state)=>{ return state })
//  let state = useSelector((state)=>{ return state.user }) redex에 저장한 user항목만을 가져다 쓸수 있음
  let dispatch = useDispatch()
  let [count,setCount] =  useState (0)
 
     return(
        <div>
          {/* <Child></Child>
          <button onClick={()=>{ setCount(count+1) }}>+</button> */}
          {/* {state.user.name}{state.user.age} 의 장바구니
          <button onClick={()=>{
            dispatch(increase(100))
          }}>버튼</button> */}

        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경하기</th>
            </tr>
          </thead>
          {
            state.cart.map((a,i)=>{
              return(
                <tbody>
                <tr ket={i}>
                  <td>{state.cart[i].id}</td>
                  <td>{state.cart[i].name}</td>
                  <td>{state.cart[i].count}</td>
                  <td>
                    <button onClick={()=>{
                    dispatch(addCount(state.cart[i].id))
                  }}>+1</button> 
                    <button onClick={()=>{
                    dispatch(decreaseCount(state.cart[i].id))
                    }}>-1</button>
                    <button onClick={(e)=>{
                      dispatch(deleteCount(state.cart[i].id));
                    }}>삭제</button>
                  </td>
                </tr>
             </tbody>
              )
            })
          }


        </Table>
      </div>
    )
}

export default Cart