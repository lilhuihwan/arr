import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'



let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

// let id = createSlice({
//   name : 'id',
//   initialState : [0,2],
// })
// let name = createSlice({
//   name : 'name',
//   initialState : ['아르르 마이핏 하네스 & 리쉬','아르르 보송보송 타월'], 
// })
// let count = createSlice({
//   name : 'count',
//   initialState : [2,1],
// })

let cart = createSlice({
  name : 'cart',
  initialState :
  [
    // {id : 0, name : '아르르 마이핏 하네스 & 리쉬', count : 1},
    // {id : 1, name : '아르르 보송보송 타월', count : 1},
    // {id : 2, name : '아르르 UFO 넥카라 v2', count : 1}
  ] ,

  reducers : {
    addCount(state , action){
      let 번호 = state.findIndex((a)=>{ return a.id === action.payload})
      // array자료에서 내가 원하는 항목만 찾고싶다? state.findIndex
      //  a는 위 array의 하나하나의 데이터
      // findIndex는 array 뒤에만 붙일 수 있다.
      state[번호].count++

    },
    decreaseCount(state , action){
      let 번호 = state.findIndex((a)=>{ return a.id === action.payload});
      state[번호].count< 2 ? alert("0개 이하로 주문할 수 없습니다.") : state[번호].count--;

    },
    deleteCount(state, action){
      let 번호 = state.filter((a) => a.id !== action.payload);
      return 번호;
    },
    addItem(state, action){
      let 번호 = state.findIndex((a)=>{ return a.id === action.payload.id})
      if(번호>=0){
      state[번호].count++
      }else{
      state.push(action.payload);
      //  action.payload 라는게 html에 있는 이벤트를 실행시키는데
      //  state.push(action.payload); 가 되면 오브젝트 자료가 Cart의 내용에 들어간다.
      //  ( 왜냐면 Cart의 reducer인 state변경인 addItem의 명령이기 때문이다)
      //  그리고 오브젝트 자료들 중 id를 뽑아서 전체 state중 id를 뽑아 검사하기 때문에
      //  a.id === action.payload.id를 붙여 action.payload의 안에 있는 id까지 써줘야한다. 
      
    
    }
    


    }
  }
})




export let { addCount , decreaseCount , addItem , deleteCount } = cart.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
    // id : id.reducer,
    // name : name.reducer,
    // count : count.reducer
  }
}) 